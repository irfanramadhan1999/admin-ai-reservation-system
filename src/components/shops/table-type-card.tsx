
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

export type TableType = {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
};

interface TableTypeCardProps {
  tableType: TableType;
  onEdit: (tableType: TableType) => void;
  onDelete: (id: string) => void;
}

export const TableTypeCard: React.FC<TableTypeCardProps> = ({
  tableType,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">{tableType.name}</h3>
          <div className="text-sm text-muted-foreground">
            <span>Capacity: {tableType.capacity} people</span>
            <span className="mx-2">•</span>
            <span>Quantity: {tableType.quantity} tables</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(tableType)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(tableType.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
