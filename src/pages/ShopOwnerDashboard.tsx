
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Calendar, Users, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

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

  // Mock data for recent bookings
  const recentBookings = [
    {
      id: 1,
      customerName: 'Tanaka Yuki',
      timeSlot: 'Today at 18:30 - 19:30',
      tableType: 'Window Seat',
      status: 'confirmed',
    },
    {
      id: 2,
      customerName: 'Sato Hiroshi',
      timeSlot: 'Today at 19:00 - 20:00',
      tableType: 'Counter',
      status: 'pending',
    },
    {
      id: 3,
      customerName: 'Nakamura Akiko',
      timeSlot: 'Today at 20:15 - 21:30',
      tableType: 'Private Room',
      status: 'confirmed',
    },
    {
      id: 4,
      customerName: 'Yamamoto Ken',
      timeSlot: 'Tomorrow at 12:30 - 13:30',
      tableType: 'Garden View',
      status: 'canceled',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500 hover:bg-red-600">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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

      {/* Recent Bookings Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>
        
        <div className="space-y-4">
          {recentBookings.slice(0, 5).map((booking) => (
            <Card key={booking.id} className="p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{booking.customerName}</h3>
                  <p className="text-sm text-muted-foreground">{booking.timeSlot}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{booking.tableType}</span>
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerDashboard;
