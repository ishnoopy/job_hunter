"use client";

import type { ApplicationStatus } from "@/app/(private)/dashboard/types";
import {
  createApplication,
  deleteApplication,
  deleteBulkApplications,
  getApplications,
  getApplicationsCount,
  getApplicationsCountByStatus,
  getApplicationsMetrics,
  updateApplication,
} from "@/lib/actions/applications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const APPLICATIONS_QUERY_KEY = ["applications"];

/**
 * Hook to fetch all applications
 */
export function useApplications() {
  return useQuery({
    queryKey: APPLICATIONS_QUERY_KEY,
    queryFn: getApplications,
  });
}

/**
 * Hook to create a new application
 */
export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["applications-metrics"] });
    },
  });
}

/**
 * Hook to update an existing application
 */
export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["applications-metrics"] });
    },
  });
}

/**
 * Hook to delete an application
 */
export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["applications-metrics"] });
    },
  });
}

/**
 * Hook to delete multiple applications
 */
export function useDeleteBulkApplications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBulkApplications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["applications-metrics"] });
    },
  });
}

/**
 * Hook to update application status
 */
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplication({ id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["applications-metrics"] });
    },
  });
}

/**
 * Hook to get applications count
 */
export function useApplicationsCount() {
  return useQuery({
    queryKey: ["applications-count"],
    queryFn: getApplicationsCount,
  });
}

/**
 * Hook to get applications count by status
 */
export function useApplicationsCountByStatus(status: ApplicationStatus) {
  return useQuery({
    queryKey: ["applications-count-by-status", status],
    queryFn: () => getApplicationsCountByStatus(status),
  });
}

/**
 * Hook to get comprehensive applications metrics
 */
export function useApplicationsMetrics() {
  return useQuery({
    queryKey: ["applications-metrics"],
    queryFn: getApplicationsMetrics,
  });
}
