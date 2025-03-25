
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FileText, 
  Headphones, 
  BarChart, 
  Settings, 
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarLink({ to, icon, label, active }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("sidebar-collapsed", false);

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-14 px-3 border-b border-border">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-sidebar-foreground">CyberHand</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <SidebarLink 
            to="/" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            active={true}
          />
          <SidebarLink 
            to="/clients" 
            icon={<Users className="h-5 w-5" />} 
            label="Clients" 
          />
          <SidebarLink 
            to="/services" 
            icon={<ShoppingBag className="h-5 w-5" />} 
            label="Services" 
          />
          <SidebarLink 
            to="/invoices" 
            icon={<FileText className="h-5 w-5" />} 
            label="Invoices" 
          />
          <SidebarLink 
            to="/support" 
            icon={<Headphones className="h-5 w-5" />} 
            label="Support Tickets" 
          />
          <SidebarLink 
            to="/reports" 
            icon={<BarChart className="h-5 w-5" />} 
            label="Reports" 
          />
          <SidebarLink 
            to="/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
          />
        </nav>
      </div>
    </aside>
  );
}
