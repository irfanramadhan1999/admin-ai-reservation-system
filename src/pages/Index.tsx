
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { ReservationTrend } from '@/components/dashboard/reservation-trend';
import { LatestReservations } from '@/components/dashboard/latest-reservations';
import { SeatAvailability } from '@/components/dashboard/seat-availability';
import { Calendar, Phone, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Wednesday, May 15, 2025
        </div>
      </div>

      {/* Top Section - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Reservations Today"
          value="24"
          description="↑ 12% from yesterday"
          icon={<Calendar className="h-5 w-5 text-white" />}
          iconClassName="bg-blue-500"
        />
        <StatCard
          title="AI Answer Rate"
          value="92%"
          description="↑ 8% from last week"
          icon={<MessageSquare className="h-5 w-5 text-white" />}
          iconClassName="bg-purple-400"
        />
        <StatCard
          title="Manual Calls Handled"
          value="3"
          description="↓ 40% from yesterday"
          icon={<Phone className="h-5 w-5 text-white" />}
          iconClassName="bg-emerald-400"
        />
      </div>

      {/* Middle Section - Chart */}
      <div className="mb-8">
        <ReservationTrend />
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LatestReservations />
        <SeatAvailability />
      </div>
    </DashboardLayout>
  );
};

export default Index;
