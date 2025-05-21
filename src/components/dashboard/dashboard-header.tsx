
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
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {subtitle}
        </p>
      </div>
      <div className="text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
        {date}
      </div>
    </div>
  );
}
