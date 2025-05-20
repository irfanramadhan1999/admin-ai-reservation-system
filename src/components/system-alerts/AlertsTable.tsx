
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ShieldAlert, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SystemAlert } from './types';

interface AlertsTableProps {
  alerts: SystemAlert[];
  onToggleBlock: (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => void;
}

export const AlertsTable = ({ alerts, onToggleBlock }: AlertsTableProps) => {
  const navigate = useNavigate();

  const handleViewConversation = (conversationId: string) => {
    navigate(`/admin/bookings/conversation/${conversationId}`);
  };

  return (
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
        {alerts.map((alert) => (
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
                  onClick={() => onToggleBlock(alert.ipAddress, alert.id, alert.status)}
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
  );
};
