
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export interface OperatingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Document {
  name: string;
  file: File | null;
}

export interface BlockedTimeSlot {
  id: string;
  eventName: string;
  date: string;
  blockEntireDay: boolean;
  startTime: string;
  endTime: string;
  tables: string[];
}

export const useShopInformation = () => {
  const { toast } = useToast();
  
  // Basic information state
  const [shopName, setShopName] = useState('Sakura Japanese Restaurant');
  const [phoneNumber, setPhoneNumber] = useState('+81 3-1234-5678');
  const [webappUrl, setWebappUrl] = useState(`https://booking.ai/${'+81 3-1234-5678'.replace(/\D/g, '')}`);
  const [address, setAddress] = useState('1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002');
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  
  // Knowledge management state
  const [shopKnowledge, setShopKnowledge] = useState('');
  const [documents, setDocuments] = useState<Document[]>([
    { name: 'business-license.pdf', file: null }
  ]);
  
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([
    { day: 'Monday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Tuesday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Wednesday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Thursday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Friday', isOpen: true, openTime: '11:00', closeTime: '23:00' },
    { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
    { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '21:00' },
  ]);

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
  
  // Handle operating hours toggle
  const handleToggleDay = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].isOpen = !updatedHours[index].isOpen;
    setOperatingHours(updatedHours);
  };
  
  // Handle time change
  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    const updatedHours = [...operatingHours];
    updatedHours[index][field] = value;
    setOperatingHours(updatedHours);
  };

  // Handle shop image upload
  const handleShopImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setShopImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Shop Image Updated",
        description: "Your shop image has been successfully uploaded."
      });
    } else if (file) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file.",
        variant: "destructive"
      });
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.pdf')) {
      // Add new document to the list
      setDocuments([...documents, { name: file.name, file }]);
      toast({
        title: "Document Uploaded",
        description: "Your document has been successfully uploaded."
      });
    } else if (file) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF document.",
        variant: "destructive"
      });
    }
  };

  // Handle document delete
  const handleDocumentDelete = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
    toast({
      title: "Document Deleted",
      description: "Your document has been successfully deleted."
    });
  };

  // Handle phone number change and update URL
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    
    // Only update URL if not in edit mode
    if (!isEditingUrl) {
      const numericalPhone = newPhoneNumber.replace(/\D/g, '');
      setWebappUrl(`https://booking.ai/${numericalPhone}`);
    }
  };

  // Toggle URL edit mode
  const toggleUrlEdit = () => {
    setIsEditingUrl(!isEditingUrl);
  };

  // Handle URL change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebappUrl(e.target.value);
  };
  
  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!shopName.trim()) {
      toast({
        title: "Missing Information",
        description: "Shop name is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Phone number is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!address.trim()) {
      toast({
        title: "Missing Information",
        description: "Address is required.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Changes Saved",
      description: "Your shop information has been updated successfully."
    });
  };

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
    // Basic information
    shopName,
    setShopName,
    phoneNumber,
    webappUrl,
    address,
    setAddress,
    shopImage,
    isEditingUrl,
    handlePhoneNumberChange,
    toggleUrlEdit,
    handleUrlChange,
    handleShopImageUpload,
    
    // Knowledge management
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete,
    
    // Operating hours
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleTimeChange,
    
    // Downtime slots
    blockedTimeSlots,
    blockTimeSlotOpen,
    setBlockTimeSlotOpen,
    selectedBlockedSlot,
    handleAddBlockedSlot,
    handleEditBlockedSlot,
    handleRemoveBlockedSlot,
    handleSubmitBlockedSlot,
    
    // Form submission
    handleSaveChanges
  };
};
