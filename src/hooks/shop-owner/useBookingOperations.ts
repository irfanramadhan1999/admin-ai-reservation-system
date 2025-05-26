
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Booking } from './types';

export const useBookingOperations = (
  bookingData: Booking[],
  setBookingData: React.Dispatch<React.SetStateAction<Booking[]>>
) => {
  const [editBookingOpen, setEditBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  
  const { toast } = useToast();

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditBookingOpen(true);
  };

  const handleCancelBooking = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      // Update the booking status to cancelled
      setBookingData(prevData => 
        prevData.map(booking => 
          booking.id === bookingToCancel.id 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      
      toast({
        title: "Booking Canceled",
        description: "The booking has been successfully canceled."
      });
    }
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };
  
  const handleUpdateBooking = (updatedBooking: Booking) => {
    // Update the booking in the data
    setBookingData(prevData =>
      prevData.map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    
    setEditBookingOpen(false);
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated."
    });
  };

  return {
    editBookingOpen,
    setEditBookingOpen,
    selectedBooking,
    cancelDialogOpen,
    setCancelDialogOpen,
    bookingToCancel,
    handleEditBooking,
    handleCancelBooking,
    confirmCancelBooking,
    handleUpdateBooking
  };
};
