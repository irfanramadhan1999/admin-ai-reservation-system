
import React from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Button } from '@/components/ui/button';
import { useShopInformation } from '@/hooks/shop-information';

// Import refactored components
import { BasicInformationSection } from '@/components/shop-information/BasicInformationSection';
import { OperatingHoursSection } from '@/components/shop-information/OperatingHoursSection';
import { DowntimeSection } from '@/components/shop-information/DowntimeSection';
import { KnowledgeManagementSection } from '@/components/shop-information/KnowledgeManagementSection';

const ShopInformation = () => {
  const {
    // Basic information
    shopName,
    setShopName,
    phoneNumber,
    webappUrl,
    address,
    setAddress,
    shopImage,
    isEditingUrl,
    handlePhoneNumberChange,
    toggleUrlEdit,
    handleUrlChange,
    handleShopImageUpload,
    
    // Knowledge management
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete,
    
    // Operating hours
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleTimeChange,
    
    // Downtime slots
    blockedTimeSlots,
    blockTimeSlotOpen,
    setBlockTimeSlotOpen,
    selectedBlockedSlot,
    handleAddBlockedSlot,
    handleEditBlockedSlot,
    handleRemoveBlockedSlot,
    handleSubmitBlockedSlot,
    
    // Form submission
    handleSaveChanges
  } = useShopInformation();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <DashboardHeader 
        title="Shop Information" 
        subtitle="Update your shop details"
        date={format(new Date(), 'PPPP')} 
      />
      
      <form onSubmit={handleSaveChanges}>
        {/* Basic Information Section */}
        <BasicInformationSection
          shopName={shopName}
          setShopName={setShopName}
          phoneNumber={phoneNumber}
          webappUrl={webappUrl}
          address={address}
          setAddress={setAddress}
          shopImage={shopImage}
          isEditingUrl={isEditingUrl}
          handlePhoneNumberChange={handlePhoneNumberChange}
          toggleUrlEdit={toggleUrlEdit}
          handleUrlChange={handleUrlChange}
          handleShopImageUpload={handleShopImageUpload}
        />
        
        {/* Operating Hours Section */}
        <OperatingHoursSection
          is24Hours={is24Hours}
          setIs24Hours={setIs24Hours}
          operatingHours={operatingHours}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />

        {/* Set Downtime Section */}
        <DowntimeSection
          blockedTimeSlots={blockedTimeSlots}
          blockTimeSlotOpen={blockTimeSlotOpen}
          setBlockTimeSlotOpen={setBlockTimeSlotOpen}
          selectedBlockedSlot={selectedBlockedSlot}
          handleAddBlockedSlot={handleAddBlockedSlot}
          handleEditBlockedSlot={handleEditBlockedSlot}
          handleRemoveBlockedSlot={handleRemoveBlockedSlot}
          handleSubmitBlockedSlot={handleSubmitBlockedSlot}
        />
        
        {/* Knowledge Management Section */}
        <KnowledgeManagementSection
          shopKnowledge={shopKnowledge}
          setShopKnowledge={setShopKnowledge}
          documents={documents}
          handleDocumentUpload={handleDocumentUpload}
          handleDocumentDelete={handleDocumentDelete}
        />
        
        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 rounded-md"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ShopInformation;
