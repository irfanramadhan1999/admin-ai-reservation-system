
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldAlert, MessageSquare } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

type AlertStatus = 'Pending Review' | 'Reviewed' | 'Blocked';

interface SystemAlert {
  id: number;
  timestamp: string;
  ipAddress: string;
  shop: string;
  shopContact: string;
  reason: string;
  status: AlertStatus;
  conversationId?: string;
}

const SystemAlerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Mock data for system alerts with updated timestamps and reasons
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 1,
      timestamp: 'May 20, 2025 - 14:30',
      ipAddress: '192.168.1.45',
      shop: 'Sakura Sushi Tokyo',
      shopContact: '+81 90-1234-5678',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C001'
    },
    {
      id: 2,
      timestamp: 'May 20, 2025 - 13:15',
      ipAddress: '192.168.3.78',
      shop: 'Milano Pasta House',
      shopContact: '+81 80-8765-4321',
      reason: 'User went off-topic during the call',
      status: 'Pending Review',
      conversationId: 'C002'
    },
    {
      id: 3,
      timestamp: 'May 19, 2025 - 18:45',
      ipAddress: '192.168.5.12',
      shop: 'Paris Bistro',
      shopContact: '+81 70-9876-5432',
      reason: 'User hung up the phone',
      status: 'Blocked',
      conversationId: 'C003'
    },
    {
      id: 4,
      timestamp: 'May 19, 2025 - 15:22',
      ipAddress: '192.168.9.33',
      shop: 'New York Steakhouse',
      shopContact: '+81 90-2468-1357',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C004'
    },
    {
      id: 5,
      timestamp: 'May 18, 2025 - 09:10',
      ipAddress: '192.168.2.55',
      shop: 'Tokyo Ramen',
      shopContact: '+81 80-1357-2468',
      reason: 'User hung up the phone',
      status: 'Reviewed',
      conversationId: 'C005'
    },
    {
      id: 6,
      timestamp: 'May 17, 2025 - 20:05',
      ipAddress: '192.168.7.21',
      shop: 'Barcelona Tapas',
      shopContact: '+81 70-1111-2222',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C006'
    },
    {
      id: 7,
      timestamp: 'May 17, 2025 - 10:30',
      ipAddress: '192.168.4.89',
      shop: 'Indian Curry House',
      shopContact: '+81 90-3333-4444',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C007'
    },
    {
      id: 8,
      timestamp: 'May 16, 2025 - 16:45',
      ipAddress: '192.168.6.37',
      shop: 'Mexican Cantina',
      shopContact: '+81 80-5555-6666',
      reason: 'User went off-topic during the call',
      status: 'Reviewed',
      conversationId: 'C008'
    },
  ]);

  // Filter alerts based on search term, date, and status
  const filteredAlerts = systemAlerts.filter(alert => {
    // Search filter
    const matchesSearch = 
      alert.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.ipAddress.includes(searchTerm) ||
      alert.shopContact.includes(searchTerm);
    
    // Date filter
    let matchesDate = true;
    if (date) {
      const alertDate = new Date(alert.timestamp.split(' - ')[0]);
      const filterDate = new Date(date);
      
      matchesDate = 
        alertDate.getFullYear() === filterDate.getFullYear() &&
        alertDate.getMonth() === filterDate.getMonth() &&
        alertDate.getDate() === filterDate.getDate();
    }
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'blocked' && alert.status === 'Blocked') ||
      (statusFilter === 'unblocked' && (alert.status === 'Pending Review' || alert.status === 'Reviewed'));
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  
  // Get current alerts for pagination
  const currentAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: AlertStatus) => {
    // If already blocked, show unblock confirmation dialog
    if (currentStatus === 'Blocked') {
      setSelectedIP(ipAddress);
      setSelectedAlertId(alertId);
      setOpenUnblockDialog(true);
      return;
    }
    
    // If not blocked, show block confirmation dialog
    setSelectedIP(ipAddress);
    setSelectedAlertId(alertId);
    setOpenBlockDialog(true);
  };

  const handleUnblock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Reviewed' } : alert
        )
      );
    }
    
    toast({
      title: "IP Unblocked",
      description: `${selectedIP} has been unblocked successfully.`,
    });
    setOpenUnblockDialog(false);
  };

  const handleConfirmBlock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Blocked' } : alert
        )
      );
    }
    
    toast({
      title: "IP Blocked",
      description: `${selectedIP} has been blocked successfully.`,
    });
    setOpenBlockDialog(false);
  };

  const handleViewConversation = (conversationId: string) => {
    navigate(`/admin/bookings/conversation/${conversationId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const clearDateFilter = () => {
    setDate(undefined);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">System Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor suspicious activities and potential security threats.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <Input
              placeholder="Search by shop name, contact, or IP address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="md:col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left"
                >
                  {date ? format(date, "yyyy-MM-dd") : "Filter by Date"}
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
          
          <div className="md:col-span-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="unblocked">Unblocked</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-1">
            <Button variant="ghost" onClick={clearDateFilter} className="w-full">
              Clear
            </Button>
          </div>
        </div>

        {/* System Alerts Table */}
        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="text-sm">{alert.timestamp} (Japan)</TableCell>
                  <TableCell className="font-mono text-sm">{alert.ipAddress}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{alert.shop}</span>
                      <span className="text-sm text-muted-foreground">{alert.shopContact}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">{alert.reason}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => alert.conversationId && handleViewConversation(alert.conversationId)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant={alert.status === 'Blocked' ? 'outline' : 'destructive'} 
                        size="sm" 
                        className="flex items-center justify-center"
                        onClick={() => handleToggleBlock(alert.ipAddress, alert.id, alert.status)}
                      >
                        <ShieldAlert className="h-4 w-4 mr-1" />
                        {alert.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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

      {/* Block IP Confirmation Dialog */}
      <AlertDialog open={openBlockDialog} onOpenChange={setOpenBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block IP Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block this IP address {selectedIP}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBlock} className="bg-destructive text-destructive-foreground">
              Confirm Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unblock IP Confirmation Dialog */}
      <AlertDialog open={openUnblockDialog} onOpenChange={setOpenUnblockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unblock IP Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unblock this IP address {selectedIP}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnblock}>
              Confirm Unblock
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default SystemAlerts;
