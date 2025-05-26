
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

  // Filter suitable table types based on guest count
  const suitableTableTypes = tableTypes.filter(type => type.capacity >= guestCount);

  // Group tables by type
  const tablesByType = suitableTableTypes.reduce((acc, type) => {
    acc[type.name] = allTables.filter(table => table.type === type.name);
    return acc;
  }, {} as Record<string, Table[]>);

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Recommended table types for {guestCount} guests:
      </div>
      
      {suitableTableTypes.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No suitable table types found for {guestCount} guests
        </div>
      ) : (
        suitableTableTypes.map(type => (
          <div key={type.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50">
                {type.name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                (Capacity: {type.capacity} people)
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {tablesByType[type.name]?.map(table => (
                <div
                  key={table.id}
                  className={`
                    p-3 border rounded-lg transition-colors
                    ${!table.isAvailable 
                      ? 'bg-red-50 border-red-200 opacity-60' 
                      : selectedTables.includes(table.name)
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }
                  `}
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
        ))
      )}
      
      {selectedTables.length > 0 && (
        <div className="pt-4 border-t">
          <Label className="text-sm font-medium">Selected Tables:</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTables.map((table, index) => (
              <Badge key={index} className="bg-blue-500">
                {table}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
