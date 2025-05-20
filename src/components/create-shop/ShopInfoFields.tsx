
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asterisk } from 'lucide-react';

interface ShopInfoFieldsProps {
  shopName: string;
  setShopName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  subdomain: string;
  setSubdomain: (value: string) => void;
  defaultLanguage: string;
  setDefaultLanguage: (value: string) => void;
}

export const ShopInfoFields = ({
  shopName,
  setShopName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  subdomain,
  setSubdomain,
  defaultLanguage,
  setDefaultLanguage
}: ShopInfoFieldsProps) => {
  // Required field indicator
  const RequiredIndicator = () => (
    <Asterisk className="h-3 w-3 inline-block text-red-500 ml-1" />
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="shopName">
            Shop Name <RequiredIndicator />
          </Label>
          <Input
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">
            Phone Number <RequiredIndicator />
          </Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">
          Address <RequiredIndicator />
        </Label>
        <Textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1"
          rows={2}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="defaultLanguage">
            Default Language <RequiredIndicator />
          </Label>
          <Select
            value={defaultLanguage}
            onValueChange={setDefaultLanguage}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="subdomain">
            Subdomain <RequiredIndicator />
          </Label>
          <div className="flex items-center mt-1">
            <Input
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="rounded-r-none"
              placeholder="yourshop"
              required
            />
            <span className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-muted-foreground">
              .reserveai.jp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
