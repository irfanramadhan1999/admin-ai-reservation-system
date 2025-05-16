
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Zap } from 'lucide-react';

const ViewConversation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample conversation data
  const conversation = {
    id,
    customerName: "John Smith",
    ipAddress: "192.168.1.45",
    date: "May 15, 2025",
    startTime: "14:32",
    endTime: "14:45",
    duration: "13 minutes",
    tokensUsed: 2425,
    status: "completed",
    messages: [
      {
        role: "system",
        content: "Hello, welcome to Sakura Sushi. How can I help you with your reservation today?",
        time: "14:32"
      },
      {
        role: "user",
        content: "Hi, I'd like to make a reservation for 4 people tonight.",
        time: "14:33"
      },
      {
        role: "system",
        content: "Great! I'd be happy to help you with that. What time would you like to come in?",
        time: "14:33"
      },
      {
        role: "user",
        content: "Around 7:30 PM if possible.",
        time: "14:34"
      },
      {
        role: "system",
        content: "Let me check our availability for 7:30 PM tonight for 4 people... Yes, we do have availability! Would you prefer a window seat or a regular table?",
        time: "14:35"
      },
      {
        role: "user",
        content: "A window seat would be perfect.",
        time: "14:36"
      },
      {
        role: "system",
        content: "Excellent! I've reserved Window Table #3 for 4 people at 7:30 PM tonight. May I have your name for the reservation?",
        time: "14:37"
      },
      {
        role: "user",
        content: "It's John Smith.",
        time: "14:38"
      },
      {
        role: "system",
        content: "Thank you, Mr. Smith. Your reservation is confirmed for tonight at 7:30 PM, Window Table #3 for 4 people. Is there anything else you'd like to add to your reservation, such as any dietary restrictions or special occasions?",
        time: "14:39"
      },
      {
        role: "user",
        content: "One person in our group is vegetarian. Does the restaurant have vegetarian options?",
        time: "14:40"
      },
      {
        role: "system",
        content: "Yes, we have several vegetarian options including vegetable tempura, avocado rolls, cucumber rolls, and vegetable udon. I'll add a note about the vegetarian requirement to your reservation. Anything else I can help with?",
        time: "14:41"
      },
      {
        role: "user",
        content: "That sounds perfect. Thank you!",
        time: "14:42"
      },
      {
        role: "system",
        content: "You're welcome! Your reservation is all set. We look forward to seeing you tonight at 7:30 PM. If you need to make any changes to your reservation, please let us know. Have a great day!",
        time: "14:43"
      }
    ]
  };

  const handleBack = () => {
    navigate('/bookings');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Back button & header */}
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="mb-4 -ml-2 gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Bookings
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Conversation with {conversation.customerName}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {conversation.date} • IP: {conversation.ipAddress}
              </p>
            </div>
            <Badge
              className={
                conversation.status === "completed"
                  ? "bg-emerald-500"
                  : conversation.status === "active"
                  ? "bg-blue-500"
                  : "bg-amber-500"
              }
            >
              {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        {/* Conversation stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Conversation Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{conversation.duration}</p>
              <p className="text-sm text-muted-foreground">
                {conversation.startTime} - {conversation.endTime}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Token Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{conversation.tokensUsed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                Total tokens used in this conversation
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Conversation messages */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation History</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            <div className="space-y-4">
              {conversation.messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">
                        {message.role === 'user' ? 'Customer' : 'AI Assistant'}
                      </span>
                      <span className="text-xs opacity-80">{message.time}</span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ViewConversation;
