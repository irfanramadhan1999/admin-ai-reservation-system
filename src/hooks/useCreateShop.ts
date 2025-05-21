
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Document {
  name: string;
  file: File | null;
}

interface OperatingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  lastOrder: boolean;
  lastOrderTime: string;
}

export interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  cuisine: string;
  priceRange: string;
  capacity: string;
  defaultLanguage: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerConfirmPassword: string;
}

export const useCreateShop = (id?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Basic information state
  const [formData, setFormData] = useState<ShopFormData>({
    name: isEditing ? 'Sakura Japanese Restaurant' : '',
    description: isEditing ? 'A traditional Japanese restaurant in the heart of Tokyo' : '',
    address: isEditing ? '1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002' : '',
    city: isEditing ? 'Tokyo' : '',
    state: isEditing ? 'Tokyo' : '',
    zipCode: isEditing ? '150-0002' : '',
    country: isEditing ? 'Japan' : 'Japan',
    phone: isEditing ? '+81 3-1234-5678' : '',
    email: isEditing ? 'info@sakura-restaurant.com' : '',
    website: isEditing ? 'sakura' : '',
    cuisine: isEditing ? 'japanese' : '',
    priceRange: isEditing ? 'moderate' : 'moderate',
    capacity: isEditing ? '40' : '',
    defaultLanguage: isEditing ? 'japanese' : 'english',
    ownerEmail: isEditing ? 'owner@sakura-restaurant.com' : '',
    ownerPassword: '',
    ownerConfirmPassword: '',
  });
  
  const [shopActive, setShopActive] = useState(isEditing ? true : false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(isEditing ? true : false);
  const [shopImage, setShopImage] = useState<string | null>(null);
  
  // Knowledge management state
  const [shopKnowledge, setShopKnowledge] = useState('');
  const [documents, setDocuments] = useState<Document[]>(
    isEditing ? [{ name: 'business-license.pdf', file: null }] : []
  );
  
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([
    { day: 'Monday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Tuesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Wednesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Thursday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Friday', isOpen: true, openTime: '11:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '21:00', lastOrder: true, lastOrderTime: '20:00' },
  ]);
  
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
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle operating hours toggle
  const handleToggleDay = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].isOpen = !updatedHours[index].isOpen;
    setOperatingHours(updatedHours);
  };
  
  // Handle last order toggle
  const handleToggleLastOrder = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].lastOrder = !updatedHours[index].lastOrder;
    setOperatingHours(updatedHours);
  };
  
  // Handle time change
  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime' | 'lastOrderTime', value: string) => {
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

  // Handle owner credential changes
  const handleOwnerCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Shop name is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Phone number is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Address is required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.website.trim()) {
      toast({
        title: "Missing Information",
        description: "Subdomain is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.ownerEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Owner email is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEditing && (!formData.ownerPassword.trim() || !formData.ownerConfirmPassword.trim())) {
      toast({
        title: "Missing Information",
        description: "Owner password is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.ownerPassword !== formData.ownerConfirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isEditing ? "Shop Updated" : "Shop Created",
      description: `${formData.name} has been ${isEditing ? "updated" : "created"} successfully.`
    });
    
    // Navigate back to shops list
    navigate('/admin/shops');
  };

  return {
    formData,
    shopActive,
    aiAssistantEnabled,
    is24Hours,
    operatingHours,
    shopKnowledge,
    documents,
    shopImage,
    tableTypes,
    tableTypeDialogOpen,
    editingTableType,
    handleInputChange,
    handleSelectChange,
    handleShopImageUpload,
    handleToggleDay,
    handleToggleLastOrder,
    handleTimeChange,
    setIs24Hours,
    setShopActive,
    setShopKnowledge,
    setAiAssistantEnabled,
    handleDocumentUpload,
    handleDocumentDelete,
    handleOwnerCredentialChange,
    handleAddTableType,
    handleEditTableType,
    handleDeleteTableType,
    handleSaveTableType,
    setTableTypeDialogOpen,
    handleSaveChanges
  };
};
