
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Conversation } from './types';
import { mockConversationsInitial } from './mock-data';
import { toast } from "@/components/ui/use-toast";
import { isSameDay } from 'date-fns';

export function useConversations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversationsInitial);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const itemsPerPage = 8;

  // Filter conversations based on search query, score filter, and date filter
  const filteredConversations = conversations.filter(conversation => {
    // Search filter
    const matchesSearch = 
      conversation.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.ipAddress.includes(searchQuery);
    
    // Score filter
    let matchesScore = true;
    if (scoreFilter === 'success') {
      matchesScore = conversation.score === 1;
    } else if (scoreFilter === 'failed') {
      matchesScore = conversation.score === 0;
    }
    
    // Date filter
    let matchesDate = true;
    if (selectedDate) {
      const conversationDate = new Date(conversation.timestamp);
      matchesDate = isSameDay(conversationDate, selectedDate);
    }
    
    return matchesSearch && matchesScore && matchesDate;
  });

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

  const handleToggleBlock = (ipAddress: string, id: string, isBlocked: boolean) => {
    if (isBlocked) {
      // If already blocked, show unblock confirmation
      setSelectedIP(ipAddress);
      setSelectedConversationId(id);
      setOpenUnblockDialog(true);
    } else {
      // If not blocked, show block confirmation
      setSelectedIP(ipAddress);
      setSelectedConversationId(id);
      setOpenBlockDialog(true);
    }
  };

  const handleConfirmBlock = () => {
    if (selectedConversationId) {
      setConversations(prevConversations => 
        prevConversations.map(conversation => 
          conversation.id === selectedConversationId ? { ...conversation, blocked: true } : conversation
        )
      );
      
      toast({
        title: "IP Blocked",
        description: `${selectedIP} has been blocked successfully.`,
      });
    }
    setOpenBlockDialog(false);
  };

  const handleConfirmUnblock = () => {
    if (selectedConversationId) {
      setConversations(prevConversations => 
        prevConversations.map(conversation => 
          conversation.id === selectedConversationId ? { ...conversation, blocked: false } : conversation
        )
      );
      
      toast({
        title: "IP Unblocked",
        description: `${selectedIP} has been unblocked successfully.`,
      });
    }
    setOpenUnblockDialog(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    scoreFilter,
    setScoreFilter,
    selectedDate,
    setSelectedDate,
    currentPage,
    setCurrentPage,
    currentConversations,
    totalPages,
    openBlockDialog,
    setOpenBlockDialog,
    openUnblockDialog,
    setOpenUnblockDialog,
    selectedIP,
    formatDate,
    handleViewConversation,
    handleToggleBlock,
    handleConfirmBlock,
    handleConfirmUnblock
  };
}
