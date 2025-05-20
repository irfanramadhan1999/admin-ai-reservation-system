
import React from 'react';
import { Link } from 'react-router-dom';
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
  id: number;
  name: string;
  address: string;
  tables: number;
  bookings: number;
}

interface RecentShopsTableProps {
  shops: Shop[];
  onViewBookings: (shopId: number) => void;
}

export function RecentShopsTable({ shops, onViewBookings }: RecentShopsTableProps) {
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
            {shops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium">{shop.name}</TableCell>
                <TableCell>{shop.address}</TableCell>
                <TableCell className="text-center">{shop.tables}</TableCell>
                <TableCell className="text-center">{shop.bookings}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewBookings(shop.id)}
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
