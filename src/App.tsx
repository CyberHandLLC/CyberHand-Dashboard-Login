
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ObserverDashboard from "./pages/dashboard/ObserverDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Dashboard route with role-based redirection */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Protected routes for specific roles */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/clients" element={<Index />} />
              <Route path="/admin/services" element={<Index />} />
              <Route path="/admin/invoices" element={<Index />} />
              <Route path="/admin/settings" element={<Index />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['STAFF']} />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/clients" element={<Index />} />
              <Route path="/staff/services" element={<Index />} />
              <Route path="/staff/invoices" element={<Index />} />
              <Route path="/staff/settings" element={<Index />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/services" element={<Index />} />
              <Route path="/client/invoices" element={<Index />} />
              <Route path="/client/support" element={<Index />} />
              <Route path="/client/settings" element={<Index />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['OBSERVER']} />}>
              <Route path="/observer/dashboard" element={<ObserverDashboard />} />
              <Route path="/observer/clients" element={<Index />} />
              <Route path="/observer/services" element={<Index />} />
              <Route path="/observer/invoices" element={<Index />} />
              <Route path="/observer/settings" element={<Index />} />
            </Route>
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
