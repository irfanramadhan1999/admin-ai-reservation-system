
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
import { ArrowLeft, Search, CalendarIcon, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for bookings
const bookingData = [
  {
    id: "B001",
    customerName: "John Smith",
    ipAddress: "192.168.1.45",
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
    ipAddress: "192.168.3.22",
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
    ipAddress: "192.168.5.89",
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
    ipAddress: "192.168.8.17",
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
    ipAddress: "192.168.2.35",
    timeStart: "18:00",
    timeEnd: "19:00",
    tables: [
      { type: "Booth", number: 7 }
    ],
    guests: 2,
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
  const [date, setDate] = useState<Date>(new Date());
  
  // Filter bookings based on search term and status
  const filteredBookings = bookingData.filter(booking => {
    // Search filter
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleBackToShops = () => {
    navigate('/shops');
  };
  
  const handleViewConversation = (id: string) => {
    navigate(`/bookings/conversation/${id}`);
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID or customer name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
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
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full md:w-[240px] justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>
                      {booking.customerName}
                    </TableCell>
                    <TableCell>
                      {booking.timeStart} - {booking.timeEnd}
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
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewConversation(booking.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No bookings found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
