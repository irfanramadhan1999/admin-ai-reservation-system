
import React from 'react';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarX } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  tables: string[];
  guests: number;
  status: string;
}

interface RecentBookingsTableProps {
  bookings: Booking[];
}

export function RecentBookingsTable({ bookings }: RecentBookingsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatTimeRange = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    
    return `${formatDate(startTime, 'h:mm a')} - ${formatDate(endTime, 'h:mm a')}`;
  };

  return (
    <Card className="p-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Table(s)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <CalendarX className="h-12 w-12 text-muted-foreground" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">No bookings today</h3>
                      <p className="text-muted-foreground">
                        There are no bookings scheduled for today.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                  </TableCell>
                  <TableCell>{formatTimeRange(booking.startTime, booking.endTime)}</TableCell>
                  <TableCell>{booking.tables.join(', ')}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
