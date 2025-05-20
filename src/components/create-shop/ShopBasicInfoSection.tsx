
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShopImageUploader } from './ShopImageUploader';
import { ShopInfoFields } from './ShopInfoFields';
import { ShopStatusToggles } from './ShopStatusToggles';
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
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShopImageUploader 
              shopImage={shopImage} 
              handleShopImageUpload={handleShopImageUpload} 
            />
            
            <div className="md:col-span-2 space-y-4">
              <ShopInfoFields 
                shopName={shopName}
                setShopName={setShopName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                address={address}
                setAddress={setAddress}
                subdomain={subdomain}
                setSubdomain={setSubdomain}
                defaultLanguage={defaultLanguage}
                setDefaultLanguage={setDefaultLanguage}
              />

              <ShopStatusToggles 
                shopActive={shopActive}
                setShopActive={setShopActive}
                aiAssistantEnabled={aiAssistantEnabled}
                setAiAssistantEnabled={setAiAssistantEnabled}
              />
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
