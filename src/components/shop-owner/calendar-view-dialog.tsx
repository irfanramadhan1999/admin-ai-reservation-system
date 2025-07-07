
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { Clock, Users, MapPin } from 'lucide-react';

interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  tables: string[];
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface CalendarViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookings: Booking[];
}

export function CalendarViewDialog({ open, onOpenChange, bookings }: CalendarViewDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get bookings for selected date
  const getBookingsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return bookings.filter(booking => 
      isSameDay(new Date(booking.startTime), date)
    );
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  // Get dates that have bookings
  const getDatesWithBookings = () => {
    const dates = new Set<string>();
    bookings.forEach(booking => {
      const bookingDate = new Date(booking.startTime);
      dates.add(format(bookingDate, 'yyyy-MM-dd'));
    });
    return Array.from(dates).map(dateStr => new Date(dateStr));
  };

  const datesWithBookings = getDatesWithBookings();

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Calendar View</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Calendar */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasBookings: datesWithBookings
              }}
              modifiersClassNames={{
                hasBookings: "bg-blue-100 text-blue-900 font-medium"
              }}
            />
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 rounded border"></div>
                <span>Days with bookings</span>
              </div>
            </div>
          </div>

          {/* Bookings for selected date */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">
                Reservations for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedDateBookings.length} reservation(s) found
              </p>
            </div>

            {selectedDateBookings.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No reservations for this date</p>
              </Card>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedDateBookings
                  .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                  .map((booking) => (
                    <Card key={booking.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{booking.customerName}</h4>
                          <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                        </div>
                        <Badge className={getBookingStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(booking.startTime), 'HH:mm')} - {format(new Date(booking.endTime), 'HH:mm')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.guests} guest(s)</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.tables.join(', ')}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
