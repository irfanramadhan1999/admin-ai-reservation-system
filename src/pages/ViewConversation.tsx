
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Bot } from 'lucide-react';
import { format } from 'date-fns';

// Sample conversation data - in a real app this would come from an API
const sampleConversation = [
  {
    id: "1",
    sender: "ai",
    message: "Thank you for calling Sakura Sushi Tokyo. This is the AI assistant speaking. How may I help you today?",
    timestamp: new Date("2025-05-15T10:42:00"),
  },
  {
    id: "2",
    sender: "customer",
    message: "Hi, I'd like to make a reservation for tonight.",
    timestamp: new Date("2025-05-15T10:42:15"),
  },
  {
    id: "3",
    sender: "ai",
    message: "I'd be happy to help you with that. For how many people would you like to make the reservation?",
    timestamp: new Date("2025-05-15T10:42:30"),
  },
  {
    id: "4",
    sender: "customer",
    message: "We'll be 4 people.",
    timestamp: new Date("2025-05-15T10:42:45"),
  },
  {
    id: "5",
    sender: "ai",
    message: "Great! And what time would you prefer for your reservation tonight?",
    timestamp: new Date("2025-05-15T10:43:00"),
  },
  {
    id: "6",
    sender: "customer",
    message: "Around 7:30 PM if possible.",
    timestamp: new Date("2025-05-15T10:43:15"),
  },
  {
    id: "7",
    sender: "ai",
    message: "Let me check our availability for tonight at 7:30 PM for 4 people. We have a couple of window seats available at that time. Would you prefer window seating?",
    timestamp: new Date("2025-05-15T10:43:30"),
  },
  {
    id: "8",
    sender: "customer",
    message: "Yes, window seating would be perfect.",
    timestamp: new Date("2025-05-15T10:43:45"),
  },
  {
    id: "9",
    sender: "ai",
    message: "Excellent. I've reserved window seats for 4 people tonight at 7:30 PM. May I have your name for the reservation?",
    timestamp: new Date("2025-05-15T10:44:00"),
  },
  {
    id: "10",
    sender: "customer",
    message: "It's John Smith.",
    timestamp: new Date("2025-05-15T10:44:15"),
  },
  {
    id: "11",
    sender: "ai",
    message: "Thank you, Mr. Smith. And could I get a contact number where we can reach you if needed?",
    timestamp: new Date("2025-05-15T10:44:30"),
  },
  {
    id: "12",
    sender: "customer",
    message: "Sure, it's +1 (555) 123-4567.",
    timestamp: new Date("2025-05-15T10:44:45"),
  },
  {
    id: "13",
    sender: "ai",
    message: "Perfect. I've confirmed your reservation for 4 people tonight at 7:30 PM with window seating under the name John Smith. You'll receive a text confirmation shortly. Is there anything else you'd like to know about your reservation or our restaurant?",
    timestamp: new Date("2025-05-15T10:45:00"),
  },
  {
    id: "14",
    sender: "customer",
    message: "Do you have parking available?",
    timestamp: new Date("2025-05-15T10:45:15"),
  },
  {
    id: "15",
    sender: "ai",
    message: "Yes, we offer complimentary valet parking for all our dinner guests. The valet stand is right in front of the restaurant entrance. Is there anything else I can assist you with?",
    timestamp: new Date("2025-05-15T10:45:30"),
  },
  {
    id: "16",
    sender: "customer",
    message: "No, that's all. Thank you!",
    timestamp: new Date("2025-05-15T10:45:45"),
  },
  {
    id: "17",
    sender: "ai",
    message: "You're welcome, Mr. Smith. We look forward to serving you and your party tonight at Sakura Sushi Tokyo. Have a wonderful day!",
    timestamp: new Date("2025-05-15T10:46:00"),
  }
];

// Sample booking data - in a real app, this would be fetched based on the ID
const bookingDetails = {
  id: "1",
  customerName: "John Smith",
  customerPhone: "+1 (555) 123-4567",
  date: new Date("2025-05-15"),
  timeStart: "19:30",
  timeEnd: "21:00",
  shopName: "Sakura Sushi Tokyo",
  tables: [
    { type: "Window Seat", number: 1 },
    { type: "Window Seat", number: 2 }
  ],
  guests: 4,
  status: "confirmed"
};

const ViewConversation = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [booking, setBooking] = useState(bookingDetails);
  const [conversation, setConversation] = useState(sampleConversation);
  
  useEffect(() => {
    // In a real app, we would fetch the booking and conversation data based on the ID
    console.log(`Fetching conversation for booking ID: ${id}`);
    // For now, we'll use the sample data
  }, [id]);
  
  const formatTime = (date: Date) => {
    return format(date, 'h:mm a');
  };
  
  const handleBackToBookings = () => {
    navigate('/bookings');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Back button and Header Section */}
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            className="w-fit text-muted-foreground gap-1" 
            onClick={handleBackToBookings}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Bookings
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold">Conversation History</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Transcript of the AI-customer interaction during the reservation call.
            </p>
          </div>
        </div>
        
        {/* Booking Summary Card */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-medium">{booking.customerName}</h3>
              <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
            </div>
            <div className="text-sm">
              <p>Reservation: {format(booking.date, 'MMMM d, yyyy')}</p>
              <p>Time: {booking.timeStart} - {booking.timeEnd}</p>
            </div>
            <div className="text-sm font-medium">
              {booking.shopName}
            </div>
          </div>
        </Card>
        
        {/* Conversation Transcript */}
        <Card className="p-4 bg-gray-50 dark:bg-gray-900">
          <ScrollArea className="h-[500px] pr-4">
            <div className="flex flex-col gap-y-4">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.sender === 'customer' ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`flex ${
                      message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'
                    } items-center gap-2 mb-1`}
                  >
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    <span className="text-sm font-medium">
                      {message.sender === 'customer' ? booking.customerName : 'AI Assistant'}
                    </span>
                    <Avatar className={`h-6 w-6 ${message.sender === 'customer' ? '' : 'bg-purple-100'}`}>
                      {message.sender === 'customer' ? (
                        <AvatarFallback className="text-xs bg-gray-200">
                          {booking.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      ) : (
                        <>
                          <AvatarFallback className="text-xs bg-purple-100 text-purple-600">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.sender === 'customer'
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                        : 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ViewConversation;
