
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimeSectionProps {
  startTime: string;
  endTime: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimeSection: React.FC<TimeSectionProps> = ({
  startTime,
  endTime,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          name="startTime"
          type="time"
          value={startTime}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          name="endTime"
          type="time"
          value={endTime}
          onChange={onInputChange}
          required
        />
      </div>
    </div>
  );
};
