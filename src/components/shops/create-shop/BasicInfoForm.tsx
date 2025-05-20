
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface BasicInfoFormProps {
  formData: {
    name: string;
    description: string;
    cuisine: string;
    defaultLanguage: string;
  };
  shopActive: boolean;
  aiAssistantEnabled: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setShopActive: (active: boolean) => void;
  setAiAssistantEnabled: (enabled: boolean) => void;
}

export const BasicInfoForm = ({
  formData,
  shopActive,
  aiAssistantEnabled,
  handleInputChange,
  handleSelectChange,
  setShopActive,
  setAiAssistantEnabled
}: BasicInfoFormProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Basic Information</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">Shop Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="cuisine">Cuisine Type</Label>
          <Select 
            value={formData.cuisine} 
            onValueChange={(value) => handleSelectChange('cuisine', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="thai">Thai</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="american">American</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            rows={3} 
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="defaultLanguage">Default Language</Label>
          <Select 
            value={formData.defaultLanguage} 
            onValueChange={(value) => handleSelectChange('defaultLanguage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">Shop Status</h3>
            <p className="text-sm text-muted-foreground">Enable or disable this shop</p>
          </div>
          <Switch 
            checked={shopActive}
            onCheckedChange={setShopActive}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Enable or disable AI booking assistant</p>
          </div>
          <Switch 
            checked={aiAssistantEnabled}
            onCheckedChange={setAiAssistantEnabled}
          />
        </div>
      </div>
    </div>
  );
};
