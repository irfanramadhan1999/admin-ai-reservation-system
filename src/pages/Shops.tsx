
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ShopsHeader } from '@/components/shops/ShopsHeader';
import { ShopsFilters } from '@/components/shops/ShopsFilters';
import { ShopsTable, Shop } from '@/components/shops/ShopsTable';
import { ShopsPagination } from '@/components/shops/ShopsPagination';
import { useShops } from '@/components/shops/useShops';

const Shops = () => {
  const navigate = useNavigate();
  const { 
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
  } = useShops();
  
  const handleEditShop = (id: string) => {
    navigate(`/admin/shops/edit/${id}`);
  };
  
  const handleViewBookings = (id: string) => {
    navigate('/admin/bookings');
  };
  
  const handleCreateShop = () => {
    navigate('/admin/shops/create');
  };

  const handleDirectToShop = (url: string) => {
    // Open in a new tab
    window.open(url, '_blank');
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
        {/* Header Section */}
        <ShopsHeader onCreateShop={handleCreateShop} />
        
        {/* Search and Filters Section */}
        <ShopsFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClearDateFilters={clearDateFilters}
        />
        
        {/* Table Section */}
        <div className="rounded-lg border bg-card">
          <ShopsTable
            shops={currentShops}
            formatDateTime={formatDateTime}
            onEditShop={handleEditShop}
            onViewBookings={handleViewBookings}
            onDirectToShop={handleDirectToShop}
          />
          
          {/* Pagination Controls */}
          <ShopsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shops;
