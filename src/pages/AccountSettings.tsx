
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define language context type for demo purposes
type LanguageType = 'en' | 'jp';

// Mock interface translations - in a real app, this would be more comprehensive
const translations = {
  en: {
    personalInfo: "Personal Information",
    updateAccount: "Update your account details",
    emailAddress: "Email Address",
    shopOwnerName: "Shop Owner Name",
    dashboardLanguage: "Dashboard Language",
    emailNotification: "This email will be used to receive important notifications.",
    uploadPhoto: "Upload Photo",
    updateProfile: "Update Profile",
    english: "English",
    japanese: "Japanese"
  },
  jp: {
    personalInfo: "個人情報",
    updateAccount: "アカウント詳細の更新",
    emailAddress: "メールアドレス",
    shopOwnerName: "店舗オーナー名",
    dashboardLanguage: "ダッシュボード言語",
    emailNotification: "このメールアドレスは重要なお知らせを受け取るために使用されます。",
    uploadPhoto: "写真をアップロード",
    updateProfile: "プロフィールを更新",
    english: "英語",
    japanese: "日本語"
  }
}

const AccountSettings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<LanguageType>('en');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Use the selected language for UI text
  const t = translations[language];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'en' ? "Profile Updated" : "プロフィールが更新されました",
      description: language === 'en' ? 
        "Your profile has been successfully updated." : 
        "プロフィールが正常に更新されました。"
    });
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: language === 'en' ? "Profile Image Updated" : "プロフィール画像が更新されました",
        description: language === 'en' ? 
          "Your profile image has been successfully updated." : 
          "プロフィール画像が正常に更新されました。"
      });
    } else if (file) {
      toast({
        title: language === 'en' ? "Invalid File" : "無効なファイル",
        description: language === 'en' ? 
          "Please upload a valid image file." : 
          "有効な画像ファイルをアップロードしてください。",
        variant: "destructive"
      });
    }
  };

  const handleLanguageChange = (value: LanguageType) => {
    setLanguage(value);
    toast({
      title: value === 'en' ? "Language Changed" : "言語が変更されました",
      description: value === 'en' ? "Language set to English" : "言語が日本語に設定されました"
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">
            {language === 'en' ? "Account Settings" : "アカウント設定"}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' ? "Manage your account details and preferences." : "アカウントの詳細と設定を管理します。"}
          </p>
        </div>

        {/* Personal Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> {t.personalInfo}
            </CardTitle>
            <CardDescription>{t.updateAccount}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profileImage || ""} />
                    <AvatarFallback className="text-3xl bg-muted">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="profile-image">
                      <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                        {t.uploadPhoto}
                      </Button>
                    </label>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.emailAddress}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="admin@reserveai.com" 
                        readOnly 
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">
                        {t.emailNotification}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.shopOwnerName}</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        defaultValue="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">{t.dashboardLanguage}</Label>
                      <Select value={language} onValueChange={(value) => handleLanguageChange(value as LanguageType)}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">{t.english}</SelectItem>
                          <SelectItem value="jp">{t.japanese}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  {t.updateProfile}
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
