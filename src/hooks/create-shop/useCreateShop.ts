
import { useShopBasicInfo } from './useShopBasicInfo';
import { useOperatingHours } from './useOperatingHours';
import { useTableTypes } from './useTableTypes';
import { useShopKnowledge } from './useShopKnowledge';
import { useFormSubmission } from './useFormSubmission';

export const useCreateShop = (id?: string) => {
  const isEditing = !!id;
  
  // Use all the smaller hooks
  const {
    formData,
    shopActive,
    aiAssistantEnabled,
    shopImage,
    handleInputChange,
    handleSelectChange,
    handleShopImageUpload,
    setShopActive,
    setAiAssistantEnabled,
    handleOwnerCredentialChange
  } = useShopBasicInfo({ isEditing });
  
  const {
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleToggleLastOrder,
    handleTimeChange
  } = useOperatingHours();

  const {
    tableTypes,
    tableTypeDialogOpen,
    editingTableType,
    handleAddTableType,
    handleEditTableType,
    handleDeleteTableType,
    handleSaveTableType,
    setTableTypeDialogOpen
  } = useTableTypes({ isEditing });

  const {
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete
  } = useShopKnowledge({ isEditing });

  const { handleSaveChanges } = useFormSubmission({ isEditing, formData });

  return {
    // Basic information
    formData,
    shopActive,
    aiAssistantEnabled,
    shopImage,
    handleInputChange,
    handleSelectChange,
    handleShopImageUpload,
    setShopActive,
    setAiAssistantEnabled,
    handleOwnerCredentialChange,
    
    // Operating hours
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleToggleLastOrder,
    handleTimeChange,
    
    // Table types
    tableTypes,
    tableTypeDialogOpen,
    editingTableType,
    handleAddTableType,
    handleEditTableType,
    handleDeleteTableType,
    handleSaveTableType,
    setTableTypeDialogOpen,
    
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
