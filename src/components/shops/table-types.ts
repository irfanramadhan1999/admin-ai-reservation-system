
export interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

export interface TableData {
  id: string;
  type: string;
  typeId: string;
  capacity: number;
  isOccupied: boolean;
  bookingTime?: string;
  blocked?: boolean;
}
