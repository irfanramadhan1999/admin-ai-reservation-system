
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff, File, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { TableTypeCard, TableType } from '@/components/shops/table-type-card';
import { TableTypeDialog } from '@/components/shops/table-type-dialog';

// Days of the week
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Sample table types
const initialTableTypes: TableType[] = [
  { id: '1', name: 'Counter', capacity: 1, quantity: 8 },
  { id: '2', name: 'Table for Two', capacity: 2, quantity: 6 },
  { id: '3', name: 'Family Table', capacity: 4, quantity: 4 }
];

const CreateShop = () => {
  const navigate = useNavigate();
  const [is24Hours, setIs24Hours] = useState(false);
  const [openingHours, setOpeningHours] = useState(
    daysOfWeek.map(day => ({
      day,
      isOpen: true,
      openTime: '09:00',
      closeTime: '22:00'
    }))
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tableTypes, setTableTypes] = useState<TableType[]>(initialTableTypes);
  const [tableTypeModalOpen, setTableTypeModalOpen] = useState(false);
  const [editingTableType, setEditingTableType] = useState<TableType | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      calendarEmail: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const handleDayToggle = (index: number) => {
    setOpeningHours(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };
  
  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    setOpeningHours(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleAddTableType = () => {
    setEditingTableType(null);
    setTableTypeModalOpen(true);
  };
  
  const handleEditTableType = (tableType: TableType) => {
    setEditingTableType(tableType);
    setTableTypeModalOpen(true);
  };
  
  const handleDeleteTableType = (id: string) => {
    setTableTypes(prev => prev.filter(type => type.id !== id));
    toast({
      title: "Table Type Deleted",
      description: "The table type has been removed"
    });
  };
  
  const handleTableTypeSubmit = (data: Omit<TableType, 'id'>) => {
    if (editingTableType) {
      // Update existing table type
      setTableTypes(prev => 
        prev.map(type => 
          type.id === editingTableType.id ? { ...type, ...data } : type
        )
      );
      toast({
        title: "Table Type Updated",
        description: `${data.name} has been updated`
      });
    } else {
      // Add new table type
      const newTableType = {
        id: `temp-${Date.now()}`,
        ...data
      };
      setTableTypes(prev => [...prev, newTableType]);
      toast({
        title: "Table Type Added",
        description: `${data.name} has been added`
      });
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded`
      });
    } else {
      toast({
        title: "Upload Failed",
        description: "Please select a valid PDF file",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveFile = () => {
    setUploadedFile(null);
    toast({
      title: "File Removed",
      description: "The document has been removed"
    });
  };
  
  const handleSubmit = (data: any) => {
    // Here you would normally validate and send data to an API
    console.log("Form submitted:", {
      ...data,
      is24Hours,
      openingHours: is24Hours ? [] : openingHours,
      tableTypes,
      document: uploadedFile
    });
    
    toast({
      title: "Shop Created",
      description: `${data.name} has been successfully created`
    });
    
    navigate('/shops');
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-20">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/shops')}
              className="mb-4 -ml-2 gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Shops
            </Button>
            <h1 className="text-2xl font-bold">Create New Shop</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Fill in the restaurant details below to register a new shop on the reservation system.
            </p>
          </div>
        </div>
        
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Basic Information */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input 
                  id="name"
                  placeholder="Enter restaurant name"
                  {...form.register('name')}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  placeholder="Enter phone number"
                  {...form.register('phone')}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  placeholder="Enter email address"
                  type="email"
                  {...form.register('email')}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="calendarEmail">Google Calendar Email</Label>
                <Input 
                  id="calendarEmail"
                  placeholder="Enter Google Calendar email"
                  type="email"
                  {...form.register('calendarEmail')}
                  className="mt-1.5"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address"
                  placeholder="Enter full address"
                  {...form.register('address')}
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </div>
          </section>
          
          {/* Login Credentials */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Login Credentials for Shop Owner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  placeholder="Enter username"
                  {...form.register('username')}
                  className="mt-1.5"
                />
              </div>
              <div> {/* Empty div for alignment */} </div>
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...form.register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1.5">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...form.register('confirmPassword')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Operating Hours */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Operating Hours</h2>
              <div className="flex items-center gap-2">
                <Label htmlFor="open24" className="cursor-pointer">Open 24/7</Label>
                <Switch 
                  id="open24" 
                  checked={is24Hours} 
                  onCheckedChange={setIs24Hours}
                />
              </div>
            </div>
            
            {!is24Hours && (
              <Card>
                <CardContent className="p-4">
                  <table className="w-full">
                    <tbody>
                      {openingHours.map((day, index) => (
                        <tr key={day.day} className="border-b last:border-b-0">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id={`day-${index}`}
                                checked={day.isOpen}
                                onCheckedChange={() => handleDayToggle(index)}
                              />
                              <Label htmlFor={`day-${index}`} className="w-[100px]">{day.day}</Label>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Input 
                                type="time"
                                value={day.openTime}
                                onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                                disabled={!day.isOpen}
                                className="w-[150px]"
                              />
                              <span>to</span>
                              <Input 
                                type="time"
                                value={day.closeTime}
                                onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                                disabled={!day.isOpen}
                                className="w-[150px]"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </section>
          
          {/* Seat Configuration */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Seat Configuration</h2>
              <Button onClick={handleAddTableType} size="sm" variant="outline" className="gap-1">
                <Plus className="h-4 w-4" /> Add Table Type
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tableTypes.map((tableType) => (
                <TableTypeCard 
                  key={tableType.id}
                  tableType={tableType}
                  onEdit={handleEditTableType}
                  onDelete={handleDeleteTableType}
                />
              ))}
              {tableTypes.length === 0 && (
                <p className="text-muted-foreground col-span-2 text-center py-10">
                  No table types added yet. Click "Add Table Type" to create one.
                </p>
              )}
            </div>
            
            <TableTypeDialog 
              open={tableTypeModalOpen}
              onOpenChange={setTableTypeModalOpen}
              editingTableType={editingTableType}
              onSubmit={handleTableTypeSubmit}
            />
          </section>
          
          {/* Document Management */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Document Management</h2>
            
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <input 
                  type="file"
                  id="pdf-upload"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="pdf-upload" 
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <File className="h-6 w-6" />
                  </div>
                  <span className="font-medium">Upload PDF Document</span>
                  <span className="text-sm text-muted-foreground">Click to browse or drop file here</span>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(uploadedFile.size / 1024)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </section>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-10 sticky bottom-0 bg-white p-4 border-t -mx-8 px-8">
            <Button variant="outline" type="button" onClick={() => navigate('/shops')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-400 hover:bg-purple-500">
              Save Shop
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateShop;
