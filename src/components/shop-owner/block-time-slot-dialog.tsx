
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
import { Switch } from '@/components/ui/switch';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
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
  editingSlot
}: BlockTimeSlotDialogProps) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [blockEntireDay, setBlockEntireDay] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  // Populate form when editing
  useEffect(() => {
    if (editingSlot) {
      setEventName(editingSlot.eventName);
      setDate(new Date(editingSlot.date));
      setBlockEntireDay(editingSlot.blockEntireDay);
      setStartTime(editingSlot.startTime);
      setEndTime(editingSlot.endTime);
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
  };

  const handleSubmit = () => {
    const newBlockedSlot = {
      id: editingSlot ? editingSlot.id : `block-${Date.now()}`,
      eventName,
      date: date ? date.toISOString() : new Date().toISOString(),
      blockEntireDay,
      startTime,
      endTime,
      tables: ['All Tables'] // Default to All Tables since we removed selection
    };

    onSubmit(newBlockedSlot);
    resetForm();
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
