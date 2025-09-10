import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import { FileText, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const CaseClues: React.FC = () => {
  const [expandedClue, setExpandedClue] = useState<number | null>(null);

  const clues = [
    {
      id: 1,
      title: "The Midnight Mechanism",
      location: "Great Clock Tower",
      time: "23:47",
      category: "Physical Evidence",
      icon: <Clock className="w-6 h-6" />,
      preview: "Strange clicking sounds heard from the tower's mechanism room...",
      details: "Witnesses report unusual clicking patterns from the Great Clock Tower's mechanism room at exactly 23:47 each night. The sound follows a specific sequence: 3 long clicks, 2 short, 1 long, pause, repeat. Master Clockkeeper Hartwell confirms this is not part of the normal operation. Analysis suggests the pattern may be a coded message.",
      evidence: ["Audio recording of the clicks", "Blueprints of the clock mechanism", "Maintenance logs showing no scheduled work"]
    },
    {
      id: 2,
      title: "Steam Pressure Anomaly",
      location: "Industrial District",
      time: "Various",
      category: "Scientific Data",
      icon: <MapPin className="w-6 h-6" />,
      preview: "Unexplained pressure surges in the steam distribution network...",
      details: "Steam pressure gauges throughout the Industrial District show synchronized spikes at random intervals. These surges don't correspond to any known industrial processes and occur simultaneously across different sectors. Engineers report the pressure patterns seem to follow mathematical progressions.",
      evidence: ["Pressure gauge readings", "Steam distribution maps", "Industrial schedule records"]
    },
    {
      id: 3,
      title: "The Vanishing Workers",
      location: "Gear Factory No. 7",
      time: "Multiple dates",
      category: "Missing Persons",
      icon: <Users className="w-6 h-6" />,
      preview: "Three master craftsmen disappeared without trace from the gear factory...",
      details: "Master gear-smith Aldrich Copper, precision engineer Maria Brass, and steam-pipe specialist Thomas Iron all vanished from Gear Factory No. 7 during different shifts over the past month. Security records show them entering but never leaving. Their workstations were found with half-completed projects of unusual complexity.",
      evidence: ["Security footage", "Unfinished mechanical devices", "Personal belongings left behind"]
    },
    {
      id: 4,
      title: "Cipher in the Gears",
      location: "Central Plaza",
      time: "Dawn",
      category: "Cryptographic",
      icon: <FileText className="w-6 h-6" />,
      preview: "Mysterious symbols etched into the bronze gears of the plaza fountain...",
      details: "At first light each morning, condensation reveals intricate symbols etched into the bronze gears of the Central Plaza fountain. The symbols change daily and appear to follow an ancient encryption pattern. Local scholars believe it may be connected to the lost language of the First Engineers.",
      evidence: ["Photographs of the symbols", "Ancient engineering texts", "Condensation pattern analysis"]
    }
  ];

  const toggleExpanded = (clueId: number) => {
    setExpandedClue(expandedClue === clueId ? null : clueId);
  };

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
                  Case Evidence Archive
                </h1>
                <GearAnimation size="md" speed="slow" reverse />
              </div>
              <p className="text-lg text-muted-foreground mt-4 font-cinzel">
                Catalogued clues from ongoing investigations
              </p>
            </OrnateFrame>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {clues.map((clue, index) => (
              <div 
                key={clue.id}
                className="animate-mechanical-slide"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <OrnateFrame className="hover:scale-101 transition-all duration-300">
                  <div 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(clue.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-brass">
                          {clue.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-cinzel-decorative font-bold text-foreground">
                            {clue.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-copper font-cinzel">
                              📍 {clue.location}
                            </span>
                            <span className="text-sm text-muted-foreground font-cinzel">
                              ⏰ {clue.time}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-brass/20 text-brass font-cinzel">
                              {clue.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <GearAnimation size="sm" speed="medium" />
                        {expandedClue === clue.id ? (
                          <ChevronUp className="w-5 h-5 text-brass" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-brass" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground font-cinzel mt-3 pl-10">
                      {clue.preview}
                    </p>
                  </div>
                  
                  {expandedClue === clue.id && (
                    <div className="pl-10 pr-4 mt-6 space-y-4 border-t border-brass/30 pt-6">
                      <div>
                        <h4 className="text-lg font-cinzel-decorative font-bold text-copper mb-2">
                          Detailed Analysis
                        </h4>
                        <p className="text-foreground/90 font-cinzel leading-relaxed">
                          {clue.details}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-cinzel-decorative font-bold text-copper mb-2">
                          Physical Evidence
                        </h4>
                        <ul className="space-y-1">
                          {clue.evidence.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-foreground/80 font-cinzel">
                              <div className="w-1 h-1 bg-brass rounded-full" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </OrnateFrame>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <OrnateFrame className="inline-block">
              <div className="text-center space-y-4">
                <GearAnimation size="lg" speed="slow" />
                <p className="text-muted-foreground font-cinzel italic">
                  "Truth lies hidden in the mechanism's whispers..."
                </p>
                <p className="text-sm text-brass font-cinzel">
                  — Inspector Gearhart's Field Manual
                </p>
              </div>
            </OrnateFrame>
          </div>
        </div>
      </div>
    </>
  );
};