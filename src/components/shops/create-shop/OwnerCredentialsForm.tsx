
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Shop Owner Login Credentials</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ownerEmail">Email</Label>
          <Input 
            id="ownerEmail" 
            name="ownerEmail" 
            type="email" 
            value={formData.ownerEmail} 
            onChange={handleInputChange} 
            required
            placeholder="shop.owner@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerPassword">Password</Label>
          <div className="relative">
            <Input 
              id="ownerPassword" 
              name="ownerPassword" 
              type={showPassword ? "text" : "password"} 
              value={formData.ownerPassword} 
              onChange={handleInputChange}
              required 
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerConfirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input 
              id="ownerConfirmPassword" 
              name="ownerConfirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              value={formData.ownerConfirmPassword} 
              onChange={handleInputChange} 
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {formData.ownerPassword !== formData.ownerConfirmPassword && formData.ownerConfirmPassword && (
            <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>
      </div>
    </>
  );
};
