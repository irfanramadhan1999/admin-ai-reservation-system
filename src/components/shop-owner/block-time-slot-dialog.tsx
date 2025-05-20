import React, { useState, useEffect } from 'react';
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
  tablesByType: Record<string, string[]>; // Added this prop
  onSubmit: (blockedSlot: any) => void;
  editingSlot?: any;
}

export function BlockTimeSlotDialog({
  open,
  onOpenChange,
  tableTypes,
  tablesByType, // Now this prop is properly typed
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
    selectedTables: editingSlot?.tables || []
  });
  
  // State for generated tables based on selected table type
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  
  // Update available tables when table type changes
  useEffect(() => {
    if (formValues.tableTypeId) {
      const selectedType = tableTypes.find(t => t.id === formValues.tableTypeId);
      if (selectedType) {
        // If we have predefined tables for this type, use them
        if (tablesByType[selectedType.name]) {
          setAvailableTables(tablesByType[selectedType.name]);
        } else {
          // Otherwise, generate numbered tables based on quantity
          const quantity = selectedType.quantity || 1;
          const tables = Array.from({ length: quantity }, (_, i) => 
            `${selectedType.name} ${i + 1}`
          );
          setAvailableTables(tables);
        }
      }
    } else {
      setAvailableTables([]);
    }
  }, [formValues.tableTypeId, tableTypes, tablesByType]);
  
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
      selectedTables: [] // Reset selected tables when table type changes
    });
  };

  // Handle table selection via checkbox
  const handleTableSelection = (tableName: string, isChecked: boolean) => {
    if (isChecked) {
      // Add table to selection
      setFormValues({
        ...formValues,
        selectedTables: [...formValues.selectedTables, tableName]
      });
    } else {
      // Remove table from selection
      setFormValues({
        ...formValues,
        selectedTables: formValues.selectedTables.filter(t => t !== tableName)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the table type name based on ID for display purposes
    const tableType = tableTypes.find(t => t.id === formValues.tableTypeId);
    
    const blockedSlot = {
      id: editingSlot?.id || Date.now().toString(),
      eventName: formValues.eventName,
      date: formValues.date.toISOString(),
      blockEntireDay: formValues.blockEntireDay,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      tableType: tableType ? tableType.name : 'All Types',
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
          
          {/* Table Type Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableType">Table Type</Label>
              <Select value={formValues.tableTypeId} onValueChange={handleTableTypeChange}>
                <SelectTrigger id="tableType">
                  <SelectValue placeholder="Select table type" />
                </SelectTrigger>
                <SelectContent>
                  {tableTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.capacity} people) - {type.quantity} tables
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Specific Table Selection with Checkboxes */}
            {formValues.tableTypeId && availableTables.length > 0 && (
              <div className="space-y-2">
                <Label>Select Tables</Label>
                <div className="border rounded-md p-3 max-h-48 overflow-y-auto grid grid-cols-2 gap-2">
                  {availableTables.map((table, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`table-${index}`} 
                        checked={formValues.selectedTables.includes(table)}
                        onCheckedChange={(checked) => handleTableSelection(table, checked === true)}
                      />
                      <Label htmlFor={`table-${index}`} className="cursor-pointer">
                        {table}
                      </Label>
                    </div>
                  ))}
                </div>
                {formValues.selectedTables.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formValues.selectedTables.length} table(s) selected
                  </p>
                )}
              </div>
            )}
            
            {/* Show selected tables */}
            {formValues.selectedTables.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Tables</Label>
                <div className="flex flex-wrap gap-2">
                  {formValues.selectedTables.map((table, index) => (
                    <div key={index} className="bg-blue-100 px-2 py-1 rounded-md flex items-center gap-1">
                      {table}
                      <button
                        type="button"
                        onClick={() => handleTableSelection(table, false)}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
