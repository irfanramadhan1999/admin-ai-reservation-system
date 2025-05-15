
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { TableType } from './table-type-card';

interface TableTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTableType: TableType | null;
  onSubmit: (data: Omit<TableType, 'id'>) => void;
}

export const TableTypeDialog: React.FC<TableTypeDialogProps> = ({
  open,
  onOpenChange,
  editingTableType,
  onSubmit
}) => {
  const form = useForm({
    defaultValues: {
      name: editingTableType?.name || '',
      capacity: editingTableType?.capacity || 1,
      quantity: editingTableType?.quantity || 1,
    }
  });

  React.useEffect(() => {
    if (editingTableType) {
      form.reset({
        name: editingTableType.name,
        capacity: editingTableType.capacity,
        quantity: editingTableType.quantity
      });
    } else {
      form.reset({
        name: '',
        capacity: 1,
        quantity: 1
      });
    }
  }, [editingTableType, form]);

  const handleSubmit = (data: any) => {
    onSubmit({
      name: data.name,
      capacity: Number(data.capacity),
      quantity: Number(data.quantity)
    });
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Counter, Private Room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (people)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (tables)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingTableType ? 'Update Table Type' : 'Add Table Type'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
