/**
 * Rate limiting utility for server actions
 * 
 * Implements a sliding window rate limiter with in-memory storage.
 * For production use with multiple server instances, consider using
 * a distributed store like Redis (Upstash).
 */

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed within the window
   */
  readonly maxRequests: number;
  
  /**
   * Time window in milliseconds
   */
  readonly windowMs: number;
}

export interface RateLimitResult {
  readonly isAllowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: Date;
}

interface RequestLog {
  readonly count: number;
  readonly resetAt: number;
}

/**
 * In-memory store for rate limit tracking
 * In production, consider using Redis for distributed rate limiting
 */
class RateLimitStore {
  private store: Map<string, RequestLog>;

  constructor() {
    this.store = new Map();
  }

  /**
   * Checks and increments the request count for a given identifier
   */
  public checkAndIncrement(identifier: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    const existing = this.store.get(identifier);

    // Clean up expired entries
    if (existing && existing.resetAt <= now) {
      this.store.delete(identifier);
    }

    const current = this.store.get(identifier);

    if (!current) {
      // First request in the window
      const resetAt = now + config.windowMs;
      this.store.set(identifier, { count: 1, resetAt });

      return {
        isAllowed: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        resetAt: new Date(resetAt),
      };
    }

    // Subsequent request in the window
    const isAllowed = current.count < config.maxRequests;

    if (isAllowed) {
      this.store.set(identifier, {
        count: current.count + 1,
        resetAt: current.resetAt,
      });
    }

    return {
      isAllowed,
      limit: config.maxRequests,
      remaining: Math.max(0, config.maxRequests - current.count - (isAllowed ? 1 : 0)),
      resetAt: new Date(current.resetAt),
    };
  }

  /**
   * Clears all rate limit records
   * Useful for testing
   */
  public clear(): void {
    this.store.clear();
  }
}

// Singleton instance
const rateLimitStore = new RateLimitStore();

/**
 * Rate limiter error class
 */
export class RateLimitError extends Error {
  public readonly resetAt: Date;
  public readonly limit: number;

  constructor(message: string, resetAt: Date, limit: number) {
    super(message);
    this.name = "RateLimitError";
    this.resetAt = resetAt;
    this.limit = limit;
  }
}

/**
 * Creates a rate limiter for a specific action
 * 
 * @example
 * const limiter = createRateLimiter({ maxRequests: 10, windowMs: 60000 });
 * 
 * export async function myAction(userId: string) {
 *   await limiter.check(userId);
 *   // ... action logic
 * }
 */
export function createRateLimiter(config: RateLimitConfig) {
  return {
    /**
     * Checks if the request is allowed and throws if rate limit is exceeded
     */
    check: async (identifier: string): Promise<void> => {
      const result = rateLimitStore.checkAndIncrement(identifier, config);

      if (!result.isAllowed) {
        const resetInSeconds = Math.ceil(
          (result.resetAt.getTime() - Date.now()) / 1000
        );
        throw new RateLimitError(
          `Rate limit exceeded. Try again in ${resetInSeconds} seconds.`,
          result.resetAt,
          result.limit
        );
      }
    },

    /**
     * Checks if the request is allowed and returns the result without throwing
     */
    checkWithResult: async (identifier: string): Promise<RateLimitResult> => {
      return rateLimitStore.checkAndIncrement(identifier, config);
    },
  };
}

/**
 * Default rate limiter configurations
 */
export const RateLimitPresets = {
  /**
   * Strict: 5 requests per minute
   */
  STRICT: { maxRequests: 5, windowMs: 60 * 1000 } as const,

  /**
   * Moderate: 10 requests per minute
   */
  MODERATE: { maxRequests: 10, windowMs: 60 * 1000 } as const,

  /**
   * Relaxed: 30 requests per minute
   */
  RELAXED: { maxRequests: 30, windowMs: 60 * 1000 } as const,

  /**
   * Per hour: 100 requests per hour
   */
  HOURLY: { maxRequests: 100, windowMs: 60 * 60 * 1000 } as const,
} as const;

/**
 * Clears the rate limit store
 * Useful for testing
 */
export function clearRateLimitStore(): void {
  rateLimitStore.clear();
}
