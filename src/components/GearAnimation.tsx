import React from 'react';
import { cn } from '@/lib/utils';
import gear1 from '@/assets/gear-1.png';
import gear2 from '@/assets/gear-2.png';

interface GearAnimationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'medium' | 'fast';
  reverse?: boolean;
  className?: string;
}

export const GearAnimation: React.FC<GearAnimationProps> = ({
  size = 'md',
  speed = 'medium',
  reverse = false,
  className
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const speeds = {
    slow: 'animate-gear-slow',
    medium: 'animate-gear',
    fast: 'animate-gear'
  };

  const animationClass = reverse ? 'animate-gear-reverse' : speeds[speed];

  return (
    <img
      src={Math.random() > 0.5 ? gear1 : gear2}
      alt="Steampunk Gear"
      className={cn(
        sizes[size],
        animationClass,
        'drop-shadow-lg',
        className
      )}
    />
  );
};