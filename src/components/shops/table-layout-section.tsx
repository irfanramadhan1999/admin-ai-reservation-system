
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { TableType } from '@/components/shops/table-type-card';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableData {
  id: string;
  type: string;
  typeId: string;
  capacity: number;
  isOccupied: boolean;
  bookingTime?: string;
}

interface TableLayoutSectionProps {
  tableTypes: TableType[];
}

export function TableLayoutSection({ tableTypes }: TableLayoutSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("18:00");
  const [tables, setTables] = useState<TableData[]>(() => {
    // Generate tables based on tableTypes
    const initialTables: TableData[] = [];
    
    tableTypes.forEach((type) => {
      for (let i = 1; i <= type.quantity; i++) {
        initialTables.push({
          id: `${type.id}-${i}`,
          type: `${type.name} ${i}`,
          typeId: type.id,
          capacity: type.capacity,
          isOccupied: Math.random() > 0.7, // Randomly set some tables as occupied
          bookingTime: Math.random() > 0.7 ? "18:00-19:00" : undefined,
        });
      }
    });
    
    return initialTables;
  });

  const handleToggleTableStatus = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? { 
              ...table, 
              isOccupied: !table.isOccupied,
              bookingTime: !table.isOccupied ? "18:00-19:00" : undefined 
            }
          : table
      )
    );
  };

  // Group tables by type for better organization
  const tablesByType = tables.reduce((acc, table) => {
    const typeId = table.typeId;
    if (!acc[typeId]) {
      acc[typeId] = [];
    }
    acc[typeId].push(table);
    return acc;
  }, {} as Record<string, TableData[]>);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Table Layout</CardTitle>
        <CardDescription>Visualize and manage your restaurant's table layout</CardDescription>
        
        {/* Date and Time Filter */}
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
      </CardHeader>
      
      <CardContent>
        {Object.keys(tablesByType).map((typeId) => {
          const typeName = tableTypes.find(t => t.id === typeId)?.name || 'Unknown';
          return (
            <div key={typeId} className="mb-8">
              <h3 className="mb-3 font-medium">{typeName} Section</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tablesByType[typeId].map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleToggleTableStatus(table.id)}
                    className={`w-full aspect-square rounded-lg p-3 border border-border flex flex-col items-center justify-center transition-colors ${
                      table.isOccupied
                        ? "bg-red-100 hover:bg-red-200 text-red-800"
                        : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    <div className="text-sm font-medium">{table.type}</div>
                    <div className="text-xs mt-1">{table.capacity} people</div>
                    {table.bookingTime && (
                      <div className="text-xs mt-2 px-1.5 py-0.5 rounded bg-white/50">
                        {table.bookingTime}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-6 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-300"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-300"></div>
            <span className="text-sm">Occupied</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
