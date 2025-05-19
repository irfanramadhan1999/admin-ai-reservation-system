
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
import { BlockTimeSlotDialog } from '@/components/shop-owner/block-time-slot-dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from '@/hooks/use-toast';

// Mock booking data
const bookingData = [
  {
    id: 1,
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
    id: 2,
    customerName: 'Sato Hiroshi',
    customerPhone: '+81 80-8765-4321',
    startTime: '2025-05-19T19:00:00',
    endTime: '2025-05-19T20:00:00',
    tables: ['Counter'],
    guests: 1,
    status: 'pending',
    notes: ''
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    customerName: 'Suzuki Hana',
    customerPhone: '+81 90-2222-3333',
    startTime: '2025-05-19T19:30:00',
    endTime: '2025-05-19T21:00:00',
    tables: ['Counter'],
    guests: 1,
    status: 'pending',
    notes: ''
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
    customerName: 'Kimura Haruto',
    customerPhone: '+81 80-3030-4040',
    startTime: '2025-05-19T18:45:00',
    endTime: '2025-05-19T20:15:00',
    tables: ['Counter'],
    guests: 1,
    status: 'pending',
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

// Mock blocked time slots data
const blockedTimeSlotsData = [
  {
    id: '1',
    eventName: 'Staff Meeting',
    date: '2025-05-19T00:00:00',
    blockEntireDay: false,
    startTime: '14:00',
    endTime: '16:00',
    tables: ['Private Room']
  },
  {
    id: '2',
    eventName: 'Restaurant Closure',
    date: '2025-05-20T00:00:00',
    blockEntireDay: true,
    startTime: '00:00',
    endTime: '23:59',
    tables: ['All Tables']
  },
  {
    id: '3',
    eventName: 'Special Event',
    date: '2025-05-21T00:00:00',
    blockEntireDay: false,
    startTime: '18:00',
    endTime: '22:00',
    tables: ['Window Seat', 'Garden View']
  }
];

const ShopOwnerBookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [editBookingOpen, setEditBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [blockTimeSlotOpen, setBlockTimeSlotOpen] = useState(false);
  const [selectedBlockedSlot, setSelectedBlockedSlot] = useState<any>(null);
  const [blockedTimeSlots, setBlockedTimeSlots] = useState(blockedTimeSlotsData);
  
  const { toast } = useToast();
  const itemsPerPage = 8; // Updated to show 8 rows per page
  
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
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Filter bookings based on search query and status
  const filteredBookings = bookingData.filter(booking => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone.toLowerCase().includes(searchQuery.toLowerCase());
    
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
  
  const handleUpdateBooking = (updatedBooking: any) => {
    // In a real app, this would update the data in the database
    console.log("Updated booking:", updatedBooking);
    setEditBookingOpen(false);
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated."
    });
  };

  const handleAddBlockedSlot = () => {
    setSelectedBlockedSlot(null);
    setBlockTimeSlotOpen(true);
  };

  const handleEditBlockedSlot = (slot: any) => {
    setSelectedBlockedSlot(slot);
    setBlockTimeSlotOpen(true);
  };

  const handleRemoveBlockedSlot = (id: string) => {
    setBlockedTimeSlots(blockedTimeSlots.filter(slot => slot.id !== id));
    toast({
      title: "Time Slot Unblocked",
      description: "The blocked time slot has been removed."
    });
  };

  const handleBlockTimeSlotSubmit = (blockedSlot: any) => {
    if (selectedBlockedSlot) {
      // Update existing blocked slot
      setBlockedTimeSlots(blockedTimeSlots.map(slot => 
        slot.id === blockedSlot.id ? blockedSlot : slot
      ));
      toast({
        title: "Time Slot Updated",
        description: "The blocked time slot has been updated."
      });
    } else {
      // Add new blocked slot
      setBlockedTimeSlots([...blockedTimeSlots, blockedSlot]);
      toast({
        title: "Time Slot Blocked",
        description: "The time slot has been successfully blocked."
      });
    }
    setBlockTimeSlotOpen(false);
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
            placeholder="Search by customer name or phone" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left">
              {selectedDate ? format(selectedDate, 'PPP') : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
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
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Tables</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                  </TableCell>
                  <TableCell>{formatTimeRange(booking.startTime, booking.endTime)}</TableCell>
                  <TableCell>{booking.tables.join(', ')}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditBooking(booking)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No bookings found that match your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Controls */}
        {filteredBookings.length > 0 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
          </div>
        )}
      </Card>
      
      {/* Blocked Time Slots Section - Reorganized with button at top */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Blocked Time Slots</h2>
            <p className="text-sm text-muted-foreground">
              Reserve tables for special events or closures to prevent bookings on specific dates/times
            </p>
          </div>
          <Button onClick={handleAddBlockedSlot}>
            Block New Time Slot
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Range</TableHead>
                <TableHead>Tables</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedTimeSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.eventName}</TableCell>
                  <TableCell>{format(new Date(slot.date), 'PPP')}</TableCell>
                  <TableCell>
                    {slot.blockEntireDay 
                      ? "All Day" 
                      : `${slot.startTime} - ${slot.endTime}`}
                  </TableCell>
                  <TableCell>{slot.tables.join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlockedSlot(slot)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveBlockedSlot(slot.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blockedTimeSlots.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No blocked time slots found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Edit Booking Modal */}
      <EditBookingDialog
        open={editBookingOpen}
        onOpenChange={setEditBookingOpen}
        booking={selectedBooking}
        tableTypes={tableTypes}
        onSubmit={handleUpdateBooking}
      />
      
      {/* Block Time Slot Modal */}
      <BlockTimeSlotDialog
        open={blockTimeSlotOpen}
        onOpenChange={setBlockTimeSlotOpen}
        tableTypes={tableTypes}
        onSubmit={handleBlockTimeSlotSubmit}
        editingSlot={selectedBlockedSlot}
      />
    </DashboardLayout>
  );
};

export default ShopOwnerBookings;
