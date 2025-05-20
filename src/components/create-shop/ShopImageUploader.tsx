
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ShopImageUploaderProps {
  shopImage: string | null;
  handleShopImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ShopImageUploader = ({
  shopImage,
  handleShopImageUpload
}: ShopImageUploaderProps) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <Avatar className="w-32 h-32">
        {shopImage ? (
          <AvatarImage src={shopImage} alt="Shop" />
        ) : (
          <AvatarFallback className="bg-muted text-muted-foreground text-xl">
            Shop
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <input
          type="file"
          id="shop-image"
          accept="image/*"
          onChange={handleShopImageUpload}
          className="hidden"
        />
        <label htmlFor="shop-image">
          <Button type="button" variant="outline" size="sm" className="cursor-pointer">
            Upload Shop Picture
          </Button>
        </label>
      </div>
    </div>
  );
};
