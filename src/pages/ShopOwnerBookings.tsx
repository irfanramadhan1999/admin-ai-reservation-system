
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
  },
];

const ShopOwnerBookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
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
      <Card className="p-6">
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
              {filteredBookings.map((booking) => (
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
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No bookings found that match your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwnerBookings;
