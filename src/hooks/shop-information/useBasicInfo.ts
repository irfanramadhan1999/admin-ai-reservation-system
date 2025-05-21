
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useBasicInfo = () => {
  const { toast } = useToast();
  
  // Basic information state
  const [shopName, setShopName] = useState('Sakura Japanese Restaurant');
  const [phoneNumber, setPhoneNumber] = useState('+81 3-1234-5678');
  const [webappUrl, setWebappUrl] = useState(`https://booking.ai/${'+81 3-1234-5678'.replace(/\D/g, '')}`);
  const [address, setAddress] = useState('1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002');
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  
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

  return {
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
  };
};
