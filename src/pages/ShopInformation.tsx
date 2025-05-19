
import React, { useState } from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asterisk, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ShopInformation = () => {
  const { toast } = useToast();
  
  // Basic information state
  const [shopName, setShopName] = useState('Sakura Japanese Restaurant');
  const [phoneNumber, setPhoneNumber] = useState('+81 3-1234-5678');
  const [address, setAddress] = useState('1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002');
  const [subdomain, setSubdomain] = useState('sakura');
  const [shopImage, setShopImage] = useState<string | null>(null);
  
  // Knowledge management state
  const [shopKnowledge, setShopKnowledge] = useState('');
  
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
  
  // Available time options
  const timeOptions = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
    '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];
  
  // Document state
  const [documentName, setDocumentName] = useState<string | null>('business-license.pdf');
  
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
      setDocumentName(file.name);
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
  const handleDocumentDelete = () => {
    setDocumentName(null);
    toast({
      title: "Document Deleted",
      description: "Your document has been successfully deleted."
    });
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
    
    toast({
      title: "Changes Saved",
      description: "Your shop information has been updated successfully."
    });
  };

  // Required field indicator
  const RequiredIndicator = () => (
    <Asterisk className="h-3 w-3 inline-block text-red-500 ml-1" />
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Shop Information" 
        subtitle="Update your shop details"
        date={format(new Date(), 'PPPP')} 
      />
      
      <form onSubmit={handleSaveChanges}>
        {/* Basic Information Section */}
        <Card className="mb-8 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="w-32 h-32">
                  {shopImage ? (
                    <AvatarImage src={shopImage} alt="Shop" />
                  ) : (
                    <AvatarFallback className="bg-muted text-muted-foreground text-xl">
                      Shop
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <input
                    type="file"
                    id="shop-image"
                    accept="image/*"
                    onChange={handleShopImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="shop-image">
                    <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                      Upload Shop Picture
                    </Button>
                  </label>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="shopName">
                      Shop Name <RequiredIndicator />
                    </Label>
                    <Input
                      id="shopName"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">
                      Phone Number <RequiredIndicator />
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="address">
                Address <RequiredIndicator />
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="subdomain">
                Subdomain <RequiredIndicator />
              </Label>
              <div className="flex items-center mt-1">
                <Input
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="rounded-r-none"
                  placeholder="yourshop"
                  required
                />
                <span className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-muted-foreground">
                  .reserveai.jp
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your shop will be accessible at this subdomain.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Operating Hours Section */}
        <Card className="mb-8 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Operating Hours</h2>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={is24Hours} 
                  onCheckedChange={setIs24Hours} 
                />
                <span>Open 24/7</span>
              </div>
            </div>
            
            {!is24Hours && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 w-24">Day</th>
                      <th className="text-left py-2 w-20">Open</th>
                      <th className="text-left py-2">Hours</th>
                      <th className="text-left py-2">Last Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operatingHours.map((hours, index) => (
                      <tr key={hours.day} className="border-b">
                        <td className="py-3">
                          <span className="font-medium">{hours.day}</span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={hours.isOpen} 
                              onCheckedChange={() => handleToggleDay(index)}
                            />
                          </div>
                        </td>
                        <td className="py-3">
                          {hours.isOpen ? (
                            <div className="flex items-center gap-2">
                              <Select
                                value={hours.openTime}
                                onValueChange={(value) => handleTimeChange(index, 'openTime', value)}
                                disabled={!hours.isOpen}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Open" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem key={`open-${time}`} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <span>to</span>
                              <Select
                                value={hours.closeTime}
                                onValueChange={(value) => handleTimeChange(index, 'closeTime', value)}
                                disabled={!hours.isOpen}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Close" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem key={`close-${time}`} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Closed</span>
                          )}
                        </td>
                        <td className="py-3">
                          {hours.isOpen && (
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={hours.lastOrder} 
                                onCheckedChange={() => handleToggleLastOrder(index)}
                                disabled={!hours.isOpen}
                              />
                              {hours.lastOrder ? (
                                <Select
                                  value={hours.lastOrderTime}
                                  onValueChange={(value) => handleTimeChange(index, 'lastOrderTime', value)}
                                  disabled={!hours.isOpen || !hours.lastOrder}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={`last-order-${time}`} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <span className="text-muted-foreground">Not set</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Knowledge Management Section - Merged */}
        <Card className="mb-8 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Knowledge Management</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="shopKnowledge">Knowledge for AI</Label>
                <Textarea
                  id="shopKnowledge"
                  value={shopKnowledge}
                  onChange={(e) => setShopKnowledge(e.target.value)}
                  className="mt-1 min-h-[150px]"
                  placeholder="Enter knowledge information about the shop that the AI can use..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This information will be used by the AI assistant when interacting with customers.
                </p>
              </div>

              <div>
                <Label htmlFor="documentUpload">Upload Document (PDF)</Label>
                <Input
                  id="documentUpload"
                  type="file"
                  accept=".pdf"
                  onChange={handleDocumentUpload}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload PDF documents containing additional information about your shop.
                </p>
              </div>
              
              {documentName && (
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <span>{documentName}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDocumentDelete} className="text-destructive border-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 rounded-md"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ShopInformation;
