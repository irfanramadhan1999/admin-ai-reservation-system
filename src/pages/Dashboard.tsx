
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentShops } from '@/components/dashboard/recent-shops';
import { mockRecentShops } from '@/mocks/dashboard-data';

const Dashboard = () => {
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
    </DashboardLayout>
  );
};

export default Dashboard;
