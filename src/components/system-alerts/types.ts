
export type AlertStatus = 'Pending Review' | 'Reviewed' | 'Blocked';

export interface SystemAlert {
  id: number;
  timestamp: string;
  ipAddress: string;
  shop: string;
  shopContact: string;
  reason: string;
  status: AlertStatus;
  conversationId?: string;
}
