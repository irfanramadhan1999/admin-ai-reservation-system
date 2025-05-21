
export interface Conversation {
  id: string;
  timestamp: string;
  ipAddress: string;
  shop: string;
  duration: string;
  tokenUsage: number;
  score: number;
  blocked: boolean;
}
