
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
import { Edit, Trash2, CalendarDays, Plus, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
    createdAt: "2025-01-15"
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
    createdAt: "2025-02-03"
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
    createdAt: "2025-02-20"
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
    createdAt: "2025-03-05"
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
    createdAt: "2025-03-18"
  }
];

const Shops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Filtered shops based on search term
  const filteredShops = shopData.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shop.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditShop = (id: string) => {
    navigate(`/shops/edit/${id}`);
  };
  
  const handleDeleteShop = (id: string) => {
    toast({
      title: "Delete Shop",
      description: `Deleting shop with ID: ${id}`
    });
  };
  
  const handleViewBookings = (id: string) => {
    navigate('/bookings');
  };
  
  const handleCreateShop = () => {
    navigate('/shops/create');
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
              {filteredShops.map((shop) => (
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
                        onClick={() => handleDeleteShop(shop.id)}
                        title="Delete"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBookings(shop.id)}
                        title="Bookings"
                      >
                        <CalendarDays className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shops;
