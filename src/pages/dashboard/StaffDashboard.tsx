
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, Headphones, Users } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Progress } from "@/components/ui/progress";

// Mock data
const ticketData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 46 },
  { name: "Mar", value: 52 },
  { name: "Apr", value: 58 },
  { name: "May", value: 49 },
  { name: "Jun", value: 41 },
  { name: "Jul", value: 43 },
  { name: "Aug", value: 51 },
  { name: "Sep", value: 38 },
  { name: "Oct", value: 62 },
  { name: "Nov", value: 53 },
  { name: "Dec", value: 42 },
];

const recentTickets = [
  {
    client: "Acme Inc",
    title: "Website down",
    status: "In Progress",
    priority: "High"
  },
  {
    client: "Globex Corp",
    title: "Email delivery issues",
    status: "Open",
    priority: "Medium"
  },
  {
    client: "Initech",
    title: "Server upgrade request",
    status: "Open",
    priority: "Low"
  },
  {
    client: "Umbrella Corp",
    title: "Security audit request",
    status: "In Progress",
    priority: "High"
  }
];

export default function StaffDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              This Week
            </Button>
            <Button>View Calendar</Button>
          </div>
        </div>
        
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            <TabsTrigger value="clients">My Clients</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Tickets
              </CardTitle>
              <Headphones className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                4 high priority
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                3 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                $12,234 total value
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Ticket Volume</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <RechartsBarChart data={ticketData}>
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
                  <Bar 
                    dataKey="value" 
                    fill="#adf542" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Active Tickets</CardTitle>
              <p className="text-sm text-muted-foreground">
                12 tickets assigned to you
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentTickets.map((ticket, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">{ticket.title}</p>
                        <p className="text-sm text-muted-foreground">{ticket.client}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        ticket.priority === 'High' 
                          ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : ticket.priority === 'Medium'
                            ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {ticket.priority}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={ticket.status === 'In Progress' ? 50 : 10} className="h-2" />
                      <span className="text-xs text-muted-foreground">{ticket.status}</span>
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
