
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  tables: string[];
  guests: number;
  status: string;
  notes: string;
}

interface BookingsTableProps {
  bookings: Booking[];
  onEditBooking?: (booking: Booking) => void;
  onCancelBooking?: (booking: Booking) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onEditBooking,
  onCancelBooking
}) => {
  
  // Format time range for display
  const formatTimeRange = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    
    return `${format(startTime, 'HH:mm')} – ${format(endTime, 'HH:mm')}`;
  };

  // Render appropriate status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'reserved':
        return <Badge className="bg-green-500">Reserved</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'cancelled':
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Tables</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>
                <div className="font-medium">{booking.customerName}</div>
                <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{format(new Date(booking.startTime), 'MMM d, yyyy')}</span>
                  <span className="text-sm">
                    {formatTimeRange(booking.startTime, booking.endTime)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {booking.tables.join(', ')}
              </TableCell>
              <TableCell>
                {getStatusBadge(booking.status)}
              </TableCell>
            </TableRow>
          ))}
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No bookings found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
