
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const AlertTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Timestamp</TableHead>
        <TableHead>IP Address</TableHead>
        <TableHead>Shop</TableHead>
        <TableHead>Reason</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
