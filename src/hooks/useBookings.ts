import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  tables: string[];
  guests: number;
  status: string;
  notes: string;
}

// Mock booking data
const initialBookingData = [
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

export const useBookings = () => {
  const [bookingData, setBookingData] = useState(initialBookingData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [editBookingOpen, setEditBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  
  const { toast } = useToast();
  
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
  
  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditBookingOpen(true);
  };

  const handleCancelBooking = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      // Update the booking status to cancelled
      setBookingData(prevData => 
        prevData.map(booking => 
          booking.id === bookingToCancel.id 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      
      toast({
        title: "Booking Canceled",
        description: "The booking has been successfully canceled."
      });
    }
    setCancelDialogOpen(false);
    setBookingToCancel(null);
  };
  
  const handleUpdateBooking = (updatedBooking: Booking) => {
    // Update the booking in the data
    setBookingData(prevData =>
      prevData.map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    
    setEditBookingOpen(false);
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated."
    });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
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
    tableTypes,
    tablesByType
  };
};
