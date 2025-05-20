import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { toast } from "@/components/ui/use-toast";
import { AlertsTable } from '@/components/system-alerts/AlertsTable';
import { AlertsFilters } from '@/components/system-alerts/AlertsFilters';
import { AlertPagination } from '@/components/system-alerts/AlertPagination';
import { BlockDialog } from '@/components/system-alerts/BlockDialog';
import { UnblockDialog } from '@/components/system-alerts/UnblockDialog';
import { SystemAlert } from '@/components/system-alerts/types';

const SystemAlerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for system alerts
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 1,
      timestamp: 'May 20, 2025 - 14:30',
      ipAddress: '192.168.1.45',
      shop: 'Sakura Sushi Tokyo',
      shopContact: '+81 90-1234-5678',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C001'
    },
    {
      id: 2,
      timestamp: 'May 20, 2025 - 13:15',
      ipAddress: '192.168.3.78',
      shop: 'Milano Pasta House',
      shopContact: '+81 80-8765-4321',
      reason: 'User went off-topic during the call',
      status: 'Pending Review',
      conversationId: 'C002'
    },
    {
      id: 3,
      timestamp: 'May 19, 2025 - 18:45',
      ipAddress: '192.168.5.12',
      shop: 'Paris Bistro',
      shopContact: '+81 70-9876-5432',
      reason: 'User hung up the phone',
      status: 'Blocked',
      conversationId: 'C003'
    },
    {
      id: 4,
      timestamp: 'May 19, 2025 - 15:22',
      ipAddress: '192.168.9.33',
      shop: 'New York Steakhouse',
      shopContact: '+81 90-2468-1357',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C004'
    },
    {
      id: 5,
      timestamp: 'May 18, 2025 - 09:10',
      ipAddress: '192.168.2.55',
      shop: 'Tokyo Ramen',
      shopContact: '+81 80-1357-2468',
      reason: 'User hung up the phone',
      status: 'Reviewed',
      conversationId: 'C005'
    },
    {
      id: 6,
      timestamp: 'May 17, 2025 - 20:05',
      ipAddress: '192.168.7.21',
      shop: 'Barcelona Tapas',
      shopContact: '+81 70-1111-2222',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C006'
    },
    {
      id: 7,
      timestamp: 'May 17, 2025 - 10:30',
      ipAddress: '192.168.4.89',
      shop: 'Indian Curry House',
      shopContact: '+81 90-3333-4444',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C007'
    },
    {
      id: 8,
      timestamp: 'May 16, 2025 - 16:45',
      ipAddress: '192.168.6.37',
      shop: 'Mexican Cantina',
      shopContact: '+81 80-5555-6666',
      reason: 'User went off-topic during the call',
      status: 'Reviewed',
      conversationId: 'C008'
    },
  ]);

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

  // Calculate total pages
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  
  // Get current alerts for pagination
  const currentAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => {
    // If already blocked, show unblock confirmation dialog
    if (currentStatus === 'Blocked') {
      setSelectedIP(ipAddress);
      setSelectedAlertId(alertId);
      setOpenUnblockDialog(true);
      return;
    }
    
    // If not blocked, show block confirmation dialog
    setSelectedIP(ipAddress);
    setSelectedAlertId(alertId);
    setOpenBlockDialog(true);
  };

  const handleUnblock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Reviewed' } : alert
        )
      );
    }
    
    toast({
      title: "IP Unblocked",
      description: `${selectedIP} has been unblocked successfully.`,
    });
    setOpenUnblockDialog(false);
  };

  const handleConfirmBlock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Blocked' } : alert
        )
      );
    }
    
    toast({
      title: "IP Blocked",
      description: `${selectedIP} has been blocked successfully.`,
    });
    setOpenBlockDialog(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const clearDateFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">System Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor suspicious activities and potential security threats.
          </p>
        </div>

        {/* Search and Filters */}
        <AlertsFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onClearDateFilters={clearDateFilters}
        />

        {/* System Alerts Table */}
        <div className="rounded-lg border bg-white">
          <AlertsTable 
            alerts={currentAlerts} 
            onToggleBlock={handleToggleBlock} 
          />
          
          {/* Pagination and Items Per Page Controls */}
          <AlertPagination 
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>

      {/* Block IP Confirmation Dialog */}
      <BlockDialog 
        open={openBlockDialog} 
        onOpenChange={setOpenBlockDialog}
        onConfirm={handleConfirmBlock}
        ipAddress={selectedIP}
      />

      {/* Unblock IP Confirmation Dialog */}
      <UnblockDialog 
        open={openUnblockDialog} 
        onOpenChange={setOpenUnblockDialog}
        onConfirm={handleUnblock}
        ipAddress={selectedIP}
      />
    </DashboardLayout>
  );
};

export default SystemAlerts;
