
import { useState } from 'react';
import { SystemAlert } from './types';

export const useAlertsFilters = (systemAlerts: SystemAlert[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter alerts based on search term, date range, and status
  const filteredAlerts = systemAlerts.filter(alert => {
    // Search filter
    const matchesSearch = 
      alert.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.ipAddress.includes(searchTerm) ||
      alert.shopContact.includes(searchTerm);
    
    // Date range filter
    let matchesDateRange = true;
    if (startDate || endDate) {
      const alertDate = new Date(alert.timestamp.split(' - ')[0]);
      
      if (startDate && endDate) {
        // Both start and end dates are set
        matchesDateRange = alertDate >= startDate && alertDate <= new Date(endDate.setHours(23, 59, 59, 999));
      } else if (startDate) {
        // Only start date is set
        matchesDateRange = alertDate >= startDate;
      } else if (endDate) {
        // Only end date is set
        matchesDateRange = alertDate <= new Date(endDate.setHours(23, 59, 59, 999));
      }
    }
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'blocked' && alert.status === 'Blocked') ||
      (statusFilter === 'unblocked' && (alert.status === 'Pending Review' || alert.status === 'Reviewed'));
    
    return matchesSearch && matchesDateRange && matchesStatus;
  });

  const clearDateFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return {
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
  };
};
