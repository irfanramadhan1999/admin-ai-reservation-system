import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { TokenManagementHeader } from "@/components/token-management/TokenManagementHeader";
import { TokenLimitSection } from "@/components/token-management/TokenLimitSection";
import { ShopsLimitTable } from "@/components/token-management/ShopsLimitTable";

export default function TokenManagement() {
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <TokenManagementHeader />
        <div className="space-y-6">
          <ShopsLimitTable 
            selectedShops={selectedShops} 
            onSelectionChange={setSelectedShops} 
          />
          <TokenLimitSection selectedShops={selectedShops} />
        </div>
      </div>
    </DashboardLayout>
  );
}