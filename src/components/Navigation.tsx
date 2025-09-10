import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Trophy, 
  Award, 
  ShoppingCart, 
  BookOpen, 
  Search, 
  Scroll,
  LogOut,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GearAnimation } from './GearAnimation';

export const Navigation: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/mystery', label: 'Mystery' },
    { to: '/case-clues', label: 'Case Clues' },
    { to: '/marketplace', label: 'Marketplace' },
  ];

  const profileItems = [
    { icon: User, label: 'Profile', to: '/profile' },
    { icon: Trophy, label: 'NFT Collection', to: '/nft-collection' },
    { icon: Award, label: 'Achievements', to: '/achievements' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ornate-frame bg-background/95 backdrop-blur-sm border-b border-brass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <GearAnimation size="sm" speed="slow" />
            <span className="text-xl font-cinzel-decorative font-bold glow-text">
              Clockwork Realm
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg transition-all duration-300 font-cinzel',
                    isActive
                      ? 'bg-brass text-brass-foreground glow-text'
                      : 'text-foreground hover:text-brass hover:bg-brass/10'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="gear-button w-10 h-10 flex items-center justify-center"
          >
            <User className="w-5 h-5 text-brass-foreground" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-56 ornate-frame bg-popover animate-mechanical-slide">
              <div className="p-4 border-b border-brass/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brass flex items-center justify-center">
                    <User className="w-5 h-5 text-brass-foreground" />
                  </div>
                  <div>
                    <p className="font-cinzel font-semibold text-foreground">Mechanist</p>
                    <p className="text-sm text-muted-foreground">@clockwork_master</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                {profileItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left rounded-lg hover:bg-steam/20 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-brass" />
                    <span className="text-foreground">{item.label}</span>
                  </NavLink>
                ))}
                
                <button className="flex items-center space-x-3 w-full px-3 py-2 text-left rounded-lg hover:bg-destructive/20 transition-colors text-destructive">
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};