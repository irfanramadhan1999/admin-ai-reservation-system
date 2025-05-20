
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Asterisk } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ShopBasicInfoSectionProps {
  shopName: string;
  setShopName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  subdomain: string;
  setSubdomain: (value: string) => void;
  shopImage: string | null;
  handleShopImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ShopBasicInfoSection = ({
  shopName,
  setShopName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  subdomain,
  setSubdomain,
  shopImage,
  handleShopImageUpload
}: ShopBasicInfoSectionProps) => {
  // Required field indicator
  const RequiredIndicator = () => (
    <Asterisk className="h-3 w-3 inline-block text-red-500 ml-1" />
  );
  
  return (
    <Card className="mb-8 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="w-32 h-32">
              {shopImage ? (
                <AvatarImage src={shopImage} alt="Shop" />
              ) : (
                <AvatarFallback className="bg-muted text-muted-foreground text-xl">
                  Shop
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <input
                type="file"
                id="shop-image"
                accept="image/*"
                onChange={handleShopImageUpload}
                className="hidden"
              />
              <label htmlFor="shop-image">
                <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                  Upload Shop Picture
                </Button>
              </label>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
        
        <div className="mt-6">
          <Label htmlFor="address">
            Address <RequiredIndicator />
          </Label>
          <Textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div className="mt-6">
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
          <p className="text-xs text-muted-foreground mt-1">
            Your shop will be accessible at this subdomain.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
