
import React from 'react';

interface SystemAlertsHeaderProps {
  title: string;
  description: string;
}

export const SystemAlertsHeader = ({ title, description }: SystemAlertsHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};
