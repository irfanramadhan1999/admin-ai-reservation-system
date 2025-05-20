
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdditionalInfoFormProps {
  formData: {
    priceRange: string;
    capacity: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const AdditionalInfoForm = ({
  formData,
  handleInputChange,
  handleSelectChange
}: AdditionalInfoFormProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Additional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priceRange">Price Range</Label>
          <Select 
            value={formData.priceRange} 
            onValueChange={(value) => handleSelectChange('priceRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget (¥)</SelectItem>
              <SelectItem value="moderate">Moderate (¥¥)</SelectItem>
              <SelectItem value="expensive">Expensive (¥¥¥)</SelectItem>
              <SelectItem value="luxury">Luxury (¥¥¥¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="capacity">Seating Capacity</Label>
          <Input 
            id="capacity" 
            name="capacity" 
            type="number" 
            value={formData.capacity} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </>
  );
};
