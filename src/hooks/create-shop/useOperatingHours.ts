
import { useState } from 'react';
import { OperatingHour } from './types';

export const useOperatingHours = () => {
  // Operating hours state
  const [is24Hours, setIs24Hours] = useState(false);
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([
    { day: 'Monday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Tuesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Wednesday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Thursday', isOpen: true, openTime: '11:00', closeTime: '22:00', lastOrder: true, lastOrderTime: '21:00' },
    { day: 'Friday', isOpen: true, openTime: '11:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '23:00', lastOrder: true, lastOrderTime: '22:00' },
    { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '21:00', lastOrder: true, lastOrderTime: '20:00' },
  ]);
  
  // Handle operating hours toggle
  const handleToggleDay = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].isOpen = !updatedHours[index].isOpen;
    setOperatingHours(updatedHours);
  };
  
  // Handle last order toggle
  const handleToggleLastOrder = (index: number) => {
    const updatedHours = [...operatingHours];
    updatedHours[index].lastOrder = !updatedHours[index].lastOrder;
    setOperatingHours(updatedHours);
  };
  
  // Handle time change
  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime' | 'lastOrderTime', value: string) => {
    const updatedHours = [...operatingHours];
    updatedHours[index][field] = value;
    setOperatingHours(updatedHours);
  };

  return {
    is24Hours,
    setIs24Hours,
    operatingHours,
    handleToggleDay,
    handleToggleLastOrder,
    handleTimeChange
  };
};
