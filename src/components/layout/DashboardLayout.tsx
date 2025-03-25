
import React from "react";
import { TopNav } from "./TopNav";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <div className="min-h-screen bg-background">
        <div className="flex flex-col">
          <TopNav />
          <main className="flex-1 p-6 pt-6 mx-auto w-full max-w-7xl">
            <div className="flex justify-end mb-4">
              <ModeToggle />
            </div>
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
