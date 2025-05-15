
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, User, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const { toast } = useToast();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been successfully changed."
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account details and security.</p>
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
            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="admin@reserveai.com" 
                    readOnly 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    defaultValue="John Doe"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Security
            </CardTitle>
            <CardDescription>Change your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your new password"
                  />
                </div>
                <div>
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Change Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
