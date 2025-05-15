
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  iconClassName
}: StatCardProps) {
  return (
    <Card className={cn("p-6 flex flex-col space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={cn("p-2 rounded-full", iconClassName)}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground mt-1">{description}</span>
        )}
      </div>
    </Card>
  );
}
