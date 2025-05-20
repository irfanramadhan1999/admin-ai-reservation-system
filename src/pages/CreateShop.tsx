
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useToast } from '@/hooks/use-toast';
import { CreateShopHeader } from '@/components/create-shop/CreateShopHeader';
import { ShopBasicInfoSection } from '@/components/create-shop/ShopBasicInfoSection';
import { ShopOperatingHoursSection } from '@/components/create-shop/ShopOperatingHoursSection';
import { ShopKnowledgeSection } from '@/components/create-shop/ShopKnowledgeSection';
import { useCreateShop } from '@/hooks/useCreateShop';

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
        
        {/* Knowledge Management Section */}
        <ShopKnowledgeSection 
          shopKnowledge={shopKnowledge}
          setShopKnowledge={setShopKnowledge}
          documents={documents}
          handleDocumentUpload={handleDocumentUpload}
          handleDocumentDelete={handleDocumentDelete}
        />
      </form>
    </DashboardLayout>
  );
};

export default CreateShop;
