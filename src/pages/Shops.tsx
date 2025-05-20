import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Edit, 
  CalendarDays, 
  Plus, 
  Calendar, 
  ExternalLink
} from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Sample data
const shopData = [
  {
    id: "1",
    name: "The Olive Garden",
    contact: "+1 (555) 123-4567",
    tokenUsage: {
      used: 1250,
      limit: 5000
    },
    totalBookings: 42,
    createdAt: "2025-01-15",
    isActive: true,
    frontendUrl: "https://olivegarden.reserveai.jp"
  },
  {
    id: "2",
    name: "Sushi Heaven",
    contact: "+1 (555) 987-6543",
    tokenUsage: {
      used: 3100,
      limit: 5000
    },
    totalBookings: 28,
    createdAt: "2025-02-03",
    isActive: true,
    frontendUrl: "https://sushiheaven.reserveai.jp"
  },
  {
    id: "3",
    name: "Pasta Paradise",
    contact: "+1 (555) 456-7890",
    tokenUsage: {
      used: 2400,
      limit: 5000
    },
    totalBookings: 36,
    createdAt: "2025-02-20",
    isActive: false,
    frontendUrl: "https://pastaparadise.reserveai.jp"
  },
  {
    id: "4",
    name: "Burger Bliss",
    contact: "+1 (555) 321-6547",
    tokenUsage: {
      used: 4200,
      limit: 5000
    },
    totalBookings: 24,
    createdAt: "2025-03-05",
    isActive: true,
    frontendUrl: "https://burgerbliss.reserveai.jp"
  },
  {
    id: "5",
    name: "Thai Delight",
    contact: "+1 (555) 789-0123",
    tokenUsage: {
      used: 1900,
      limit: 5000
    },
    totalBookings: 32,
    createdAt: "2025-03-18",
    isActive: true,
    frontendUrl: "https://thaidelight.reserveai.jp"
  },
  {
    id: "6",
    name: "Mexican Fiesta",
    contact: "+1 (555) 234-5678",
    tokenUsage: {
      used: 2100,
      limit: 5000
    },
    totalBookings: 29,
    createdAt: "2025-03-25",
    isActive: true,
    frontendUrl: "https://mexicanfiesta.reserveai.jp"
  },
  {
    id: "7",
    name: "French Bistro",
    contact: "+1 (555) 876-5432",
    tokenUsage: {
      used: 1800,
      limit: 5000
    },
    totalBookings: 22,
    createdAt: "2025-04-02",
    isActive: false,
    frontendUrl: "https://frenchbistro.reserveai.jp"
  },
  {
    id: "8",
    name: "Indian Spice",
    contact: "+1 (555) 345-6789",
    tokenUsage: {
      used: 2700,
      limit: 5000
    },
    totalBookings: 38,
    createdAt: "2025-04-10",
    isActive: true,
    frontendUrl: "https://indianspice.reserveai.jp"
  },
  {
    id: "9",
    name: "Steakhouse Prime",
    contact: "+1 (555) 567-8901",
    tokenUsage: {
      used: 3500,
      limit: 5000
    },
    totalBookings: 45,
    createdAt: "2025-04-17",
    isActive: true,
    frontendUrl: "https://steakhouseprime.reserveai.jp"
  },
  {
    id: "10",
    name: "Seafood Harbor",
    contact: "+1 (555) 678-9012",
    tokenUsage: {
      used: 2200,
      limit: 5000
    },
    totalBookings: 31,
    createdAt: "2025-04-25",
    isActive: true,
    frontendUrl: "https://seafoodharbor.reserveai.jp"
  }
];

const Shops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [shops, setShops] = useState(shopData);
  const itemsPerPage = 8;
  
  // Filtered shops based on search term
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shop.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  
  // Get current shops for pagination
  const currentShops = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleEditShop = (id: string) => {
    navigate(`/admin/shops/edit/${id}`);
  };
  
  const handleViewBookings = (id: string) => {
    navigate('/admin/bookings');
  };
  
  const handleCreateShop = () => {
    navigate('/admin/shops/create');
  };

  const handleDirectToShop = (url: string) => {
    // Open in a new tab
    window.open(url, '_blank');
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shops</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all registered restaurants in the system. View, search, and create new shops.
            </p>
          </div>
          <Button onClick={handleCreateShop} size="lg" className="gap-1">
            <Plus className="h-4 w-4" /> Create New Shop
          </Button>
        </div>
        
        {/* Search Section */}
        <div className="w-full">
          <Input
            placeholder="Search by shop name or contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full"
          />
        </div>
        
        {/* Table Section */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Information</TableHead>
                <TableHead>Token Usage</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{shop.name}</span>
                      <span className="text-sm text-muted-foreground">{shop.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{shop.tokenUsage.used.toLocaleString()} / {shop.tokenUsage.limit.toLocaleString()}</span>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${shop.tokenUsage.used / shop.tokenUsage.limit > 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${(shop.tokenUsage.used / shop.tokenUsage.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shop.totalBookings}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditShop(shop.id)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBookings(shop.id)}
                        title="Bookings"
                      >
                        <CalendarDays className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDirectToShop(shop.frontendUrl)}
                        title="Direct to Shop"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center py-4">
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
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shops;
