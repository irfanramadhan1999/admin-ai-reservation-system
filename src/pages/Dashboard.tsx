
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentShops } from '@/components/dashboard/recent-shops';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { mockRecentShops, mockSystemAlerts } from '@/mocks/dashboard-data';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: string) => {
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
      <DashboardStats />

      {/* Recent Shops Section */}
      <RecentShops shops={mockRecentShops} />

      {/* Recent Suspicious Activities Section */}
      <RecentAlerts 
        alerts={mockSystemAlerts} 
        onToggleBlock={handleToggleBlock} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
