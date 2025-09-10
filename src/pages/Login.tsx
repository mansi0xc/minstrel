import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SteampunkLoader } from '@/components/SteampunkLoader';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoginComplete = () => {
    navigate('/games');
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url(${steampunkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10">
          <SteampunkLoader 
            onComplete={handleLoginComplete}
            duration={5000}
          />
        </div>
      </div>
    );
  }

  return null;
};