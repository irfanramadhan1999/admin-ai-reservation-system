
import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  
  // State for form values
  const [formValues, setFormValues] = useState({
    customerName: booking.customerName,
    startTime: format(new Date(booking.startTime), 'HH:mm'),
    endTime: format(new Date(booking.endTime), 'HH:mm'),
    guests: booking.guests,
    tables: [...booking.tables],
    status: booking.status,
    notes: booking.notes || '',
  });
  
  // State for table selection
  const [selectedTableType, setSelectedTableType] = useState('');
  const [tableQuantity, setTableQuantity] = useState(1);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  // Handle status change
  const handleStatusChange = (status: string) => {
    setFormValues({
      ...formValues,
      status,
    });
  };
  
  // Handle adding a table
  const handleAddTable = () => {
    if (selectedTableType) {
      const tableType = tableTypes.find(t => t.id === selectedTableType);
      if (tableType) {
        // In a real app, we would need to check table availability
        const newTables = [...formValues.tables];
        for (let i = 0; i < tableQuantity; i++) {
          newTables.push(tableType.name);
        }
        
        setFormValues({
          ...formValues,
          tables: newTables,
        });
        
        // Reset table selection
        setSelectedTableType('');
        setTableQuantity(1);
      }
    }
  };
  
  // Handle removing a table
  const handleRemoveTable = (index: number) => {
    const newTables = [...formValues.tables];
    newTables.splice(index, 1);
    setFormValues({
      ...formValues,
      tables: newTables,
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
      status: formValues.status,
      notes: formValues.notes,
    };
    
    onSubmit(updatedBooking);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogDescription>
            Make changes to the reservation details below
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
          
          {/* Tables */}
          <div className="space-y-4">
            <Label>Tables</Label>
            
            {/* Selected Tables */}
            <div className="flex flex-wrap gap-2">
              {formValues.tables.map((table, index) => (
                <Badge key={index} className="flex gap-1 items-center">
                  {table}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTable(index)}
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
          
          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formValues.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formValues.notes}
              onChange={handleInputChange}
              placeholder="Add any special requests or notes here"
              rows={3}
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
