
import React from 'react';
import { cn } from '@/lib/utils';
import { Store, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const location = useLocation();
  
  const navItems = [
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
      isActive: location.pathname === "/shops" || location.pathname === "/shops/create"
    }
  ];

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
