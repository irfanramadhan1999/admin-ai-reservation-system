
import React from 'react';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { useNavigate } from 'react-router-dom';

interface CreateShopHeaderProps {
  isEditing: boolean;
}

export const CreateShopHeader = ({ isEditing }: CreateShopHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <DashboardHeader 
        title={isEditing ? "Edit Shop" : "Create Shop"} 
        subtitle={isEditing ? "Update shop details" : "Add a new shop"}
        date={format(new Date(), 'PPPP')} 
      />
      <Button 
        variant="outline" 
        onClick={() => navigate('/admin/shops')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shops
      </Button>
    </div>
  );
};
