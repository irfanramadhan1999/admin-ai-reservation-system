
import { useState } from 'react';
import { SystemAlert } from './types';
import { toast } from "@/components/ui/use-toast";

export const useAlertActions = (
  systemAlerts: SystemAlert[], 
  setSystemAlerts: React.Dispatch<React.SetStateAction<SystemAlert[]>>
) => {
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);

  const handleToggleBlock = (ipAddress: string, alertId: number, currentStatus: SystemAlert['status']) => {
    // If already blocked, show unblock confirmation dialog
    if (currentStatus === 'Blocked') {
      setSelectedIP(ipAddress);
      setSelectedAlertId(alertId);
      setOpenUnblockDialog(true);
      return;
    }
    
    // If not blocked, show block confirmation dialog
    setSelectedIP(ipAddress);
    setSelectedAlertId(alertId);
    setOpenBlockDialog(true);
  };

  const handleUnblock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Reviewed' } : alert
        )
      );
    }
    
    toast({
      title: "IP Unblocked",
      description: `${selectedIP} has been unblocked successfully.`,
    });
    setOpenUnblockDialog(false);
  };

  const handleConfirmBlock = () => {
    // Update the alert status
    if (selectedAlertId !== null) {
      setSystemAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === selectedAlertId ? { ...alert, status: 'Blocked' } : alert
        )
      );
    }
    
    toast({
      title: "IP Blocked",
      description: `${selectedIP} has been blocked successfully.`,
    });
    setOpenBlockDialog(false);
  };

  return {
    openBlockDialog,
    setOpenBlockDialog,
    openUnblockDialog,
    setOpenUnblockDialog,
    selectedIP,
    handleToggleBlock,
    handleUnblock,
    handleConfirmBlock
  };
};
