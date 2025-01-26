import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Inbox, PlusCircle, Settings, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { NavItem, SidebarProps } from "@/types/sidebar";
import { useAuth } from '@/contexts/AuthContext';

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Tickets", href: "/tickets", icon: Inbox },
  { title: "New Ticket", href: "/tickets/new", icon: PlusCircle },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Admin", href: "/admin", icon: User, adminOnly: true },
];

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { profile } = useAuth();
  const location = useLocation();
  const isUserAdmin = profile?.role === 'admin';

  // Debug log (temporary)
  console.log('Profile:', profile);
  console.log('Is Admin:', isUserAdmin);

  return (
    <div
      className={cn(
        "relative min-h-screen border-r border-crm-border bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-crm-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-gray-900">aCRM</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="p-2 space-y-1">
        {navItems
          .filter((item) => {
            const shouldShow = !item.adminOnly || (item.adminOnly && isUserAdmin);
            console.log(`Item ${item.title}:`, shouldShow);
            return shouldShow;
          })
          .map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => {
                return cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-gray-100",
                  isActive && location.pathname === item.href
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600",
                  collapsed && "justify-center px-2"
                );
              }}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5",
                  collapsed ? "mr-0" : "mr-2",
                  location.pathname === item.href ? "text-blue-600" : "text-gray-400"
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
      </nav>
    </div>
  );
}