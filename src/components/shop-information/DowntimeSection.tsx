
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { BlockTimeSlotDialog } from '@/components/shop-owner/block-time-slot-dialog';
import { BlockedTimeSlot } from '@/hooks/useShopInformation';

interface DowntimeSectionProps {
  blockedTimeSlots: BlockedTimeSlot[];
  blockTimeSlotOpen: boolean;
  setBlockTimeSlotOpen: (open: boolean) => void;
  selectedBlockedSlot: BlockedTimeSlot | null;
  handleAddBlockedSlot: () => void;
  handleEditBlockedSlot: (slot: BlockedTimeSlot) => void;
  handleRemoveBlockedSlot: (id: string) => void;
  handleSubmitBlockedSlot: (blockedSlot: any) => void;
}

export const DowntimeSection: React.FC<DowntimeSectionProps> = ({
  blockedTimeSlots,
  blockTimeSlotOpen,
  setBlockTimeSlotOpen,
  selectedBlockedSlot,
  handleAddBlockedSlot,
  handleEditBlockedSlot,
  handleRemoveBlockedSlot,
  handleSubmitBlockedSlot
}) => {
  // Mock data for table types and tables by type
  const tableTypes = [
    { id: '1', name: 'Window Seat', capacity: 2, quantity: 4 },
    { id: '2', name: 'Private Room', capacity: 6, quantity: 2 },
    { id: '3', name: 'Regular Table', capacity: 4, quantity: 6 }
  ];

  const tablesByType = {
    'Window Seat': ['Window Seat 1', 'Window Seat 2', 'Window Seat 3', 'Window Seat 4'],
    'Private Room': ['Private Room 1', 'Private Room 2'],
    'Regular Table': ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6']
  };

  return (
    <Card className="mb-8 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Set Downtime</h2>
            <p className="text-sm text-muted-foreground">
              Block specific dates/times to prevent bookings for special events or closures
            </p>
          </div>
          <Button onClick={handleAddBlockedSlot}>
            Add New Downtime
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Range</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedTimeSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.eventName}</TableCell>
                  <TableCell>{format(new Date(slot.date), 'PPP')}</TableCell>
                  <TableCell>
                    {slot.blockEntireDay 
                      ? "All Day" 
                      : `${slot.startTime} - ${slot.endTime}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlockedSlot(slot)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveBlockedSlot(slot.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blockedTimeSlots.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No downtime slots found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <BlockTimeSlotDialog
          open={blockTimeSlotOpen}
          onOpenChange={setBlockTimeSlotOpen}
          onSubmit={handleSubmitBlockedSlot}
          tableTypes={tableTypes}
          tablesByType={tablesByType}
          editingSlot={selectedBlockedSlot}
        />
      </CardContent>
    </Card>
  );
};
