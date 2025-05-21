
import React from 'react';
import { 
  Store, 
  CalendarDays, 
  Zap, 
  Activity,
  MessageSquare
} from 'lucide-react';
import { KpiCards } from '@/components/dashboard/kpi-cards';

// Define the KPI data type
export interface KpiItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  iconColor: string;
}

export function DashboardStats() {
  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Shops',
      value: '24',
      change: '+12%',
      trend: 'up' as const,
      icon: Store,
      iconColor: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: '321',
      change: '+8%',
      trend: 'up' as const,
      icon: CalendarDays,
      iconColor: 'bg-purple-400',
    },
    {
      title: 'Total Conversations',
      value: '156',
      change: '+15%',
      trend: 'up' as const,
      icon: MessageSquare,
      iconColor: 'bg-blue-400',
    },
    {
      title: 'Token Usage',
      value: '15.2K',
      change: '-3%',
      trend: 'down' as const,
      icon: Zap,
      iconColor: 'bg-emerald-400',
    },
    {
      title: 'Spam Activities',
      value: '7',
      change: '+40%',
      trend: 'up' as const,
      icon: Activity,
      iconColor: 'bg-red-400',
    },
  ];

  return <KpiCards kpiData={kpiData} />;
}
