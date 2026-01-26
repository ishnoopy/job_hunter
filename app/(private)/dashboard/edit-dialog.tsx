"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Application, ApplicationStatus } from "./types";

interface EditDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: Application) => void;
}

const statusOptions: ApplicationStatus[] = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

export function EditDialog({
  application,
  isOpen,
  onClose,
  onSave,
}: EditDialogProps) {
  const [formData, setFormData] = React.useState<Partial<Application>>({});

  React.useEffect(() => {
    if (application) {
      setFormData(application);
    } else {
      setFormData({});
    }
  }, [application]);

  const handleSave = () => {
    if (!application) return;
    const companyName = formData.companyName?.trim() || "";
    const jobTitle = formData.jobTitle?.trim() || "";
    if (!companyName || !jobTitle) {
      return;
    }
    onSave({
      id: application.id,
      companyName,
      jobTitle,
      location: formData.location?.trim() || "",
      dateApplied: formData.dateApplied || application.dateApplied || new Date(),
      status: formData.status || application.status || "applied",
      platform: formData.platform?.trim() || "",
      notes: formData.notes?.trim() || "",
      respondedAt: formData.respondedAt,
    });
    onClose();
  };

  const updateField = <K extends keyof Application>(
    field: K,
    value: Application[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    (formData.companyName?.trim() || "").length > 0 &&
    (formData.jobTitle?.trim() || "").length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {application?.companyName ? "Edit Application" : "Add Application"}
          </DialogTitle>
          <DialogDescription>
            {application?.companyName
              ? "Make changes to your application here. Click save when you're done."
              : "Add a new job application. Fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="companyName">
              Company Name / Person <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName || ""}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="e.g., Tech Corp"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle || ""}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location (optional)</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateApplied">Date Applied</Label>
            <Input
              id="dateApplied"
              type="date"
              value={
                formData.dateApplied
                  ? new Date(formData.dateApplied).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                updateField("dateApplied", new Date(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: ApplicationStatus) =>
                updateField("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="respondedAt">Responded At (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="respondedAt"
                type="date"
                value={
                  formData.respondedAt
                    ? new Date(formData.respondedAt).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  updateField("respondedAt", e.target.value ? new Date(e.target.value) : undefined)
                }
                className="flex-1"
              />
              {formData.respondedAt && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateField("respondedAt", undefined)}
                  title="Clear date"
                >
                  ✕
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Set when the platform/company responded to your application
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={formData.platform || ""}
              onChange={(e) => updateField("platform", e.target.value)}
              placeholder="e.g., LinkedIn, Indeed, Company Website"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              placeholder="Add any notes about the application..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
