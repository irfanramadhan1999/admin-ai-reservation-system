
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { VisualTableSelector } from './visual-table-selector';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface EditBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any;
  tableTypes: TableType[];
  onSubmit: (updatedBooking: any) => void;
}

export function EditBookingDialog({
  open,
  onOpenChange,
  booking,
  tableTypes,
  onSubmit
}: EditBookingDialogProps) {
  // Return null if no booking is selected
  if (!booking) return null;
  
  // State for form values - simplified to only include editable fields
  const [formValues, setFormValues] = useState({
    customerName: booking.customerName,
    startTime: format(new Date(booking.startTime), 'HH:mm'),
    endTime: format(new Date(booking.endTime), 'HH:mm'),
    guests: booking.guests,
    tables: [...booking.tables],
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  // Handle table selection
  const handleTableToggle = (tableName: string) => {
    const currentTables = [...formValues.tables];
    const tableIndex = currentTables.indexOf(tableName);
    
    if (tableIndex > -1) {
      // Remove table if already selected
      currentTables.splice(tableIndex, 1);
    } else {
      // Add table if not selected
      currentTables.push(tableName);
    }
    
    setFormValues({
      ...formValues,
      tables: currentTables,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format times back to ISO string
    const date = new Date(booking.startTime);
    const [startHour, startMinute] = formValues.startTime.split(':');
    const [endHour, endMinute] = formValues.endTime.split(':');
    
    const startTime = new Date(date);
    startTime.setHours(Number(startHour), Number(startMinute));
    
    const endTime = new Date(date);
    endTime.setHours(Number(endHour), Number(endMinute));
    
    const updatedBooking = {
      ...booking,
      customerName: formValues.customerName,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      guests: Number(formValues.guests),
      tables: formValues.tables,
    };
    
    onSubmit(updatedBooking);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogDescription>
            Update the reservation details below
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formValues.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              value={formValues.guests}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formValues.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formValues.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          {/* Visual Table Selection */}
          <div className="space-y-4">
            <Label>Choose Tables</Label>
            <VisualTableSelector
              tableTypes={tableTypes}
              selectedTables={formValues.tables}
              onTableToggle={handleTableToggle}
              guestCount={Number(formValues.guests)}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
