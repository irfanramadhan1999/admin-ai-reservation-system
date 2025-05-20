import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CreateShopHeader } from '@/components/create-shop/CreateShopHeader';
import { ShopBasicInfoSection } from '@/components/create-shop/ShopBasicInfoSection';
import { ShopOperatingHoursSection } from '@/components/create-shop/ShopOperatingHoursSection';
import { ShopKnowledgeSection } from '@/components/create-shop/ShopKnowledgeSection';

const CreateShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Basic information state
  const [shopName, setShopName] = useState(isEditing ? 'Sakura Japanese Restaurant' : '');
  const [phoneNumber, setPhoneNumber] = useState(isEditing ? '+81 3-1234-5678' : '');
  const [address, setAddress] = useState(isEditing ? '1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002' : '');
  const [subdomain, setSubdomain] = useState(isEditing ? 'sakura' : '');
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [defaultLanguage, setDefaultLanguage] = useState(isEditing ? 'japanese' : 'english');
  const [shopActive, setShopActive] = useState(isEditing ? true : false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(isEditing ? true : false);
  
  // Owner credentials state
  const [ownerEmail, setOwnerEmail] = useState(isEditing ? 'owner@sakura-restaurant.com' : '');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerConfirmPassword, setOwnerConfirmPassword] = useState('');
  
  // Knowledge management state
  const [shopKnowledge, setShopKnowledge] = useState('');
  const [documents, setDocuments] = useState<{ name: string; file: File | null }[]>(
    isEditing ? [{ name: 'business-license.pdf', file: null }] : []
  );
  
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Tuesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Wednesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Thursday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Friday', isOpen: true, openTime: '11:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '21:00', lastOrder: true, lastOrderTime: '20:00' },
  ]);
  
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
    if (name === 'ownerEmail') setOwnerEmail(value);
    else if (name === 'ownerPassword') setOwnerPassword(value);
    else if (name === 'ownerConfirmPassword') setOwnerConfirmPassword(value);
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

    if (!subdomain.trim()) {
      toast({
        title: "Missing Information",
        description: "Subdomain is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!ownerEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Owner email is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEditing && (!ownerPassword.trim() || !ownerConfirmPassword.trim())) {
      toast({
        title: "Missing Information",
        description: "Owner password is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (ownerPassword !== ownerConfirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isEditing ? "Shop Updated" : "Shop Created",
      description: `${shopName} has been ${isEditing ? "updated" : "created"} successfully.`
    });
    
    // Navigate back to shops list
    navigate('/admin/shops');
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <CreateShopHeader isEditing={isEditing} />
      
      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* Basic Information Section */}
        <ShopBasicInfoSection 
          shopName={shopName}
          setShopName={setShopName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          address={address}
          setAddress={setAddress}
          subdomain={subdomain}
          setSubdomain={setSubdomain}
          shopImage={shopImage}
          handleShopImageUpload={handleShopImageUpload}
          defaultLanguage={defaultLanguage}
          setDefaultLanguage={setDefaultLanguage}
          shopActive={shopActive}
          setShopActive={setShopActive}
          aiAssistantEnabled={aiAssistantEnabled}
          setAiAssistantEnabled={setAiAssistantEnabled}
          ownerEmail={ownerEmail}
          ownerPassword={ownerPassword}
          ownerConfirmPassword={ownerConfirmPassword}
          handleOwnerCredentialChange={handleOwnerCredentialChange}
        />
        
        {/* Operating Hours Section */}
        <ShopOperatingHoursSection 
          is24Hours={is24Hours}
          setIs24Hours={setIs24Hours}
          operatingHours={operatingHours}
          handleToggleDay={handleToggleDay}
          handleToggleLastOrder={handleToggleLastOrder}
          handleTimeChange={handleTimeChange}
        />
        
        {/* Knowledge Management Section */}
        <ShopKnowledgeSection 
          shopKnowledge={shopKnowledge}
          setShopKnowledge={setShopKnowledge}
          documents={documents}
          handleDocumentUpload={handleDocumentUpload}
          handleDocumentDelete={handleDocumentDelete}
        />
        
        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 rounded-md"
          >
            {isEditing ? 'Update Shop' : 'Create Shop'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default CreateShop;
