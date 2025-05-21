
export interface OperatingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Document {
  name: string;
  file: File | null;
}

export interface BlockedTimeSlot {
  id: string;
  eventName: string;
  date: string;
  blockEntireDay: boolean;
  startTime: string;
  endTime: string;
  tables: string[];
}
