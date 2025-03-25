
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - will be replaced with Supabase data
const clients = [
  {
    id: "1",
    companyName: "Acme Corp",
    industry: "Manufacturing",
    status: "Active",
    revenue: "$45,231",
    services: ["Web Development", "Marketing"],
  },
  {
    id: "2",
    companyName: "TechGiant Inc.",
    industry: "Technology",
    status: "Active",
    revenue: "$75,432",
    services: ["AI Integration", "Web Hosting"],
  },
  {
    id: "3",
    companyName: "Startup Labs",
    industry: "Research",
    status: "Inactive",
    revenue: "$12,543",
    services: ["Web Development"],
  },
  {
    id: "4",
    companyName: "Innovate Solutions",
    industry: "Consulting",
    status: "Active",
    revenue: "$35,824",
    services: ["Marketing", "Web Hosting"],
  },
  {
    id: "5",
    companyName: "Global Industries",
    industry: "Manufacturing",
    status: "Pending",
    revenue: "$22,456",
    services: ["AI Integration"],
  },
];

export function ClientTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Services</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.companyName}</TableCell>
            <TableCell>{client.industry}</TableCell>
            <TableCell>
              <Badge
                variant={
                  client.status === "Active"
                    ? "default"
                    : client.status === "Inactive"
                    ? "destructive"
                    : "outline"
                }
              >
                {client.status}
              </Badge>
            </TableCell>
            <TableCell>{client.revenue}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {client.services.map((service, i) => (
                  <Badge key={i} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Client</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Invoices</DropdownMenuItem>
                  <DropdownMenuItem>Support Tickets</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete Client
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
