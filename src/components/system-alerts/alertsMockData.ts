
import { SystemAlert } from './types';

// Mock data for system alerts
export const mockSystemAlerts: SystemAlert[] = [
  {
    id: 1,
    timestamp: 'May 20, 2025 - 14:30',
    ipAddress: '192.168.1.45',
    shop: 'Sakura Sushi Tokyo',
    shopContact: '+81 90-1234-5678',
    reason: 'User hung up the phone',
    status: 'Pending Review',
    conversationId: 'C001'
  },
  {
    id: 2,
    timestamp: 'May 20, 2025 - 13:15',
    ipAddress: '192.168.3.78',
    shop: 'Milano Pasta House',
    shopContact: '+81 80-8765-4321',
    reason: 'User went off-topic during the call',
    status: 'Pending Review',
    conversationId: 'C002'
  },
  {
    id: 3,
    timestamp: 'May 19, 2025 - 18:45',
    ipAddress: '192.168.5.12',
    shop: 'Paris Bistro',
    shopContact: '+81 70-9876-5432',
    reason: 'User hung up the phone',
    status: 'Blocked',
    conversationId: 'C003'
  },
  {
    id: 4,
    timestamp: 'May 19, 2025 - 15:22',
    ipAddress: '192.168.9.33',
    shop: 'New York Steakhouse',
    shopContact: '+81 90-2468-1357',
    reason: 'User went off-topic during the call',
    status: 'Blocked',
    conversationId: 'C004'
  },
  {
    id: 5,
    timestamp: 'May 18, 2025 - 09:10',
    ipAddress: '192.168.2.55',
    shop: 'Tokyo Ramen',
    shopContact: '+81 80-1357-2468',
    reason: 'User hung up the phone',
    status: 'Reviewed',
    conversationId: 'C005'
  },
  {
    id: 6,
    timestamp: 'May 17, 2025 - 20:05',
    ipAddress: '192.168.7.21',
    shop: 'Barcelona Tapas',
    shopContact: '+81 70-1111-2222',
    reason: 'User went off-topic during the call',
    status: 'Blocked',
    conversationId: 'C006'
  },
  {
    id: 7,
    timestamp: 'May 17, 2025 - 10:30',
    ipAddress: '192.168.4.89',
    shop: 'Indian Curry House',
    shopContact: '+81 90-3333-4444',
    reason: 'User hung up the phone',
    status: 'Pending Review',
    conversationId: 'C007'
  },
  {
    id: 8,
    timestamp: 'May 16, 2025 - 16:45',
    ipAddress: '192.168.6.37',
    shop: 'Mexican Cantina',
    shopContact: '+81 80-5555-6666',
    reason: 'User went off-topic during the call',
    status: 'Reviewed',
    conversationId: 'C008'
  },
];
