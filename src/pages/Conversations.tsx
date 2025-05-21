
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock conversation data
const mockConversations = [
  {
    id: "C001",
    timestamp: "2025-05-20T14:30:00",
    ipAddress: "192.168.1.45",
    shop: "Sakura Sushi",
    duration: "13 minutes",
    tokenUsage: 2425,
    score: 1,
  },
  {
    id: "C002",
    timestamp: "2025-05-20T15:45:00",
    ipAddress: "192.168.1.67",
    shop: "Cafe Milano",
    duration: "8 minutes",
    tokenUsage: 1853,
    score: 1,
  },
  {
    id: "C003",
    timestamp: "2025-05-19T10:15:00",
    ipAddress: "192.168.1.92",
    shop: "Bangkok Spice",
    duration: "5 minutes",
    tokenUsage: 1245,
    score: 0,
  },
  {
    id: "C004",
    timestamp: "2025-05-19T18:20:00",
    ipAddress: "192.168.1.103",
    shop: "Taco Fiesta",
    duration: "10 minutes",
    tokenUsage: 2056,
    score: 1,
  },
  {
    id: "C005",
    timestamp: "2025-05-18T12:40:00",
    ipAddress: "192.168.1.78",
    shop: "Pizza Palace",
    duration: "7 minutes",
    tokenUsage: 1632,
    score: 1,
  },
  {
    id: "C006",
    timestamp: "2025-05-18T20:10:00",
    ipAddress: "192.168.1.124",
    shop: "BBQ House",
    duration: "9 minutes",
    tokenUsage: 1875,
    score: 0,
  },
  {
    id: "C007",
    timestamp: "2025-05-17T16:55:00",
    ipAddress: "192.168.1.56",
    shop: "Sakura Sushi",
    duration: "12 minutes",
    tokenUsage: 2254,
    score: 1,
  },
  {
    id: "C008",
    timestamp: "2025-05-17T11:30:00",
    ipAddress: "192.168.1.89",
    shop: "Cafe Milano",
    duration: "6 minutes",
    tokenUsage: 1423,
    score: 1,
  },
  {
    id: "C009",
    timestamp: "2025-05-16T13:15:00",
    ipAddress: "192.168.1.112",
    shop: "Bangkok Spice",
    duration: "8 minutes",
    tokenUsage: 1732,
    score: 0,
  },
  {
    id: "C010",
    timestamp: "2025-05-16T19:40:00",
    ipAddress: "192.168.1.37",
    shop: "Taco Fiesta",
    duration: "11 minutes",
    tokenUsage: 2154,
    score: 1,
  }
];

const Conversations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(
    conversation => 
      conversation.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.ipAddress.includes(searchQuery)
  );

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConversations = filteredConversations.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewConversation = (id: string) => {
    navigate(`/admin/conversations/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
            <p className="text-muted-foreground">
              Review all AI conversations with customers
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by shop or IP..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Shop</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Token Usage</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentConversations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No conversations found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell className="font-medium">
                        {formatDate(conversation.timestamp)}
                      </TableCell>
                      <TableCell>{conversation.ipAddress}</TableCell>
                      <TableCell>{conversation.shop}</TableCell>
                      <TableCell>{conversation.duration}</TableCell>
                      <TableCell>{conversation.tokenUsage}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            conversation.score === 1
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }
                        >
                          {conversation.score === 1 ? "Success" : "Failed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewConversation(conversation.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, current page, last page and one page on each side of current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      Math.abs(pageNumber - currentPage) <= 1
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNumber === 2 && currentPage > 3 ||
                      pageNumber === totalPages - 1 && currentPage < totalPages - 2
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Conversations;
