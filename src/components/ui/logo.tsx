import React from 'react';
import logoImage from '@/assets/logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10', 
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImage} 
        alt="ReservationAI Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <h1 className={`${textSizeClasses[size]} font-semibold text-foreground`}>
          Reservation<span className="text-primary">AI</span>
        </h1>
      )}
    </div>
  );
}