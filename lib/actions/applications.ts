"use server";

import type { Application, ApplicationStatus } from "@/app/(private)/applications/types";
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

  return (data || []).map((app: {
    id: string;
    company_name: string;
    job_title: string;
    location: string | null;
    date_applied: string;
    status: ApplicationStatus;
    platform: string;
    notes: string;
  }) => ({
    id: app.id,
    companyName: app.company_name,
    jobTitle: app.job_title,
    location: app.location ?? undefined,
    dateApplied: new Date(app.date_applied),
    status: app.status,
    platform: app.platform,
    notes: app.notes,
  }));
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
