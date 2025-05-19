
import React from 'react';
import { cn } from '@/lib/utils';
import { Store, LayoutDashboard, User, ShieldAlert, Calendar, Table, Edit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarNavProps {
  className?: string;
  userRole?: 'admin' | 'shop-owner';
}

export function SidebarNav({ className, userRole = 'admin' }: SidebarNavProps) {
  const location = useLocation();
  
  // Admin navigation items
  const adminNavItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      isActive: location.pathname === "/"
    },
    {
      title: "Shops",
      icon: Store,
      href: "/shops",
      isActive: location.pathname === "/shops" || location.pathname === "/shops/create" || location.pathname.startsWith("/shops/edit/")
    },
    {
      title: "System Alerts",
      icon: ShieldAlert,
      href: "/system-alerts",
      isActive: location.pathname === "/system-alerts"
    },
    {
      title: "Account Settings",
      icon: User,
      href: "/account-settings",
      isActive: location.pathname === "/account-settings"
    }
  ];
  
  // Shop owner navigation items
  const shopOwnerNavItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/shop-owner",
      isActive: location.pathname === "/shop-owner"
    },
    {
      title: "Bookings",
      icon: Calendar,
      href: "/shop-owner/bookings",
      isActive: location.pathname === "/shop-owner/bookings"
    },
    {
      title: "Tables",
      icon: Table,
      href: "/shop-owner/tables",
      isActive: location.pathname === "/shop-owner/tables"
    },
    {
      title: "Profile",
      icon: Edit,
      href: "/shop-owner/profile",
      isActive: location.pathname === "/shop-owner/profile"
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
