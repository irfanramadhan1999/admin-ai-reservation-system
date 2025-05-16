
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  Store, 
  CalendarDays, 
  Zap, 
  Activity,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { RecentShopsTable } from '@/components/dashboard/recent-shops-table';
import { ReservationTrend } from '@/components/dashboard/reservation-trend';
import { SeatAvailability } from '@/components/dashboard/seat-availability';
import { LatestReservations } from '@/components/dashboard/latest-reservations';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Shops',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Store,
      iconColor: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: '321',
      change: '+8%',
      trend: 'up',
      icon: CalendarDays,
      iconColor: 'bg-purple-400',
    },
    {
      title: 'Token Usage',
      value: '15.2K',
      change: '-3%',
      trend: 'down',
      icon: Zap,
      iconColor: 'bg-emerald-400',
    },
    {
      title: 'Suspicious Activities',
      value: '7',
      change: '+40%',
      trend: 'up',
      icon: Activity,
      iconColor: 'bg-red-400',
    },
  ];

  // Mock data for recent shops
  const recentShops = [
    {
      id: 1,
      name: 'Sakura Sushi Tokyo',
      address: '123 Main St, Tokyo',
      tables: 12,
      bookings: 56,
    },
    {
      id: 2,
      name: 'Milano Pasta House',
      address: '456 Park Ave, Milan',
      tables: 8,
      bookings: 42,
    },
    {
      id: 3,
      name: 'Paris Bistro',
      address: '789 Seine St, Paris',
      tables: 15,
      bookings: 78,
    },
    {
      id: 4,
      name: 'New York Steakhouse',
      address: '321 Broadway, New York',
      tables: 10,
      bookings: 31,
    },
  ];

  const handleViewBookings = (shopId: number) => {
    navigate('/bookings');
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
      <RecentShopsTable shops={recentShops} onViewBookings={handleViewBookings} />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReservationTrend />
        </div>
        <div className="space-y-6">
          <SeatAvailability />
          <LatestReservations />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
