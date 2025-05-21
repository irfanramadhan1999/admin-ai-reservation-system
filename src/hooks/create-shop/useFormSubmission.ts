
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ShopFormData } from './types';

interface UseFormSubmissionProps {
  isEditing: boolean;
  formData: ShopFormData;
}

export const useFormSubmission = ({ isEditing, formData }: UseFormSubmissionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Shop name is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Phone number is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Address is required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.website.trim()) {
      toast({
        title: "Missing Information",
        description: "Subdomain is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.ownerEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Owner email is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEditing && (!formData.ownerPassword.trim() || !formData.ownerConfirmPassword.trim())) {
      toast({
        title: "Missing Information",
        description: "Owner password is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.ownerPassword !== formData.ownerConfirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isEditing ? "Shop Updated" : "Shop Created",
      description: `${formData.name} has been ${isEditing ? "updated" : "created"} successfully.`
    });
    
    // Navigate back to shops list
    navigate('/admin/shops');
  };

  return {
    handleSaveChanges
  };
};
