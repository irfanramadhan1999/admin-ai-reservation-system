
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, Edit, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

// Mock restaurant data
const restaurantData = {
  name: "Sakura Sushi Tokyo",
  logo: "/placeholder.svg", // Replace with actual logo path
  phone: "+81 90-1234-5678"
};

const AiCallService = () => {
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'completed'>('idle');
  const [reservationDetails, setReservationDetails] = useState<any>(null);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const startCall = () => {
    setIsCallActive(true);
    setCallStatus('connecting');
    
    // Simulate connecting delay
    setTimeout(() => {
      setCallStatus('active');
      toast({
        title: "Call Connected",
        description: "AI assistant is now listening to your reservation request."
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
      setReservationDetails(null);
      toast({
        title: "Call Ended",
        description: "AI call has been disconnected."
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
      description: "New reservation has been successfully created."
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
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="AI Call Service" 
        subtitle="Handle reservations through voice interaction with AI assistant."
        date={currentDate}
      />

      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
        {/* Restaurant Information */}
        <Card className="w-full mb-8">
          <CardContent className="flex items-center space-x-4 pt-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={restaurantData.logo} alt="Restaurant logo" />
              <AvatarFallback>{restaurantData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{restaurantData.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurantData.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Call Interface */}
        <div className="relative w-full aspect-square max-w-md mb-8 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 opacity-70 ${isCallActive ? 'animate-pulse' : ''}`}></div>
          
          <Button 
            variant={isCallActive ? "destructive" : "default"}
            size="lg"
            className="rounded-full h-24 w-24 flex items-center justify-center z-10 shadow-lg"
            onClick={isCallActive ? endCall : startCall}
          >
            {isCallActive ? (
              <MicOff className="h-10 w-10" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </Button>
          
          <span className="absolute bottom-2 text-center font-medium">
            {callStatus === 'idle' && "Start AI Call"}
            {callStatus === 'connecting' && "Connecting..."}
            {callStatus === 'active' && "Listening..."}
            {callStatus === 'completed' && "Call Completed"}
          </span>
        </div>

        {/* Reservation Details */}
        {reservationDetails && (
          <Card className="w-full animate-fade-in">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Booking ID:</span>
                  <span className="font-medium">{reservationDetails.id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Customer:</span>
                  <span className="font-medium">{reservationDetails.customerName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">{format(reservationDetails.date, 'MMM d, yyyy')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="font-medium">{reservationDetails.timeStart} - {reservationDetails.timeEnd}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Table:</span>
                  <span className="font-medium">{reservationDetails.tableType}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Guests:</span>
                  <span className="font-medium">{reservationDetails.guests}</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleEditReservation}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={handleCancelReservation}
                >
                  <Trash className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AiCallService;
