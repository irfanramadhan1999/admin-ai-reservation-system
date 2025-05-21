
import React from 'react';

export function TableLegend() {
  return (
    <div className="mt-6 flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-300"></div>
        <span className="text-sm">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-300"></div>
        <span className="text-sm">Occupied</span>
      </div>
    </div>
  );
}
