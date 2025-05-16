
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const SystemAlerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");

  // Mock data for system alerts
  const systemAlerts = [
    {
      id: 1,
      timestamp: '2 min ago',
      ipAddress: '192.168.1.45',
      shop: 'Sakura Sushi Tokyo',
      reason: 'Excessive token usage',
      status: 'New',
    },
    {
      id: 2,
      timestamp: '15 min ago',
      ipAddress: '192.168.3.78',
      shop: 'Milano Pasta House',
      reason: 'Excessive token usage',
      status: 'New',
    },
    {
      id: 3,
      timestamp: '1 hour ago',
      ipAddress: '192.168.5.12',
      shop: 'Paris Bistro',
      reason: 'Excessive token usage',
      status: 'Reviewed',
    },
    {
      id: 4,
      timestamp: '3 hours ago',
      ipAddress: '192.168.9.33',
      shop: 'New York Steakhouse',
      reason: 'Excessive token usage',
      status: 'Reviewed',
    },
    {
      id: 5,
      timestamp: '8 hours ago',
      ipAddress: '192.168.2.55',
      shop: 'Tokyo Ramen',
      reason: 'Excessive token usage',
      status: 'New',
    },
    {
      id: 6,
      timestamp: '1 day ago',
      ipAddress: '192.168.7.21',
      shop: 'Barcelona Tapas',
      reason: 'Excessive token usage',
      status: 'Reviewed',
    },
  ];

  const filteredAlerts = systemAlerts.filter(alert => 
    alert.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.ipAddress.includes(searchTerm)
  );

  const handleOpenBlockDialog = (ipAddress: string) => {
    setSelectedIP(ipAddress);
    setOpenDialog(true);
  };

  const handleConfirmBlock = () => {
    toast({
      title: "IP Blocked",
      description: `${selectedIP} has been blocked successfully.`,
    });
    setOpenDialog(false);
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

        {/* Search Field */}
        <div>
          <Input
            placeholder="Search by shop name or IP address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="text-sm">{alert.timestamp}</TableCell>
                  <TableCell className="font-mono text-sm">{alert.ipAddress}</TableCell>
                  <TableCell>{alert.shop}</TableCell>
                  <TableCell className="max-w-xs">{alert.reason}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={alert.status === 'New' ? 'default' : 'outline'} 
                      className={alert.status === 'New' 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex items-center justify-center"
                      onClick={() => handleOpenBlockDialog(alert.ipAddress)}
                    >
                      <ShieldAlert className="h-4 w-4 mr-1" />
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Block IP Confirmation Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block IP Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block this IP address?
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
    </DashboardLayout>
  );
};

export default SystemAlerts;
