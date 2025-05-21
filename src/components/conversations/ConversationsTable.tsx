
import React from 'react';
import { Eye, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Conversation } from './types';

interface ConversationsTableProps {
  conversations: Conversation[];
  formatDate: (dateString: string) => string;
  onViewConversation: (id: string) => void;
  onToggleBlock: (ipAddress: string, id: string, isBlocked: boolean) => void;
}

export function ConversationsTable({
  conversations,
  formatDate,
  onViewConversation,
  onToggleBlock
}: ConversationsTableProps) {
  return (
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
          {conversations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No conversations found
              </TableCell>
            </TableRow>
          ) : (
            conversations.map((conversation) => (
              <TableRow 
                key={conversation.id}
                className={conversation.blocked ? "bg-red-50" : undefined}
              >
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
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewConversation(conversation.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant={conversation.blocked ? "outline" : "ghost"}
                      size="sm"
                      className={conversation.blocked ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700"}
                      onClick={() => onToggleBlock(conversation.ipAddress, conversation.id, conversation.blocked)}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      {conversation.blocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
