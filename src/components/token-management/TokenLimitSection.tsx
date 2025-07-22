import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function TokenLimitSection() {
  const [tokenLimit, setTokenLimit] = useState('');
  const { toast } = useToast();

  const handleUpdateLimit = () => {
    if (!tokenLimit || isNaN(Number(tokenLimit))) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid token limit.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Token Limit Updated",
      description: `Token limit has been set to ${Number(tokenLimit).toLocaleString()} for selected shops.`,
    });
    
    setTokenLimit('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Token Limit</CardTitle>
        <CardDescription>
          Update the monthly token limit for the selected shops.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-limit">Monthly Token Limit</Label>
          <Input
            id="token-limit"
            type="number"
            placeholder="Enter token limit (e.g., 10000)"
            value={tokenLimit}
            onChange={(e) => setTokenLimit(e.target.value)}
            min="0"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleUpdateLimit} disabled={!tokenLimit}>
            Update Token Limit
          </Button>
          <Button variant="outline" onClick={() => setTokenLimit('')}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}