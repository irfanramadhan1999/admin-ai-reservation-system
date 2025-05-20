
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface ShopStatusTogglesProps {
  shopActive: boolean;
  setShopActive: (value: boolean) => void;
  aiAssistantEnabled: boolean;
  setAiAssistantEnabled: (value: boolean) => void;
}

export const ShopStatusToggles = ({
  shopActive,
  setShopActive,
  aiAssistantEnabled,
  setAiAssistantEnabled
}: ShopStatusTogglesProps) => {
  return (
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
  );
};
