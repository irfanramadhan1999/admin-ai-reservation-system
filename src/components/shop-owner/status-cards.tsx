
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Calendar, Users, Bot, Globe } from 'lucide-react';

interface StatusCardsProps {
  bookingsCount: string;
  customersCount: string;
  isAiActive: boolean;
  isCalendarSynced: boolean;
  isGuranaviSynced: boolean;
  isHotpepperSynced: boolean;
  lastAiCall?: string;
  lastCalendarSync?: string;
  lastGuranaviSync?: string;
  lastHotpepperSync?: string;
  onAiToggle: (value: boolean) => void;
  onCalendarSync: () => void;
  onGuranaviSync: () => void;
  onHotpepperSync: () => void;
}

export function StatusCards({
  bookingsCount,
  customersCount,
  isAiActive,
  isCalendarSynced,
  isGuranaviSynced,
  isHotpepperSynced,
  lastAiCall,
  lastCalendarSync,
  lastGuranaviSync,
  lastHotpepperSync,
  onAiToggle,
  onCalendarSync,
  onGuranaviSync,
  onHotpepperSync,
}: StatusCardsProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 mb-8">
      {/* Dashboard Overview Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          {/* Today's Bookings */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Today's Bookings</h3>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-semibold">{bookingsCount}</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </Card>

          {/* Today's Customers */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Today's Customers</h3>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-semibold">{customersCount}</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-purple-50">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </Card>

          {/* AI Activation */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">AI Activation</h3>
                <div className="flex items-center gap-3 mt-2">
                  <Switch 
                    checked={isAiActive} 
                    onCheckedChange={onAiToggle} 
                    className="data-[state=checked]:bg-green-500"
                  />
                  <span className="text-xs">
                    {isAiActive ? "Active" : "Off"}
                  </span>
                </div>
                {lastAiCall && (
                  <p className="text-xs text-muted-foreground mt-1">Last call: {lastAiCall}</p>
                )}
              </div>
              <div className="p-2 rounded-full bg-emerald-50">
                <Bot className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </Card>

          {/* Row 2 */}
          {/* Google Calendar */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Google Calendar</h3>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={onCalendarSync}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                      isCalendarSynced
                        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        : 'bg-blue-500 text-primary-foreground hover:bg-blue-600'
                    }`}
                  >
                    {isCalendarSynced ? 'Disconnect' : 'Sync'}
                  </button>
                </div>
                {isCalendarSynced && (
                  <p className="text-xs text-muted-foreground mt-1">Last sync: {lastCalendarSync || "1 day ago"}</p>
                )}
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </Card>

          {/* Gurunavi */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Gurunavi</h3>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={onGuranaviSync}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                      isGuranaviSynced
                        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        : 'bg-orange-500 text-primary-foreground hover:bg-orange-600'
                    }`}
                  >
                    {isGuranaviSynced ? 'Disconnect' : 'Sync'}
                  </button>
                </div>
                {isGuranaviSynced && (
                  <p className="text-xs text-muted-foreground mt-1">Last sync: {lastGuranaviSync || "2 hours ago"}</p>
                )}
              </div>
              <div className="p-2 rounded-full bg-orange-50">
                <Globe className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </Card>

          {/* Hotpepper */}
          <Card className="p-6 rounded-2xl shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Hotpepper</h3>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={onHotpepperSync}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                      isHotpepperSynced
                        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        : 'bg-red-500 text-primary-foreground hover:bg-red-600'
                    }`}
                  >
                    {isHotpepperSynced ? 'Disconnect' : 'Sync'}
                  </button>
                </div>
                {isHotpepperSynced && (
                  <p className="text-xs text-muted-foreground mt-1">Last sync: {lastHotpepperSync || "30 minutes ago"}</p>
                )}
              </div>
              <div className="p-2 rounded-full bg-red-50">
                <Globe className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
