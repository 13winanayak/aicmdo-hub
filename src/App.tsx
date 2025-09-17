import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="live" element={<div className="p-6 text-center text-muted-foreground">Real-time Monitor Coming Soon</div>} />
            <Route path="leads" element={<div className="p-6 text-center text-muted-foreground">Leads Management Coming Soon</div>} />
            <Route path="leads/assigned" element={<div className="p-6 text-center text-muted-foreground">My Assigned Leads Coming Soon</div>} />
            <Route path="ai-performance" element={<div className="p-6 text-center text-muted-foreground">AI Performance Coming Soon</div>} />
            <Route path="ai-config" element={<div className="p-6 text-center text-muted-foreground">AI Configuration Coming Soon</div>} />
            <Route path="reports" element={<div className="p-6 text-center text-muted-foreground">Reports Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6 text-center text-muted-foreground">Settings Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
