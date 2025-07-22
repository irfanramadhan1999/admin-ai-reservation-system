import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Mock data for shops
const mockShops = [
  { id: '1', name: 'Coffee Paradise', status: 'active' },
  { id: '2', name: 'Pizza Corner', status: 'active' },
  { id: '3', name: 'Sushi Zen', status: 'inactive' },
  { id: '4', name: 'Burger Junction', status: 'active' },
  { id: '5', name: 'Thai Garden', status: 'active' },
];

export function ShopSelectionSection() {
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedShops.length === mockShops.length) {
      setSelectedShops([]);
    } else {
      setSelectedShops(mockShops.map(shop => shop.id));
    }
  };

  const handleShopToggle = (shopId: string) => {
    setSelectedShops(prev => 
      prev.includes(shopId) 
        ? prev.filter(id => id !== shopId)
        : [...prev, shopId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Shops</CardTitle>
        <CardDescription>
          Choose shops to update their token limits. You can select individual shops or all at once.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedShops.length === mockShops.length}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All Shops ({mockShops.length})
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockShops.map((shop) => (
            <div key={shop.id} className="flex items-center space-x-2 p-3 border rounded-lg">
              <Checkbox
                id={shop.id}
                checked={selectedShops.includes(shop.id)}
                onCheckedChange={() => handleShopToggle(shop.id)}
              />
              <div className="flex-1">
                <label htmlFor={shop.id} className="text-sm font-medium cursor-pointer">
                  {shop.name}
                </label>
                <p className="text-xs text-muted-foreground capitalize">{shop.status}</p>
              </div>
            </div>
          ))}
        </div>
        
        {selectedShops.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {selectedShops.length} shop(s) selected
          </div>
        )}
      </CardContent>
    </Card>
  );
}