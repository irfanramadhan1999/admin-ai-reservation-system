
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Settings,
  Phone,
} from 'lucide-react';

interface SidebarNavProps {
  className?: string;
}

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    isActive: true
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    href: "/bookings",
    isActive: false
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
    isActive: false
  },
  {
    title: "Call History",
    icon: Phone,
    href: "/call-history",
    isActive: false
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    isActive: false
  }
];

export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
            item.isActive
              ? "bg-blue-500 text-white"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </a>
      ))}
    </nav>
  );
}
