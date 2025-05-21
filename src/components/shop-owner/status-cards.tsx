
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Calendar, Users, Bot } from 'lucide-react';

interface StatusCardsProps {
  bookingsCount: string;
  customersCount: string;
  isAiActive: boolean;
  isCalendarSynced: boolean;
  lastAiCall?: string;
  lastCalendarSync?: string;
  onAiToggle: (value: boolean) => void;
}

export function StatusCards({
  bookingsCount,
  customersCount,
  isAiActive,
  isCalendarSynced,
  lastAiCall,
  lastCalendarSync,
  onAiToggle,
}: StatusCardsProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <span className="text-sm">
                {isAiActive ? "AI Assistant is active" : "AI Assistant is off"}
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

      {/* Google Calendar Notice */}
      <Card className="p-6 rounded-2xl shadow-sm relative">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Google Calendar</h3>
            <div className="flex items-center gap-3 mt-2">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  isCalendarSynced
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isCalendarSynced ? 'Calendar Connected' : 'Sync with Google Calendar'}
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
    </div>
  );
}
