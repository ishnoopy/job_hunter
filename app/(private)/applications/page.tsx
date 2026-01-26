"use client";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  useApplications,
  useCreateApplication,
  useDeleteApplication,
  useDeleteBulkApplications,
  useUpdateApplication,
  useUpdateApplicationStatus,
} from "@/lib/hooks/use-applications";
import { Plus } from "lucide-react";
import * as React from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { EditDialog } from "./edit-dialog";
import { Application, ApplicationStatus } from "./types";

export default function ApplicationPage() {
  const { data: applications = [], isLoading, error } = useApplications();
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();
  const bulkDeleteMutation = useDeleteBulkApplications();
  const updateStatusMutation = useUpdateApplicationStatus();

  const [editingApplication, setEditingApplication] =
    React.useState<Application | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    bulkDeleteMutation.mutate(selectedIds);
  };

  const handleSave = (updatedApplication: Application) => {
    const isNew = !applications.find((app) => app.id === updatedApplication.id);
    
    if (isNew) {
      createMutation.mutate({
        companyName: updatedApplication.companyName,
        jobTitle: updatedApplication.jobTitle,
        location: updatedApplication.location,
        dateApplied: updatedApplication.dateApplied,
        status: updatedApplication.status,
        platform: updatedApplication.platform,
        notes: updatedApplication.notes,
      });
    } else {
      updateMutation.mutate({
        id: updatedApplication.id,
        companyName: updatedApplication.companyName,
        jobTitle: updatedApplication.jobTitle,
        location: updatedApplication.location,
        dateApplied: updatedApplication.dateApplied,
        status: updatedApplication.status,
        platform: updatedApplication.platform,
        notes: updatedApplication.notes,
      });
    }
  };

  const handleAddNew = () => {
    const newApplication: Application = {
      id: "",
      companyName: "",
      jobTitle: "",
      location: "",
      dateApplied: new Date(),
      status: "applied",
      platform: "",
      notes: "",
    };
    setEditingApplication(newApplication);
    setIsEditDialogOpen(true);
  };

  const columns = getColumns({
    onStatusChange: handleStatusChange,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-bg-secondary px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4">
            <BackButton />
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <h2 className="font-semibold">Error loading applications</h2>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              Track and manage your job applications
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={applications}
            onBulkDelete={handleBulkDelete}
          />
        )}
        <EditDialog
          application={editingApplication}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingApplication(null);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
