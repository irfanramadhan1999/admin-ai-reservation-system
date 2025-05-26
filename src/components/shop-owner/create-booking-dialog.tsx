
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCreateBookingForm } from '@/hooks/shop-owner/useCreateBookingForm';
import { CustomerInfoSection } from './create-booking/customer-info-section';
import { TimeSection } from './create-booking/time-section';
import { GuestsSection } from './create-booking/guests-section';
import { TableSelectionSection } from './create-booking/table-selection-section';
import { StatusNotesSection } from './create-booking/status-notes-section';

interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

interface CreateBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableTypes: TableType[];
  onSubmit: (newBooking: any) => void;
}

export function CreateBookingDialog({
  open,
  onOpenChange,
  tableTypes,
  onSubmit
}: CreateBookingDialogProps) {
  const {
    formValues,
    handleInputChange,
    handleStatusChange,
    addTable,
    removeTable,
    resetForm
  } = useCreateBookingForm();

  // Reset form when dialog closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create date objects for times (using today's date)
    const today = new Date();
    const [startHour, startMinute] = formValues.startTime.split(':');
    const [endHour, endMinute] = formValues.endTime.split(':');
    
    const startTime = new Date(today);
    startTime.setHours(Number(startHour), Number(startMinute));
    
    const endTime = new Date(today);
    endTime.setHours(Number(endHour), Number(endMinute));
    
    const newBooking = {
      id: `B${String(Date.now()).slice(-3)}`, // Generate simple ID
      customerName: formValues.customerName,
      customerPhone: formValues.customerPhone,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      guests: Number(formValues.guests),
      tables: formValues.tables,
      status: formValues.status,
      notes: formValues.notes,
    };
    
    onSubmit(newBooking);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Add a new reservation to your restaurant
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerInfoSection
            customerName={formValues.customerName}
            customerPhone={formValues.customerPhone}
            onInputChange={handleInputChange}
          />
          
          <TimeSection
            startTime={formValues.startTime}
            endTime={formValues.endTime}
            onInputChange={handleInputChange}
          />
          
          <GuestsSection
            guests={formValues.guests}
            onInputChange={handleInputChange}
          />
          
          <TableSelectionSection
            tableTypes={tableTypes}
            selectedTables={formValues.tables}
            onAddTable={addTable}
            onRemoveTable={removeTable}
          />
          
          <StatusNotesSection
            status={formValues.status}
            notes={formValues.notes}
            onStatusChange={handleStatusChange}
            onInputChange={handleInputChange}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
