
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

export function CodeLoginTab() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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

  return (
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
  );
}
