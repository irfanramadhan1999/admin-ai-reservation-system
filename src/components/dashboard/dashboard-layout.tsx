
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
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
      <div className="min-h-screen flex bg-[#f9fafc] w-full">
        {/* Sidebar */}
        <Sidebar className="border-r-0 bg-white shadow-sm">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {logoText.charAt(0)}
              </div>
              <h1 className="text-xl font-semibold">
                {logoText}<span className="text-blue-500">AI</span>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search anything here..." 
                  className="py-1.5 px-9 bg-gray-50 rounded-full border border-gray-100 text-sm w-64"
                />
              </div>
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
