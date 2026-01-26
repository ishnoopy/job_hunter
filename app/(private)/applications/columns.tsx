"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application, ApplicationStatus } from "./types";
import { cn } from "@/lib/utils";

const statusOptions: ApplicationStatus[] = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

interface ColumnsProps {
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

export function getColumns({
  onStatusChange,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Application>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company Name / Person
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        return (
          <div
            className={cn(
              "font-medium",
              isRejected && "line-through text-muted-foreground"
            )}
          >
            {row.getValue("companyName")}
          </div>
        );
      },
    },
    {
      accessorKey: "jobTitle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Job Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        return (
          <div className={cn(isRejected && "line-through text-muted-foreground")}>
            {row.getValue("jobTitle")}
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        const location = row.getValue("location") as string | undefined;
        return (
          <div className={cn(isRejected && "line-through text-muted-foreground")}>
            {location || "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "dateApplied",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Applied
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        const date = row.getValue("dateApplied") as Date;
        const formatted = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <div className={cn(isRejected && "line-through text-muted-foreground")}>
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as ApplicationStatus;
        return (
          <Select
            value={status}
            onValueChange={(value: ApplicationStatus) =>
              onStatusChange(row.original.id, value)
            }
          >
            <SelectTrigger className="w-[140px]">
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
        );
      },
    },
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        return (
          <div className={cn(isRejected && "line-through text-muted-foreground")}>
            {row.getValue("platform")}
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => {
        const isRejected = row.original.status === "rejected";
        const notes = row.getValue("notes") as string;
        return (
          <div
            className={cn(
              "max-w-[200px] truncate",
              isRejected && "line-through text-muted-foreground"
            )}
            title={notes}
          >
            {notes || "—"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const application = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(application.companyName)
                }
              >
                Copy company name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(application)}>
                Edit application
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(application.id)}
                className="text-destructive"
              >
                Delete application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
