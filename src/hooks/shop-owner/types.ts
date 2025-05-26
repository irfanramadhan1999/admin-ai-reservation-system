
export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  tables: string[];
  guests: number;
  status: string;
  notes: string;
}

export interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

export interface TablesByType {
  [key: string]: string[];
}
