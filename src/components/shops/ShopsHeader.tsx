
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ShopsHeaderProps {
  onCreateShop: () => void;
}

export function ShopsHeader({ onCreateShop }: ShopsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Shops</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all registered restaurants in the system. View, search, and create new shops.
        </p>
      </div>
      <Button onClick={onCreateShop} size="lg" className="gap-1">
        <Plus className="h-4 w-4" /> Create New Shop
      </Button>
    </div>
  );
}
