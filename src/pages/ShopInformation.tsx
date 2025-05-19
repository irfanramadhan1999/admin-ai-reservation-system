
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

const ShopInformation = () => {
  // Basic information state
  const [restaurantName, setRestaurantName] = useState('Sakura Japanese Restaurant');
  const [phoneNumber, setPhoneNumber] = useState('+81 3-1234-5678');
  const [address, setAddress] = useState('1-2-3 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002');
  
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Tuesday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Wednesday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Thursday', isOpen: true, openTime: '11:00', closeTime: '22:00' },
    { day: 'Friday', isOpen: true, openTime: '11:00', closeTime: '23:00' },
    { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00' },
    { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '21:00' },
  ]);
  
  // Document state
  const [documentName, setDocumentName] = useState('business-license.pdf');
  
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
  
  // Handle save changes
  const handleSaveChanges = () => {
    console.log('Saving changes...');
    // Implementation for saving changes would go here
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Shop Information" 
        subtitle="Update your restaurant details"
        date={format(new Date(), 'PPPP')} 
      />
      
      {/* Basic Information Section */}
      <Card className="mb-8 rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
            />
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
            <div className="space-y-4">
              {operatingHours.map((hours, index) => (
                <div key={hours.day} className="flex items-center gap-4">
                  <div className="w-24">
                    <span className="font-medium">{hours.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={hours.isOpen} 
                      onCheckedChange={() => handleToggleDay(index)}
                    />
                    <span className="text-sm">{hours.isOpen ? 'Open' : 'Closed'}</span>
                  </div>
                  {hours.isOpen && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Document Management Section */}
      <Card className="mb-8 rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Document Management</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="documentUpload">Upload Document (PDF)</Label>
              <Input
                id="documentUpload"
                type="file"
                accept=".pdf"
                className="mt-1"
              />
            </div>
            {documentName && (
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>{documentName}</span>
                <Button variant="outline" size="sm">Preview</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveChanges}
          className="bg-purple-500 hover:bg-purple-600 rounded-md"
        >
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ShopInformation;
