
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CreditCard, FileText, Headphones } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Progress } from "@/components/ui/progress";

// Mock data
const serviceUsageData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 35 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 50 },
  { name: "May", value: 65 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 60 },
  { name: "Aug", value: 75 },
  { name: "Sep", value: 85 },
  { name: "Oct", value: 80 },
  { name: "Nov", value: 75 },
  { name: "Dec", value: 70 },
];

const activeServices = [
  {
    name: "Website Hosting",
    usage: 45,
    renewalDate: "Apr 15, 2023"
  },
  {
    name: "SEO Management",
    usage: 75,
    renewalDate: "May 1, 2023"
  },
  {
    name: "Content Marketing",
    usage: 30,
    renewalDate: "Apr 20, 2023"
  },
  {
    name: "Email Campaigns",
    usage: 60,
    renewalDate: "May 10, 2023"
  }
];

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button>Contact Support</Button>
          </div>
        </div>
        
        <Tabs defaultValue="services" className="w-full">
          <TabsList>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Services
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                All services active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <Headphones className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                1 awaiting your response
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,299</div>
              <p className="text-xs text-muted-foreground">
                Due on Apr 15, 2023
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Response</CardTitle>
              <Headphones className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4h 12m</div>
              <p className="text-xs text-muted-foreground">
                Average response time
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Service Usage</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={serviceUsageData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone"
                    dataKey="value" 
                    stroke="#adf542" 
                    strokeWidth={2}
                    dot={{ stroke: '#adf542', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#adf542', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
              <p className="text-sm text-muted-foreground">
                4 services in your current plan
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeServices.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium leading-none">{service.name}</p>
                      <p className="text-sm text-muted-foreground">Renews: {service.renewalDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={service.usage} className="h-2" />
                      <span className="text-xs text-muted-foreground">{service.usage}% used</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
