
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface TableTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (tableType: TableType) => void;
  editingTableType: TableType | null;
}

export const TableTypeDialog: React.FC<TableTypeDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  editingTableType
}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('2');
  const [quantity, setQuantity] = useState('1');

  // Reset form or populate with editing data when opened
  useEffect(() => {
    if (open) {
      if (editingTableType) {
        setName(editingTableType.name);
        setCapacity(editingTableType.capacity.toString());
        setQuantity(editingTableType.quantity.toString());
      } else {
        setName('');
        setCapacity('2');
        setQuantity('1');
      }
    }
  }, [open, editingTableType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) return;
    
    const tableTypeData: TableType = {
      id: editingTableType?.id || crypto.randomUUID(),
      name: name.trim(),
      capacity: parseInt(capacity, 10) || 1,
      quantity: parseInt(quantity, 10) || 1
    };
    
    onSave(tableTypeData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingTableType ? 'Edit Table Type' : 'Add New Table Type'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="tableName">Table Type Name</Label>
            <Input
              id="tableName"
              placeholder="e.g., Window Seat, Private Room"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Seating Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTableType ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
