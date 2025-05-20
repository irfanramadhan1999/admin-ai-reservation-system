
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { SystemAlert } from './types';
import { AlertTableHeader } from './AlertTableHeader';
import { AlertTableRow } from './AlertTableRow';

interface AlertsTableProps {
  alerts: SystemAlert[];
  onToggleBlock: (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => void;
}

export const AlertsTable = ({ alerts, onToggleBlock }: AlertsTableProps) => {
  return (
    <Table>
      <AlertTableHeader />
      <TableBody>
        {alerts.map((alert) => (
          <AlertTableRow 
            key={alert.id} 
            alert={alert} 
            onToggleBlock={onToggleBlock} 
          />
        ))}
      </TableBody>
    </Table>
  );
};
