import React from 'react';
import { cn } from '@/lib/utils';
import { Store, LayoutDashboard, User, Info, Calendar, Layout, MessageSquare, LogOut, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

interface SidebarNavProps {
  className?: string;
  userRole?: 'admin' | 'shop-admin';
}

export function SidebarNav({ className, userRole = 'admin' }: SidebarNavProps) {
  const location = useLocation();
  
  // Admin navigation items
  const adminNavItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      isActive: location.pathname === "/admin"
    },
    {
      title: "Shops",
      icon: Store,
      href: "/admin/shops",
      isActive: location.pathname === "/admin/shops" || 
               location.pathname === "/admin/shops/create" || 
               location.pathname.startsWith("/admin/shops/edit/")
    },
    {
      title: "Conversations",
      icon: MessageSquare,
      href: "/admin/conversations",
      isActive: location.pathname === "/admin/conversations" ||
               location.pathname.startsWith("/admin/conversations/")
    },
    {
      title: "Account Settings",
      icon: User,
      href: "/admin/account-settings",
      isActive: location.pathname === "/admin/account-settings"
    }
  ];
  
  // Shop owner navigation items - Updated to include AI Call Service
  const shopOwnerNavItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/shop-admin",
      isActive: location.pathname === "/shop-admin"
    },
    {
      title: "Shop Information",
      icon: Info,
      href: "/shop-admin/information",
      isActive: location.pathname === "/shop-admin/information"
    },
    {
      title: "Bookings",
      icon: Calendar,
      href: "/shop-admin/bookings",
      isActive: location.pathname === "/shop-admin/bookings"
    },
    {
      title: "Seating",
      icon: Layout,
      href: "/shop-admin/seating",
      isActive: location.pathname === "/shop-admin/seating"
    },
    {
      title: "AI Call Service",
      icon: Phone,
      href: "/ai-call",
      isActive: location.pathname === "/ai-call" || location.pathname === "/shop-admin/ai-call"
    },
    {
      title: "Account Settings",
      icon: User,
      href: "/shop-admin/profile",
      isActive: location.pathname === "/shop-admin/profile"
    }
  ];
  
  // Select nav items based on user role
  const navItems = userRole === 'admin' ? adminNavItems : shopOwnerNavItems;

  return (
    <SidebarMenu className={cn("space-y-1", className)}>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            tooltip={item.title}
            className={item.isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-blue-50"}
          >
            <Link to={item.href} className="py-2.5">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      
      {/* Logout Button */}
      <SidebarMenuItem className="mt-auto">
        <SidebarMenuButton
          asChild
          tooltip="Logout"
          className="hover:bg-red-50 hover:text-red-600 mt-6"
        >
          <Link to="/login" className="py-2.5">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
