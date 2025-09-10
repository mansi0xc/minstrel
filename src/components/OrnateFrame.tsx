import React from 'react';
import { cn } from '@/lib/utils';

interface OrnateFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'large' | 'compact';
  glowing?: boolean;
}

export const OrnateFrame: React.FC<OrnateFrameProps> = ({ 
  children, 
  className, 
  variant = 'default',
  glowing = false 
}) => {
  const variants = {
    default: 'p-6',
    large: 'p-8',
    compact: 'p-4'
  };

  return (
    <div className={cn(
      'ornate-frame',
      variants[variant],
      glowing && 'animate-glow-pulse',
      className
    )}>
      {children}
    </div>
  );
};