
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Check, X } from 'lucide-react';
import { TableData } from './table-types';
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

interface TableDialogsProps {
  selectedTable: TableData | null;
  showOptionsModal: boolean;
  showTimeModal: boolean;
  showRemoveConfirmation: boolean;
  showReleaseConfirmation: boolean;
  endTime: string;
  setShowOptionsModal: (value: boolean) => void;
  setShowTimeModal: (value: boolean) => void;
  setShowRemoveConfirmation: (value: boolean) => void;
  setShowReleaseConfirmation: (value: boolean) => void;
  setEndTime: (value: string) => void;
  handleStatusChange: () => void;
  handleRemoveRequest: () => void;
  confirmOccupyTable: () => void;
  confirmRemoveTable: () => void;
  confirmReleaseTable: () => void;
}

export function TableDialogs({
  selectedTable,
  showOptionsModal,
  showTimeModal,
  showRemoveConfirmation,
  showReleaseConfirmation,
  endTime,
  setShowOptionsModal,
  setShowTimeModal,
  setShowRemoveConfirmation,
  setShowReleaseConfirmation,
  setEndTime,
  handleStatusChange,
  handleRemoveRequest,
  confirmOccupyTable,
  confirmRemoveTable,
  confirmReleaseTable
}: TableDialogsProps) {
  return (
    <>
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
    </>
  );
}
