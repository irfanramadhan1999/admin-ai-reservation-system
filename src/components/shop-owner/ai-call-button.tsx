
import React from 'react';

// This component is now empty as we're removing the AI Call feature
// The file is kept for backwards compatibility but contains no functional code

interface AiCallButtonProps {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AiCallButton(_props: AiCallButtonProps) {
  // Return null since the AI Call feature is being removed
  return null;
}
