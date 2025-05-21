
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TableTypeCard, TableType } from '@/components/shops/table-type-card';
import { TableTypeDialog } from '@/components/shops/table-type-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function ShopOwnerSeating() {
  // Sample data for table types - in a real app, this would come from an API
  const [tableTypes, setTableTypes] = useState<TableType[]>([
    { id: "1", name: "Counter", capacity: 2, quantity: 8 },
    { id: "2", name: "Regular", capacity: 4, quantity: 12 },
    { id: "3", name: "Family", capacity: 6, quantity: 5 },
    { id: "4", name: "Tatami", capacity: 8, quantity: 2 },
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTableType, setEditingTableType] = useState<TableType | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tableTypeToDelete, setTableTypeToDelete] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleAddTableType = () => {
    setEditingTableType(null);
    setDialogOpen(true);
  };
  
  const handleEditTableType = (tableType: TableType) => {
    setEditingTableType(tableType);
    setDialogOpen(true);
  };
  
  const handleDeleteClick = (id: string) => {
    setTableTypeToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (tableTypeToDelete) {
      setTableTypes(tableTypes.filter(item => item.id !== tableTypeToDelete));
      toast({
        title: "Table type deleted",
        description: "The table type has been successfully removed"
      });
      setDeleteDialogOpen(false);
      setTableTypeToDelete(null);
    }
  };
  
  const handleTableTypeSubmit = (data: Omit<TableType, 'id'>) => {
    if (editingTableType) {
      // Update existing table type
      setTableTypes(tableTypes.map(item => 
        item.id === editingTableType.id 
          ? { ...item, ...data } 
          : item
      ));
      toast({
        title: "Table type updated",
        description: "The table type has been successfully updated"
      });
    } else {
      // Add new table type
      const newTableType: TableType = {
        id: Date.now().toString(),
        ...data
      };
      setTableTypes([...tableTypes, newTableType]);
      toast({
        title: "Table type added",
        description: "New table type has been successfully added"
      });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seating Management</h1>
          <p className="text-muted-foreground">
            Configure your restaurant table types
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Table Types</CardTitle>
            <CardDescription>Configure the types of tables in your restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tableTypes.map(tableType => (
              <TableTypeCard 
                key={tableType.id}
                tableType={tableType}
                onEdit={handleEditTableType}
                onDelete={handleDeleteClick}
              />
            ))}
            
            <div className="mt-6">
              <Button onClick={handleAddTableType} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Table Type
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TableTypeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleTableTypeSubmit}
        editingTableType={editingTableType}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete this table type and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
