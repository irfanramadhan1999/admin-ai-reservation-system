
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, CalendarDays, ExternalLink } from 'lucide-react';

export interface Shop {
  id: string;
  name: string;
  contact: string;
  tokenUsage: {
    used: number;
    limit: number;
  };
  totalBookings: number;
  createdAt: string;
  isActive: boolean;
  frontendUrl: string;
}

interface ShopsTableProps {
  shops: Shop[];
  formatDateTime: (dateString: string) => string;
  onEditShop: (id: string) => void;
  onViewBookings: (id: string) => void;
  onDirectToShop: (url: string) => void;
}

export function ShopsTable({ 
  shops, 
  formatDateTime, 
  onEditShop, 
  onViewBookings, 
  onDirectToShop 
}: ShopsTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shop Information</TableHead>
            <TableHead>Token Usage</TableHead>
            <TableHead>Total Bookings</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{shop.name}</span>
                  <span className="text-sm text-muted-foreground">{shop.contact}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{shop.tokenUsage.used.toLocaleString()} / {shop.tokenUsage.limit.toLocaleString()}</span>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div 
                      className={`h-2 rounded-full ${shop.tokenUsage.used / shop.tokenUsage.limit > 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${(shop.tokenUsage.used / shop.tokenUsage.limit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{shop.totalBookings}</TableCell>
              <TableCell>
                {formatDateTime(shop.createdAt)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditShop(shop.id)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewBookings(shop.id)}
                    title="Bookings"
                  >
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDirectToShop(shop.frontendUrl)}
                    title="Direct to Shop"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
