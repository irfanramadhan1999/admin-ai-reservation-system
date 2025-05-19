
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ShopOwnerKpiCards } from '@/components/shop-owner/shop-owner-kpi-cards';
import { RecentBookingsTable } from '@/components/shop-owner/recent-bookings-table';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Table } from 'lucide-react';

const ShopOwnerDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Today's Bookings",
      value: '8',
      change: '+2',
      trend: 'up' as const,
      description: 'from yesterday',
    },
    {
      title: 'Upcoming Reservations',
      value: '24',
      change: '+5',
      trend: 'up' as const,
      description: 'next 7 days',
    },
    {
      title: 'Table Usage',
      value: '12/20',
      change: '60%',
      trend: 'up' as const,
      description: 'tables reserved today',
    },
    {
      title: 'AI Usage',
      value: '3.4K',
      change: '45%',
      trend: 'down' as const,
      description: 'tokens remaining',
    },
  ];

  // Mock data for recent bookings
  const recentBookings = [
    {
      id: 1,
      customerName: 'John Doe',
      customerPhone: '+81 90-1234-5678',
      startTime: '2025-05-19T18:00:00',
      endTime: '2025-05-19T20:00:00',
      tables: ['Table 2', 'Table 3'],
      guests: 6,
      status: 'confirmed',
    },
    {
      id: 2,
      customerName: 'Yuki Tanaka',
      customerPhone: '+81 80-9876-5432',
      startTime: '2025-05-19T19:30:00',
      endTime: '2025-05-19T21:30:00',
      tables: ['Table 8'],
      guests: 4,
      status: 'pending',
    },
    {
      id: 3,
      customerName: 'Emily Wong',
      customerPhone: '+81 70-5555-4444',
      startTime: '2025-05-20T12:00:00',
      endTime: '2025-05-20T13:30:00',
      tables: ['Table 5'],
      guests: 2,
      status: 'confirmed',
    },
    {
      id: 4,
      customerName: 'Takashi Mori',
      customerPhone: '+81 90-3333-2222',
      startTime: '2025-05-20T18:30:00',
      endTime: '2025-05-20T20:30:00',
      tables: ['Table 1'],
      guests: 3,
      status: 'confirmed',
    },
    {
      id: 5,
      customerName: 'Lisa Chen',
      customerPhone: '+81 80-7777-8888',
      startTime: '2025-05-20T19:00:00',
      endTime: '2025-05-20T21:00:00',
      tables: ['Table 10', 'Table 11'],
      guests: 8,
      status: 'cancelled',
    },
  ];

  // Format current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleViewAllBookings = () => navigate('/shop-owner/bookings');
  const handleManageTables = () => navigate('/shop-owner/tables');
  const handleEditProfile = () => navigate('/shop-owner/profile');

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Overview of your restaurant activity"
        date={currentDate}
      />

      {/* KPI Cards Section */}
      <ShopOwnerKpiCards kpiData={kpiData} />

      {/* Recent Bookings Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleManageTables}
              className="flex gap-2"
            >
              <Table className="h-4 w-4" />
              Manage Tables
            </Button>
            <Button 
              variant="outline" 
              onClick={handleEditProfile}
              className="flex gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button 
              onClick={handleViewAllBookings}
              className="flex gap-2"
            >
              <Calendar className="h-4 w-4" />
              View All Bookings
            </Button>
          </div>
        </div>
        <RecentBookingsTable bookings={recentBookings} />
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerDashboard;
