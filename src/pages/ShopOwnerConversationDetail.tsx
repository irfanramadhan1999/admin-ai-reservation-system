
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, User, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShopOwnerConversationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock conversation data - in real app, this would be fetched based on booking ID
  const conversation = {
    id: id,
    customerName: 'Tanaka Yuki',
    customerPhone: '+81 90-1234-5678',
    date: '2025-05-19',
    time: '18:30 - 19:30',
    guests: 3,
    tables: ['Window Seat', 'Regular 1'],
    status: 'confirmed',
    messages: [
      {
        id: 1,
        sender: 'customer',
        message: 'Hi, I would like to make a reservation for 3 people tonight at 6:30 PM.',
        timestamp: '2025-05-19T15:30:00'
      },
      {
        id: 2,
        sender: 'ai',
        message: 'Hello! I\'d be happy to help you with your reservation. Let me check availability for 3 people at 6:30 PM tonight.',
        timestamp: '2025-05-19T15:30:15'
      },
      {
        id: 3,
        sender: 'ai',
        message: 'Great news! I have availability for 3 people at 6:30 PM. I can offer you a window seat and a regular table. Would that work for you?',
        timestamp: '2025-05-19T15:30:30'
      },
      {
        id: 4,
        sender: 'customer',
        message: 'Perfect! That sounds great. It\'s actually for a birthday celebration.',
        timestamp: '2025-05-19T15:31:00'
      },
      {
        id: 5,
        sender: 'ai',
        message: 'Wonderful! I\'ve noted that this is for a birthday celebration. Your reservation is confirmed for tonight at 6:30 PM for 3 people. We look forward to celebrating with you!',
        timestamp: '2025-05-19T15:31:30'
      }
    ]
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/shop-admin/conversations')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Conversations
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Conversation Details</h1>
            <p className="text-muted-foreground">Booking ID: {id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation Messages */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Conversation</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        message.sender === 'customer'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{conversation.customerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conversation.customerPhone}</span>
                </div>
              </div>
            </Card>

            {/* Booking Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conversation.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conversation.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conversation.guests} guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {conversation.tables.map((table, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {table}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className="bg-green-500">
                    {conversation.status === 'confirmed' ? 'Reserved' : conversation.status}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerConversationDetail;
