import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ShieldAlert, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SystemAlert } from './types';

interface AlertTableRowProps {
  alert: SystemAlert;
  onToggleBlock: (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => void;
}

export const AlertTableRow = ({ alert, onToggleBlock }: AlertTableRowProps) => {
  const navigate = useNavigate();

  const handleViewConversation = (conversationId: string) => {
    navigate(`/admin/bookings/conversation/${conversationId}`);
  };
  
  // Format the timestamp to include JST timezone
  const formatTimestampWithJST = (timestamp: string) => {
    // If timestamp already contains JST suffix, return as is
    if (timestamp.includes('JST')) return timestamp;
    
    // Otherwise add JST suffix
    return `${timestamp} JST`;
  };

  return (
    <TableRow>
      <TableCell className="text-sm">{formatTimestampWithJST(alert.timestamp)}</TableCell>
      <TableCell className="font-mono text-sm">{alert.ipAddress}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{alert.shop}</span>
          <span className="text-sm text-muted-foreground">{alert.shopContact}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-xs">{alert.reason}</TableCell>
      <TableCell className="text-right">
        <ActionButtons 
          alert={alert} 
          onViewConversation={handleViewConversation} 
          onToggleBlock={onToggleBlock} 
        />
      </TableCell>
    </TableRow>
  );
};

// Separate component for action buttons
interface ActionButtonsProps {
  alert: SystemAlert;
  onViewConversation: (conversationId: string) => void;
  onToggleBlock: (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => void;
}

const ActionButtons = ({ alert, onViewConversation, onToggleBlock }: ActionButtonsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center justify-center min-w-[80px]"
        onClick={() => alert.conversationId && onViewConversation(alert.conversationId)}
      >
        <MessageSquare className="h-4 w-4 mr-1" />
        View
      </Button>
      <Button 
        variant={alert.status === 'Blocked' ? 'outline' : 'destructive'} 
        size="sm" 
        className="flex items-center justify-center min-w-[80px]"
        onClick={() => onToggleBlock(alert.ipAddress, alert.id, alert.status)}
      >
        <ShieldAlert className="h-4 w-4 mr-1" />
        {alert.status === 'Blocked' ? 'Unblock' : 'Block'}
      </Button>
    </div>
  );
};
