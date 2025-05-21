
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Check, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CalendarSync = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState("1 day ago");

  const handleConnectCalendar = () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setLastSync("1 day ago");
      
      toast({
        title: "Calendar Connected",
        description: "Your Google Calendar has been successfully connected.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    
    toast({
      title: "Calendar Disconnected",
      description: "Your Google Calendar has been disconnected.",
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Google Calendar Sync"
        subtitle="Connect your restaurant calendar with Google Calendar"
        date={new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-50">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="text-xl font-semibold">Google Calendar Integration</h2>
                <p className="text-muted-foreground">
                  Automatically sync your restaurant bookings with Google Calendar. This allows you 
                  to manage all your reservations in one place and receive notifications.
                </p>
                
                <div className="pt-4">
                  {!isConnected ? (
                    <Button 
                      onClick={handleConnectCalendar}
                      disabled={isConnecting}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {isConnecting ? "Connecting..." : "Connect Google Calendar"}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 py-2 px-3 rounded-md">
                        <Check className="h-5 w-5" />
                        <span>Calendar connected successfully</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Last sync: {lastSync}
                      </div>
                      
                      <Button 
                        variant="outline"
                        onClick={handleDisconnect} 
                        className="text-red-500 border-red-300 hover:bg-red-50"
                      >
                        Disconnect Calendar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Calendar Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Synchronization</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  When enabled, all new bookings will automatically be added to your Google Calendar.
                </p>
                <Button
                  variant="outline"
                  className="h-9"
                  disabled={!isConnected}
                >
                  {isConnected ? "Enabled" : "Connect calendar first"}
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Calendar Notifications</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Receive calendar notifications for new and updated bookings.
                </p>
                <Button
                  variant="outline"
                  className="h-9"
                  disabled={!isConnected}
                >
                  {isConnected ? "Enabled" : "Connect calendar first"}
                </Button>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="link" 
                  className="px-0 h-auto text-blue-500"
                  disabled={!isConnected}
                >
                  <Link className="h-4 w-4 mr-1" />
                  View Connected Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarSync;
