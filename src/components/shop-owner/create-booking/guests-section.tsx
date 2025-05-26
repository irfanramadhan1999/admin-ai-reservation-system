
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GuestsSectionProps {
  guests: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GuestsSection: React.FC<GuestsSectionProps> = ({
  guests,
  onInputChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="guests">Number of Guests</Label>
      <Input
        id="guests"
        name="guests"
        type="number"
        min="1"
        value={guests}
        onChange={onInputChange}
        required
      />
    </div>
  );
};
