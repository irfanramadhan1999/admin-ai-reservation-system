
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Zap, MessageCircleX, CheckCircle, XCircle, FileText } from 'lucide-react';

const ViewConversationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample conversation data
  const conversation = {
    id,
    customerName: "John Smith",
    ipAddress: "192.168.1.45",
    shop: "Sakura Sushi",
    date: "May 20, 2025",
    startTime: "14:32",
    endTime: "14:45",
    duration: "13 minutes",
    tokensUsed: 2425,
    score: 1,
    messages: [], // Empty array to simulate no messages
    specialRequests: [
      "Vegetarian options for 2 guests",
      "High chair needed for toddler",
      "Quiet table requested - celebrating anniversary"
    ]
  };

  const handleBack = () => {
    navigate('/admin/conversations');
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
            Back to Conversations
          </Button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{conversation.ipAddress}</h1>
                <div className="flex items-center gap-2">
                  {conversation.score === 1 ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <Badge
                    variant="outline"
                    className={`${
                      conversation.score === 1
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                        : "border-red-200 bg-red-50 text-red-700 hover:bg-red-50"
                    } font-medium`}
                  >
                    {conversation.score === 1 ? "Success" : "Failed"}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {conversation.date} • {conversation.shop}
              </p>
            </div>
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
              {conversation.messages.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No duration data available</p>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-semibold">{conversation.duration}</p>
                  <p className="text-sm text-muted-foreground">
                    {conversation.startTime} - {conversation.endTime} JST
                  </p>
                </>
              )}
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
              {conversation.messages.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No token usage data available</p>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-semibold">{conversation.tokensUsed.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    Total tokens used in this conversation
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Special Requests Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Special Requests Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {conversation.specialRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No special requests were made during this conversation.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversation.specialRequests.map((request, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm text-foreground">{request}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Conversation messages */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation History</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            {conversation.messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <MessageCircleX className="h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">No conversation history</h3>
                    <p className="text-muted-foreground">
                      No messages have been exchanged in this conversation yet.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ViewConversationDetail;
