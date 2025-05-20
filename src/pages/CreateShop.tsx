import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ShopActiveToggle } from '@/components/shops/shop-active-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateShop = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [shopActive, setShopActive] = useState(true);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
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
    }
  }, [id]);

  const handleShopActiveToggle = (active: boolean) => {
    setShopActive(active);
    // Here you would update the shop active status in your backend
  };
  
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
        
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="hours">Opening Hours</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                
                {/* Add Shop Active Toggle for Edit mode only */}
                {isEditing && (
                  <ShopActiveToggle 
                    isActive={shopActive} 
                    onToggle={handleShopActiveToggle} 
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Shop Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Select 
                      value={formData.cuisine} 
                      onValueChange={(value) => handleSelectChange('cuisine', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="thai">Thai</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Prefecture</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Postal Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      value={formData.zipCode} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleSelectChange('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Select 
                      value={formData.priceRange} 
                      onValueChange={(value) => handleSelectChange('priceRange', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (¥)</SelectItem>
                        <SelectItem value="moderate">Moderate (¥¥)</SelectItem>
                        <SelectItem value="expensive">Expensive (¥¥¥)</SelectItem>
                        <SelectItem value="luxury">Luxury (¥¥¥¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 mt-6">
                <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Seating Capacity</Label>
                    <Input 
                      id="capacity" 
                      name="capacity" 
                      type="number" 
                      value={formData.capacity} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="hours">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Opening Hours</h2>
                <div className="space-y-4">
                  {Object.entries(formData.openingHours).map(([day, hours]) => (
                    <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="font-medium capitalize">{day}</div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={`${day}-closed`} 
                          checked={hours.closed} 
                          onChange={(e) => handleDayClosed(day, e.target.checked)} 
                          className="mr-2"
                        />
                        <Label htmlFor={`${day}-closed`}>Closed</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-open`}>Opening Time</Label>
                        <Input 
                          id={`${day}-open`} 
                          type="time" 
                          value={hours.open} 
                          onChange={(e) => handleHoursChange(day, 'open', e.target.value)} 
                          disabled={hours.closed}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-close`}>Closing Time</Label>
                        <Input 
                          id={`${day}-close`} 
                          type="time" 
                          value={hours.close} 
                          onChange={(e) => handleHoursChange(day, 'close', e.target.value)} 
                          disabled={hours.closed}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Shop Settings</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Booking Settings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxPartySize">Maximum Party Size</Label>
                        <Input id="maxPartySize" type="number" defaultValue="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minAdvanceBooking">Minimum Advance Booking (hours)</Label>
                        <Input id="minAdvanceBooking" type="number" defaultValue="1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxAdvanceBooking">Maximum Advance Booking (days)</Label>
                        <Input id="maxAdvanceBooking" type="number" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="defaultStayDuration">Default Stay Duration (minutes)</Label>
                        <Input id="defaultStayDuration" type="number" defaultValue="90" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>API Integration</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input id="apiKey" defaultValue="sk_live_example123456789" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input id="webhookUrl" defaultValue="https://example.com/webhook" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit" size="lg">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Shop' : 'Create Shop'}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CreateShop;
