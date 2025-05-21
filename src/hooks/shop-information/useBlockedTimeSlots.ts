
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BlockedTimeSlot } from './types';

export const useBlockedTimeSlots = () => {
  const { toast } = useToast();
  
  // Downtime slots state
  const [blockedTimeSlots, setBlockedTimeSlots] = useState<BlockedTimeSlot[]>([
    {
      id: '1',
      eventName: 'Staff Meeting',
      date: '2025-05-19T00:00:00',
      blockEntireDay: false,
      startTime: '14:00',
      endTime: '16:00',
      tables: ['Private Room 1']
    },
    {
      id: '2',
      eventName: 'Restaurant Closure',
      date: '2025-05-20T00:00:00',
      blockEntireDay: true,
      startTime: '00:00',
      endTime: '23:59',
      tables: ['All Tables']
    },
    {
      id: '3',
      eventName: 'Special Event',
      date: '2025-05-21T00:00:00',
      blockEntireDay: false,
      startTime: '18:00',
      endTime: '22:00',
      tables: ['Window Seat 3', 'Window Seat 4']
    }
  ]);
  const [blockTimeSlotOpen, setBlockTimeSlotOpen] = useState(false);
  const [selectedBlockedSlot, setSelectedBlockedSlot] = useState<BlockedTimeSlot | null>(null);
  
  // Handle add blocked time slot
  const handleAddBlockedSlot = () => {
    setSelectedBlockedSlot(null);
    setBlockTimeSlotOpen(true);
  };

  // Handle edit blocked time slot
  const handleEditBlockedSlot = (slot: BlockedTimeSlot) => {
    setSelectedBlockedSlot(slot);
    setBlockTimeSlotOpen(true);
  };

  // Handle remove blocked time slot
  const handleRemoveBlockedSlot = (id: string) => {
    setBlockedTimeSlots(blockedTimeSlots.filter(slot => slot.id !== id));
    toast({
      title: "Time Slot Unblocked",
      description: "The blocked time slot has been removed."
    });
  };

  // Handle submit blocked slot
  const handleSubmitBlockedSlot = (blockedSlot: BlockedTimeSlot) => {
    if (selectedBlockedSlot) {
      // Update existing slot
      setBlockedTimeSlots(
        blockedTimeSlots.map((slot) =>
          slot.id === blockedSlot.id ? blockedSlot : slot
        )
      );
    } else {
      // Add new slot
      setBlockedTimeSlots([...blockedTimeSlots, blockedSlot]);
    }
    
    setBlockTimeSlotOpen(false);
    
    toast({
      title: selectedBlockedSlot ? "Downtime Updated" : "Downtime Added",
      description: `The downtime has been ${selectedBlockedSlot ? 'updated' : 'added'} successfully.`
    });
  };

  return {
    blockedTimeSlots,
    blockTimeSlotOpen,
    setBlockTimeSlotOpen,
    selectedBlockedSlot,
    handleAddBlockedSlot,
    handleEditBlockedSlot,
    handleRemoveBlockedSlot,
    handleSubmitBlockedSlot,
  };
};
