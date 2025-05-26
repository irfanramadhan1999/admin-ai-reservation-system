
import { useState } from 'react';
import { initialBookingData, tableTypes, tablesByType } from './shop-owner/bookingsMockData';
import { useBookingsFilters } from './shop-owner/useBookingsFilters';
import { useBookingsPagination } from './shop-owner/useBookingsPagination';
import { useBookingOperations } from './shop-owner/useBookingOperations';

export const useBookings = () => {
  const [bookingData, setBookingData] = useState(initialBookingData);
  
  // Use the smaller hooks
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    filteredBookings
  } = useBookingsFilters(bookingData);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    paginatedBookings
  } = useBookingsPagination(filteredBookings);

  const {
    editBookingOpen,
    setEditBookingOpen,
    selectedBooking,
    cancelDialogOpen,
    setCancelDialogOpen,
    bookingToCancel,
    handleEditBooking,
    handleCancelBooking,
    confirmCancelBooking,
    handleUpdateBooking
  } = useBookingOperations(bookingData, setBookingData);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredBookings,
    paginatedBookings,
    totalPages,
    editBookingOpen,
    setEditBookingOpen,
    selectedBooking,
    cancelDialogOpen,
    setCancelDialogOpen,
    bookingToCancel,
    handleEditBooking,
    handleCancelBooking,
    confirmCancelBooking,
    handleUpdateBooking,
    tableTypes,
    tablesByType
  };
};
