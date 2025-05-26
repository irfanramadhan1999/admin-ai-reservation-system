
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreateBookingDialog } from '@/components/shop-owner/create-booking-dialog';
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
import { useToast } from '@/hooks/use-toast';

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

  const [createBookingOpen, setCreateBookingOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateBooking = (newBooking: any) => {
    // In a real app, this would save to the database
    console.log("Created booking:", newBooking);
    toast({
      title: "Booking Created",
      description: "The new booking has been successfully created."
    });
  };

  const handleViewConversation = (booking: any) => {
    // Navigate to conversation detail page
    window.location.href = `/shop-admin/conversations/${booking.id}`;
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Bookings" 
        subtitle="Manage your restaurant reservations"
        date={format(new Date(), 'PPPP')}
      />
      
      {/* Filters and Create Button - Updated Layout */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-3">
            <BookingsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setCreateBookingOpen(true)} className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Booking
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bookings Table */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Customer Bookings</h2>
        <BookingsTable 
          bookings={paginatedBookings} 
          onEditBooking={handleEditBooking}
          onCancelBooking={handleCancelBooking}
          onViewConversation={handleViewConversation}
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
      
      {/* Create Booking Dialog */}
      <CreateBookingDialog
        open={createBookingOpen}
        onOpenChange={setCreateBookingOpen}
        tableTypes={tableTypes}
        onSubmit={handleCreateBooking}
      />
      
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
