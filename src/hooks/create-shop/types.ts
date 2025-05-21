
export interface Document {
  name: string;
  file: File | null;
}

export interface OperatingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  lastOrder: boolean;
  lastOrderTime: string;
}

export interface TableType {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
}

export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  cuisine: string;
  priceRange: string;
  capacity: string;
  defaultLanguage: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerConfirmPassword: string;
}
