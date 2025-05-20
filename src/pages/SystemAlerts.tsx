
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AlertsTable } from '@/components/system-alerts/AlertsTable';
import { AlertsFilters } from '@/components/system-alerts/AlertsFilters';
import { AlertPagination } from '@/components/system-alerts/AlertPagination';
import { BlockDialog } from '@/components/system-alerts/BlockDialog';
import { UnblockDialog } from '@/components/system-alerts/UnblockDialog';
import { SystemAlertsHeader } from '@/components/system-alerts/SystemAlertsHeader';
import { useSystemAlerts } from '@/components/system-alerts/useSystemAlerts';

const SystemAlerts = () => {
  const {
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
  } = useSystemAlerts();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <SystemAlertsHeader 
          title="System Alerts" 
          description="Monitor suspicious activities and potential security threats."
        />

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
