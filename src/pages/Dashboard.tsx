
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Store, 
  CalendarDays, 
  Zap, 
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

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

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of system activity, performance, and reservation trends.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Wednesday, May 15, 2025
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-full ${kpi.iconColor}`}>
                <kpi.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">{kpi.value}</span>
                <span className={`text-xs flex items-center ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Shops Section - Updated with white background */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Shops</h2>
          <Link 
            to="/shops" 
            className="text-sm flex items-center text-blue-500 hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-center">Tables</TableHead>
                <TableHead className="text-center">Bookings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell className="text-center">{shop.tables}</TableCell>
                  <TableCell className="text-center">{shop.bookings}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewBookings(shop.id)}
                    >
                      View Booking
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
