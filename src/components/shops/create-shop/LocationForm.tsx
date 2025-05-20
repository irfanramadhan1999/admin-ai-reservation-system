
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationFormProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    website: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const LocationForm = ({
  formData,
  handleInputChange,
  handleSelectChange
}: LocationFormProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Location & Contact</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city" 
              value={formData.city} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="state">Prefecture</Label>
            <Input 
              id="state" 
              name="state" 
              value={formData.state} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="zipCode">Postal Code</Label>
            <Input 
              id="zipCode" 
              name="zipCode" 
              value={formData.zipCode} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => handleSelectChange('country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            name="website" 
            value={formData.website} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </div>
  );
};
