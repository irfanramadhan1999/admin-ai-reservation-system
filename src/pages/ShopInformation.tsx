
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Clock, Upload } from 'lucide-react';

const ShopInformation = () => {
  // Basic information state
  const [restaurantName, setRestaurantName] = useState('Sushi Sakura');
  const [phoneNumber, setPhoneNumber] = useState('+81 90-1234-5678');
  const [address, setAddress] = useState('1-2-3 Shibuya, Tokyo, Japan');
  
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', active: true, open: '09:00', close: '22:00' },
    { day: 'Tuesday', active: true, open: '09:00', close: '22:00' },
    { day: 'Wednesday', active: true, open: '09:00', close: '22:00' },
    { day: 'Thursday', active: true, open: '09:00', close: '22:00' },
    { day: 'Friday', active: true, open: '09:00', close: '23:00' },
    { day: 'Saturday', active: true, open: '10:00', close: '23:00' },
    { day: 'Sunday', active: false, open: '10:00', close: '21:00' },
  ]);
  
  // Document state
  const [documentName, setDocumentName] = useState('restaurant-license.pdf');
  const [documentUploaded, setDocumentUploaded] = useState(true);
  
  // Handle toggle day active/inactive
  const handleToggleDay = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].active = !updatedHours[index].active;
    setOperatingHours(updatedHours);
  };
  
  // Handle time change
  const handleTimeChange = (index: number, field: 'open' | 'close', value: string) => {
    const updatedHours = [...operatingHours];
    updatedHours[index][field] = value;
    setOperatingHours(updatedHours);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save changes logic here
    console.log('Saving shop information...');
    console.log({ restaurantName, phoneNumber, address, is24Hours, operatingHours, documentName });
  };
  
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        {/* Page Header */}
        <DashboardHeader 
          title="Shop Information" 
          subtitle="Update your restaurant details"
        />
        
        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input 
                  id="restaurant-name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input 
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </Card>
        </div>
        
        {/* Operating Hours Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Operating Hours</h2>
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="flex items-center mb-6">
              <Switch 
                id="24-hours"
                checked={is24Hours}
                onCheckedChange={setIs24Hours}
                className="data-[state=checked]:bg-blue-500"
              />
              <Label htmlFor="24-hours" className="ml-2">
                Open 24/7
              </Label>
            </div>
            
            {!is24Hours && (
              <div className="space-y-4">
                {operatingHours.map((item, index) => (
                  <div key={item.day} className="flex items-center">
                    <div className="w-32">
                      <span className="font-medium">{item.day}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch 
                        checked={item.active}
                        onCheckedChange={() => handleToggleDay(index)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      
                      <div className={`flex items-center space-x-2 ${!item.active && 'opacity-50'}`}>
                        <input
                          type="time"
                          value={item.open}
                          onChange={(e) => handleTimeChange(index, 'open', e.target.value)}
                          disabled={!item.active}
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={item.close}
                          onChange={(e) => handleTimeChange(index, 'close', e.target.value)}
                          disabled={!item.active}
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        {/* Document Management Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Document Management</h2>
          <Card className="p-6 rounded-2xl shadow-sm">
            <div className="space-y-4">
              <Label htmlFor="document-upload">Upload Documents</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      id="document-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setDocumentName(e.target.files[0].name);
                          setDocumentUploaded(true);
                        }
                      }}
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                        <span className="text-xs text-gray-400">PDF (max 10MB)</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {documentUploaded && (
                <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{documentName}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end mb-8">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ShopInformation;
