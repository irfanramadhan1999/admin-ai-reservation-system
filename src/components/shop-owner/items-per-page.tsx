
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ItemsPerPageProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

export const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  itemsPerPage,
  setItemsPerPage
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Rows per page:</span>
      <Select 
        value={itemsPerPage.toString()} 
        onValueChange={(value) => setItemsPerPage(parseInt(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={itemsPerPage.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
