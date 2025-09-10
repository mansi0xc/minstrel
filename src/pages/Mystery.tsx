import React from 'react';
import { Navigation } from '@/components/Navigation';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import { Search, Eye, Lock, Key } from 'lucide-react';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const Mystery: React.FC = () => {
  const mysteries = [
    {
      id: 1,
      title: "The Vanishing Clockmaker",
      description: "Master Cogsworth disappeared, leaving only his final creation—a clock that runs backwards.",
      status: "Active",
      progress: 65,
      icon: <Search className="w-8 h-8" />
    },
    {
      id: 2,
      title: "The Steam Cipher",
      description: "Ancient codes etched in brass pipes throughout the city. Each symbol holds a piece of the truth.",
      status: "Investigating",
      progress: 40,
      icon: <Eye className="w-8 h-8" />
    },
    {
      id: 3,
      title: "The Locked Laboratory",
      description: "A sealed chamber beneath the Great Gear, protected by mechanical puzzles of impossible complexity.",
      status: "Sealed",
      progress: 15,
      icon: <Lock className="w-8 h-8" />
    },
    {
      id: 4,
      title: "The Golden Key",
      description: "Legend speaks of a master key that can unlock any clockwork mechanism in the realm.",
      status: "Legendary",
      progress: 5,
      icon: <Key className="w-8 h-8" />
    }
  ];

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
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <OrnateFrame variant="large" glowing>
              <div className="flex items-center justify-center space-x-4">
                <GearAnimation size="md" speed="slow" />
                <h1 className="text-4xl font-cinzel-decorative font-bold glow-text">
                  The Great Mysteries
                </h1>
                <GearAnimation size="md" speed="slow" reverse />
              </div>
              <p className="text-lg text-muted-foreground mt-4 font-cinzel">
                Unsolved puzzles of the Clockwork Realm
              </p>
            </OrnateFrame>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {mysteries.map((mystery, index) => (
              <div 
                key={mystery.id}
                className="animate-mechanical-slide"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <OrnateFrame className="hover:scale-102 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="text-brass">
                      {mystery.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-cinzel-decorative font-bold text-foreground">
                          {mystery.title}
                        </h3>
                        <span className={`text-sm px-3 py-1 rounded-full font-cinzel ${
                          mystery.status === 'Active' ? 'bg-glow-amber/20 text-glow-amber' :
                          mystery.status === 'Investigating' ? 'bg-copper/20 text-copper' :
                          mystery.status === 'Sealed' ? 'bg-destructive/20 text-destructive' :
                          'bg-brass/20 text-brass'
                        }`}>
                          {mystery.status}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground font-cinzel mb-4">
                        {mystery.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-cinzel">
                          <span className="text-foreground/70">Investigation Progress</span>
                          <span className="text-brass">{mystery.progress}%</span>
                        </div>
                        <div 
                          className="progress-steam h-2" 
                          style={{'--progress': `${mystery.progress}%`} as React.CSSProperties}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <GearAnimation size="sm" speed="medium" />
                      <span className="text-xs text-muted-foreground font-cinzel">
                        Case #{mystery.id}
                      </span>
                    </div>
                  </div>
                </OrnateFrame>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <OrnateFrame className="inline-block">
              <div className="text-center space-y-4">
                <GearAnimation size="lg" speed="slow" />
                <p className="text-muted-foreground font-cinzel italic">
                  "Every mystery solved reveals two more in its place..."
                </p>
                <p className="text-sm text-brass font-cinzel">
                  — The Chronicler's Journal, Entry 247
                </p>
              </div>
            </OrnateFrame>
          </div>
        </div>
      </div>
    </>
  );
};