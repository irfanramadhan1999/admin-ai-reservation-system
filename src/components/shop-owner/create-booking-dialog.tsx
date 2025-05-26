
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
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

interface CreateBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableTypes: TableType[];
  onSubmit: (newBooking: any) => void;
}

export function CreateBookingDialog({
  open,
  onOpenChange,
  tableTypes,
  onSubmit
}: CreateBookingDialogProps) {
  // State for form values
  const [formValues, setFormValues] = useState({
    customerName: '',
    customerPhone: '',
    startTime: '',
    endTime: '',
    guests: 1,
    tables: [] as string[],
    status: 'confirmed',
    notes: '',
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

  // Reset form when dialog closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormValues({
        customerName: '',
        customerPhone: '',
        startTime: '',
        endTime: '',
        guests: 1,
        tables: [],
        status: 'confirmed',
        notes: '',
      });
      setSelectedTableType('');
      setTableQuantity(1);
    }
    onOpenChange(isOpen);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create date objects for times (using today's date)
    const today = new Date();
    const [startHour, startMinute] = formValues.startTime.split(':');
    const [endHour, endMinute] = formValues.endTime.split(':');
    
    const startTime = new Date(today);
    startTime.setHours(Number(startHour), Number(startMinute));
    
    const endTime = new Date(today);
    endTime.setHours(Number(endHour), Number(endMinute));
    
    const newBooking = {
      id: `B${String(Date.now()).slice(-3)}`, // Generate simple ID
      customerName: formValues.customerName,
      customerPhone: formValues.customerPhone,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      guests: Number(formValues.guests),
      tables: formValues.tables,
      status: formValues.status,
      notes: formValues.notes,
    };
    
    onSubmit(newBooking);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Add a new reservation to your restaurant
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
            
            {/* Customer Phone */}
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                value={formValues.customerPhone}
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
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
