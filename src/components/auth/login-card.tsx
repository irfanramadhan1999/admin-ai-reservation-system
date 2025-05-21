
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeLoginTab } from './code-login-tab';
import { PasswordLoginTab } from './password-login-tab';

export function LoginCard() {
  return (
    <Card className="w-full rounded-2xl card-hover shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Access your dashboard using one of the methods below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="code">Login with Code</TabsTrigger>
            <TabsTrigger value="password">Login with Password</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 h-[230px]">
            <CodeLoginTab />
            <PasswordLoginTab />
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          © 2025 AI Reservation System. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
}
