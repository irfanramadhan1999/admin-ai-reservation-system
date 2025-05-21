import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EditBookingDialog } from '@/components/shop-owner/edit-booking-dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useToast } from '@/hooks/use-toast';

// Mock booking data
const bookingData = [
  {
    id: "B001",
    customerName: 'Tanaka Yuki',
    customerPhone: '+81 90-1234-5678',
    startTime: '2025-05-19T18:30:00',
    endTime: '2025-05-19T19:30:00',
    tables: ['Window Seat', 'Regular 1'],
    guests: 3,
    status: 'confirmed',
    notes: 'Birthday celebration. Needs a cake.'
  },
  {
    id: "B002",
    customerName: 'Sato Hiroshi',
    customerPhone: '+81 80-8765-4321',
    startTime: '2025-05-19T19:00:00',
    endTime: '2025-05-19T20:00:00',
    tables: ['Counter'],
    guests: 1,
    status: 'completed',
    notes: ''
  },
  {
    id: "B003",
    customerName: 'Nakamura Akiko',
    customerPhone: '+81 70-2468-1357',
    startTime: '2025-05-19T20:15:00',
    endTime: '2025-05-19T21:30:00',
    tables: ['Private Room'],
    guests: 4,
    status: 'confirmed',
    notes: 'Prefers quiet corner'
  },
  {
    id: "B004",
    customerName: 'Yamamoto Ken',
    customerPhone: '+81 90-1357-2468',
    startTime: '2025-05-19T12:30:00',
    endTime: '2025-05-19T13:30:00',
    tables: ['Garden View', 'Regular 3'],
    guests: 6,
    status: 'cancelled',
    notes: 'Canceled due to emergency'
  },
  {
    id: "B005",
    customerName: 'Watanabe Mei',
    customerPhone: '+81 70-9876-5432',
    startTime: '2025-05-19T13:00:00',
    endTime: '2025-05-19T14:30:00',
    tables: ['Window Seat'],
    guests: 2,
    status: 'confirmed',
    notes: 'Anniversary dinner'
  },
  {
    id: "B006",
    customerName: 'Kato Takashi',
    customerPhone: '+81 80-5555-7777',
    startTime: '2025-05-19T18:00:00',
    endTime: '2025-05-19T19:45:00',
    tables: ['Regular 5', 'Regular 6'],
    guests: 5,
    status: 'confirmed',
    notes: 'Business meeting'
  },
  {
    id: "B007",
    customerName: 'Suzuki Hana',
    customerPhone: '+81 90-2222-3333',
    startTime: '2025-05-19T19:30:00',
    endTime: '2025-05-19T21:00:00',
    tables: ['Counter'],
    guests: 1,
    status: 'completed',
    notes: ''
  },
  {
    id: "B008",
    customerName: 'Tanaka Ryu',
    customerPhone: '+81 70-4444-1111',
    startTime: '2025-05-19T20:00:00',
    endTime: '2025-05-19T22:00:00',
    tables: ['Private Room'],
    guests: 8,
    status: 'confirmed',
    notes: 'Birthday party for daughter'
  },
  {
    id: "B009",
    customerName: 'Ito Yumi',
    customerPhone: '+81 80-7878-9090',
    startTime: '2025-05-19T17:00:00',
    endTime: '2025-05-19T18:30:00',
    tables: ['Garden View'],
    guests: 3,
    status: 'cancelled',
    notes: 'Rescheduled for next week'
  },
  {
    id: "B010",
    customerName: 'Nakamura Sota',
    customerPhone: '+81 90-6060-7070',
    startTime: '2025-05-19T12:00:00',
    endTime: '2025-05-19T13:15:00',
    tables: ['Regular 2'],
    guests: 2,
    status: 'confirmed',
    notes: 'Vegetarian meals required'
  },
  {
    id: "B011",
    customerName: 'Yamada Keiko',
    customerPhone: '+81 70-1010-2020',
    startTime: '2025-05-19T13:30:00',
    endTime: '2025-05-19T15:00:00',
    tables: ['Window Seat', 'Regular 4'],
    guests: 5,
    status: 'confirmed',
    notes: 'Celebrating graduation'
  },
  {
    id: "B012",
    customerName: 'Kimura Haruto',
    customerPhone: '+81 80-3030-4040',
    startTime: '2025-05-19T18:45:00',
    endTime: '2025-05-19T20:15:00',
    tables: ['Counter'],
    guests: 1,
    status: 'completed',
    notes: 'First-time visitor'
  },
];

