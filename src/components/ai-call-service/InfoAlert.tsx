
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InfoAlertProps {
  show: boolean;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700 font-medium">
        Click the microphone button below to start a new AI reservation call. Speak clearly when prompted.
      </AlertDescription>
    </Alert>
  );
};
