
import React from 'react';
import { Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RestaurantInfoCardProps {
  restaurantData: {
    name: string;
    logo: string;
    phone: string;
  };
}

export const RestaurantInfoCard: React.FC<RestaurantInfoCardProps> = ({ restaurantData }) => {
  return (
    <Card className="w-full mb-8 overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
            <AvatarImage src={restaurantData.logo} alt="Restaurant logo" />
            <AvatarFallback className="bg-blue-500 text-white">{restaurantData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{restaurantData.name}</h3>
            <div className="flex items-center mt-1">
              <Phone className="h-4 w-4 text-muted-foreground mr-1" />
              <p className="text-sm text-muted-foreground">{restaurantData.phone}</p>
            </div>
            <Badge variant="outline" className="mt-2">Ready for AI calls</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
