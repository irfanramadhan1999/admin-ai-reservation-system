
import { useState } from 'react';

interface FormValues {
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  guests: number;
  tables: string[];
  status: string;
  notes: string;
}

export const useCreateBookingForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    customerName: '',
    customerPhone: '',
    startTime: '',
    endTime: '',
    guests: 1,
    tables: [],
    status: 'confirmed',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleStatusChange = (status: string) => {
    setFormValues({
      ...formValues,
      status,
    });
  };

  const addTable = (tableName: string) => {
    setFormValues({
      ...formValues,
      tables: [...formValues.tables, tableName],
    });
  };

  const removeTable = (index: number) => {
    const newTables = [...formValues.tables];
    newTables.splice(index, 1);
    setFormValues({
      ...formValues,
      tables: newTables,
    });
  };

  const resetForm = () => {
    setFormValues({
      customerName: '',
      customerPhone: '',
      startTime: '',
      endTime: '',
      guests: 1,
      tables: [],
      status: 'confirmed',
      notes: '',
    });
  };

  return {
    formValues,
    handleInputChange,
    handleStatusChange,
    addTable,
    removeTable,
    resetForm,
  };
};
