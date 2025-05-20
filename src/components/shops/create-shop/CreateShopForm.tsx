
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { BasicInfoForm } from './BasicInfoForm';
import { LocationForm } from './LocationForm';
import { OwnerCredentialsForm } from './OwnerCredentialsForm';
import { AdditionalInfoForm } from './AdditionalInfoForm';
import { OpeningHoursForm } from './OpeningHoursForm';
import { ShopSettingsForm } from './ShopSettingsForm';

export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  cuisine: string;
  priceRange: string;
  capacity: string;
  defaultLanguage: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerConfirmPassword: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
}

interface CreateShopFormProps {
  isEditing: boolean;
  formData: ShopFormData;
  shopActive: boolean;
  aiAssistantEnabled: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleHoursChange: (day: string, field: 'open' | 'close', value: string) => void;
  handleDayClosed: (day: string, closed: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setShopActive: (active: boolean) => void;
  setAiAssistantEnabled: (enabled: boolean) => void;
}

export const CreateShopForm = ({
  isEditing,
  formData,
  shopActive,
  aiAssistantEnabled,
  handleInputChange,
  handleSelectChange,
  handleHoursChange,
  handleDayClosed,
  handleSubmit,
  setShopActive,
  setAiAssistantEnabled
}: CreateShopFormProps) => {
  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Information</TabsTrigger>
        <TabsTrigger value="hours">Opening Hours</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <form onSubmit={handleSubmit}>
        <TabsContent value="basic">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <BasicInfoForm
                  formData={formData}
                  shopActive={shopActive}
                  aiAssistantEnabled={aiAssistantEnabled}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  setShopActive={setShopActive}
                  setAiAssistantEnabled={setAiAssistantEnabled}
                />
              </div>
              
              <div>
                <LocationForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 mt-6">
            <OwnerCredentialsForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </Card>
          
          <Card className="p-6 mt-6">
            <AdditionalInfoForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="hours">
          <Card className="p-6">
            <OpeningHoursForm
              openingHours={formData.openingHours}
              handleHoursChange={handleHoursChange}
              handleDayClosed={handleDayClosed}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="p-6">
            <ShopSettingsForm />
          </Card>
        </TabsContent>
        
        <div className="mt-6 flex justify-end">
          <Button type="submit" size="lg">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Shop' : 'Create Shop'}
          </Button>
        </div>
      </form>
    </Tabs>
  );
};
