
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableFilterProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export function TableFilter({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime
}: TableFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal w-full sm:w-[240px]"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      {/* Time Picker */}
      <div className="relative w-full sm:w-[140px]">
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
