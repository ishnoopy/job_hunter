/**
 * React hook for creating applications with rate limit handling
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication, type CreateApplicationInput } from "@/lib/actions/applications";
import { extractErrorDetails, isRateLimitError } from "@/lib/error-handler";
import { useState } from "react";

interface UseCreateApplicationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Hook for creating job applications with automatic error handling
 * 
 * @example
 * const { mutate, isPending, error, retryAfter } = useCreateApplication({
 *   onSuccess: () => toast.success("Application created"),
 * });
 * 
 * // In your form submit handler
 * mutate(formData);
 */
export function useCreateApplication(options?: UseCreateApplicationOptions) {
  const queryClient = useQueryClient();
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (input: CreateApplicationInput) => {
      return await createApplication(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setRetryAfter(null);
      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorDetails = extractErrorDetails(error);

      if (isRateLimitError(error)) {
        setRetryAfter(errorDetails.retryAfter || null);
      }

      options?.onError?.(error);
    },
  });

  return {
    ...mutation,
    retryAfter,
    isRateLimited: retryAfter !== null,
  };
}
