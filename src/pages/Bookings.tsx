
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
    id: "1",
    customerName: "John Smith",
    customerPhone: "+1 (555) 123-4567",
    timeStart: "18:30",
    timeEnd: "19:30",
    tables: [
      { type: "Window Seat", number: 1 },
      { type: "Window Seat", number: 2 }
    ],
    guests: 4,
    status: "confirmed"
  },
  {
    id: "2",
    customerName: "Emma Johnson",
    customerPhone: "+1 (555) 234-5678",
    timeStart: "19:00",
    timeEnd: "20:00",
    tables: [
      { type: "Booth", number: 3 }
    ],
    guests: 2,
    status: "pending"
  },
  {
    id: "3",
    customerName: "Michael Brown",
    customerPhone: "+1 (555) 345-6789",
    timeStart: "20:00",
    timeEnd: "21:30",
    tables: [
      { type: "Counter", number: 5 },
      { type: "Counter", number: 6 }
    ],
    guests: 6,
    status: "confirmed"
  },
  {
    id: "4",
    customerName: "Sarah Wilson",
    customerPhone: "+1 (555) 456-7890",
    timeStart: "17:30",
    timeEnd: "18:30",
    tables: [
      { type: "Patio", number: 4 }
    ],
    guests: 3,
    status: "cancel"
  },
  {
    id: "5",
    customerName: "David Lee",
    customerPhone: "+1 (555) 567-8901",
    timeStart: "18:00",
    timeEnd: "19:00",
    tables: [
      { type: "Booth", number: 7 }
    ],
    guests: 2,
    status: "confirmed"
  }
];

const restaurantName = "Sakura Sushi Tokyo";

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
      booking.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleBackToShops = () => {
    navigate('/shops');
  };
  
  const handleViewConversation = (id: string) => {
    console.log("View conversation for booking ID:", id);
    // Implementation for viewing conversation would go here
  };
  
  // Helper function for status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-500">Pending</Badge>;
      case 'cancel':
        return <Badge variant="destructive">Cancel</Badge>;
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
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your restaurant reservations
            </p>
            <p className="text-md font-medium mt-1">{restaurantName}</p>
          </div>
        </div>
        
        {/* Filter & Search Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name or phone"
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
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
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{booking.customerName}</span>
                        <span className="text-sm text-muted-foreground">{booking.customerPhone}</span>
                      </div>
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
                        <span>View Conversation</span>
                      </Button>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
