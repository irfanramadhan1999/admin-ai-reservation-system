
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface TableSelectionSectionProps {
  tableTypes: TableType[];
  selectedTables: string[];
  onAddTable: (tableName: string) => void;
  onRemoveTable: (index: number) => void;
}

export const TableSelectionSection: React.FC<TableSelectionSectionProps> = ({
  tableTypes,
  selectedTables,
  onAddTable,
  onRemoveTable
}) => {
  const [selectedTableType, setSelectedTableType] = useState('');
  const [tableQuantity, setTableQuantity] = useState(1);

  const handleAddTable = () => {
    if (selectedTableType) {
      const tableType = tableTypes.find(t => t.id === selectedTableType);
      if (tableType) {
        for (let i = 0; i < tableQuantity; i++) {
          onAddTable(tableType.name);
        }
        
        setSelectedTableType('');
        setTableQuantity(1);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label>Tables</Label>
      
      {/* Selected Tables */}
      <div className="flex flex-wrap gap-2">
        {selectedTables.map((table, index) => (
          <Badge key={index} className="flex gap-1 items-center">
            {table}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => onRemoveTable(index)}
            />
          </Badge>
        ))}
      </div>
      
      {/* Add Tables */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Select value={selectedTableType} onValueChange={setSelectedTableType}>
            <SelectTrigger>
              <SelectValue placeholder="Table Type" />
            </SelectTrigger>
            <SelectContent>
              {tableTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name} ({type.capacity} people)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            type="number"
            min="1"
            max="10"
            value={tableQuantity}
            onChange={(e) => setTableQuantity(Number(e.target.value))}
            placeholder="Qty"
          />
        </div>
        <div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddTable}
            disabled={!selectedTableType}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};
