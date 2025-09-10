import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${steampunkBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/60 to-background/80" />
      
      {/* Floating gears background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 opacity-30">
          <GearAnimation size="xl" speed="slow" />
        </div>
        <div className="absolute top-32 right-24 opacity-40">
          <GearAnimation size="lg" speed="medium" reverse />
        </div>
        <div className="absolute bottom-24 left-1/4 opacity-25">
          <GearAnimation size="md" speed="fast" />
        </div>
        <div className="absolute bottom-16 right-16 opacity-35">
          <GearAnimation size="xl" speed="slow" reverse />
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 opacity-20">
          <GearAnimation size="sm" speed="medium" />
        </div>
        <div className="absolute top-2/3 left-20 opacity-30">
          <GearAnimation size="lg" speed="slow" />
        </div>
        <div className="absolute top-1/2 right-32 opacity-25">
          <GearAnimation size="md" speed="fast" reverse />
        </div>
      </div>

      {/* Roman numerals decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="roman-numerals absolute top-20 left-1/4 text-6xl opacity-10">XII</div>
        <div className="roman-numerals absolute bottom-32 right-1/4 text-4xl opacity-15">VI</div>
        <div className="roman-numerals absolute top-1/2 left-12 text-5xl opacity-8">III</div>
        <div className="roman-numerals absolute top-40 right-12 text-3xl opacity-12">IX</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <OrnateFrame variant="large" glowing className="space-y-10 bg-gradient-to-br from-card/20 via-card/30 to-card/40 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-8xl font-cinzel-decorative font-black glow-text animate-glow-pulse mb-2">
                CLOCKWORK
              </h1>
              <h2 className="text-5xl font-cinzel-decorative font-bold text-brass-light">
                REALM
              </h2>
              
              {/* Decorative line with gears */}
              <div className="flex items-center justify-center my-8 space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-brass to-transparent flex-1" />
                <GearAnimation size="md" speed="medium" />
                <div className="h-px bg-gradient-to-r from-transparent via-brass to-transparent flex-1" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-2xl font-cinzel text-brass-light leading-relaxed max-w-2xl mx-auto">
              Enter a mysterious world of mechanical wonders, where ancient gears turn the wheels of destiny and steam-powered dreams come alive.
            </p>
            
            <div className="flex justify-center">
              <div className="mechanical-bg p-4 rounded-lg">
                <GearAnimation size="lg" speed="medium" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Button
              onClick={() => navigate('/login')}
              className="gear-button text-2xl px-12 py-6 font-cinzel-decorative font-bold relative overflow-hidden group shadow-[0_0_30px_rgba(184,134,11,0.3)] hover:shadow-[0_0_50px_rgba(184,134,11,0.5)] transition-all duration-300"
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-3">
                <GearAnimation size="sm" speed="fast" className="group-hover:animate-gear-fast" />
                ENTER THE REALM
                <GearAnimation size="sm" speed="fast" reverse className="group-hover:animate-gear-fast" />
              </span>
              
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brass via-brass-light to-brass opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-brass/80 font-cinzel">
              <GearAnimation size="sm" speed="slow" className="opacity-60" />
              <span>Prepare yourself for mechanical mysteries</span>
              <GearAnimation size="sm" speed="slow" reverse className="opacity-60" />
            </div>
          </div>
        </OrnateFrame>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 opacity-40">
        <GearAnimation size="sm" speed="slow" />
        <div className="h-px w-16 bg-brass" />
        <div className="w-3 h-3 bg-brass rounded-full animate-glow-pulse" />
        <div className="h-px w-16 bg-brass" />
        <GearAnimation size="sm" speed="slow" reverse />
      </div>
    </div>
  );
};