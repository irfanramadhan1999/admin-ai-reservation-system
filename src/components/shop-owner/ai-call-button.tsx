
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface AiCallButtonProps {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AiCallButton({ 
  variant = "default", 
  size = "default",
  className = ""
}: AiCallButtonProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/shop-admin/ai-call');
  };
  
  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className={`${className} transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md`}
    >
      <Phone className="mr-2 h-4 w-4" />
      AI Call Service
    </Button>
  );
}
