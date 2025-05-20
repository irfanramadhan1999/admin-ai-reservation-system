
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface OwnerCredentialsFormProps {
  formData: {
    ownerEmail: string;
    ownerPassword: string;
    ownerConfirmPassword: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const OwnerCredentialsForm = ({
  formData,
  handleInputChange
}: OwnerCredentialsFormProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Shop Owner Login Credentials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ownerEmail">Email</Label>
          <Input 
            id="ownerEmail" 
            name="ownerEmail" 
            type="email" 
            value={formData.ownerEmail} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerPassword">Password</Label>
          <Input 
            id="ownerPassword" 
            name="ownerPassword" 
            type="password" 
            value={formData.ownerPassword} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ownerConfirmPassword">Confirm Password</Label>
          <Input 
            id="ownerConfirmPassword" 
            name="ownerConfirmPassword" 
            type="password" 
            value={formData.ownerConfirmPassword} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </>
  );
};
