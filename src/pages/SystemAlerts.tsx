
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Eye } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

type AlertStatus = 'Pending Review' | 'Reviewed' | 'Blocked';

interface SystemAlert {
  id: number;
  timestamp: string;
  ipAddress: string;
  shop: string;
  reason: string;
  status: AlertStatus;
  conversationId?: string;
}

const SystemAlerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Mock data for system alerts with updated timestamps and reasons
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 1,
      timestamp: 'May 20, 2025 - 14:30',
      ipAddress: '192.168.1.45',
      shop: 'Sakura Sushi Tokyo',
      reason: 'User hung up the phone',
      status: 'Pending Review',
      conversationId: 'C001'
    },
    {
      id: 2,
      timestamp: 'May 20, 2025 - 13:15',
      ipAddress: '192.168.3.78',
      shop: 'Milano Pasta House',
      reason: 'User went off-topic during the call',
      status: 'Pending Review',
      conversationId: 'C002'
    },
    {
      id: 3,
      timestamp: 'May 19, 2025 - 18:45',
      ipAddress: '192.168.5.12',
      shop: 'Paris Bistro',
      reason: 'User hung up the phone',
      status: 'Blocked',
      conversationId: 'C003'
    },
    {
      id: 4,
      timestamp: 'May 19, 2025 - 15:22',
      ipAddress: '192.168.9.33',
      shop: 'New York Steakhouse',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C004'
    },
    {
      id: 5,
      timestamp: 'May 18, 2025 - 09:10',
      ipAddress: '192.168.2.55',
      shop: 'Tokyo Ramen',
      reason: 'User hung up the phone',
      status: 'Reviewed',
      conversationId: 'C005'
    },
    {
      id: 6,
      timestamp: 'May 17, 2025 - 20:05',
      ipAddress: '192.168.7.21',
      shop: 'Barcelona Tapas',
      reason: 'User went off-topic during the call',
      status: 'Blocked',
      conversationId: 'C006'
    },
  ]);

  const filteredAlerts = systemAlerts.filter(alert => 
    alert.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.ipAddress.includes(searchTerm)
  );

  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: AlertStatus) => {
    // If already blocked, unblock directly
    if (currentStatus === 'Blocked') {
      handleUnblock(alertId);
      return;
    }
    
    // If not blocked, open confirmation dialog
    setSelectedIP(ipAddress);
    setSelectedAlertId(alertId);
    setOpenDialog(true);
  };

  const handleUnblock = (alertId: number) => {
    setSystemAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: 'Reviewed' } : alert
      )
    );
    
    toast({
      title: "IP Unblocked",
      description: "The IP address has been unblocked successfully.",
    });
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
    setOpenDialog(false);
  };

  const handleViewConversation = (conversationId: string) => {
    navigate(`/admin/bookings/conversation/${conversationId}`);
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
                      variant={alert.status === 'Pending Review' 
                        ? 'default' 
                        : alert.status === 'Blocked'
                        ? 'outline'
                        : 'secondary'
                      } 
                      className={alert.status === 'Pending Review' 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : alert.status === 'Blocked'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-green-500 hover:bg-green-600'
                      }
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => alert.conversationId && handleViewConversation(alert.conversationId)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Conversation
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
