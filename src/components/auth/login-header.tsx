
import React from 'react';
import { Logo } from '@/components/ui/logo';

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <Logo size="lg" />
      </div>
      <p className="text-muted-foreground">Admin Dashboard Login</p>
    </div>
  );
}
