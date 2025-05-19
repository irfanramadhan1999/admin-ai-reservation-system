
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TableType } from '@/components/shops/table-type-card';

interface BlockTimeSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableTypes: TableType[];
  onSubmit: (blockedSlot: any) => void;
  editingSlot?: any;
}

export function BlockTimeSlotDialog({
  open,
  onOpenChange,
  tableTypes,
  onSubmit,
  editingSlot
}: BlockTimeSlotDialogProps) {
  // Initialize form with editing slot data or defaults
  const [formValues, setFormValues] = useState({
    eventName: editingSlot?.eventName || '',
    date: editingSlot?.date ? new Date(editingSlot.date) : new Date(),
    blockEntireDay: editingSlot?.blockEntireDay || false,
    startTime: editingSlot?.startTime || '09:00',
    endTime: editingSlot?.endTime || '17:00',
    tableTypeId: editingSlot?.tableTypeId || '',
    tableQuantity: editingSlot?.tableQuantity || 1,
    selectedTables: editingSlot?.tables || []
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormValues({
        ...formValues,
        date
      });
    }
  };

  const handleBlockEntireDayChange = (checked: boolean) => {
    setFormValues({
      ...formValues,
      blockEntireDay: checked,
      startTime: checked ? '00:00' : '09:00',
      endTime: checked ? '23:59' : '17:00'
    });
  };

  const handleTableTypeChange = (value: string) => {
    setFormValues({
      ...formValues,
      tableTypeId: value,
      tableQuantity: 1
    });
  };

  const handleAddTable = () => {
    if (formValues.tableTypeId) {
      const tableType = tableTypes.find(t => t.id === formValues.tableTypeId);
      if (tableType) {
        const newTables = [...formValues.selectedTables];
        
        // Add tables based on quantity
        for (let i = 0; i < formValues.tableQuantity; i++) {
          newTables.push(tableType.name);
        }
        
        setFormValues({
          ...formValues,
          selectedTables: newTables,
          tableTypeId: '',
          tableQuantity: 1
        });
      }
    }
  };

  const handleRemoveTable = (index: number) => {
    const newTables = [...formValues.selectedTables];
    newTables.splice(index, 1);
    setFormValues({
      ...formValues,
      selectedTables: newTables
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blockedSlot = {
      id: editingSlot?.id || Date.now().toString(),
      eventName: formValues.eventName,
      date: formValues.date.toISOString(),
      blockEntireDay: formValues.blockEntireDay,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      tables: formValues.selectedTables
    };
    
    onSubmit(blockedSlot);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingSlot ? 'Edit Blocked Time Slot' : 'Block New Time Slot'}</DialogTitle>
          <DialogDescription>
            {editingSlot 
              ? 'Update the details of this blocked time slot.' 
              : 'Block a time slot to prevent customer bookings during this period.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              name="eventName"
              value={formValues.eventName}
              onChange={handleInputChange}
              placeholder="Staff Meeting, Special Event, etc."
              required
            />
          </div>
          
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  id="date"
                >
                  {formValues.date ? format(formValues.date, 'PPP') : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formValues.date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Block Entire Day */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="blockEntireDay" 
              checked={formValues.blockEntireDay}
              onCheckedChange={handleBlockEntireDayChange}
            />
            <Label htmlFor="blockEntireDay" className="cursor-pointer">Block entire day</Label>
          </div>
          
          {/* Time Range - hidden when block entire day is checked */}
          {!formValues.blockEntireDay && (
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
          )}
          
          {/* Tables */}
          <div className="space-y-4">
            <Label>Tables</Label>
            
            {/* Selected Tables */}
            <div className="flex flex-wrap gap-2">
              {formValues.selectedTables.map((table, index) => (
                <div key={index} className="bg-blue-100 px-2 py-1 rounded-md flex items-center gap-1">
                  {table}
                  <button
                    type="button"
                    onClick={() => handleRemoveTable(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add Tables */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Select value={formValues.tableTypeId} onValueChange={handleTableTypeChange}>
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
                  value={formValues.tableQuantity}
                  onChange={(e) => setFormValues({
                    ...formValues,
                    tableQuantity: parseInt(e.target.value) || 1
                  })}
                  placeholder="Qty"
                />
              </div>
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTable}
                  disabled={!formValues.tableTypeId}
                  className="w-full"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingSlot ? 'Update Time Slot' : 'Block Time Slot'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
