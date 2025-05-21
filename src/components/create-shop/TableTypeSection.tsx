
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface TableTypeSectionProps {
  tableTypes: TableType[];
  onAddTableType: () => void;
  onEditTableType: (tableType: TableType) => void;
  onDeleteTableType: (id: string) => void;
}

export const TableTypeSection: React.FC<TableTypeSectionProps> = ({
  tableTypes = [],
  onAddTableType,
  onEditTableType,
  onDeleteTableType
}) => {
  return (
    <Card className="mb-8 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Table Types</h2>
          <Button onClick={onAddTableType} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Table Type</span>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableTypes.length > 0 ? (
                tableTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.capacity} people</TableCell>
                    <TableCell>{type.quantity}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEditTableType(type)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => onDeleteTableType(type.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No table types defined yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          Define the different types of tables available at your restaurant, their seating capacity, and how many of each type you have.
        </p>
      </CardContent>
    </Card>
  );
};
