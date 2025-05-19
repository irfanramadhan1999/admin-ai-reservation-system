
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KpiItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

interface ShopOwnerKpiCardsProps {
  kpiData: KpiItem[];
  isCalendarSynced?: boolean;
}

export function ShopOwnerKpiCards({ kpiData, isCalendarSynced = false }: ShopOwnerKpiCardsProps) {
  const navigate = useNavigate();

  const handleCalendarSync = () => {
    navigate('/shop-admin/calendar-sync');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="p-6 relative">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold">{kpi.value}</span>
              <span className={`text-xs flex items-center ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
            {kpi.description && (
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            )}
          </div>
        </Card>
      ))}

      {/* Google Calendar Sync Card */}
      <Card className="p-6 relative">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Google Calendar</h3>
            <div className="p-2 rounded-full bg-blue-50">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          
          <Button 
            onClick={handleCalendarSync}
            variant={isCalendarSynced ? "outline" : "default"}
            className={isCalendarSynced ? "w-full border-green-500 text-green-500 hover:bg-green-50" : "w-full"}
          >
            {isCalendarSynced ? "Calendar Connected" : "Sync with Google Calendar"}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            {isCalendarSynced 
              ? "Your restaurant calendar is synced with Google Calendar" 
              : "Connect your Google Calendar to sync reservations automatically"}
          </p>
        </div>
      </Card>
    </div>
  );
}
