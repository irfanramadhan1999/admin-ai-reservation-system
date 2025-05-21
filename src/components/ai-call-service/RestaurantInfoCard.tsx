
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
    <Card className="w-full mb-8 overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl rounded-2xl">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 flex items-center space-x-6">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-white/50 shadow-md">
              <AvatarImage src={restaurantData.logo} alt="Restaurant logo" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-400 text-white text-lg">{restaurantData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-400 h-4 w-4 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{restaurantData.name}</h3>
            <div className="flex items-center mt-2 text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <p className="text-sm">{restaurantData.phone}</p>
            </div>
            <Badge variant="outline" className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-600 border-emerald-200 px-3 py-1">
              <span className="mr-1.5 inline-block h-2 w-2 bg-green-400 rounded-full"></span>
              Ready for AI calls
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
