import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for shops with token usage
const mockShopsData = [
  { id: '1', name: 'Coffee Paradise', tokenLimit: 10000, tokensUsed: 9800, status: 'Over Limit' },
  { id: '2', name: 'Pizza Corner', tokenLimit: 15000, tokensUsed: 14500, status: 'Near Limit' },
  { id: '3', name: 'Sushi Zen', tokenLimit: 8000, tokensUsed: 7900, status: 'Near Limit' },
  { id: '4', name: 'Burger Junction', tokenLimit: 12000, tokensUsed: 12200, status: 'Over Limit' },
  { id: '5', name: 'Thai Garden', tokenLimit: 20000, tokensUsed: 18500, status: 'Near Limit' },
  { id: '6', name: 'Italian Bistro', tokenLimit: 9000, tokensUsed: 9100, status: 'Over Limit' },
  { id: '7', name: 'Mexican Cantina', tokenLimit: 11000, tokensUsed: 10200, status: 'Near Limit' },
  { id: '8', name: 'French Café', tokenLimit: 7000, tokensUsed: 6800, status: 'Near Limit' },
  { id: '9', name: 'Chinese Dragon', tokenLimit: 13000, tokensUsed: 12800, status: 'Near Limit' },
  { id: '10', name: 'Indian Spice', tokenLimit: 16000, tokensUsed: 16200, status: 'Over Limit' },
  { id: '11', name: 'Greek Taverna', tokenLimit: 8500, tokensUsed: 8400, status: 'Near Limit' },
  { id: '12', name: 'Korean BBQ', tokenLimit: 14000, tokensUsed: 14100, status: 'Over Limit' },
  { id: '13', name: 'Japanese Ramen', tokenLimit: 12500, tokensUsed: 12000, status: 'Near Limit' },
  { id: '14', name: 'Spanish Tapas', tokenLimit: 9500, tokensUsed: 9400, status: 'Near Limit' },
  { id: '15', name: 'Brazilian Grill', tokenLimit: 18000, tokensUsed: 17800, status: 'Near Limit' },
  { id: '16', name: 'Moroccan Nights', tokenLimit: 10500, tokensUsed: 10600, status: 'Over Limit' },
  { id: '17', name: 'Russian Dumplings', tokenLimit: 11500, tokensUsed: 11300, status: 'Near Limit' },
  { id: '18', name: 'Turkish Kebab', tokenLimit: 13500, tokensUsed: 13600, status: 'Over Limit' },
  { id: '19', name: 'Vietnamese Pho', tokenLimit: 9800, tokensUsed: 9700, status: 'Near Limit' },
  { id: '20', name: 'Ethiopian Delights', tokenLimit: 8800, tokensUsed: 8900, status: 'Over Limit' },
  { id: '21', name: 'Lebanese Kitchen', tokenLimit: 12800, tokensUsed: 12600, status: 'Near Limit' },
  { id: '22', name: 'Peruvian Fusion', tokenLimit: 15500, tokensUsed: 15600, status: 'Over Limit' },
  { id: '23', name: 'Argentinian Steakhouse', tokenLimit: 19000, tokensUsed: 18900, status: 'Near Limit' },
  { id: '24', name: 'Scandinavian Nordic', tokenLimit: 14500, tokensUsed: 14600, status: 'Over Limit' },
  { id: '25', name: 'Caribbean Jerk', tokenLimit: 11800, tokensUsed: 11700, status: 'Near Limit' },
];

const ITEMS_PER_PAGE = 10;

interface ShopsLimitTableProps {
  selectedShops: string[];
  onSelectionChange: (selected: string[]) => void;
}

export function ShopsLimitTable({ selectedShops, onSelectionChange }: ShopsLimitTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter shops by search query
  const filteredShops = mockShopsData.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort shops by urgency (over limit first, then by percentage used)
  const sortedShops = [...filteredShops].sort((a, b) => {
    const aPercentage = (a.tokensUsed / a.tokenLimit) * 100;
    const bPercentage = (b.tokensUsed / b.tokenLimit) * 100;
    return bPercentage - aPercentage;
  });

  const totalPages = Math.ceil(sortedShops.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShops = sortedShops.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(paginatedShops.map(shop => shop.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectShop = (shopId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedShops, shopId]);
    } else {
      onSelectionChange(selectedShops.filter(id => id !== shopId));
    }
  };

  const isAllSelected = paginatedShops.length > 0 && paginatedShops.every(shop => selectedShops.includes(shop.id));

  const getStatusBadge = (status: string) => {
    if (status === 'Over Limit') {
      return <Badge variant="destructive">Over Limit</Badge>;
    }
    return <Badge variant="secondary">Near Limit</Badge>;
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shops Near Token Limit</CardTitle>
        <CardDescription>
          Shops that are approaching or have exceeded their monthly token limits.
        </CardDescription>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all shops"
                />
              </TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Token Usage</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedShops.map((shop) => {
              const percentage = getUsagePercentage(shop.tokensUsed, shop.tokenLimit);
              const isSelected = selectedShops.includes(shop.id);
              return (
                <TableRow key={shop.id}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectShop(shop.id, checked as boolean)}
                      aria-label={`Select ${shop.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>
                    {shop.tokensUsed.toLocaleString()} / {shop.tokenLimit.toLocaleString()}
                  </TableCell>
                  <TableCell className="w-32">
                    <Progress 
                      value={percentage} 
                      className={`h-2 ${percentage > 100 ? 'bg-red-100' : percentage > 90 ? 'bg-yellow-100' : 'bg-green-100'}`}
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {percentage.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(shop.status)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}