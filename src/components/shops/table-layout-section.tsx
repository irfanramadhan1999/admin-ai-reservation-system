
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TableType, TableData } from './table-types';
import { TableFilter } from './table-filter';
import { TableSection } from './table-section';
import { TableDialogs } from './table-dialogs';
import { TableLegend } from './table-legend';

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
  
  // Pagination state for each table type
  const [paginationState, setPaginationState] = useState<Record<string, number>>(() => {
    const initialState: Record<string, number> = {};
    tableTypes.forEach(type => {
      initialState[type.id] = 1;
    });
    return initialState;
  });
  
  // Tables per page for pagination
  const TABLES_PER_PAGE = 6;
  
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

  // Function to handle pagination change
  const handlePageChange = (typeId: string, page: number) => {
    setPaginationState(prev => ({
      ...prev,
      [typeId]: page
    }));
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Table Layout</CardTitle>
        <CardDescription>Visualize and manage your restaurant's table layout</CardDescription>
        
        {/* Date and Time Filter */}
        <TableFilter 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </CardHeader>
      
      <CardContent>
        {Object.keys(tablesByType).map((typeId) => {
          const typeName = tableTypes.find(t => t.id === typeId)?.name || 'Unknown';
          const tablesOfType = tablesByType[typeId];
          const totalPages = Math.ceil(tablesOfType.length / TABLES_PER_PAGE);
          const currentPage = paginationState[typeId] || 1;
          
          // Get paginated tables
          const paginatedTables = tablesOfType.slice(
            (currentPage - 1) * TABLES_PER_PAGE, 
            currentPage * TABLES_PER_PAGE
          );
          
          return (
            <TableSection 
              key={typeId}
              typeId={typeId}
              typeName={typeName}
              tables={paginatedTables}
              currentPage={currentPage}
              totalPages={totalPages}
              onSelectTable={handleSelectTable}
              onAddTable={handleAddTable}
              onPageChange={handlePageChange}
            />
          );
        })}

        <TableLegend />
      </CardContent>
      
      <TableDialogs
        selectedTable={selectedTable}
        showOptionsModal={showOptionsModal}
        showTimeModal={showTimeModal}
        showRemoveConfirmation={showRemoveConfirmation}
        showReleaseConfirmation={showReleaseConfirmation}
        endTime={endTime}
        setShowOptionsModal={setShowOptionsModal}
        setShowTimeModal={setShowTimeModal}
        setShowRemoveConfirmation={setShowRemoveConfirmation}
        setShowReleaseConfirmation={setShowReleaseConfirmation}
        setEndTime={setEndTime}
        handleStatusChange={handleStatusChange}
        handleRemoveRequest={handleRemoveRequest}
        confirmOccupyTable={confirmOccupyTable}
        confirmRemoveTable={confirmRemoveTable}
        confirmReleaseTable={confirmReleaseTable}
      />
    </Card>
  );
}
