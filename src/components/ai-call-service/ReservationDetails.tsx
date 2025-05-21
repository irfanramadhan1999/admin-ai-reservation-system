
import React from 'react';
import { Calendar, Trash, Users, Clock, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ReservationDetailsProps {
  reservationDetails: {
    id: string;
    customerName: string;
    date: Date;
    timeStart: string;
    timeEnd: string;
    tableType: string;
    guests: number;
  } | null;
  onCancel: () => void;
}

export const ReservationDetails: React.FC<ReservationDetailsProps> = ({ 
  reservationDetails, 
  onCancel 
}) => {
  if (!reservationDetails) return null;

  return (
    <Card className="w-full animate-fade-in border-0 shadow-lg overflow-hidden rounded-2xl">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h3 className="text-xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Reservation Details
        </h3>
      </div>
      <CardContent className="p-6">
        <div className="space-y-0">
          {/* Booking ID */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Booking ID</span>
            <span className="font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{reservationDetails.id}</span>
          </div>
          
          {/* Customer */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Customer</span>
            <span className="font-semibold group-hover:text-blue-600 transition-colors flex items-center">
              <Users className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {reservationDetails.customerName}
            </span>
          </div>
          
          {/* Date */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Date</span>
            <span className="font-semibold group-hover:text-blue-600 transition-colors flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {format(reservationDetails.date, 'MMM d, yyyy')}
            </span>
          </div>
          
          {/* Time */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Time</span>
            <span className="font-semibold group-hover:text-blue-600 transition-colors flex items-center">
              <Clock className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {reservationDetails.timeStart} - {reservationDetails.timeEnd}
            </span>
          </div>
          
          {/* Table */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Table</span>
            <span className="font-semibold group-hover:text-blue-600 transition-colors flex items-center">
              <Utensils className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {reservationDetails.tableType}
            </span>
          </div>
          
          {/* Guests */}
          <div className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className="text-sm text-muted-foreground font-medium">Guests</span>
            <span className="font-semibold group-hover:text-blue-600 transition-colors flex items-center">
              <Users className="h-4 w-4 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {reservationDetails.guests} {reservationDetails.guests === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>
        
        {/* Cancel button only */}
        <div className="flex justify-center mt-6">
          <Button 
            variant="destructive" 
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-colors shadow-sm hover:shadow-md"
            onClick={onCancel}
          >
            <Trash className="mr-2 h-4 w-4" /> Cancel Reservation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
