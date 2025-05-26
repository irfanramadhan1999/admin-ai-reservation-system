
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerInfoSectionProps {
  customerName: string;
  customerPhone: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
  customerName,
  customerPhone,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customerPhone">Phone Number</Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          value={customerPhone}
          onChange={onInputChange}
          required
        />
      </div>
    </div>
  );
};
