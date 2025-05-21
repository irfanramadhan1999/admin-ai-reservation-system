
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Mock restaurant data
const restaurantData = {
  name: "Sakura Sushi Tokyo",
  logo: "/placeholder.svg", // Replace with actual logo path
  phone: "+81 90-1234-5678"
};

export const useAiCallService = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'completed'>('idle');
  const [reservationDetails, setReservationDetails] = useState<any>(null);
  const [animatePulse, setAnimatePulse] = useState(false);

  // Enhanced start call functionality with smoother transitions
  const startCall = () => {
    setIsCallActive(true);
    setCallStatus('connecting');
    setAnimatePulse(true);
    
    // Simulate connecting delay with animation
    toast({
      title: "Connecting...",
      description: "Establishing secure connection to AI assistant."
    });
    
    // Simulate connecting delay
    setTimeout(() => {
      setCallStatus('active');
      toast({
        title: "Call Connected",
        description: "AI assistant is now listening to your reservation request.",
        variant: "default",
      });
      
      // Simulate a completed reservation after some time
      setTimeout(() => {
        completeCall();
      }, 5000); // 5 seconds for demo
    }, 2000);
  };

  const endCall = () => {
    if (callStatus === 'active') {
      setIsCallActive(false);
      setCallStatus('idle');
      setAnimatePulse(false);
      setReservationDetails(null);
      toast({
        title: "Call Ended",
        description: "AI call has been disconnected.",
        variant: "default",
      });
    }
  };

  const completeCall = () => {
    setCallStatus('completed');
    // Create mock reservation details
    setReservationDetails({
      id: `B${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: "Tanaka Yuki",
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      timeStart: "19:00",
      timeEnd: "20:30",
      tableType: "Window Seat",
      guests: 2
    });
    
    toast({
      title: "Reservation Created",
      description: "New reservation has been successfully created.",
      variant: "default",
    });
  };

  const handleEditReservation = () => {
    // Navigate to booking edit page with reservation ID
    if (reservationDetails) {
      toast({
        title: "Edit Reservation",
        description: `Editing reservation ${reservationDetails.id}`
      });
      // In a real app, navigate to edit page
      // navigate(`/shop-admin/bookings/edit/${reservationDetails.id}`);
    }
  };

  const handleCancelReservation = () => {
    if (reservationDetails) {
      toast({
        title: "Reservation Cancelled",
        description: `Reservation ${reservationDetails.id} has been cancelled.`
      });
      setReservationDetails(null);
      setCallStatus('idle');
      setAnimatePulse(false);
    }
  };

  // Smooth animation effects
  useEffect(() => {
    if (isCallActive) {
      setAnimatePulse(true);
    } else {
      setAnimatePulse(false);
    }
  }, [isCallActive]);

  return {
    restaurantData,
    isCallActive,
    callStatus,
    reservationDetails,
    animatePulse,
    startCall,
    endCall,
    handleEditReservation,
    handleCancelReservation
  };
};
