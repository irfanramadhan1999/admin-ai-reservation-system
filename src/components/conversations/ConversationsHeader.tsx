
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ConversationsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scoreFilter: string;
  setScoreFilter: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export function ConversationsHeader({
  searchQuery,
  setSearchQuery,
  scoreFilter,
  setScoreFilter,
  selectedDate,
  setSelectedDate
}: ConversationsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="text-muted-foreground">
            Review all AI conversations with customers
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by shop or IP..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {/* Score Filter */}
        <div className="w-full sm:w-auto">
          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All scores</SelectItem>
              <SelectItem value="success">Success (Score: 1)</SelectItem>
              <SelectItem value="failed">Failed (Score: 0)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
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
            />
            {selectedDate && (
              <div className="p-3 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDate(undefined)}
                  className="w-full"
                >
                  Clear date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
