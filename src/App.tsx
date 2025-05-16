
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import CreateShop from "./pages/CreateShop";
import Bookings from "./pages/Bookings";
import ViewConversation from "./pages/ViewConversation";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import SystemAlerts from "./pages/SystemAlerts";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/create" element={<CreateShop />} />
          <Route path="/shops/edit/:id" element={<CreateShop />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/conversation/:id" element={<ViewConversation />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/system-alerts" element={<SystemAlerts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
