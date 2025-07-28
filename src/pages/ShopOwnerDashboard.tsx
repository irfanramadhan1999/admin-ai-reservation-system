
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { RecentBookingsTable } from '@/components/shop-owner/recent-bookings-table';
import { StatusCards } from '@/components/shop-owner/status-cards';
import { BookingsPagination } from '@/components/shop-owner/bookings-pagination';
import { CalendarViewDialog } from '@/components/shop-owner/calendar-view-dialog';
import { Calendar, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShopOwnerDashboard = () => {
  const [isAiActive, setIsAiActive] = useState(true);
  const [isCalendarSynced, setIsCalendarSynced] = useState(false);
  const [isGuranaviSynced, setIsGuranaviSynced] = useState(true);
  const [isHotpepperSynced, setIsHotpepperSynced] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarViewOpen, setCalendarViewOpen] = useState(false);
  
  // Mock data for kPI cards
  const kpiData = [
    {
      title: "Today's Bookings",
      value: '12',
      change: '+20%',
      trend: 'up' as const,
      description: 'Compared to last week',
    },
    {
      title: "Today's Customers",
      value: '38',
      change: '+15%',
      trend: 'up' as const,
      description: 'Expected guests for today',
    },
  ];

  // Sync handlers
  const handleCalendarSync = () => {
    console.log('Calendar sync toggled');
    setIsCalendarSynced(!isCalendarSynced);
  };

  const handleGuranaviSync = () => {
    console.log('Gurunavi sync toggled');
    setIsGuranaviSynced(!isGuranaviSynced);
  };

  const handleHotpepperSync = () => {
    console.log('Hotpepper sync toggled');
    setIsHotpepperSynced(!isHotpepperSynced);
  };

  // Mock data for today's bookings with the correct status types
  const allBookings = [
    {
      id: 1,
      customerName: 'Tanaka Yuki',
      customerPhone: '+81 90-1234-5678',
      startTime: '2025-05-19T18:30:00',
      endTime: '2025-05-19T19:30:00',
      tables: ['Window Seat'],
      guests: 2,
      status: 'confirmed' as const,
    },
    {
      id: 2,
      customerName: 'Sato Hiroshi',
      customerPhone: '+81 80-8765-4321',
      startTime: '2025-05-19T19:00:00',
      endTime: '2025-05-19T20:00:00',
      tables: ['Counter'],
      guests: 1,
      status: 'completed' as const,
    },
    {
      id: 3,
      customerName: 'Nakamura Akiko',
      customerPhone: '+81 70-2468-1357',
      startTime: '2025-05-19T20:15:00',
      endTime: '2025-05-19T21:30:00',
      tables: ['Private Room'],
      guests: 4,
      status: 'confirmed' as const,
    },
    {
      id: 4,
      customerName: 'Yamamoto Ken',
      customerPhone: '+81 90-1357-2468',
      startTime: '2025-05-20T12:30:00',
      endTime: '2025-05-20T13:30:00',
      tables: ['Garden View', 'Regular 3'],
      guests: 6,
      status: 'cancelled' as const,
    },
    {
      id: 5,
      customerName: 'Watanabe Mei',
      customerPhone: '+81 70-9876-5432',
      startTime: '2025-05-19T13:00:00',
      endTime: '2025-05-19T14:30:00',
      tables: ['Window Seat'],
      guests: 2,
      status: 'confirmed' as const,
    },
    {
      id: 6,
      customerName: 'Kato Takashi',
      customerPhone: '+81 80-5555-7777',
      startTime: '2025-05-19T18:00:00',
      endTime: '2025-05-19T19:45:00',
      tables: ['Regular 5', 'Regular 6'],
      guests: 5,
      status: 'confirmed' as const,
    },
    {
      id: 7,
      customerName: 'Suzuki Hana',
      customerPhone: '+81 90-2222-3333',
      startTime: '2025-05-19T19:30:00',
      endTime: '2025-05-19T21:00:00',
      tables: ['Counter'],
      guests: 1,
      status: 'pending' as const,
    },
    {
      id: 8,
      customerName: 'Tanaka Ryu',
      customerPhone: '+81 70-4444-1111',
      startTime: '2025-05-19T20:00:00',
      endTime: '2025-05-19T22:00:00',
      tables: ['Private Room'],
      guests: 8,
      status: 'confirmed' as const,
    },
    {
      id: 9,
      customerName: 'Ito Yumi',
      customerPhone: '+81 80-7878-9090',
      startTime: '2025-05-19T17:00:00',
      endTime: '2025-05-19T18:30:00',
      tables: ['Garden View'],
      guests: 3,
      status: 'cancelled' as const,
    },
    {
      id: 10,
      customerName: 'Nakamura Sota',
      customerPhone: '+81 90-6060-7070',
      startTime: '2025-05-19T12:00:00',
      endTime: '2025-05-19T13:15:00',
      tables: ['Regular 2'],
      guests: 2,
      status: 'confirmed' as const,
    },
  ];
  
  // Items per page
  const itemsPerPage = 8;
  
  // Calculate total pages
  const totalPages = Math.ceil(allBookings.length / itemsPerPage);
  
  // Get current page items
  const currentBookings = allBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Daily overview of bookings, customers, AI assistant status, and sync services."
        date={new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />

      {/* Google Calendar Sync Status Button */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">
              Google Calendar: {isCalendarSynced ? 'Synchronized' : 'Not Synchronized'}
            </span>
            <div className={`w-2 h-2 rounded-full ${isCalendarSynced ? 'bg-green-500' : 'bg-gray-400'}`} />
          </div>
          
          {/* Calendar View Button */}
          <Button 
            onClick={() => setCalendarViewOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CalendarDays className="h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Status Cards Section */}
      <StatusCards 
        bookingsCount={kpiData[0].value}
        customersCount={kpiData[1].value}
        isAiActive={isAiActive}
        isCalendarSynced={isCalendarSynced}
        isGuranaviSynced={isGuranaviSynced}
        isHotpepperSynced={isHotpepperSynced}
        lastAiCall="5 minutes ago"
        lastCalendarSync="1 day ago"
        lastGuranaviSync="2 hours ago"
        lastHotpepperSync="30 minutes ago"
        onAiToggle={setIsAiActive}
        onCalendarSync={handleCalendarSync}
        onGuranaviSync={handleGuranaviSync}
        onHotpepperSync={handleHotpepperSync}
        creditLimitExceeded={true}
      />

      {/* Today's Bookings Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Bookings</h2>
        </div>
        
        <RecentBookingsTable bookings={currentBookings} />
        
        {/* Pagination */}
        {allBookings.length > itemsPerPage && (
          <BookingsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Calendar View Dialog */}
      <CalendarViewDialog
        open={calendarViewOpen}
        onOpenChange={setCalendarViewOpen}
        bookings={allBookings}
      />
    </DashboardLayout>
  );
};

export default ShopOwnerDashboard;
