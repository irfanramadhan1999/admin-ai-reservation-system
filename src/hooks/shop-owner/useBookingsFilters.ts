
import { useState } from 'react';
import { Booking } from './types';

export const useBookingsFilters = (bookingData: Booking[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter bookings based on search query and status
  const filteredBookings = bookingData.filter(booking => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    filteredBookings
  };
};
