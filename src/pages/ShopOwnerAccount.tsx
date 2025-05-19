
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ShopOwnerAccount = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    email: 'restaurant@example.com',
    fullName: 'John Doe'
  });
  
  const [language, setLanguage] = useState('en');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language Changed",
      description: value === 'en' ? "Language set to English" : "言語が日本語に設定されました"
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account details and preferences.</p>
        </div>

        {/* Personal Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Personal Information
            </CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="pl-10"
                      readOnly
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This email will be used to receive important notifications.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullName">Shop Owner Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="language">Dashboard Language</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="jp">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ShopOwnerAccount;
