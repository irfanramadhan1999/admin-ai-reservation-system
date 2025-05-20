
import { useState } from 'react';
import { SystemAlert } from './types';

export const useAlertsPagination = (filteredAlerts: SystemAlert[]) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  
  // Get current alerts for pagination
  const currentAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    itemsPerPage,
    currentPage,
    currentAlerts,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange
  };
};
