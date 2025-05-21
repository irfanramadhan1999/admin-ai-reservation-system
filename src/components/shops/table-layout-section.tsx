
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { TableType } from '@/components/shops/table-type-card';
import { CalendarIcon, Clock, Plus, Check, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
          bookingTime: Math.random() > 0.7 ? "18:00-20:00" : undefined,
        });
      }
    });
    
    return initialTables;
  });
  
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [showReleaseConfirmation, setShowReleaseConfirmation] = useState(false);
  const [endTime, setEndTime] = useState<string>("20:00");
  
  const { toast } = useToast();
  
  // Function to handle table selection
  const handleSelectTable = (table: TableData) => {
    setSelectedTable(table);
    setShowOptionsModal(true);
  };
  
  // Function to handle status change
  const handleStatusChange = () => {
    if (selectedTable) {
      if (!selectedTable.isOccupied) {
        // Table is open, now mark as occupied
        setShowOptionsModal(false);
        setShowTimeModal(true);
      } else {
        // Table is occupied, confirm before releasing
        setShowOptionsModal(false);
        setShowReleaseConfirmation(true);
      }
    }
  };
  
  // Function to handle table removal
  const handleRemoveRequest = () => {
    if (selectedTable && !selectedTable.isOccupied) {
      setShowOptionsModal(false);
      setShowRemoveConfirmation(true);
    } else {
      toast({
        title: "Cannot remove table",
        description: "Table must be open before it can be removed",
        variant: "destructive",
      });
    }
  };
  
  // Function to confirm table removal
  const confirmRemoveTable = () => {
    if (selectedTable) {
      setTables(tables.filter(table => table.id !== selectedTable.id));
      setShowRemoveConfirmation(false);
      toast({
        title: "Table removed",
        description: `${selectedTable.type} has been removed from the layout`,
      });
    }
  };
  
  // Function to confirm table status change to occupied
  const confirmOccupyTable = () => {
    if (selectedTable) {
      const currentTime = selectedTime;
      setTables(prevTables =>
        prevTables.map(table =>
          table.id === selectedTable.id
            ? { 
                ...table, 
                isOccupied: true,
                bookingTime: `${currentTime}-${endTime}` 
              }
            : table
        )
      );
      setShowTimeModal(false);
      toast({
        title: "Table status updated",
        description: `${selectedTable.type} is now marked as occupied until ${endTime}`,
      });
    }
  };
  
  // Function to confirm table status change to open
  const confirmReleaseTable = () => {
    if (selectedTable) {
      setTables(prevTables =>
        prevTables.map(table =>
          table.id === selectedTable.id
            ? { 
                ...table, 
                isOccupied: false,
                bookingTime: undefined 
              }
            : table
        )
      );
      setShowReleaseConfirmation(false);
      toast({
        title: "Table released",
        description: `${selectedTable.type} is now available for reservations`,
      });
    }
  };
  
  // Function to add a new table to a specific type
  const handleAddTable = (typeId: string) => {
    const tableType = tableTypes.find(t => t.id === typeId);
    if (tableType) {
      const tablesOfType = tables.filter(t => t.typeId === typeId);
      const newTableNumber = tablesOfType.length + 1;
      
      const newTable: TableData = {
        id: `${typeId}-${Date.now()}`, // Unique ID
        type: `${tableType.name} ${newTableNumber}`,
        typeId: typeId,
        capacity: tableType.capacity,
        isOccupied: false,
      };
      
      setTables([...tables, newTable]);
      
      toast({
        title: "Table added",
        description: `${newTable.type} has been added to the layout`,
      });
    }
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{typeName} Section</h3>
                <Button 
                  size="sm" 
                  onClick={() => handleAddTable(typeId)}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Table
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tablesByType[typeId].map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleSelectTable(table)}
                    className={`w-full aspect-square rounded-lg p-3 border border-border flex flex-col items-center justify-center transition-colors ${
                      table.isOccupied
                        ? "bg-red-100 hover:bg-red-200 text-red-800"
                        : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    <div className="text-sm font-medium">{table.type}</div>
                    <div className="text-xs mt-1">{table.capacity} people</div>
                    {table.isOccupied && table.bookingTime && (
                      <div className="text-xs mt-2 px-1.5 py-0.5 rounded bg-white/50">
                        Until {table.bookingTime.split('-')[1]}
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
      
      {/* Table Options Modal */}
      <AlertDialog open={showOptionsModal} onOpenChange={setShowOptionsModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Table Options</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedTable && (
                <div className="space-y-2 mt-2">
                  <div className="text-sm font-medium">Table: {selectedTable.type}</div>
                  <div className="text-sm">Capacity: {selectedTable.capacity} people</div>
                  {selectedTable.isOccupied && selectedTable.bookingTime && (
                    <div className="text-sm">
                      Status: Occupied until {selectedTable.bookingTime.split('-')[1]}
                    </div>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleStatusChange}
              variant={selectedTable?.isOccupied ? "outline" : "default"}
              className={selectedTable?.isOccupied ? "w-full" : "w-full bg-green-600 hover:bg-green-700"}
            >
              {selectedTable?.isOccupied ? "Release Table" : "Mark as Occupied"}
            </Button>
            <Button
              onClick={handleRemoveRequest}
              variant="destructive"
              className="w-full"
              disabled={selectedTable?.isOccupied}
            >
              Remove Table
            </Button>
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Time Selection Modal */}
      <AlertDialog open={showTimeModal} onOpenChange={setShowTimeModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set Occupied Until</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedTable && (
                <div className="space-y-4 mt-2">
                  <div>Select the time until which this table will be occupied:</div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmOccupyTable}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Remove Confirmation Dialog */}
      <AlertDialog open={showRemoveConfirmation} onOpenChange={setShowRemoveConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Table</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this table? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveTable} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Release Table Confirmation Dialog */}
      <AlertDialog open={showReleaseConfirmation} onOpenChange={setShowReleaseConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Release Table</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to release this table? It will become available for reservation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReleaseTable}>
              Release Table
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
