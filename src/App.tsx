
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
import ShopInformation from "./pages/ShopInformation";
import ShopOwnerBookings from "./pages/ShopOwnerBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/shops" element={<Shops />} />
          <Route path="/admin/shops/create" element={<CreateShop />} />
          <Route path="/admin/shops/edit/:id" element={<CreateShop />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/bookings/conversation/:id" element={<ViewConversation />} />
          <Route path="/admin/account-settings" element={<AccountSettings />} />
          <Route path="/admin/system-alerts" element={<SystemAlerts />} />
          
          {/* Shop Owner Routes - Updated to include new ShopOwnerBookings page */}
          <Route path="/shop-admin" element={<ShopOwnerDashboard />} />
          <Route path="/shop-admin/information" element={<ShopInformation />} />
          <Route path="/shop-admin/bookings" element={<ShopOwnerBookings />} />
          <Route path="/shop-admin/tables" element={<NotFound />} />
          <Route path="/shop-admin/profile" element={<AccountSettings />} />
          
          {/* Root redirects to admin dashboard */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
