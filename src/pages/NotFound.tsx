import React from 'react';
import { useLocation, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import steampunkBg from '@/assets/steampunk-bg.jpg';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen mechanical-bg relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${steampunkBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-background/70" />
      
      <div className="relative z-10 text-center max-w-lg mx-auto px-4">
        <OrnateFrame variant="large" glowing>
          <div className="space-y-6">
            <div className="flex justify-center">
              <GearAnimation size="xl" speed="medium" />
            </div>
            
            <h1 className="text-6xl font-cinzel-decorative font-bold glow-text">
              404
            </h1>
            
            <h2 className="text-2xl font-cinzel-decorative font-bold text-brass">
              Mechanism Not Found
            </h2>
            
            <p className="text-foreground/80 font-cinzel leading-relaxed">
              The clockwork pathway you seek has been lost to the steam. 
              Perhaps the gears have shifted, or this mechanism never existed in our realm.
            </p>
            
            <div className="flex justify-center space-x-4">
              <GearAnimation size="sm" speed="slow" />
              <GearAnimation size="md" speed="fast" reverse />
              <GearAnimation size="sm" speed="medium" />
            </div>
            
            <NavLink 
              to="/" 
              className="gear-button inline-block px-6 py-3 font-cinzel-decorative font-bold text-brass-foreground hover:scale-105 transition-transform"
            >
              Return to the Clockwork Realm
            </NavLink>
          </div>
        </OrnateFrame>
      </div>
    </div>
  );
};

export default NotFound;
