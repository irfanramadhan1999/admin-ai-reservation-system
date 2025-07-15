import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useToast } from '@/hooks/use-toast';
import { CreateShopHeader } from '@/components/create-shop/CreateShopHeader';
import { ShopBasicInfoSection } from '@/components/create-shop/ShopBasicInfoSection';
import { ShopOperatingHoursSection } from '@/components/create-shop/ShopOperatingHoursSection';
import { ShopKnowledgeSection } from '@/components/create-shop/ShopKnowledgeSection';
import { ShopTokenManagementSection } from '@/components/create-shop/ShopTokenManagementSection';
import { TableTypeSection } from '@/components/create-shop/TableTypeSection';
import { TableTypeDialog } from '@/components/create-shop/TableTypeDialog';
import { useCreateShop } from '@/hooks/create-shop';
import { Button } from '@/components/ui/button';

const CreateShop = () => {
  const { id } = useParams();
  const { 
    formData,
    shopActive,
    aiAssistantEnabled,
    is24Hours,
    operatingHours,
    shopKnowledge,
    documents,
    shopImage,
    tableTypes,
    tableTypeDialogOpen,
    editingTableType,
    handleInputChange,
    handleSelectChange,
    handleShopImageUpload,
    handleToggleDay,
    handleToggleLastOrder,
    handleTimeChange,
    setIs24Hours,
    setShopActive,
    setShopKnowledge,
    setAiAssistantEnabled,
    handleDocumentUpload,
    handleDocumentDelete,
    handleOwnerCredentialChange,
    handleAddTableType,
    handleEditTableType,
    handleDeleteTableType,
    handleSaveTableType,
    setTableTypeDialogOpen,
    handleSaveChanges
  } = useCreateShop(id);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <CreateShopHeader isEditing={!!id} />
      
      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* Basic Information Section */}
        <ShopBasicInfoSection 
          shopName={formData.name}
          setShopName={(value) => handleInputChange({
            target: { name: 'name', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          phoneNumber={formData.phone}
          setPhoneNumber={(value) => handleInputChange({
            target: { name: 'phone', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          address={formData.address}
          setAddress={(value) => handleInputChange({
            target: { name: 'address', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          subdomain={formData.website}
          setSubdomain={(value) => handleInputChange({
            target: { name: 'website', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          shopImage={shopImage}
          handleShopImageUpload={handleShopImageUpload}
          defaultLanguage={formData.defaultLanguage}
          setDefaultLanguage={(value) => handleSelectChange('defaultLanguage', value)}
          shopActive={shopActive}
          setShopActive={setShopActive}
          aiAssistantEnabled={aiAssistantEnabled}
          setAiAssistantEnabled={setAiAssistantEnabled}
          ownerEmail={formData.ownerEmail}
          ownerPassword={formData.ownerPassword}
          ownerConfirmPassword={formData.ownerConfirmPassword}
          handleOwnerCredentialChange={handleOwnerCredentialChange}
        />
        
        {/* Operating Hours Section */}
        <ShopOperatingHoursSection 
          is24Hours={is24Hours}
          setIs24Hours={setIs24Hours}
          operatingHours={operatingHours}
          handleToggleDay={handleToggleDay}
          handleToggleLastOrder={handleToggleLastOrder}
          handleTimeChange={handleTimeChange}
        />
        
        {/* Table Type Section */}
        <TableTypeSection 
          tableTypes={tableTypes}
          onAddTableType={handleAddTableType}
          onEditTableType={handleEditTableType}
          onDeleteTableType={handleDeleteTableType}
        />
        
        {/* Knowledge Management Section */}
        <ShopKnowledgeSection 
          shopKnowledge={shopKnowledge}
          setShopKnowledge={setShopKnowledge}
          documents={documents}
          handleDocumentUpload={handleDocumentUpload}
          handleDocumentDelete={handleDocumentDelete}
        />
        
        {/* Token Management Section - Only show when editing */}
        {id && (
          <ShopTokenManagementSection 
            currentTokenUsage={12500} // Mock data - replace with actual API call
            tokenLimit={25000} // Mock data - replace with actual API call
            onTokenLimitUpdate={async (limit) => {
              // TODO: Implement API call to update token limit
              console.log('Updating token limit to:', limit);
            }}
            onTokenReset={async () => {
              // TODO: Implement API call to reset token usage
              console.log('Resetting token usage');
            }}
          />
        )}
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            {id ? 'Update Shop' : 'Create Shop'}
          </Button>
        </div>
      </form>
      
      {/* Table Type Dialog */}
      <TableTypeDialog
        open={tableTypeDialogOpen}
        onOpenChange={setTableTypeDialogOpen}
        onSave={handleSaveTableType}
        editingTableType={editingTableType}
      />
    </DashboardLayout>
  );
};

export default CreateShop;
