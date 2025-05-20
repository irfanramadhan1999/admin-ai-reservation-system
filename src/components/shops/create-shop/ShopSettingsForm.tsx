
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const ShopSettingsForm = () => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Shop Settings</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Booking Settings</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPartySize">Maximum Party Size</Label>
              <Input id="maxPartySize" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minAdvanceBooking">Minimum Advance Booking (hours)</Label>
              <Input id="minAdvanceBooking" type="number" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAdvanceBooking">Maximum Advance Booking (days)</Label>
              <Input id="maxAdvanceBooking" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultStayDuration">Default Stay Duration (minutes)</Label>
              <Input id="defaultStayDuration" type="number" defaultValue="90" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>API Integration</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" defaultValue="sk_live_example123456789" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input id="webhookUrl" defaultValue="https://example.com/webhook" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
