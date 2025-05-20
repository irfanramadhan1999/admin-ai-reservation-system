
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  Store, 
  CalendarDays, 
  Zap, 
  Activity
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { RecentShops } from '@/components/dashboard/recent-shops';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { SystemAlert } from '@/components/system-alerts/types';

const Dashboard = () => {
  const navigate = useNavigate();
  
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
      title: 'Token Usage',
      value: '15.2K',
      change: '-3%',
      trend: 'down' as const,
      icon: Zap,
      iconColor: 'bg-emerald-400',
    },
    {
      title: 'Suspicious Activities',
      value: '7',
      change: '+40%',
      trend: 'up' as const,
      icon: Activity,
      iconColor: 'bg-red-400',
    },
  ];

  // Mock data for recent shops
  const recentShops = [
    {
      id: "1",
      name: "Sakura Sushi Tokyo",
      contact: "+1 (555) 123-4567",
      tokenUsage: {
        used: 1250,
        limit: 5000
      },
      totalBookings: 42,
      createdAt: "2025-01-15",
      isActive: true,
      frontendUrl: "https://olivegarden.reserveai.jp"
    },
    {
      id: "2",
      name: "Sushi Heaven",
      contact: "+1 (555) 987-6543",
      tokenUsage: {
        used: 3100,
        limit: 5000
      },
      totalBookings: 28,
      createdAt: "2025-02-03",
      isActive: true,
      frontendUrl: "https://sushiheaven.reserveai.jp"
    },
    {
      id: "3",
      name: "Pasta Paradise",
      contact: "+1 (555) 456-7890",
      tokenUsage: {
        used: 2400,
        limit: 5000
      },
      totalBookings: 36,
      createdAt: "2025-02-20",
      isActive: false,
      frontendUrl: "https://pastaparadise.reserveai.jp"
    },
    {
      id: "4",
      name: "Burger Bliss",
      contact: "+1 (555) 321-6547",
      tokenUsage: {
        used: 4200,
        limit: 5000
      },
      totalBookings: 24,
      createdAt: "2025-03-05",
      isActive: true,
      frontendUrl: "https://burgerbliss.reserveai.jp"
    },
    {
      id: "5",
      name: "Thai Delight",
      contact: "+1 (555) 789-0123",
      tokenUsage: {
        used: 1900,
        limit: 5000
      },
      totalBookings: 32,
      createdAt: "2025-03-18",
      isActive: true,
      frontendUrl: "https://thaidelight.reserveai.jp"
    },
  ];

  // Mock data for recent system alerts
  const recentAlerts: SystemAlert[] = [
    {
      id: 1,
      timestamp: 'May 20, 2025 - 14:30',
      ipAddress: '192.168.1.45',
      shop: 'Sakura Sushi Tokyo',
      shopContact: '+1 (555) 123-4567',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C001'
    },
    {
      id: 2,
      timestamp: 'May 20, 2025 - 13:15',
      ipAddress: '192.168.3.78',
      shop: 'Milano Pasta House',
      shopContact: '+1 (555) 987-6543',
      reason: 'User went off-topic during the call',
      status: 'Pending Review',
      conversationId: 'C002'
    },
    {
      id: 3,
      timestamp: 'May 19, 2025 - 18:45',
      ipAddress: '192.168.5.12',
      shop: 'Paris Bistro',
      shopContact: '+1 (555) 456-7890',
      reason: 'User hung up the phone',
      status: 'Blocked',
      conversationId: 'C003'
    },
    {
      id: 4,
      timestamp: 'May 19, 2025 - 15:22',
      ipAddress: '192.168.9.33',
      shop: 'New York Steakhouse',
      shopContact: '+1 (555) 321-6547',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C004'
    },
    {
      id: 5,
      timestamp: 'May 18, 2025 - 09:10',
      ipAddress: '192.168.2.55',
      shop: 'Tokyo Ramen',
      shopContact: '+1 (555) 789-0123',
      reason: 'User hung up the phone',
      status: 'Reviewed',
      conversationId: 'C005'
    },
  ];

  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => {
    navigate('/admin/system-alerts');
  };

  // Format current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Overview of system activity, performance, and reservation trends."
        date={currentDate}
      />

      {/* KPI Cards Section */}
      <KpiCards kpiData={kpiData} />

      {/* Recent Shops Section */}
      <RecentShops shops={recentShops} />

      {/* Recent Suspicious Activities Section */}
      <RecentAlerts 
        alerts={recentAlerts} 
        onToggleBlock={handleToggleBlock} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
