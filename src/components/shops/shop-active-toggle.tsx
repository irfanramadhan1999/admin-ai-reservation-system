
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface ShopActiveToggleProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

export function ShopActiveToggle({ isActive, onToggle }: ShopActiveToggleProps) {
  const handleToggleChange = (checked: boolean) => {
    onToggle(checked);
    toast({
      title: checked ? "Shop Activated" : "Shop Deactivated",
      description: `The shop has been ${checked ? "activated" : "deactivated"} successfully.`,
    });
  };

  return (
    <div className="flex items-center space-x-3 pt-4 pb-2">
      <Switch 
        id="shop-active" 
        checked={isActive}
        onCheckedChange={handleToggleChange}
      />
      <Label htmlFor="shop-active" className="font-medium">
        {isActive ? "Shop is Active" : "Shop is Inactive"}
      </Label>
    </div>
  );
}
