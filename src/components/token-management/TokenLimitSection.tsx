import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TokenLimitSectionProps {
  selectedShops: string[];
}

export function TokenLimitSection({ selectedShops }: TokenLimitSectionProps) {
  const [tokenLimit, setTokenLimit] = useState('');
  const { toast } = useToast();

  const handleUpdateLimit = () => {
    if (selectedShops.length === 0) {
      toast({
        title: "No shops selected",
        description: "Please select at least one shop from the table above.",
        variant: "destructive",
      });
      return;
    }

    if (!tokenLimit || isNaN(Number(tokenLimit)) || Number(tokenLimit) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid token limit greater than 0.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Token Limit Updated",
      description: `Token limit has been set to ${Number(tokenLimit).toLocaleString()} for ${selectedShops.length} selected shop(s).`,
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
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedShops.length > 0 && (
              <Badge variant="secondary">
                {selectedShops.length} shop(s) selected
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleUpdateLimit} disabled={!tokenLimit}>
              Update Token Limit
            </Button>
            <Button variant="outline" onClick={() => setTokenLimit('')}>
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}