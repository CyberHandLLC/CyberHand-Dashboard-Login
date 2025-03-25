
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, CalendarIcon, CreditCard, DollarSign, Users } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

// Mock data
const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 4600 },
  { name: "Mar", value: 5200 },
  { name: "Apr", value: 5800 },
  { name: "May", value: 4900 },
  { name: "Jun", value: 4100 },
  { name: "Jul", value: 4300 },
  { name: "Aug", value: 5100 },
  { name: "Sep", value: 3800 },
  { name: "Oct", value: 6200 },
  { name: "Nov", value: 5300 },
  { name: "Dec", value: 4200 },
];

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "$39.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "$299.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "$99.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "$39.00"
  }
];

export default function Index() {
  const { user, userRole } = useAuth();
  
  // If user is logged in, redirect them to their role-specific dashboard
  if (user) {
    const dashboardPath = `/${userRole?.toLowerCase() || 'dashboard'}/dashboard`;
    return (
      <div className="flex items-center justify-center min-h-screen">
        Redirecting to your dashboard...
        <script>{`window.location.href = "${dashboardPath}"`}</script>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4 items-center text-center pt-12 pb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Client Management System
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Professional tools for managing clients, services, invoices, and more. Please sign in to access the platform.
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Easily manage all your clients in one place. Keep track of contact information, service history, and communications.
              </p>
              <div className="flex justify-center">
                <Users className="h-24 w-24 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Service Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Monitor all services provided to clients. Track service status, deliverables, and upcoming renewals.
              </p>
              <div className="flex justify-center">
                <BarChart className="h-24 w-24 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Invoicing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Generate and track invoices for all your client services. Monitor payments and send reminders.
              </p>
              <div className="flex justify-center">
                <DollarSign className="h-24 w-24 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Sign up now to access all features and start managing your clients and services more efficiently.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Create an Account</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
