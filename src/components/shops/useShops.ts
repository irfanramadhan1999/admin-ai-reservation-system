
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Mock shop data
const mockShops = [
  {
    id: 'shop1',
    name: 'Sakura Japanese Restaurant',
    contact: '+81 3-1234-5678',
    tokenUsage: { used: 15000, limit: 50000 },
    totalBookings: 124,
    createdAt: '2025-01-15T14:30:00.000Z',
    isActive: true,
    frontendUrl: 'https://sakura.reserveai.jp'
  },
  {
    id: 'shop2',
    name: 'Milano Pasta House',
    contact: '+81 3-8765-4321',
    tokenUsage: { used: 8000, limit: 50000 },
    totalBookings: 87,
    createdAt: '2025-01-10T09:15:00.000Z',
    isActive: true,
    frontendUrl: 'https://milano.reserveai.jp'
  },
  // Add more mock shops as needed
];

export const useShops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [shops, setShops] = useState(mockShops);
  
  // Format date time with JST timezone
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return `${date.toLocaleDateString('en-US', options)} JST`;
  };
  
  // Filter shops based on search term and date range
  useEffect(() => {
    const filtered = mockShops.filter((shop) => {
      // Search filter
      const matchesSearch = 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        shop.contact.includes(searchTerm);
      
      // Date filter
      let matchesDate = true;
      if (startDate || endDate) {
        const shopDate = new Date(shop.createdAt);
        
        if (startDate && endDate) {
          matchesDate = shopDate >= startDate && shopDate <= new Date(endDate.setHours(23, 59, 59, 999));
        } else if (startDate) {
          matchesDate = shopDate >= startDate;
        } else if (endDate) {
          matchesDate = shopDate <= new Date(endDate.setHours(23, 59, 59, 999));
        }
      }
      
      return matchesSearch && matchesDate;
    });
    
    setShops(filtered);
  }, [searchTerm, startDate, endDate]);
  
  // Calculate current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShops = shops.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(shops.length / itemsPerPage);
  
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
};
