
import React from 'react';
import { cn } from '@/lib/utils';
import { Store, LayoutDashboard, User, ShieldAlert, Info, Calendar, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
      title: "System Alerts",
      icon: ShieldAlert,
      href: "/admin/system-alerts",
      isActive: location.pathname === "/admin/system-alerts"
    },
    {
      title: "Account Settings",
      icon: User,
      href: "/admin/account-settings",
      isActive: location.pathname === "/admin/account-settings"
    }
  ];
  
  // Shop owner navigation items - Updated to include Account page
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
      title: "Account Settings",
      icon: User,
      href: "/shop-admin/profile",
      isActive: location.pathname === "/shop-admin/profile"
    }
  ];
  
  // Select nav items based on user role
  const navItems = userRole === 'admin' ? adminNavItems : shopOwnerNavItems;

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.title}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
            item.isActive
              ? "bg-blue-500 text-white"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
