import React, { useState, useEffect } from 'react';
import { GearAnimation } from './GearAnimation';
import { OrnateFrame } from './OrnateFrame';

interface SteampunkLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export const SteampunkLoader: React.FC<SteampunkLoaderProps> = ({ 
  onComplete, 
  duration = 4000 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('INITIALIZING CLOCKWORK...');

  const messages = [
    'INITIALIZING CLOCKWORK...',
    'CHECKING LOGIN INFORMATION',
    'CALIBRATING STEAM PRESSURE...',
    'SYNCHRONIZING GEARS...',
    'AUTHENTICATION COMPLETE'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        
        // Update message based on progress
        if (newProgress < 20) setCurrentMessage(messages[0]);
        else if (newProgress < 40) setCurrentMessage(messages[1]);
        else if (newProgress < 60) setCurrentMessage(messages[2]);
        else if (newProgress < 85) setCurrentMessage(messages[3]);
        else setCurrentMessage(messages[4]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
        }
        
        return newProgress;
      });
    }, duration / 20);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="min-h-screen bg-background mechanical-bg roman-numerals flex items-center justify-center p-4">
      <OrnateFrame variant="large" glowing className="max-w-md w-full text-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-cinzel-decorative font-bold glow-text mb-6">
            {currentMessage}
          </h2>
          
          <div className="flex justify-center mb-6">
            <GearAnimation size="xl" speed="fast" />
          </div>
          
          <div className="space-y-4">
            <div className="progress-steam h-3 w-full" style={{'--progress': `${progress}%`} as React.CSSProperties} />
            
            <div className="flex justify-between items-center">
              <div className="diamond-indicator">
                <span>0%</span>
              </div>
              
              <div className="diamond-indicator">
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-6">
            <GearAnimation size="sm" speed="slow" />
            <GearAnimation size="md" speed="medium" reverse />
            <GearAnimation size="sm" speed="fast" />
          </div>
        </div>
      </OrnateFrame>
    </div>
  );
};