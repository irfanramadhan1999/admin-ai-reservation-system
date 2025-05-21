
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
    <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Shops</h2>
        <Link 
          to="/admin/shops" 
          className="text-sm flex items-center text-green-600 hover:underline font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="rounded-xl border border-gray-100">
        <Table>
          <TableHeader className="bg-gray-50 rounded-t-xl">
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
                    <span className="font-medium text-gray-800">{shop.name}</span>
                    <span className="text-sm text-muted-foreground">{shop.contact}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{shop.tokenUsage.used.toLocaleString()} / {shop.tokenUsage.limit.toLocaleString()}</span>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                      <div 
                        className={`h-2 rounded-full ${shop.tokenUsage.used / shop.tokenUsage.limit > 0.8 ? 'bg-red-400' : 'bg-green-400'}`}
                        style={{ width: `${(shop.tokenUsage.used / shop.tokenUsage.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{shop.totalBookings}</TableCell>
                <TableCell>{formatDateTimeJST(shop.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline" 
                    size="sm"
                    className="rounded-full text-green-600 border-green-200 hover:bg-green-50"
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
