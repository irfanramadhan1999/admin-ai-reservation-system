
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  date: string;
}

export function DashboardHeader({ title, subtitle, date }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {subtitle}
        </p>
      </div>
      <div className="text-sm text-muted-foreground">
        {date}
      </div>
    </div>
  );
}
