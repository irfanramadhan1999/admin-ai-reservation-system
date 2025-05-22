
import React from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card } from '@/components/ui/card';
import { EditBookingDialog } from '@/components/shop-owner/edit-booking-dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { BookingsFilters } from '@/components/shop-owner/bookings-filters';
import { BookingsTable } from '@/components/shop-owner/bookings-table';
import { BookingsPagination } from '@/components/shop-owner/bookings-pagination';
import { ItemsPerPage } from '@/components/shop-owner/items-per-page';
import { useBookings } from '@/hooks/useBookings';

const ShopOwnerBookings = () => {
  const {
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
    tableTypes
  } = useBookings();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Bookings" 
        subtitle="Manage your restaurant reservations"
        date={format(new Date(), 'PPPP')}
      />
      
      {/* Action Buttons - AI Call Button Removed */}
      <div className="mb-6">
        {/* AiCallButton removed as part of removing AI Call Service feature */}
      </div>
      
      {/* Filters */}
      <BookingsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      
      {/* Bookings Table */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Customer Bookings</h2>
        <BookingsTable 
          bookings={paginatedBookings} 
          onEditBooking={handleEditBooking}
          onCancelBooking={handleCancelBooking}
        />
        
        {/* Pagination and Items Per Page Controls */}
        {filteredBookings.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t">
            <ItemsPerPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
            
            {totalPages > 1 && (
              <BookingsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </Card>
      
      {/* Edit Booking Modal */}
      <EditBookingDialog
        open={editBookingOpen}
        onOpenChange={setEditBookingOpen}
        booking={selectedBooking}
        tableTypes={tableTypes}
        onSubmit={handleUpdateBooking}
      />
      
      {/* Cancel Booking Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel This Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep It</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancelBooking}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ShopOwnerBookings;
