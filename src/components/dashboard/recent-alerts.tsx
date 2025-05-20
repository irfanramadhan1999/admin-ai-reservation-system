
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { AlertsTable } from '@/components/system-alerts/AlertsTable';
import { SystemAlert } from '@/components/system-alerts/types';

interface RecentAlertsProps {
  alerts: SystemAlert[];
  onToggleBlock: (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => void;
}

export function RecentAlerts({ alerts, onToggleBlock }: RecentAlertsProps) {
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Suspicious Activities</h2>
        <Link 
          to="/admin/system-alerts" 
          className="text-sm flex items-center text-blue-500 hover:underline"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="rounded-lg border bg-card">
        <AlertsTable 
          alerts={alerts} 
          onToggleBlock={onToggleBlock} 
        />
      </div>
    </Card>
  );
}
