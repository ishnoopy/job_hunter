"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Info,
  AlertTriangle,
  AlertCircle,
  FileText,
  Mail,
} from "lucide-react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardIcon,
  CardFooter,
  Badge,
  Avatar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
  Separator,
} from "@/components/ui";

export default function ComponentsDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Components Demo</h1>
          <p className="text-gray-600">
            Showcasing all reusable UI components built with ShadCN conventions
          </p>
        </header>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="search">Search Input</Label>
              <Input id="search" placeholder="Search..." icon={<Search className="size-4" />} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" icon={<Mail className="size-4" />} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error">With Error</Label>
              <Input id="error" placeholder="Invalid input" error="This field is required" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
          </div>
        </section>

        {/* Select & Textarea */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select & Textarea</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "pending", label: "Pending" },
                  { value: "completed", label: "Completed" },
                ]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message..." />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CardIcon>
                    <FileText className="size-5 text-gray-700" />
                  </CardIcon>
                  <div>
                    <CardTitle className="mb-1">Document Title</CardTitle>
                    <CardDescription>
                      A brief description of the document or content.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>With header and footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is the card content area where you can place any content.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  Action
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">1,234</div>
                <p className="text-sm text-gray-600 mt-1">Total applications</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success" icon={<CheckCircle2 />}>
              Success
            </Badge>
            <Badge variant="info" icon={<Info />}>
              Info
            </Badge>
            <Badge variant="warning" icon={<AlertTriangle />}>
              Warning
            </Badge>
            <Badge variant="error" icon={<AlertCircle />}>
              Error
            </Badge>
          </div>
        </section>

        {/* Avatars */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Avatars</h2>
          <div className="flex flex-wrap items-end gap-4">
            <Avatar fallback="JD" size="sm" />
            <Avatar fallback="AB" size="default" />
            <Avatar fallback="CD" size="lg" />
            <Avatar fallback="EF" />
            <Avatar fallback="GH" />
            <Avatar src="https://unavatar.io/github/vercel" alt="Avatar with image" />
          </div>
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Alerts</h2>
          <div className="space-y-4 max-w-2xl">
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <div>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your action was completed successfully.</AlertDescription>
              </div>
            </Alert>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <div>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Here is some important information you should know.
                </AlertDescription>
              </div>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <div>
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please review this warning before proceeding.
                </AlertDescription>
              </div>
            </Alert>

            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  An error occurred while processing your request.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </section>

        {/* Dialog */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dialog (Modal)</h2>
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogClose onClick={() => setDialogOpen(false)} />
              <DialogHeader>
                <DialogTitle>Modal Dialog</DialogTitle>
                <DialogDescription>
                  This is a modal dialog component built with ShadCN conventions.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-600">
                  You can place any content here. The dialog will close when clicking outside,
                  pressing ESC, or clicking the close button.
                </p>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Separator */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Separator</h2>
          <div className="max-w-2xl space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Horizontal</h3>
              <Separator />
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium">Vertical</h3>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-sm text-gray-600">Content</span>
            </div>
          </div>
        </section>

        {/* Skeleton */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skeleton (Loading)</h2>
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </section>

        {/* Form Example */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Form Example</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Fill in your information below</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" required>
                    Full Name
                  </Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-email" required>
                    Email
                  </Label>
                  <Input id="form-email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" required>
                    Role
                  </Label>
                  <Select
                    id="role"
                    options={[
                      { value: "developer", label: "Developer" },
                      { value: "designer", label: "Designer" },
                      { value: "manager", label: "Manager" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." />
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end gap-3">
              <Button variant="secondary">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