// Mock table types from Seating menu
const tableTypes = [
  { id: "1", name: "Counter", capacity: 2, quantity: 8 },
  { id: "2", name: "Regular", capacity: 4, quantity: 12 },
  { id: "3", name: "Family", capacity: 6, quantity: 5 },
  { id: "4", name: "Tatami", capacity: 8, quantity: 2 },
  { id: "5", name: "Window Seat", capacity: 4, quantity: 6 },
  { id: "6", name: "Garden View", capacity: 4, quantity: 4 },
  { id: "7", name: "Private Room", capacity: 10, quantity: 1 },
];

// Mock tables by type
const tablesByType = {
  "Counter": ["Counter 1", "Counter 2", "Counter 3", "Counter 4", "Counter 5", "Counter 6", "Counter 7", "Counter 8"],
  "Regular": ["Regular 1", "Regular 2", "Regular 3", "Regular 4", "Regular 5", "Regular 6", "Regular 7", "Regular 8", "Regular 9", "Regular 10", "Regular 11", "Regular 12"],
  "Family": ["Family 1", "Family 2", "Family 3", "Family 4", "Family 5"],
  "Tatami": ["Tatami 1", "Tatami 2"],
  "Window Seat": ["Window Seat 1", "Window Seat 2", "Window Seat 3", "Window Seat 4", "Window Seat 5", "Window Seat 6"],
  "Garden View": ["Garden View 1", "Garden View 2", "Garden View 3", "Garden View 4"],
  "Private Room": ["Private Room 1"],
  "All Types": ["All Tables"]
};

const ShopOwnerBookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [editBookingOpen, setEditBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<any>(null);
  
  const { toast } = useToast();
  const itemsPerPage = 8;
  
  // Format time range for display
  const formatTimeRange = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    
    return `${format(startTime, 'HH:mm')} – ${format(endTime, 'HH:mm')}`;
  };

  // Render appropriate status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'reserved':
        return <Badge className="bg-green-500">Reserved</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'cancelled':
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Filter bookings based on search query and status
  const filteredBookings = bookingData.filter(booking => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    setEditBookingOpen(true);
  };

  const handleCancelBooking = (booking: any) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    // In a real app, this would update the data in the database
    toast({
      title: "Booking Canceled",
      description: "The booking has been successfully canceled."
    });
    setCancelDialogOpen(false);
  };
  
  const handleUpdateBooking = (updatedBooking: any) => {
    // In a real app, this would update the data in the database
    console.log("Updated booking:", updatedBooking);
    setEditBookingOpen(false);
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated."
    });
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Bookings" 
        subtitle="Manage your restaurant reservations"
        date={format(new Date(), 'PPPP')}
      />
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by customer name, phone or booking ID" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Reserved</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Canceled</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left">
              {selectedDate ? format(selectedDate, 'PPP') : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Bookings Table */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Customer Bookings</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Tables</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{booking.date}</span>
                      <span className="text-sm">
                        {booking.timeStart} - {booking.timeEnd} JST
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.tables.map((table, i) => (
                      <span key={i}>
                        {table.type} {table.number}
                        {i < booking.tables.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(booking.status)}
                  </TableCell>
                </TableRow>
              ))}
              {paginatedBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No bookings found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination and Items Per Page Controls */}
        {filteredBookings.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setCurrentPage(1)}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={itemsPerPage.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    // Logic to show current page and surrounding pages
                    let pageToShow;
                    if (totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i;
                    } else {
                      pageToShow = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={pageToShow === currentPage}
                          onClick={() => setCurrentPage(pageToShow)}
                        >
                          {pageToShow}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
