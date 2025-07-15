import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RotateCcw, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShopTokenManagementSectionProps {
  currentTokenUsage: number;
  tokenLimit: number;
  onTokenLimitUpdate: (limit: number) => void;
  onTokenReset: () => void;
}

export const ShopTokenManagementSection = ({
  currentTokenUsage,
  tokenLimit,
  onTokenLimitUpdate,
  onTokenReset
}: ShopTokenManagementSectionProps) => {
  const [newTokenLimit, setNewTokenLimit] = useState(tokenLimit.toString());
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const usagePercentage = tokenLimit > 0 ? (currentTokenUsage / tokenLimit) * 100 : 0;
  const isNearLimit = usagePercentage >= 80;
  const isOverLimit = usagePercentage >= 100;

  const handleUpdateLimit = async () => {
    const limit = parseInt(newTokenLimit);
    if (isNaN(limit) || limit < 0) {
      toast({
        title: "Invalid Limit",
        description: "Please enter a valid positive number for the token limit.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      await onTokenLimitUpdate(limit);
      toast({
        title: "Token Limit Updated",
        description: `Monthly token limit has been set to ${limit.toLocaleString()} tokens.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update token limit. Please try again.",
        variant: "destructive",
      });
    }
    setIsUpdating(false);
  };

  const handleResetTokens = async () => {
    try {
      await onTokenReset();
      toast({
        title: "Tokens Reset",
        description: "Monthly token usage has been reset to 0.",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset token usage. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Token Management
        </CardTitle>
        <CardDescription>
          Manage monthly token limits and monitor usage for this shop
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Usage Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Current Monthly Usage</Label>
            <div className="flex items-center gap-2">
              {isOverLimit && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Over Limit
                </Badge>
              )}
              {isNearLimit && !isOverLimit && (
                <Badge variant="outline" className="flex items-center gap-1 border-yellow-500 text-yellow-600">
                  <AlertTriangle className="h-3 w-3" />
                  Near Limit
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentTokenUsage.toLocaleString()} tokens used</span>
              <span>{tokenLimit > 0 ? `${tokenLimit.toLocaleString()} token limit` : 'No limit set'}</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isOverLimit 
                    ? 'bg-destructive' 
                    : isNearLimit 
                      ? 'bg-yellow-500' 
                      : 'bg-primary'
                }`}
                style={{ 
                  width: `${Math.min(usagePercentage, 100)}%` 
                }}
              />
            </div>
            
            {tokenLimit > 0 && (
              <div className="text-xs text-muted-foreground">
                {usagePercentage.toFixed(1)}% of limit used
              </div>
            )}
          </div>
        </div>

        {/* Token Limit Settings */}
        <div className="space-y-3">
          <Label htmlFor="tokenLimit" className="text-sm font-medium">
            Monthly Token Limit
          </Label>
          <div className="flex gap-2">
            <Input
              id="tokenLimit"
              type="number"
              value={newTokenLimit}
              onChange={(e) => setNewTokenLimit(e.target.value)}
              placeholder="Enter token limit"
              min="0"
              className="flex-1"
            />
            <Button 
              onClick={handleUpdateLimit}
              disabled={isUpdating}
              variant="outline"
            >
              {isUpdating ? 'Updating...' : 'Update Limit'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Set to 0 for unlimited tokens. Shop will be alerted when 80% of limit is reached.
          </p>
        </div>

        {/* Reset Actions */}
        <div className="space-y-3 pt-4 border-t">
          <Label className="text-sm font-medium">Reset Actions</Label>
          <Button 
            onClick={handleResetTokens}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Monthly Usage
          </Button>
          <p className="text-xs text-muted-foreground">
            This will reset the current month's token usage to 0 for this shop.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};