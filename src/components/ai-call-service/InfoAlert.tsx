
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InfoAlertProps {
  show: boolean;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <Alert className="mb-8 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4" />
      <AlertDescription>
        Click the microphone button below to start a new AI reservation call. Speak clearly when prompted.
      </AlertDescription>
    </Alert>
  );
};
