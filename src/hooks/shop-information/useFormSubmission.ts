
import { useToast } from '@/hooks/use-toast';

interface FormSubmissionProps {
  shopName: string;
  phoneNumber: string;
  address: string;
}

export const useFormSubmission = ({ shopName, phoneNumber, address }: FormSubmissionProps) => {
  const { toast } = useToast();
  
  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!shopName.trim()) {
      toast({
        title: "Missing Information",
        description: "Shop name is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Phone number is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!address.trim()) {
      toast({
        title: "Missing Information",
        description: "Address is required.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Changes Saved",
      description: "Your shop information has been updated successfully."
    });
  };

  return {
    handleSaveChanges
  };
};
