
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface OpeningHoursFormProps {
  openingHours: OpeningHours;
  handleHoursChange: (day: string, field: 'open' | 'close', value: string) => void;
  handleDayClosed: (day: string, closed: boolean) => void;
}

export const OpeningHoursForm = ({
  openingHours,
  handleHoursChange,
  handleDayClosed
}: OpeningHoursFormProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Opening Hours</h2>
      <div className="space-y-4">
        {Object.entries(openingHours).map(([day, hours]) => (
          <div key={day} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b pb-4 last:border-b-0">
            <div className="font-medium capitalize md:col-span-3">{day}</div>
            <div className="flex items-center gap-2 md:col-span-3">
              <Switch 
                id={`${day}-closed`} 
                checked={!hours.closed} 
                onCheckedChange={(checked) => handleDayClosed(day, !checked)} 
              />
              <Label htmlFor={`${day}-closed`}>
                {hours.closed ? "Closed" : "Open"}
              </Label>
            </div>
            <div className="md:col-span-3">
              <Label htmlFor={`${day}-open`} className="mb-2 block">Opening Time</Label>
              <Input 
                id={`${day}-open`} 
                type="time" 
                value={hours.open} 
                onChange={(e) => handleHoursChange(day, 'open', e.target.value)} 
                disabled={hours.closed}
                className="w-full"
              />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor={`${day}-close`} className="mb-2 block">Closing Time</Label>
              <Input 
                id={`${day}-close`} 
                type="time" 
                value={hours.close} 
                onChange={(e) => handleHoursChange(day, 'close', e.target.value)} 
                disabled={hours.closed}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
