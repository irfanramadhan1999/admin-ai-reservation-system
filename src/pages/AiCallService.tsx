
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, Edit, Trash, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [animatePulse, setAnimatePulse] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="AI Call Service" 
        subtitle="Handle reservations through voice interaction with AI assistant."
        date={currentDate}
      />

      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Restaurant Information with enhanced design */}
        <Card className="w-full mb-8 overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
                <AvatarImage src={restaurantData.logo} alt="Restaurant logo" />
                <AvatarFallback className="bg-blue-500 text-white">{restaurantData.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{restaurantData.name}</h3>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground mr-1" />
                  <p className="text-sm text-muted-foreground">{restaurantData.phone}</p>
                </div>
                <Badge variant="outline" className="mt-2">Ready for AI calls</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information alert for first-time users */}
        {callStatus === 'idle' && !reservationDetails && (
          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Click the microphone button below to start a new AI reservation call. Speak clearly when prompted.
            </AlertDescription>
          </Alert>
        )}

        {/* AI Call Interface with enhanced visuals */}
        <div className="relative w-full aspect-square max-w-md mb-8 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${
            callStatus === 'active' 
              ? 'bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200' 
              : 'bg-gradient-to-r from-gray-100 to-blue-100'
          } opacity-70 transition-all duration-500 ${animatePulse ? 'animate-pulse' : ''}`}></div>
          
          <div className={`absolute rounded-full w-3/4 h-3/4 ${
            callStatus === 'active' 
              ? 'bg-gradient-to-r from-blue-100 to-purple-100' 
              : 'bg-gradient-to-r from-gray-50 to-blue-50'
          } opacity-50 transition-all duration-500`}></div>
          
          <Button 
            variant={isCallActive ? "destructive" : "default"}
            size="lg"
            className={`rounded-full h-24 w-24 flex items-center justify-center z-10 shadow-lg transition-transform duration-300 ${isCallActive ? 'hover:bg-red-600' : 'hover:bg-blue-600'} ${
              isCallActive ? '' : 'hover:scale-105'
            }`}
            onClick={isCallActive ? endCall : startCall}
          >
            {isCallActive ? (
              <MicOff className="h-10 w-10" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </Button>
          
          <div className="absolute bottom-2 text-center font-medium bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
            {callStatus === 'idle' && !reservationDetails && "Start AI Call"}
            {callStatus === 'connecting' && "Connecting..."}
            {callStatus === 'active' && (
              <span className="flex items-center">
                <span className="inline-block h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Listening...
              </span>
            )}
            {callStatus === 'completed' && "Call Completed"}
          </div>
        </div>

        {/* Reservation Details with enhanced styles */}
        {reservationDetails && (
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
                  onClick={handleEditReservation}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 transition-colors"
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
