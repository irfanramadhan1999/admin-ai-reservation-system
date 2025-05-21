
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
  bgColor: string;
}

interface KpiCardsProps {
  kpiData: KpiItem[];
}

export function KpiCards({ kpiData }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="p-4 border border-gray-100 shadow-sm relative overflow-hidden rounded-2xl bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-full ${kpi.bgColor} shadow-sm`}>
              <kpi.icon className={`h-4 w-4 ${kpi.iconColor}`} />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xs font-medium text-muted-foreground">{kpi.title}</h3>
            <div className="flex items-end gap-1.5">
              <span className="text-xl font-semibold">{kpi.value}</span>
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
