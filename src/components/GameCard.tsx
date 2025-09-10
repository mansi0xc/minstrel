import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { OrnateFrame } from './OrnateFrame';
import { GearAnimation } from './GearAnimation';

interface GameCardProps {
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  to,
  icon,
  difficulty = 'Medium',
  className
}) => {
  const difficultyColors = {
    Easy: 'text-green-400',
    Medium: 'text-glow-amber',
    Hard: 'text-red-400'
  };

  return (
    <NavLink to={to} className="block">
      <OrnateFrame 
        className={cn(
          'group hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl',
          className
        )}
      >
        <div className="relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GearAnimation size="sm" speed="fast" />
          </div>
          
          <div className="text-center space-y-4">
            {icon && (
              <div className="flex justify-center text-brass mb-4">
                {icon}
              </div>
            )}
            
            <h3 className="text-xl font-cinzel-decorative font-bold glow-text group-hover:animate-glow-pulse">
              {title}
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
            
            <div className="flex justify-between items-center pt-4 border-t border-brass/30">
              <span className="text-xs font-cinzel text-foreground/70">
                Difficulty
              </span>
              <span className={cn('text-sm font-semibold', difficultyColors[difficulty])}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </OrnateFrame>
    </NavLink>
  );
};