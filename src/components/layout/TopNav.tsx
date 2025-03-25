
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, LogOut, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ClientSelector } from "./ClientSelector";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const getRoleBasedPath = (role: string | null) => {
  switch (role) {
    case 'ADMIN':
      return '/admin';
    case 'STAFF':
      return '/staff';
    case 'CLIENT':
      return '/client';
    case 'OBSERVER':
      return '/observer';
    default:
      return '';
  }
};

const NavItem = ({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export function TopNav() {
  const { user, signOut, userRole } = useAuth();
  const rolePath = getRoleBasedPath(userRole);
  const location = useLocation();
  
  const getInitials = () => {
    if (!user) return "U";
    
    let initials = "";
    
    // Try to get initials from user metadata
    const firstName = user.user_metadata?.first_name || "";
    const lastName = user.user_metadata?.last_name || "";
    
    if (firstName) initials += firstName[0];
    if (lastName) initials += lastName[0];
    
    // If no initials were found, use the first character of the email
    if (!initials && user.email) {
      initials = user.email[0].toUpperCase();
    }
    
    return initials || "U";
  };

  const getDisplayName = () => {
    if (!user) return "User";
    
    const firstName = user.user_metadata?.first_name;
    const lastName = user.user_metadata?.last_name;
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (user.email) {
      // Return email before the @ symbol
      return user.email.split('@')[0];
    }
    
    return "User";
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 mr-4">
          <Link to="/" className="font-semibold text-lg">CyberHand</Link>
          
          {user && (
            <ClientSelector />
          )}
        </div>

        {user && (
          <nav className="flex items-center space-x-2">
            <NavItem href={`${rolePath}/dashboard`}>Dashboard</NavItem>
            <NavItem href={`${rolePath}/clients`}>Clients</NavItem>
            <NavItem href={`${rolePath}/services`}>Services</NavItem>
            <NavItem href={`${rolePath}/invoices`}>Invoices</NavItem>
            {userRole === 'CLIENT' && (
              <NavItem href={`${rolePath}/support`}>Support</NavItem>
            )}
            <NavItem href={`${rolePath}/settings`}>Settings</NavItem>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-4">
          {user && (
            <>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[320px]"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      {userRole && (
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          Role: {userRole}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {!user && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
