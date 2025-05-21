
import { useState } from 'react';
import { Document } from './types';
import { useToast } from '@/hooks/use-toast';

interface UseShopKnowledgeProps {
  isEditing: boolean;
}

export const useShopKnowledge = ({ isEditing }: UseShopKnowledgeProps) => {
  const { toast } = useToast();
  
  // Knowledge management state
  const [shopKnowledge, setShopKnowledge] = useState('');
  const [documents, setDocuments] = useState<Document[]>(
    isEditing ? [{ name: 'business-license.pdf', file: null }] : []
  );

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.pdf')) {
      // Add new document to the list
      setDocuments([...documents, { name: file.name, file }]);
      toast({
        title: "Document Uploaded",
        description: "Your document has been successfully uploaded."
      });
    } else if (file) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF document.",
        variant: "destructive"
      });
    }
  };

  // Handle document delete
  const handleDocumentDelete = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
    toast({
      title: "Document Deleted",
      description: "Your document has been successfully deleted."
    });
  };

  return {
    shopKnowledge,
    setShopKnowledge,
    documents,
    handleDocumentUpload,
    handleDocumentDelete
  };
};
