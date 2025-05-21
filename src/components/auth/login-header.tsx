
import React from 'react';

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-2 mb-4">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          A
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reservation<span className="text-blue-500">AI</span>
        </h1>
      </div>
      <p className="text-gray-500">Admin Dashboard Login</p>
    </div>
  );
}
