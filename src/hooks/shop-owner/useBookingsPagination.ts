
import { useState } from 'react';
import { Booking } from './types';

export const useBookingsPagination = (filteredBookings: Booking[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
    totalPages,
    paginatedBookings
  };
};
