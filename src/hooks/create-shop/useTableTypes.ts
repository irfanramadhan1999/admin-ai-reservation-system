
import { useState } from 'react';
import { TableType } from './types';
import { useToast } from '@/hooks/use-toast';

interface UseTableTypesProps {
  isEditing: boolean;
}

export const useTableTypes = ({ isEditing }: UseTableTypesProps) => {
  const { toast } = useToast();
  
  // Table types state
  const [tableTypes, setTableTypes] = useState<TableType[]>(
    isEditing ? [
      { id: '1', name: 'Window Seat', capacity: 2, quantity: 4 },
      { id: '2', name: 'Private Room', capacity: 6, quantity: 2 },
      { id: '3', name: 'Regular Table', capacity: 4, quantity: 6 }
    ] : []
  );
  
  const [tableTypeDialogOpen, setTableTypeDialogOpen] = useState(false);
  const [editingTableType, setEditingTableType] = useState<TableType | null>(null);
  
  // Handle add table type
  const handleAddTableType = () => {
    setEditingTableType(null);
    setTableTypeDialogOpen(true);
  };

  // Handle edit table type
  const handleEditTableType = (tableType: TableType) => {
    setEditingTableType(tableType);
    setTableTypeDialogOpen(true);
  };

  // Handle delete table type
  const handleDeleteTableType = (id: string) => {
    setTableTypes(tableTypes.filter(type => type.id !== id));
    toast({
      title: "Table Type Deleted",
      description: "The table type has been successfully deleted."
    });
  };

  // Handle save table type
  const handleSaveTableType = (tableType: TableType) => {
    if (editingTableType) {
      // Update existing table type
      setTableTypes(tableTypes.map(type => 
        type.id === tableType.id ? tableType : type
      ));
      toast({
        title: "Table Type Updated",
        description: "The table type has been successfully updated."
      });
    } else {
      // Add new table type
      setTableTypes([...tableTypes, tableType]);
      toast({
        title: "Table Type Added",
        description: "A new table type has been successfully added."
      });
    }
  };

  return {
    tableTypes,
    tableTypeDialogOpen,
    editingTableType,
    handleAddTableType,
    handleEditTableType,
    handleDeleteTableType,
    handleSaveTableType,
    setTableTypeDialogOpen
  };
};
