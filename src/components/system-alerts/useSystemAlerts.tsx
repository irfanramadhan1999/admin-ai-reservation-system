
import { useState } from 'react';
import { SystemAlert } from './types';
import { mockSystemAlerts } from './alertsMockData';
import { useAlertsFilters } from './useAlertsFilters';
import { useAlertsPagination } from './useAlertsPagination';
import { useAlertActions } from './useAlertActions';

export const useSystemAlerts = () => {
  // Mock data for system alerts
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>(mockSystemAlerts);

  // Use the extracted hooks
  const {
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
    filteredAlerts,
    clearDateFilters
  } = useAlertsFilters(systemAlerts);

  const {
    itemsPerPage,
    currentPage,
    currentAlerts,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange
  } = useAlertsPagination(filteredAlerts);

  const {
    openBlockDialog,
    setOpenBlockDialog,
    openUnblockDialog,
    setOpenUnblockDialog,
    selectedIP,
    handleToggleBlock,
    handleUnblock,
    handleConfirmBlock
  } = useAlertActions(systemAlerts, setSystemAlerts);

  return {
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
    itemsPerPage,
    currentPage,
    currentAlerts,
    totalPages,
    openBlockDialog,
    setOpenBlockDialog,
    openUnblockDialog,
    setOpenUnblockDialog,
    selectedIP,
    handleToggleBlock,
    handleUnblock,
    handleConfirmBlock,
    handlePageChange,
    handleItemsPerPageChange,
    clearDateFilters
  };
};
