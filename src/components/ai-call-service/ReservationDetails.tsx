
import React from 'react';
import { Calendar, Edit, Trash } from 'lucide-react';
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
  onEdit: () => void;
  onCancel: () => void;
}

export const ReservationDetails: React.FC<ReservationDetailsProps> = ({ 
  reservationDetails, 
  onEdit, 
  onCancel 
}) => {
  if (!reservationDetails) return null;

  return (
    <Card className="w-full animate-fade-in border-0 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Reservation Details
        </h3>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Booking ID:</span>
            <span className="font-medium">{reservationDetails.id}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Customer:</span>
            <span className="font-medium">{reservationDetails.customerName}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Date:</span>
            <span className="font-medium">{format(reservationDetails.date, 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Time:</span>
            <span className="font-medium">{reservationDetails.timeStart} - {reservationDetails.timeEnd}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Table:</span>
            <span className="font-medium">{reservationDetails.tableType}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm text-muted-foreground">Guests:</span>
            <span className="font-medium">{reservationDetails.guests}</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-1 border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={onEdit}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="destructive" 
            className="flex-1 transition-colors"
            onClick={onCancel}
          >
            <Trash className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
