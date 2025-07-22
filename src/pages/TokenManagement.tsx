import React from 'react';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { TokenManagementHeader } from "@/components/token-management/TokenManagementHeader";
import { ShopSelectionSection } from "@/components/token-management/ShopSelectionSection";
import { TokenLimitSection } from "@/components/token-management/TokenLimitSection";
import { ShopsLimitTable } from "@/components/token-management/ShopsLimitTable";

export default function TokenManagement() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <TokenManagementHeader />
        <div className="space-y-6">
          <ShopSelectionSection />
          <TokenLimitSection />
          <ShopsLimitTable />
        </div>
      </div>
    </DashboardLayout>
  );
}