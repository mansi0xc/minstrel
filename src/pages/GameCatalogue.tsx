import React from 'react';
import { Puzzle, Grid3X3, Gamepad2, Brain, Dice1, Target } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import { Navigation } from '@/components/Navigation';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const GameCatalogue: React.FC = () => {
  const games = [
    {
      title: 'Clockwork Sudoku',
      description: 'Arrange numbers in mechanical precision. Each gear must turn in perfect harmony.',
      to: '/games/sudoku',
      icon: <Grid3X3 className="w-12 h-12" />,
      difficulty: 'Medium' as const
    },
    {
      title: 'Steam Wordsmith',
      description: 'Forge words from the mists of steam. Guess the hidden word before pressure drops.',
      to: '/games/wordle',
      icon: <Brain className="w-12 h-12" />,
      difficulty: 'Easy' as const
    },
    {
      title: 'Mechanical Puzzles',
      description: 'Intricate contraptions await your solving skills. Unlock the secrets of each mechanism.',
      to: '/games/puzzles',
      icon: <Puzzle className="w-12 h-12" />,
      difficulty: 'Hard' as const
    },
    {
      title: 'Gear Arcade',
      description: 'Classic games reimagined with clockwork precision. Test your reflexes against time.',
      to: '/games/arcade',
      icon: <Gamepad2 className="w-12 h-12" />,
      difficulty: 'Medium' as const
    },
    {
      title: 'Steam Dice',
      description: 'Roll the brass dice and let fortune guide your mechanical destiny.',
      to: '/games/dice',
      icon: <Dice1 className="w-12 h-12" />,
      difficulty: 'Easy' as const
    },
    {
      title: 'Precision Target',
      description: 'Calibrate your aim with steam-powered precision. Hit the clockwork targets.',
      to: '/games/target',
      icon: <Target className="w-12 h-12" />,
      difficulty: 'Medium' as const
    }
  ];

  return (
    <>
      <Navigation />
      <div 
        className="min-h-screen pt-20 mechanical-bg roman-numerals"
        style={{
          backgroundImage: `url(${steampunkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <OrnateFrame variant="large" glowing className="inline-block">
              <div className="flex items-center justify-center space-x-4">
                <GearAnimation size="md" speed="slow" />
                <h1 className="text-4xl font-cinzel-decorative font-bold glow-text">
                  Game Catalogue
                </h1>
                <GearAnimation size="md" speed="slow" reverse />
              </div>
              <p className="text-lg text-muted-foreground mt-4 font-cinzel">
                Choose your mechanical adventure
              </p>
            </OrnateFrame>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {games.map((game, index) => (
              <div 
                key={game.title}
                className="animate-mechanical-slide"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>

          {/* Background decorative gears */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute top-1/4 left-10">
              <GearAnimation size="xl" speed="slow" />
            </div>
            <div className="absolute top-1/2 right-10">
              <GearAnimation size="lg" speed="medium" reverse />
            </div>
            <div className="absolute bottom-1/4 left-1/3">
              <GearAnimation size="md" speed="fast" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};