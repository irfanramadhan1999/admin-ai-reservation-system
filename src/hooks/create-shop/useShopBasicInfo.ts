
import { useState } from 'react';
import { ShopFormData } from './types';
import { useToast } from '@/hooks/use-toast';

interface UseShopBasicInfoProps {
  isEditing: boolean;
}

export const useShopBasicInfo = ({ isEditing }: UseShopBasicInfoProps) => {
  const { toast } = useToast();
  
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

  // Handle owner credential changes
  const handleOwnerCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    formData,
    shopActive,
    aiAssistantEnabled,
    shopImage,
    handleInputChange,
    handleSelectChange,
    handleShopImageUpload,
    setShopActive,
    setAiAssistantEnabled,
    handleOwnerCredentialChange
  };
};
