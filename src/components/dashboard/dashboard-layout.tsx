
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { SidebarNav } from '../sidebar/sidebar-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  
  // Determine user role based on URL path
  const isShopAdmin = location.pathname.startsWith('/shop-admin');
  const userRole = isShopAdmin ? 'shop-admin' : 'admin';
  
  // Set appropriate logo text based on user role
  const logoText = isShopAdmin ? 'Owner Shop' : 'Admin';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-[#f1f7fc] w-full">
        {/* Sidebar */}
        <Sidebar className="border-r-0 bg-white shadow-sm">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-medium">
                {logoText.charAt(0)}
              </div>
              <h1 className="text-xl font-semibold">
                {logoText}<span className="text-blue-600">AI</span>
              </h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarNav userRole={userRole} />
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-xs font-medium">JD</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Restaurant Manager</span>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          <div className="flex items-center h-14 px-4 border-b bg-white shadow-sm">
            <SidebarTrigger className="text-gray-500" />
            <div className="ml-6">
              <input 
                type="text" 
                placeholder="Search here..." 
                className="py-1.5 px-3 bg-gray-50 rounded-md border border-gray-100 text-sm w-64"
              />
            </div>
          </div>
          <main className="p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
