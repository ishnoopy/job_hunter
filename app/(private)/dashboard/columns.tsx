"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Application, ApplicationStatus } from "./types";

const statusOptions: ApplicationStatus[] = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

const statusColors = {
  applied: "bg-blue-100 text-blue-700 border-blue-200",
  interviewing: "bg-purple-100 text-purple-700 border-purple-200",
  offer: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  withdrawn: "bg-gray-100 text-gray-700 border-gray-200",
};

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
      header: ({ column }) => {
        const filterValue = column.getFilterValue() as string | undefined;
        return (
          <Select
            value={filterValue || "all"}
            onValueChange={(value) => {
              column.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="h-8 w-[100px] px-2 text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-xs">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as ApplicationStatus;
        return (
          <Select
            value={status}
            onValueChange={(value: ApplicationStatus) =>
              onStatusChange(row.original.id, value)
            }
          >
            <SelectTrigger
              className={cn(
                "inline-flex h-auto items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:opacity-80 focus:ring-0 focus:ring-offset-0",
                statusColors[status]
              )}
            >
              <SelectValue>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex h-2 w-2 rounded-full",
                        statusColors[option].split(" ")[0].replace("bg-", "bg-")
                      )}
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
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
        if (!notes) {
          return (
            <div className={cn(isRejected && "line-through text-muted-foreground")}>
              —
            </div>
          );
        }
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "max-w-[200px] cursor-help truncate",
                    isRejected && "line-through text-muted-foreground"
                  )}
                >
                  {notes}
                </div>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-sm whitespace-pre-wrap wrap-break-word"
                side="top"
              >
                <p>{notes}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
