/**
 * Error handling utilities for client components
 */

import { RateLimitError } from "./rate-limit";

export interface ErrorDetails {
  readonly message: string;
  readonly code?: string;
  readonly retryAfter?: number;
}

/**
 * Checks if an error is a rate limit error
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError || 
    (error instanceof Error && error.name === "RateLimitError");
}

/**
 * Extracts user-friendly error details from any error
 */
export function extractErrorDetails(error: unknown): ErrorDetails {
  if (isRateLimitError(error)) {
    const rateLimitError = error as RateLimitError;
    const retryAfter = Math.ceil(
      (rateLimitError.resetAt.getTime() - Date.now()) / 1000
    );

    return {
      message: `Too many requests. Please try again in ${retryAfter} seconds.`,
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
    };
  }

  return {
    message: "An unexpected error occurred. Please try again.",
    code: "UNKNOWN_ERROR",
  };
}

/**
 * Formats an error message for display to users
 */
export function formatErrorMessage(error: unknown): string {
  const details = extractErrorDetails(error);
  return details.message;
}

/**
 * Gets the retry delay in seconds from a rate limit error
 */
export function getRetryAfter(error: unknown): number | null {
  if (isRateLimitError(error)) {
    const rateLimitError = error as RateLimitError;
    return Math.ceil((rateLimitError.resetAt.getTime() - Date.now()) / 1000);
  }
  return null;
}
