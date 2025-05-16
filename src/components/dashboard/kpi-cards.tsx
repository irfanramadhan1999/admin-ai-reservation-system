
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-full ${kpi.iconColor}`}>
              <kpi.icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold">{kpi.value}</span>
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
