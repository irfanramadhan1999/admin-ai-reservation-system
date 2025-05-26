
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, X, MessageSquare } from 'lucide-react';
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
  onViewConversation?: (booking: Booking) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onEditBooking,
  onCancelBooking,
  onViewConversation
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
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
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
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const isCancelled = booking.status.toLowerCase() === 'cancelled' || booking.status.toLowerCase() === 'canceled';
            
            return (
              <TableRow 
                key={booking.id}
                className={isCancelled ? 'bg-red-50' : ''}
              >
                <TableCell className={isCancelled ? 'text-red-600' : ''}>{booking.id}</TableCell>
                <TableCell>
                  <div className={`font-medium ${isCancelled ? 'text-red-600' : ''}`}>{booking.customerName}</div>
                  <div className={`text-xs ${isCancelled ? 'text-red-500' : 'text-muted-foreground'}`}>{booking.customerPhone}</div>
                </TableCell>
                <TableCell className={isCancelled ? 'text-red-600' : ''}>
                  <div className="flex flex-col">
                    <span>{format(new Date(booking.startTime), 'MMM d, yyyy')}</span>
                    <span className="text-sm">
                      {formatTimeRange(booking.startTime, booking.endTime)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={isCancelled ? 'text-red-600' : ''}>
                  {booking.tables.join(', ')}
                </TableCell>
                <TableCell className={isCancelled ? 'text-red-600' : ''}>
                  {booking.guests}
                </TableCell>
                <TableCell>
                  {getStatusBadge(booking.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onViewConversation && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewConversation(booking)}
                        title="View Conversation"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    )}
                    {onEditBooking && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditBooking(booking)}
                        title="Edit Booking"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onCancelBooking && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancelBooking(booking)}
                        title="Cancel Booking"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No bookings found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
