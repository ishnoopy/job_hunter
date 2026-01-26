export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "withdrawn";

export interface Application {
  id: string;
  companyName: string;
  jobTitle: string;
  location?: string;
  dateApplied: Date;
  status: ApplicationStatus;
  platform: string;
  notes: string;
  respondedAt?: Date;
}
