
import React from 'react';
import { TableData } from './table-types';

interface TableItemProps {
  table: TableData;
  onSelectTable: (table: TableData) => void;
}

export function TableItem({ table, onSelectTable }: TableItemProps) {
  return (
    <button
      onClick={() => onSelectTable(table)}
      className={`w-full aspect-square rounded-lg p-3 border border-border flex flex-col items-center justify-center transition-colors ${
        table.isOccupied
          ? "bg-red-100 hover:bg-red-200 text-red-800"
          : "bg-green-100 hover:bg-green-200 text-green-800"
      }`}
    >
      <div className="text-sm font-medium">{table.type}</div>
      <div className="text-xs mt-1">{table.capacity} people</div>
      {table.isOccupied && table.bookingTime && (
        <div className="text-xs mt-2 px-1.5 py-0.5 rounded bg-white/50">
          Until {table.bookingTime.split('-')[1]}
        </div>
      )}
    </button>
  );
}
