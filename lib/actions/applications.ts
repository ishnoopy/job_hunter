"use server";

import type { Application, ApplicationStatus } from "@/app/(private)/dashboard/types";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export interface CreateApplicationInput {
  companyName: string;
  jobTitle: string;
  location?: string;
  dateApplied: Date;
  status: ApplicationStatus;
  platform: string;
  notes: string;
  respondedAt?: Date;
}

export interface UpdateApplicationInput extends Partial<CreateApplicationInput> {
  id: string;
}

/**
 * Fetches all job applications for the current user
 */
export async function getApplications(): Promise<Application[]> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("date_applied", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  const applications = (data || []).map((app: {
    id: string;
    company_name: string;
    job_title: string;
    location: string | null;
    date_applied: string;
    status: ApplicationStatus;
    platform: string;
    notes: string;
    responded_at: string | null;
  }) => ({
    id: app.id,
    companyName: app.company_name,
    jobTitle: app.job_title,
    location: app.location ?? undefined,
    dateApplied: new Date(app.date_applied),
    status: app.status,
    platform: app.platform,
    notes: app.notes,
    respondedAt: app.responded_at ? new Date(app.responded_at) : undefined,
  }));

  return applications;
}

/**
 * Fetches a single job application by ID
 */
export async function getApplicationById(applicationId: string): Promise<Application> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch application: ${error.message}`);
  }

  return {
    id: data.id,
    companyName: data.company_name,
    jobTitle: data.job_title,
    location: data.location,
    dateApplied: new Date(data.date_applied),
    status: data.status,
    platform: data.platform,
    notes: data.notes,
    respondedAt: data.responded_at ? new Date(data.responded_at) : undefined,
  };
}

/**
 * Creates a new job application
 */
export async function createApplication(input: CreateApplicationInput): Promise<Application> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      company_name: input.companyName,
      job_title: input.jobTitle,
      location: input.location,
      date_applied: input.dateApplied.toISOString(),
      status: input.status,
      platform: input.platform,
      notes: input.notes,
      responded_at: input.respondedAt ? input.respondedAt.toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }

  revalidatePath("/applications");

  return {
    id: data.id,
    companyName: data.company_name,
    jobTitle: data.job_title,
    location: data.location,
    dateApplied: new Date(data.date_applied),
    status: data.status,
    platform: data.platform,
    notes: data.notes,
    respondedAt: data.responded_at ? new Date(data.responded_at) : undefined,
  };
}

/**
 * Updates an existing job application
 */
export async function updateApplication(input: UpdateApplicationInput): Promise<Application> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const updateData: Record<string, unknown> = {};

  if (input.companyName !== undefined) updateData.company_name = input.companyName;
  if (input.jobTitle !== undefined) updateData.job_title = input.jobTitle;
  if (input.location !== undefined) updateData.location = input.location;
  if (input.dateApplied !== undefined) updateData.date_applied = input.dateApplied.toISOString();
  if (input.status !== undefined) updateData.status = input.status;
  if (input.platform !== undefined) updateData.platform = input.platform;
  if (input.notes !== undefined) updateData.notes = input.notes;
  if (input.respondedAt !== undefined) updateData.responded_at = input.respondedAt ? input.respondedAt.toISOString() : null;

  const { data, error } = await supabase
    .from("applications")
    .update(updateData)
    .eq("id", input.id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }

  revalidatePath("/applications");

  return {
    id: data.id,
    companyName: data.company_name,
    jobTitle: data.job_title,
    location: data.location,
    dateApplied: new Date(data.date_applied),
    status: data.status,
    platform: data.platform,
    notes: data.notes,
    respondedAt: data.responded_at ? new Date(data.responded_at) : undefined,
  };
}

/**
 * Deletes a job application
 */
export async function deleteApplication(applicationId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", applicationId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to delete application: ${error.message}`);
  }

  revalidatePath("/applications");
}

/**
 * Deletes multiple job applications
 */
export async function deleteBulkApplications(applicationIds: string[]): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("applications")
    .delete()
    .in("id", applicationIds)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to delete applications: ${error.message}`);
  }

  revalidatePath("/applications");
}

export async function getApplicationsCount(): Promise<number> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("applications")
    .select("count", { count: "exact" })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to get applications count: ${error.message}`);
  }

  return data?.[0]?.count ?? 0;
}

export async function getApplicationsCountByStatus(status: ApplicationStatus): Promise<number> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("applications")
    .select("count", { count: "exact" })
    .eq("user_id", user.id)
    .eq("status", status);

  if (error) {
    throw new Error(`Failed to get applications count by status: ${error.message}`);
  }

  return data?.[0]?.count ?? 0;
}

export interface StatusMetrics {
  applied: number;
  interviewing: number;
  offer: number;
  // rejected: number;
  withdrawn: number;
}

export interface PlatformMetrics {
  platform: string;
  responseCount: number;
  responseRate: number;
}

export interface MetricsData {
  statusMetrics: StatusMetrics;
  topPlatform: PlatformMetrics | null;
  averageResponseTime: number | null;
}

/**
 * Fetches comprehensive metrics for the user's applications
 */
export async function getApplicationsMetrics(): Promise<MetricsData> {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  // Fetch all applications for metrics calculation
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to fetch applications for metrics: ${error.message}`);
  }

  // Calculate status metrics
  const statusMetrics: StatusMetrics = {
    applied: 0,
    interviewing: 0,
    offer: 0,
    // rejected: 0,
    withdrawn: 0,
  };

  // Calculate platform metrics
  const platformStats = new Map<string, { total: number; responded: number }>();

  let totalResponseTime = 0;
  let responseCount = 0;

  applications?.forEach((app: {
    status: ApplicationStatus;
    platform: string;
    date_applied: string;
    responded_at: string | null;
  }) => {
    // Count by status (exclude rejected as it's not in StatusMetrics)
    if (app.status !== "rejected" && app.status in statusMetrics) {
      statusMetrics[app.status]++;
    }

    // Track platform statistics
    if (!platformStats.has(app.platform)) {
      platformStats.set(app.platform, { total: 0, responded: 0 });
    }
    const platformStat = platformStats.get(app.platform)!;
    platformStat.total++;

    // Count as "responded" if there's a responded_at date
    if (app.responded_at) {
      platformStat.responded++;

      // Calculate response time (time from application to response)
      // Exclude rejected applications from average response time calculation
      if (app.status !== "rejected") {
        const appliedDate = new Date(app.date_applied);
        const respondedDate = new Date(app.responded_at);
        const diffInDays = Math.floor(
          (respondedDate.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Only count positive differences (responded_at should be after date_applied)
        if (diffInDays > 0) {
          totalResponseTime += diffInDays;
          responseCount++;
        }
      }
    }
  });

  // Find platform with most responses
  let topPlatform: PlatformMetrics | null = null;
  let maxResponses = 0;

  platformStats.forEach((stats, platform) => {
    if (stats.responded > maxResponses) {
      maxResponses = stats.responded;
      topPlatform = {
        platform,
        responseCount: stats.responded,
        responseRate: stats.total > 0 ? (stats.responded / stats.total) * 100 : 0,
      };
    }
  });

  // Calculate average response time
  const averageResponseTime = responseCount > 0 ? Math.round(totalResponseTime / responseCount) : null;

  return {
    statusMetrics,
    topPlatform,
    averageResponseTime,
  };
}
