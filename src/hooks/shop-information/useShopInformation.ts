
import { useBasicInfo } from './useBasicInfo';
import { useOperatingHours } from './useOperatingHours';
import { useBlockedTimeSlots } from './useBlockedTimeSlots';
import { useShopKnowledge } from './useShopKnowledge';
import { useFormSubmission } from './useFormSubmission';

export const useShopInformation = () => {
  // Use all the smaller hooks
  const {
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
  } = useBasicInfo();
  
  const {
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleTimeChange,
  } = useOperatingHours();

  const {
    blockedTimeSlots,
    blockTimeSlotOpen,
    setBlockTimeSlotOpen,
    selectedBlockedSlot,
    handleAddBlockedSlot,
    handleEditBlockedSlot,
    handleRemoveBlockedSlot,
    handleSubmitBlockedSlot,
  } = useBlockedTimeSlots();

  const {
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete
  } = useShopKnowledge();

  const { handleSaveChanges } = useFormSubmission();

  return {
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
    
    // Knowledge management
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete,
    
    // Form submission
    handleSaveChanges
  };
};

// Export types from the types file
export * from './types';
