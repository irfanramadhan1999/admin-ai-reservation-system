
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { ArrowLeft, Search, CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for bookings, updated to change pending to completed
const bookingData = [
  {
    id: "B001",
    customerName: "John Smith",
    customerPhone: "+81 90-1234-5678",
    ipAddress: "192.168.1.45",
    date: "2025-05-20",
    timeStart: "18:30",
    timeEnd: "19:30",
    tables: [
      { type: "Window Seat", number: 1 },
      { type: "Window Seat", number: 2 }
    ],
    guests: 4,
    status: "reserved"
  },
  {
    id: "B002",
    customerName: "Emma Johnson",
    customerPhone: "+81 80-8765-4321",
    ipAddress: "192.168.3.22",
    date: "2025-05-20",
    timeStart: "19:00",
    timeEnd: "20:00",
    tables: [
      { type: "Booth", number: 3 }
    ],
    guests: 2,
    status: "completed"
  },
  {
    id: "B003",
    customerName: "Michael Brown",
    customerPhone: "+81 70-9876-5432",
    ipAddress: "192.168.5.89",
    date: "2025-05-19",
    timeStart: "20:00",
    timeEnd: "21:30",
    tables: [
      { type: "Counter", number: 5 },
      { type: "Counter", number: 6 }
    ],
    guests: 6,
    status: "reserved"
  },
  {
    id: "B004",
    customerName: "Sarah Wilson",
    customerPhone: "+81 90-2468-1357",
    ipAddress: "192.168.8.17",
    date: "2025-05-19",
    timeStart: "17:30",
    timeEnd: "18:30",
    tables: [
      { type: "Patio", number: 4 }
    ],
    guests: 3,
    status: "canceled"
  },
  {
    id: "B005",
    customerName: "David Lee",
    customerPhone: "+81 80-1357-2468",
    ipAddress: "192.168.2.35",
    date: "2025-05-18",
    timeStart: "18:00",
    timeEnd: "19:00",
    tables: [
      { type: "Booth", number: 7 }
    ],
    guests: 2,
    status: "completed"
  },
  {
    id: "B006",
    customerName: "Lisa Garcia",
    customerPhone: "+81 70-1111-2222",
    ipAddress: "192.168.4.78",
    date: "2025-05-18",
    timeStart: "19:30",
    timeEnd: "21:00",
    tables: [
      { type: "Window Seat", number: 3 }
    ],
    guests: 4,
    status: "reserved"
  },
  {
    id: "B007",
    customerName: "Robert Chen",
    customerPhone: "+81 90-3333-4444",
    ipAddress: "192.168.6.91",
    date: "2025-05-17",
    timeStart: "18:00",
    timeEnd: "19:30",
    tables: [
      { type: "Counter", number: 1 },
      { type: "Counter", number: 2 }
    ],
    guests: 5,
    status: "completed"
  }
];

// Restaurant details
const restaurantDetails = {
  name: "Sakura Sushi Tokyo",
  address: "1234 Main St, Tokyo, Japan",
  seatSummary: "8 tables, 32 total seats"
};

const Bookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Filter bookings based on search term, status, and date range
  const filteredBookings = bookingData.filter(booking => {
    // Search filter
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    // Date range filter
    let matchesDateRange = true;
    const bookingDate = new Date(booking.date);
    
    if (startDate && endDate) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      matchesDateRange = bookingDate >= startOfDay && bookingDate <= endOfDay;
    } else if (startDate) {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      matchesDateRange = bookingDate >= startOfDay;
    } else if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      matchesDateRange = bookingDate <= endOfDay;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  // Get current bookings for pagination
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBackToShops = () => {
    navigate('/shops');
  };
  
  const handleViewConversation = (id: string) => {
    navigate(`/admin/bookings/conversation/${id}`);
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
  
  // Helper function for status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'reserved':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Reserved</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Canceled</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Back button and Header Section */}
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            className="w-fit text-muted-foreground gap-1" 
            onClick={handleBackToShops}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shops
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold">{restaurantDetails.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {restaurantDetails.address}
            </p>
            <p className="text-sm text-muted-foreground">
              {restaurantDetails.seatSummary}
            </p>
          </div>
        </div>
        
        {/* Filter & Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative md:col-span-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID, customer name or phone"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Range Filter */}
          <div className="md:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left"
                >
                  {startDate ? format(startDate, "yyyy-MM-dd") : "Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="md:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left"
                >
                  {endDate ? format(endDate, "yyyy-MM-dd") : "End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="md:col-span-2">
            <Button 
              variant="ghost" 
              onClick={clearDateFilters} 
              className="w-full h-10 px-0" 
              aria-label="Clear date filters"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Table Section */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Tables</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{booking.customerName}</span>
                        <span className="text-sm text-muted-foreground">{booking.customerPhone}</span>
                      </div>
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
                      {booking.guests} {booking.guests > 1 ? 'people' : 'person'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(booking.status)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No bookings found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination and Items Per Page Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={itemsPerPage.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
