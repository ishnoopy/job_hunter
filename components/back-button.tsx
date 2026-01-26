"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  readonly label?: string;
  readonly className?: string;
}

/**
 * BackButton component for navigating to the previous page
 * @param label - Optional custom label for the button
 * @param className - Optional additional CSS classes
 */
export function BackButton({ label = "Back", className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (): void => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={className}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
