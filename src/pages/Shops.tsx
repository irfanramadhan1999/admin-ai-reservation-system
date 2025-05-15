
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, CalendarDays, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Sample data
const shopData = [
  {
    id: "1",
    name: "The Olive Garden",
    contact: "+1 (555) 123-4567",
    address: "1234 Main St, New York, NY 10001",
    googleCalendar: true,
    seatTypes: 3,
    totalSeats: 42
  },
  {
    id: "2",
    name: "Sushi Heaven",
    contact: "+1 (555) 987-6543",
    address: "789 Oak Ave, San Francisco, CA 94102",
    googleCalendar: true,
    seatTypes: 2,
    totalSeats: 28
  },
  {
    id: "3",
    name: "Pasta Paradise",
    contact: "+1 (555) 456-7890",
    address: "567 Pine St, Chicago, IL 60611",
    googleCalendar: false,
    seatTypes: 4,
    totalSeats: 36
  },
  {
    id: "4",
    name: "Burger Bliss",
    contact: "+1 (555) 321-6547",
    address: "890 Maple Rd, Miami, FL 33101",
    googleCalendar: false,
    seatTypes: 2,
    totalSeats: 24
  },
  {
    id: "5",
    name: "Thai Delight",
    contact: "+1 (555) 789-0123",
    address: "432 Cedar Ln, Seattle, WA 98101",
    googleCalendar: true,
    seatTypes: 3,
    totalSeats: 32
  }
];

const Shops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Filtered shops based on search term
  const filteredShops = shopData.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditShop = (id: string) => {
    // Navigate to edit shop page with the shop ID
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
            placeholder="Search by shop name or address"
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
                <TableHead>Shop Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Google Calendar</TableHead>
                <TableHead>Seat Summary</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.contact}</TableCell>
                  <TableCell className="max-w-[250px] truncate" title={shop.address}>
                    {shop.address}
                  </TableCell>
                  <TableCell>
                    {shop.googleCalendar ? (
                      <Badge variant="default" className="bg-emerald-400 hover:bg-emerald-500">Connected</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Not Connected</Badge>
                    )}
                  </TableCell>
                  <TableCell>{shop.seatTypes} types / {shop.totalSeats} seats</TableCell>
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
