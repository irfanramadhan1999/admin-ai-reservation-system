
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card } from '@/components/ui/card';
import { BlockDialog } from '@/components/system-alerts/BlockDialog';
import { UnblockDialog } from '@/components/system-alerts/UnblockDialog';
import { ConversationsHeader } from '@/components/conversations/ConversationsHeader';
import { ConversationsTable } from '@/components/conversations/ConversationsTable';
import { ConversationsPagination } from '@/components/conversations/ConversationsPagination';
import { useConversations } from '@/components/conversations/useConversations';

const Conversations = () => {
  const {
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
  } = useConversations();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with search and filters */}
        <ConversationsHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <Card>
          {/* Conversations Table */}
          <ConversationsTable 
            conversations={currentConversations}
            formatDate={formatDate}
            onViewConversation={handleViewConversation}
            onToggleBlock={handleToggleBlock}
          />
          
          {/* Pagination */}
          <ConversationsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>

      {/* Block IP Confirmation Dialog */}
      <BlockDialog 
        open={openBlockDialog} 
        onOpenChange={setOpenBlockDialog}
        onConfirm={handleConfirmBlock}
        ipAddress={selectedIP}
      />

      {/* Unblock IP Confirmation Dialog */}
      <UnblockDialog 
        open={openUnblockDialog} 
        onOpenChange={setOpenUnblockDialog}
        onConfirm={handleConfirmUnblock}
        ipAddress={selectedIP}
      />
    </DashboardLayout>
  );
};

export default Conversations;
