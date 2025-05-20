
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CreateShopForm, ShopFormData } from '@/components/shops/create-shop/CreateShopForm';

const CreateShop = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [shopActive, setShopActive] = useState(true);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Japan',
    phone: '',
    email: '',
    website: '',
    cuisine: '',
    priceRange: 'moderate',
    capacity: '',
    defaultLanguage: 'english',
    ownerEmail: '',
    ownerPassword: '',
    ownerConfirmPassword: '',
    openingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false },
    }
  });
  
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      // Here you would fetch the shop data
      // For demo purposes, we'll simulate fetching data
      setFormData({
        name: 'Sakura Sushi Tokyo',
        description: 'Authentic Japanese sushi restaurant in the heart of Tokyo.',
        address: '1-2-3 Shibuya',
        city: 'Tokyo',
        state: 'Tokyo',
        zipCode: '150-0002',
        country: 'Japan',
        phone: '+81 3-1234-5678',
        email: 'contact@sakurasushi.jp',
        website: 'https://sakurasushi.jp',
        cuisine: 'Japanese',
        priceRange: 'expensive',
        capacity: '50',
        defaultLanguage: 'japanese',
        ownerEmail: 'owner@sakurasushi.jp',
        ownerPassword: '',
        ownerConfirmPassword: '',
        openingHours: {
          monday: { open: '11:00', close: '22:00', closed: false },
          tuesday: { open: '11:00', close: '22:00', closed: false },
          wednesday: { open: '11:00', close: '22:00', closed: false },
          thursday: { open: '11:00', close: '22:00', closed: false },
          friday: { open: '11:00', close: '23:00', closed: false },
          saturday: { open: '12:00', close: '23:00', closed: false },
          sunday: { open: '12:00', close: '21:00', closed: false },
        }
      });
      setShopActive(true); // This would be set from fetched data
      setAiAssistantEnabled(true); // This would be set from fetched data
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHoursChange = (day: string, field: 'open' | 'close', value: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [field]: value
        }
      }
    }));
  };
  
  const handleDayClosed = (day: string, closed: boolean) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          closed
        }
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would submit the form data to your API
    toast({
      title: isEditing ? "Shop Updated" : "Shop Created",
      description: `${formData.name} has been ${isEditing ? "updated" : "created"} successfully.`,
    });
    
    // Navigate back to shops list
    navigate('/admin/shops');
  };
  
  const handleDelete = () => {
    // Here you would delete the shop
    toast({
      title: "Shop Deleted",
      description: `${formData.name} has been deleted successfully.`,
      variant: "destructive"
    });
    
    navigate('/admin/shops');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Edit Shop' : 'Create New Shop'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing 
                ? 'Update the restaurant information and settings.' 
                : 'Add a new restaurant to the system.'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/shops')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shops
            </Button>
            {isEditing && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Shop
              </Button>
            )}
          </div>
        </div>
        
        <CreateShopForm
          isEditing={isEditing}
          formData={formData}
          shopActive={shopActive}
          aiAssistantEnabled={aiAssistantEnabled}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleHoursChange={handleHoursChange}
          handleDayClosed={handleDayClosed}
          handleSubmit={handleSubmit}
          setShopActive={setShopActive}
          setAiAssistantEnabled={setAiAssistantEnabled}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateShop;
