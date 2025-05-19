
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Calendar, Users, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RecentBookingsTable } from '@/components/shop-owner/recent-bookings-table';

const ShopOwnerDashboard = () => {
  const navigate = useNavigate();
  const [isAiActive, setIsAiActive] = useState(true);
  
  // Mock data for KPI cards
  const kpiData = {
    todaysBookings: {
      value: '12',
    },
    todaysCustomers: {
      value: '38',
    }
  };

  // Mock data for today's bookings with the new structure
  const todaysBookings = [
    {
      id: 1,
      customerName: 'Tanaka Yuki',
      customerPhone: '+81 90-1234-5678',
      startTime: '2025-05-19T18:30:00',
      endTime: '2025-05-19T19:30:00',
      tables: ['Window Seat'],
      guests: 2,
      status: 'confirmed',
    },
    {
      id: 2,
      customerName: 'Sato Hiroshi',
      customerPhone: '+81 80-8765-4321',
      startTime: '2025-05-19T19:00:00',
      endTime: '2025-05-19T20:00:00',
      tables: ['Counter'],
      guests: 1,
      status: 'pending',
    },
    {
      id: 3,
      customerName: 'Nakamura Akiko',
      customerPhone: '+81 70-2468-1357',
      startTime: '2025-05-19T20:15:00',
      endTime: '2025-05-19T21:30:00',
      tables: ['Private Room'],
      guests: 4,
      status: 'confirmed',
    },
    {
      id: 4,
      customerName: 'Yamamoto Ken',
      customerPhone: '+81 90-1357-2468',
      startTime: '2025-05-20T12:30:00',
      endTime: '2025-05-20T13:30:00',
      tables: ['Garden View', 'Regular 3'],
      guests: 6,
      status: 'cancelled',
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Daily overview of bookings, customers, and AI assistant status."
        date={new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today's Bookings */}
        <Card className="p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Today's Bookings</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">{kpiData.todaysBookings.value}</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-blue-50">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>

        {/* Today's Customers */}
        <Card className="p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Today's Customers</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">{kpiData.todaysCustomers.value}</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-purple-50">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </Card>

        {/* AI Activation */}
        <Card className="p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">AI Activation</h3>
              <div className="flex items-center gap-3 mt-2">
                <Switch 
                  checked={isAiActive} 
                  onCheckedChange={setIsAiActive} 
                  className="data-[state=checked]:bg-green-500"
                />
                <span className="text-sm">
                  {isAiActive ? "AI Assistant is active" : "AI Assistant is off"}
                </span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-emerald-50">
              <Bot className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Bookings Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Bookings</h2>
        </div>
        
        <RecentBookingsTable bookings={todaysBookings} />
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerDashboard;
