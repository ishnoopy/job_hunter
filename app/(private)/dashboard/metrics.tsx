"use client";

import { useApplicationsMetrics } from "@/lib/hooks/use-applications";
import { Briefcase, Clock, TrendingUp } from "lucide-react";
import * as React from "react";

interface StatusCardProps {
  label: string;
  count: number;
  textColor: string;
  bgColor: string;
}

/**
 * Status card component for displaying application metrics
 */
function StatusCard({ label, count, textColor, bgColor }: StatusCardProps) {
  return (
    <div
      className="group relative rounded-xl p-5 transition-all duration-200 hover:shadow-lg"
      style={{
        backgroundColor: `var(${bgColor})`,
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
            {label}
          </span>
          <Briefcase
            className="size-4 opacity-40 transition-opacity group-hover:opacity-60"
            style={{ color: `var(${textColor})` }}
          />
        </div>
        <p
          className="text-3xl font-bold tracking-tight"
          style={{ color: `var(${textColor})` }}
        >
          {count}
        </p>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  iconColor: string;
}

/**
 * Metric card component for detailed statistics
 */
function MetricCard({ icon, label, value, subtitle, iconColor }: MetricCardProps) {
  return (
    <div className="group rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-card hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div
          className="transition-transform duration-200 group-hover:scale-110"
          style={{ color: `var(${iconColor})` }}
        >
          {icon}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
            {label}
          </p>
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground/70">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ApplicationMetrics() {
  const { data: metrics, isLoading } = useApplicationsMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Overview
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-muted/50"
            />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-muted/50"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const { statusMetrics, topPlatform, averageResponseTime } = metrics;

  const statusConfig = [
    {
      label: "Applied",
      count: statusMetrics.applied,
      textColor: "--color-status-applied",
      bgColor: "--color-status-applied-bg",
    },
    {
      label: "Interviewing",
      count: statusMetrics.interviewing,
      textColor: "--color-status-interviewing",
      bgColor: "--color-status-interviewing-bg",
    },
    {
      label: "Offer",
      count: statusMetrics.offer,
      textColor: "--color-status-offer",
      bgColor: "--color-status-offer-bg",
    },
    {
      label: "Withdrawn",
      count: statusMetrics.withdrawn,
      textColor: "--color-status-withdrawn",
      bgColor: "--color-status-withdrawn-bg",
    },
    {
      label: "Unlikely to Respond",
      count: statusMetrics.unlikely_to_respond,
      textColor: "--color-status-unlikely_to_respond",
      bgColor: "--color-status-unlikely_to_respond-bg",
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Overview
      </h2>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statusConfig.map((status) => (
          <StatusCard key={status.label} {...status} />
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Platform */}
        <MetricCard
          icon={<TrendingUp className="size-5" />}
          label="Top Platform"
          value={topPlatform?.platform || "N/A"}
          subtitle={
            topPlatform
              ? `${topPlatform.responseCount} responses · ${topPlatform.responseRate.toFixed(1)}% rate`
              : "No data available"
          }
          iconColor="--color-metric-indigo"
        />

        {/* Average Response Time */}
        <MetricCard
          icon={<Clock className="size-5" />}
          label="Avg Response Time"
          value={
            averageResponseTime !== null
              ? `${averageResponseTime} ${averageResponseTime === 1 ? "day" : "days"}`
              : "N/A"
          }
          subtitle={
            averageResponseTime !== null
              ? "From application to first response"
              : "No response data yet"
          }
          iconColor="--color-metric-amber"
        />
      </div>
    </div>
  );
}
