
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
  bgColor: string;
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
      iconColor: 'text-white',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: '321',
      change: '+8%',
      trend: 'up' as const,
      icon: CalendarDays,
      iconColor: 'text-white',
      bgColor: 'bg-orange-500',
    },
    {
      title: 'Total Conversations',
      value: '156',
      change: '+15%',
      trend: 'up' as const,
      icon: MessageSquare,
      iconColor: 'text-white',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Token Usage',
      value: '15.2K',
      change: '-3%',
      trend: 'down' as const,
      icon: Zap,
      iconColor: 'text-white',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Spam Activities',
      value: '7',
      change: '+40%',
      trend: 'up' as const,
      icon: Activity,
      iconColor: 'text-white',
      bgColor: 'bg-red-500',
    },
  ];

  return <KpiCards kpiData={kpiData} />;
}
