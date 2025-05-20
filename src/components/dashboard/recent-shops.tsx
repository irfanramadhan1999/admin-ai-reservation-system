
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Shop {
  id: string;
  name: string;
  contact: string;
  tokenUsage: {
    used: number;
    limit: number;
  };
  totalBookings: number;
  createdAt: string;
  isActive: boolean;
  frontendUrl: string;
}

interface RecentShopsProps {
  shops: Shop[];
}

export function RecentShops({ shops }: RecentShopsProps) {
  const navigate = useNavigate();
  
  const handleViewBookings = (shopId: string) => {
    navigate('/admin/bookings');
  };
  
  // Format date and time with JST timezone
  const formatDateTimeJST = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return `${date.toLocaleDateString('en-US', options)} JST`;
  };
  
  return (
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
            {shops.map((shop) => (
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
                <TableCell>{formatDateTimeJST(shop.createdAt)}</TableCell>
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
  );
}
