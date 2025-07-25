
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
import Conversations from "./pages/Conversations";
import ViewConversationDetail from "./pages/ViewConversationDetail";
import AccountSettings from "./pages/AccountSettings";
import TokenManagement from "./pages/TokenManagement";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ShopOwnerDashboard from "./pages/ShopOwnerDashboard";
import ShopInformation from "./pages/ShopInformation";
import ShopOwnerBookings from "./pages/ShopOwnerBookings";
import ShopOwnerSeating from "./pages/ShopOwnerSeating";
import ShopOwnerAccount from "./pages/ShopOwnerAccount";
import ShopOwnerConversations from "./pages/ShopOwnerConversations";
import CalendarSync from "./pages/CalendarSync";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/shops" element={<Shops />} />
          <Route path="/admin/shops/create" element={<CreateShop />} />
          <Route path="/admin/shops/edit/:id" element={<CreateShop />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/bookings/conversation/:id" element={<ViewConversation />} />
          <Route path="/admin/conversations" element={<Conversations />} />
          <Route path="/admin/conversations/:id" element={<ViewConversationDetail />} />
          <Route path="/admin/token-management" element={<TokenManagement />} />
          <Route path="/admin/account-settings" element={<AccountSettings />} />
          
          {/* Shop Owner Routes */}
          <Route path="/shop-admin" element={<ShopOwnerDashboard />} />
          <Route path="/shop-admin/information" element={<ShopInformation />} />
          <Route path="/shop-admin/bookings" element={<ShopOwnerBookings />} />
          <Route path="/shop-admin/conversations" element={<ShopOwnerConversations />} />
          <Route path="/shop-admin/seating" element={<ShopOwnerSeating />} />
          <Route path="/shop-admin/profile" element={<ShopOwnerAccount />} />
          <Route path="/shop-admin/calendar-sync" element={<CalendarSync />} />
          
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
