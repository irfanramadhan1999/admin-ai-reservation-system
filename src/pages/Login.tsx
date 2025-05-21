
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call to send code
    setTimeout(() => {
      setIsLoading(false);
      setCodeSent(true);
      toast({
        title: "Code Sent",
        description: `A verification code has been sent to ${email}.`
      });
    }, 1500);
  };

  const handleCodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to the AI Reservation System."
      });
      navigate('/');
    }, 1500);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Please enter your password (minimum 6 characters).",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call for password login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to the AI Reservation System."
      });
      navigate('/');
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reset Email Sent",
      description: `Instructions to reset your password have been sent to ${email}.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reservation<span className="text-blue-500">AI</span>
            </h1>
          </div>
          <p className="text-gray-500">Admin Dashboard Login</p>
        </div>
        
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
                <TabsContent value="code" className="mt-0 h-full">
                  {!codeSent ? (
                    <form onSubmit={handleSendCode} className="space-y-4 h-full flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="email-code">Email</Label>
                        <Input 
                          id="email-code" 
                          type="email" 
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full mt-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending Code..." : "Send Code"}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleCodeLogin} className="space-y-4 h-full flex flex-col">
                      <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <InputOTP maxLength={6} value={code} onChange={setCode}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="border-blue-100 focus:border-blue-300" />
                            <InputOTPSlot index={1} className="border-blue-100 focus:border-blue-300" />
                            <InputOTPSlot index={2} className="border-blue-100 focus:border-blue-300" />
                            <InputOTPSlot index={3} className="border-blue-100 focus:border-blue-300" />
                            <InputOTPSlot index={4} className="border-blue-100 focus:border-blue-300" />
                            <InputOTPSlot index={5} className="border-blue-100 focus:border-blue-300" />
                          </InputOTPGroup>
                        </InputOTP>
                        <p className="text-sm text-muted-foreground mt-2">
                          Code sent to {email}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 mt-auto">
                        <Button 
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying..." : "Sign In"}
                        </Button>
                        <Button
                          type="button"
                          variant="link"
                          className="w-full text-blue-600"
                          onClick={() => setCodeSent(false)}
                        >
                          Use a different email
                        </Button>
                      </div>
                    </form>
                  )}
                </TabsContent>
                
                <TabsContent value="password" className="mt-0 h-full">
                  <form onSubmit={handlePasswordLogin} className="space-y-4 h-full flex flex-col">
                    <div className="space-y-2">
                      <Label htmlFor="email-password">Email</Label>
                      <Input 
                        id="email-password" 
                        type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button
                          type="button"
                          variant="link"
                          className="px-0 text-sm text-blue-600"
                          onClick={handleForgotPassword}
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Reservation System. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
