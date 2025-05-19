
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import CreateShop from "./pages/CreateShop";
import Bookings from "./pages/Bookings";
import ViewConversation from "./pages/ViewConversation";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import SystemAlerts from "./pages/SystemAlerts";
import Login from "./pages/Login";
import ShopOwnerDashboard from "./pages/ShopOwnerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes - New structure with /admin prefix */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/shops" element={<Shops />} />
          <Route path="/admin/shops/create" element={<CreateShop />} />
          <Route path="/admin/shops/edit/:id" element={<CreateShop />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/bookings/conversation/:id" element={<ViewConversation />} />
          <Route path="/admin/account-settings" element={<AccountSettings />} />
          <Route path="/admin/system-alerts" element={<SystemAlerts />} />
          
          {/* Shop Owner Routes */}
          <Route path="/shop-owner" element={<ShopOwnerDashboard />} />
          <Route path="/shop-owner/bookings" element={<Bookings />} />
          <Route path="/shop-owner/tables" element={<NotFound />} /> {/* Placeholder for Tables management */}
          <Route path="/shop-owner/profile" element={<AccountSettings />} /> {/* Reusing AccountSettings for now */}
          
          {/* Root redirects to admin dashboard */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
