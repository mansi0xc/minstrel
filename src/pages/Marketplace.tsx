import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { OrnateFrame } from '@/components/OrnateFrame';
import { GearAnimation } from '@/components/GearAnimation';
import { ShoppingCart, Star, Coins, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import steampunkBg from '@/assets/steampunk-bg.jpg';

export const Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: <Package className="w-4 h-4" /> },
    { id: 'gears', name: 'Precision Gears', icon: <Package className="w-4 h-4" /> },
    { id: 'tools', name: 'Crafting Tools', icon: <Package className="w-4 h-4" /> },
    { id: 'blueprints', name: 'Blueprints', icon: <Package className="w-4 h-4" /> },
    { id: 'collectibles', name: 'Collectibles', icon: <Star className="w-4 h-4" /> }
  ];

  const items = [
    {
      id: 1,
      name: "Master Craftsman's Precision Gear",
      category: 'gears',
      price: 2500,
      rarity: 'Legendary',
      rating: 5,
      description: "A perfectly balanced gear forged by Master Aldric himself. Enhances puzzle-solving speed by 25%.",
      image: "🔧"
    },
    {
      id: 2,
      name: "Steam-Powered Logic Engine",
      category: 'tools',
      price: 1800,
      rarity: 'Epic',
      rating: 4,
      description: "An intricate mechanism that assists in solving complex mechanical puzzles.",
      image: "⚙️"
    },
    {
      id: 3,
      name: "Ancient Clockwork Blueprint Set",
      category: 'blueprints',
      price: 3200,
      rarity: 'Legendary',
      rating: 5,
      description: "Original blueprints from the First Engineers, revealing secrets of advanced mechanisms.",
      image: "📜"
    },
    {
      id: 4,
      name: "Brass Compass of Navigation",
      category: 'collectibles',
      price: 950,
      rarity: 'Rare',
      rating: 4,
      description: "A beautiful brass compass that points toward hidden mysteries in the realm.",
      image: "🧭"
    },
    {
      id: 5,
      name: "Steam Pressure Valve",
      category: 'tools',
      price: 650,
      rarity: 'Common',
      rating: 3,
      description: "A reliable pressure valve for maintaining optimal steam flow in your contraptions.",
      image: "🔩"
    },
    {
      id: 6,
      name: "Golden Cogwheel of Fortune",
      category: 'collectibles',
      price: 5000,
      rarity: 'Mythic',
      rating: 5,
      description: "An extremely rare cogwheel said to bring luck to its owner. Only 3 known to exist.",
      image: "✨"
    }
  ];

  const rarityColors = {
    'Common': 'text-gray-400 bg-gray-400/20',
    'Rare': 'text-blue-400 bg-blue-400/20',
    'Epic': 'text-purple-400 bg-purple-400/20',
    'Legendary': 'text-glow-amber bg-glow-amber/20',
    'Mythic': 'text-red-400 bg-red-400/20'
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

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
                  The Clockwork Marketplace
                </h1>
                <GearAnimation size="md" speed="slow" reverse />
              </div>
              <p className="text-lg text-muted-foreground mt-4 font-cinzel">
                Trade in rare mechanisms and mysterious artifacts
              </p>
            </OrnateFrame>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`gear-button px-4 py-2 font-cinzel flex items-center space-x-2 ${
                  activeCategory === category.id ? 'scale-105' : ''
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="animate-mechanical-slide"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <OrnateFrame className="hover:scale-105 transition-all duration-300 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">
                      {item.image}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-cinzel-decorative font-bold text-foreground mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-cinzel ${rarityColors[item.rarity as keyof typeof rarityColors]}`}>
                          {item.rarity}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < item.rating ? 'text-glow-amber fill-current' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground font-cinzel leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-3 pt-4 border-t border-brass/30">
                      <div className="flex items-center justify-center space-x-2 text-brass">
                        <Coins className="w-5 h-5" />
                        <span className="text-xl font-cinzel-decorative font-bold">
                          {item.price.toLocaleString()}
                        </span>
                        <span className="text-sm font-cinzel">Steam Coins</span>
                      </div>
                      
                      <Button className="gear-button w-full font-cinzel">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Purchase Item
                      </Button>
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
                  "Every gear has its purpose, every tool its mystery..."
                </p>
                <p className="text-sm text-brass font-cinzel">
                  — Merchant Brasswick's Trading Wisdom
                </p>
              </div>
            </OrnateFrame>
          </div>
        </div>
      </div>
    </>
  );
};