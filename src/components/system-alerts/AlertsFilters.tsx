
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AlertsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onClearDateFilter: () => void;
}

export const AlertsFilters = ({ 
  searchTerm, 
  onSearchChange, 
  date, 
  onDateChange,
  statusFilter, 
  onStatusFilterChange,
  onClearDateFilter 
}: AlertsFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-5">
        <Input
          placeholder="Search by shop name, contact, or IP address..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="md:col-span-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left"
            >
              {date ? format(date, "yyyy-MM-dd") : "Filter by Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="md:col-span-3">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="unblocked">Unblocked</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:col-span-1">
        <Button variant="ghost" onClick={onClearDateFilter} className="w-full">
          Clear
        </Button>
      </div>
    </div>
  );
};
