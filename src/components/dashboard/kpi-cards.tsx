
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface KpiItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  iconColor: string;
}

interface KpiCardsProps {
  kpiData: KpiItem[];
}

export function KpiCards({ kpiData }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="p-4 relative">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-1.5 rounded-full ${kpi.iconColor}`}>
              <kpi.icon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xs font-medium text-muted-foreground">{kpi.title}</h3>
            <div className="flex items-end gap-1">
              <span className="text-lg font-semibold">{kpi.value}</span>
              <span className={`text-xs flex items-center ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
