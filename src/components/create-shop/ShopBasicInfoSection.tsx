
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Asterisk } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { OwnerCredentialsForm } from '@/components/shops/create-shop/OwnerCredentialsForm';

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
  defaultLanguage: string;
  setDefaultLanguage: (value: string) => void;
  shopActive: boolean;
  setShopActive: (value: boolean) => void;
  aiAssistantEnabled: boolean;
  setAiAssistantEnabled: (value: boolean) => void;
  ownerEmail: string;
  ownerPassword: string;
  ownerConfirmPassword: string;
  handleOwnerCredentialChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleShopImageUpload,
  defaultLanguage,
  setDefaultLanguage,
  shopActive,
  setShopActive,
  aiAssistantEnabled,
  setAiAssistantEnabled,
  ownerEmail,
  ownerPassword,
  ownerConfirmPassword,
  handleOwnerCredentialChange
}: ShopBasicInfoSectionProps) => {
  // Required field indicator
  const RequiredIndicator = () => (
    <Asterisk className="h-3 w-3 inline-block text-red-500 ml-1" />
  );
  
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            
            <div className="md:col-span-2 space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <h3 className="font-medium">Shop Status</h3>
                    <p className="text-xs text-muted-foreground">Enable or disable this shop</p>
                  </div>
                  <Switch 
                    checked={shopActive}
                    onCheckedChange={setShopActive}
                  />
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <h3 className="font-medium">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Enable booking AI</p>
                  </div>
                  <Switch 
                    checked={aiAssistantEnabled}
                    onCheckedChange={setAiAssistantEnabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <OwnerCredentialsForm
            formData={{
              ownerEmail,
              ownerPassword,
              ownerConfirmPassword
            }}
            handleInputChange={handleOwnerCredentialChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
