
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface BlockTimeSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (blockedSlot: any) => void;
  tableTypes: TableType[];
  tablesByType: Record<string, string[]>;
  editingSlot?: any;
}

export const BlockTimeSlotDialog = ({
  open,
  onOpenChange,
  onSubmit,
  tablesByType,
  editingSlot
}: BlockTimeSlotDialogProps) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [blockEntireDay, setBlockEntireDay] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [allTables, setAllTables] = useState<string[]>([]);

  // Initialize all tables
  useEffect(() => {
    const allTablesList: string[] = [];
    Object.values(tablesByType).forEach(tables => {
      tables.forEach(table => {
        if (!allTablesList.includes(table) && table !== 'All Tables') {
          allTablesList.push(table);
        }
      });
    });
    setAllTables(allTablesList);
  }, [tablesByType]);

  // Populate form when editing
  useEffect(() => {
    if (editingSlot) {
      setEventName(editingSlot.eventName);
      setDate(new Date(editingSlot.date));
      setBlockEntireDay(editingSlot.blockEntireDay);
      setStartTime(editingSlot.startTime);
      setEndTime(editingSlot.endTime);
      setSelectedTables(editingSlot.tables);
    } else {
      resetForm();
    }
  }, [editingSlot]);

  const resetForm = () => {
    setEventName('');
    setDate(new Date());
    setBlockEntireDay(false);
    setStartTime('09:00');
    setEndTime('18:00');
    setSelectedTables([]);
  };

  const handleSubmit = () => {
    const newBlockedSlot = {
      id: editingSlot ? editingSlot.id : `block-${Date.now()}`,
      eventName,
      date: date ? date.toISOString() : new Date().toISOString(),
      blockEntireDay,
      startTime,
      endTime,
      tables: selectedTables.length > 0 ? selectedTables : ['All Tables']
    };

    onSubmit(newBlockedSlot);
    resetForm();
  };

  const handleAllTablesChange = (checked: boolean) => {
    if (checked) {
      setSelectedTables(allTables);
    } else {
      setSelectedTables([]);
    }
  };

  const handleTableChange = (table: string) => {
    setSelectedTables(prev => {
      if (prev.includes(table)) {
        return prev.filter(t => t !== table);
      } else {
        return [...prev, table];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingSlot ? 'Edit Downtime' : 'Create New Downtime'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. Staff Meeting, Restaurant Closure"
            />
          </div>

          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              checked={blockEntireDay}
              onCheckedChange={setBlockEntireDay}
            />
            <Label htmlFor="block-all-day">Block Entire Day</Label>
          </div>

          {!blockEntireDay && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Select Tables</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={selectedTables.length === allTables.length}
                  onCheckedChange={handleAllTablesChange}
                />
                <span className="text-sm">All Tables</span>
              </div>
            </div>
            <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
              <div className="space-y-2">
                {allTables.map((table) => (
                  <div key={table} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedTables.includes(table)}
                      onCheckedChange={() => handleTableChange(table)}
                    />
                    <Label>{table}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {editingSlot ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
