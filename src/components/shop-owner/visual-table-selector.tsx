
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface Table {
  id: string;
  name: string;
  type: string;
  isAvailable: boolean;
}

interface VisualTableSelectorProps {
  tableTypes: TableType[];
  selectedTables: string[];
  onTableToggle: (tableName: string) => void;
  guestCount: number;
}

export const VisualTableSelector: React.FC<VisualTableSelectorProps> = ({
  tableTypes,
  selectedTables,
  onTableToggle,
  guestCount
}) => {
  // Generate mock table availability data
  const generateTables = (tableTypes: TableType[]): Table[] => {
    const tables: Table[] = [];
    
    tableTypes.forEach(type => {
      for (let i = 1; i <= type.quantity; i++) {
        // Mock some tables as unavailable for demonstration
        const isAvailable = Math.random() > 0.3; // 70% chance of being available
        tables.push({
          id: `${type.id}-${i}`,
          name: `${type.name} ${i}`,
          type: type.name,
          isAvailable
        });
      }
    });
    
    return tables;
  };

  const allTables = generateTables(tableTypes);

  // Find the most appropriate table type (smallest capacity that can accommodate guests)
  const suitableTableTypes = tableTypes
    .filter(type => type.capacity >= guestCount)
    .sort((a, b) => a.capacity - b.capacity);
  
  const mostAppropriateType = suitableTableTypes.length > 0 ? suitableTableTypes[0] : null;

  // Group tables by the most appropriate type only
  const appropriateTables = mostAppropriateType 
    ? allTables.filter(table => table.type === mostAppropriateType.name)
    : [];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Choose Tables for {guestCount} guests:
      </div>
      
      {!mostAppropriateType ? (
        <div className="text-center py-4 text-muted-foreground">
          No suitable table types found for {guestCount} guests
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50">
              {mostAppropriateType.name}
            </Badge>
            <span className="text-sm text-muted-foreground">
              (Capacity: {mostAppropriateType.capacity} people)
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {appropriateTables.map(table => (
              <div
                key={table.id}
                className={`
                  p-3 border rounded-lg transition-colors cursor-pointer
                  ${!table.isAvailable 
                    ? 'bg-red-50 border-red-200 opacity-60 cursor-not-allowed' 
                    : selectedTables.includes(table.name)
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => table.isAvailable && onTableToggle(table.name)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={table.id}
                    checked={selectedTables.includes(table.name)}
                    onCheckedChange={() => table.isAvailable && onTableToggle(table.name)}
                    disabled={!table.isAvailable}
                  />
                  <Label
                    htmlFor={table.id}
                    className={`
                      text-sm font-medium cursor-pointer
                      ${!table.isAvailable ? 'text-red-500 line-through' : ''}
                    `}
                  >
                    {table.name}
                  </Label>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {table.isAvailable ? 'Available' : 'Booked'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
