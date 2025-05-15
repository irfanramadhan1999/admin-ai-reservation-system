
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableType } from './table-type-card';

interface TableTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<TableType, 'id'>) => void;
  editingTableType: TableType | null;
}

export const TableTypeDialog: React.FC<TableTypeDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  editingTableType
}) => {
  const isEditing = !!editingTableType;
  
  const form = useForm({
    defaultValues: {
      name: editingTableType?.name || '',
      capacity: editingTableType?.capacity || 1,
      quantity: editingTableType?.quantity || 1
    }
  });
  
  // Reset form when dialog opens or editingTableType changes
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: editingTableType?.name || '',
        capacity: editingTableType?.capacity || 1,
        quantity: editingTableType?.quantity || 1
      });
    }
  }, [open, editingTableType, form]);
  
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit({
      name: data.name,
      capacity: Number(data.capacity),
      quantity: Number(data.quantity)
    });
    onOpenChange(false);
  });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Table Type' : 'Add Table Type'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Table Type Name</Label>
            <Input
              id="name"
              placeholder="e.g., Counter, Booth, Family Table"
              {...form.register('name', { required: true })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (people)</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                {...form.register('capacity', { 
                  required: true,
                  valueAsNumber: true,
                  min: 1
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (tables)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                {...form.register('quantity', { 
                  required: true,
                  valueAsNumber: true,
                  min: 1
                })}
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Table Type' : 'Add Table Type'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
