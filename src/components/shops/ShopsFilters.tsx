
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ShopsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onClearDateFilters: () => void;
}

export function ShopsFilters({
  searchTerm,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearDateFilters
}: ShopsFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-5">
        <Input
          placeholder="Search by shop name or contact"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Date Range Filter */}
      <div className="md:col-span-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
            >
              {startDate ? format(startDate, "yyyy-MM-dd") : "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="md:col-span-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
            >
              {endDate ? format(endDate, "yyyy-MM-dd") : "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="md:col-span-1">
        <Button variant="ghost" onClick={onClearDateFilters} className="w-full h-10 px-0" aria-label="Clear date filters">
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
