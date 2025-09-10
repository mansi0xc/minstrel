import React from 'react';
import { Navigation } from '@/components/Navigation';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const About: React.FC = () => {
  return (
    <>
      <Navigation />
      <div 
        className="min-h-screen pt-20 mechanical-bg"
        style={{
          backgroundImage: `url(${steampunkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <OrnateFrame variant="large" glowing>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <GearAnimation size="lg" speed="slow" />
                <h1 className="text-5xl font-cinzel-decorative font-bold glow-text">
                  The Clockwork Realm
                </h1>
                <GearAnimation size="lg" speed="slow" reverse />
              </div>
            </OrnateFrame>
          </div>

          <div className="space-y-8">
            <OrnateFrame variant="large">
              <h2 className="text-2xl font-cinzel-decorative font-bold text-brass mb-4">
                Our Origin Story
              </h2>
              <div className="space-y-4 text-foreground/90 font-cinzel leading-relaxed">
                <p>
                  In the depths of the Industrial Revolution, when steam powered dreams and gears 
                  turned the wheels of progress, a secret society of master craftsmen discovered 
                  something extraordinary. Hidden within the intricate mechanisms of their greatest 
                  clockwork creations lay portals to realms of pure intellectual challenge.
                </p>
                <p>
                  These mechanical gateways, forged from brass and copper with precision beyond 
                  mortal comprehension, opened doorways to puzzles that tested not just the mind, 
                  but the very essence of human ingenuity. Each game became a key, each solved 
                  mystery a cog in the grand machine of knowledge.
                </p>
              </div>
            </OrnateFrame>

            <div className="grid md:grid-cols-2 gap-8">
              <OrnateFrame>
                <h3 className="text-xl font-cinzel-decorative font-bold text-copper mb-4">
                  The Great Engineers
                </h3>
                <div className="space-y-3 text-foreground/80 font-cinzel">
                  <p>
                    Master Aldric Gearwright first uncovered the mathematical principles 
                    governing steam-powered logic engines.
                  </p>
                  <p>
                    Lady Brass Victoria perfected the art of mechanical puzzle construction, 
                    creating challenges that adapt to the solver's skill.
                  </p>
                </div>
              </OrnateFrame>

              <OrnateFrame>
                <h3 className="text-xl font-cinzel-decorative font-bold text-copper mb-4">
                  Modern Mysteries
                </h3>
                <div className="space-y-3 text-foreground/80 font-cinzel">
                  <p>
                    Today, their legacy lives on through digital clockwork, where each 
                    click echoes the turning of ancient gears.
                  </p>
                  <p>
                    Join us in unraveling the mechanical mysteries that have challenged 
                    minds for generations.
                  </p>
                </div>
              </OrnateFrame>
            </div>

            <OrnateFrame variant="large" glowing>
              <div className="text-center">
                <h2 className="text-3xl font-cinzel-decorative font-bold glow-text mb-6">
                  "In Steam We Trust, In Gears We Excel"
                </h2>
                <div className="flex justify-center space-x-6">
                  <GearAnimation size="md" speed="medium" />
                  <GearAnimation size="lg" speed="slow" />
                  <GearAnimation size="md" speed="medium" reverse />
                </div>
              </div>
            </OrnateFrame>
          </div>
        </div>
      </div>
    </>
  );
};