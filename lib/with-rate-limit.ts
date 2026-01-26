/**
 * Higher-order function to add rate limiting to server actions
 * 
 * This utility provides a clean way to wrap server actions with rate limiting.
 */

import { createRateLimiter, type RateLimitConfig } from "./rate-limit";
import { createServerSupabaseClient } from "./supabase-server";

export interface RateLimitOptions {
  /**
   * Rate limit configuration
   */
  readonly config: RateLimitConfig;
  
  /**
   * Custom function to get the identifier for rate limiting
   * Defaults to using the authenticated user's ID
   */
  readonly getIdentifier?: () => Promise<string>;
}

/**
 * Wraps a server action with rate limiting
 * 
 * @example
 * // Basic usage with default user-based rate limiting
 * export const myAction = withRateLimit(
 *   async (input: string) => {
 *     // Your action logic here
 *     return result;
 *   },
 *   { config: RateLimitPresets.MODERATE }
 * );
 * 
 * @example
 * // Custom identifier (e.g., IP-based)
 * export const publicAction = withRateLimit(
 *   async (input: string) => {
 *     return result;
 *   },
 *   {
 *     config: { maxRequests: 5, windowMs: 60000 },
 *     getIdentifier: async () => {
 *       const { headers } = await import("next/headers");
 *       return headers().get("x-forwarded-for") || "unknown";
 *     }
 *   }
 * );
 */
export function withRateLimit<TArgs extends unknown[], TReturn>(
  action: (...args: TArgs) => Promise<TReturn>,
  options: RateLimitOptions
): (...args: TArgs) => Promise<TReturn> {
  const limiter = createRateLimiter(options.config);

  return async (...args: TArgs): Promise<TReturn> => {
    // Get identifier for rate limiting
    const identifier = options.getIdentifier 
      ? await options.getIdentifier()
      : await getDefaultIdentifier();

    // Check rate limit
    await limiter.check(identifier);

    // Execute the original action
    return await action(...args);
  };
}

/**
 * Default identifier getter - uses authenticated user ID
 */
async function getDefaultIdentifier(): Promise<string> {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  return user.id;
}

/**
 * Creates a rate limiter middleware that can be composed with other middlewares
 * 
 * @example
 * const withAuth = createAuthMiddleware();
 * const withModerateRateLimit = createRateLimitMiddleware(RateLimitPresets.MODERATE);
 * 
 * export const myAction = compose(
 *   withAuth,
 *   withModerateRateLimit
 * )(async (input) => {
 *   // Your action logic
 * });
 */
export function createRateLimitMiddleware(config: RateLimitConfig) {
  return <TArgs extends unknown[], TReturn>(
    action: (...args: TArgs) => Promise<TReturn>
  ) => withRateLimit(action, { config });
}
