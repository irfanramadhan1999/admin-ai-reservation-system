
import { useState } from 'react';
import { format } from 'date-fns';

// Sample data
const shopData = [
  {
    id: "1",
    name: "The Olive Garden",
    contact: "+1 (555) 123-4567",
    tokenUsage: {
      used: 1250,
      limit: 5000
    },
    totalBookings: 42,
    createdAt: "2025-01-15T14:30:00",
    isActive: true,
    frontendUrl: "https://olivegarden.reserveai.jp"
  },
  {
    id: "2",
    name: "Sushi Heaven",
    contact: "+1 (555) 987-6543",
    tokenUsage: {
      used: 3100,
      limit: 5000
    },
    totalBookings: 28,
    createdAt: "2025-02-03T09:15:00",
    isActive: true,
    frontendUrl: "https://sushiheaven.reserveai.jp"
  },
  {
    id: "3",
    name: "Pasta Paradise",
    contact: "+1 (555) 456-7890",
    tokenUsage: {
      used: 2400,
      limit: 5000
    },
    totalBookings: 36,
    createdAt: "2025-02-20T16:45:00",
    isActive: false,
    frontendUrl: "https://pastaparadise.reserveai.jp"
  },
  {
    id: "4",
    name: "Burger Bliss",
    contact: "+1 (555) 321-6547",
    tokenUsage: {
      used: 4200,
      limit: 5000
    },
    totalBookings: 24,
    createdAt: "2025-03-05T11:20:00",
    isActive: true,
    frontendUrl: "https://burgerbliss.reserveai.jp"
  },
  {
    id: "5",
    name: "Thai Delight",
    contact: "+1 (555) 789-0123",
    tokenUsage: {
      used: 1900,
      limit: 5000
    },
    totalBookings: 32,
    createdAt: "2025-03-18T13:40:00",
    isActive: true,
    frontendUrl: "https://thaidelight.reserveai.jp"
  },
  {
    id: "6",
    name: "Mexican Fiesta",
    contact: "+1 (555) 234-5678",
    tokenUsage: {
      used: 2100,
      limit: 5000
    },
    totalBookings: 29,
    createdAt: "2025-03-25T15:10:00",
    isActive: true,
    frontendUrl: "https://mexicanfiesta.reserveai.jp"
  },
  {
    id: "7",
    name: "French Bistro",
    contact: "+1 (555) 876-5432",
    tokenUsage: {
      used: 1800,
      limit: 5000
    },
    totalBookings: 22,
    createdAt: "2025-04-02T10:30:00",
    isActive: false,
    frontendUrl: "https://frenchbistro.reserveai.jp"
  },
  {
    id: "8",
    name: "Indian Spice",
    contact: "+1 (555) 345-6789",
    tokenUsage: {
      used: 2700,
      limit: 5000
    },
    totalBookings: 38,
    createdAt: "2025-04-10T12:15:00",
    isActive: true,
    frontendUrl: "https://indianspice.reserveai.jp"
  },
  {
    id: "9",
    name: "Steakhouse Prime",
    contact: "+1 (555) 567-8901",
    tokenUsage: {
      used: 3500,
      limit: 5000
    },
    totalBookings: 45,
    createdAt: "2025-04-17T18:45:00",
    isActive: true,
    frontendUrl: "https://steakhouseprime.reserveai.jp"
  },
  {
    id: "10",
    name: "Seafood Harbor",
    contact: "+1 (555) 678-9012",
    tokenUsage: {
      used: 2200,
      limit: 5000
    },
    totalBookings: 31,
    createdAt: "2025-04-25T17:20:00",
    isActive: true,
    frontendUrl: "https://seafoodharbor.reserveai.jp"
  }
];

export function useShops() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [shops, setShops] = useState(shopData);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Filter shops based on search term and date range
  const filteredShops = shops.filter(shop => {
    // Search filter
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          shop.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date range filter
    let matchesDateRange = true;
    const shopDate = new Date(shop.createdAt);
    
    if (startDate && endDate) {
      // Set time to beginning and end of day for proper comparison
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      matchesDateRange = shopDate >= startOfDay && shopDate <= endOfDay;
    } else if (startDate) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      matchesDateRange = shopDate >= startOfDay;
    } else if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      matchesDateRange = shopDate <= endOfDay;
    }
    
    return matchesSearch && matchesDateRange;
  });
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  
  // Get current shops for pagination
  const currentShops = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${format(date, 'yyyy-MM-dd')}, ${format(date, 'HH:mm')} JST`;
  };
  
  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentShops,
    totalPages,
    formatDateTime,
  };
}
