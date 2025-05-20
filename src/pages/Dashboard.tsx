
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  Store, 
  CalendarDays, 
  Zap, 
  Activity,
  ArrowRight,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const recentAlerts = [
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

  const handleViewBookings = (shopId: string) => {
    navigate('/admin/bookings');
  };

  const handleViewConversation = (conversationId: string) => {
    navigate(`/admin/bookings/conversation/${conversationId}`);
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
      <Card className="p-6 bg-white mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Shops</h2>
          <Link 
            to="/admin/shops" 
            className="text-sm flex items-center text-blue-500 hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Information</TableHead>
                <TableHead>Token Usage</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{shop.name}</span>
                      <span className="text-sm text-muted-foreground">{shop.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{shop.tokenUsage.used.toLocaleString()} / {shop.tokenUsage.limit.toLocaleString()}</span>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${shop.tokenUsage.used / shop.tokenUsage.limit > 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${(shop.tokenUsage.used / shop.tokenUsage.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shop.totalBookings}</TableCell>
                  <TableCell>{new Date(shop.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
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

      {/* Recent Suspicious Activities Section */}
      <Card className="p-6 bg-white mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Suspicious Activities</h2>
          <Link 
            to="/admin/system-alerts" 
            className="text-sm flex items-center text-blue-500 hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="text-sm">{alert.timestamp}</TableCell>
                  <TableCell className="font-mono text-sm">{alert.ipAddress}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{alert.shop}</span>
                      <span className="text-sm text-muted-foreground">{alert.shopContact}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">{alert.reason}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                      onClick={() => alert.conversationId && handleViewConversation(alert.conversationId)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      View
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
