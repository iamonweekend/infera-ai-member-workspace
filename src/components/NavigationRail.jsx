import React from 'react';
import { 
  Home, 
  Compass, 
  Target, 
  Briefcase, 
  Settings, 
  FileText,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import { currentUser } from '../data/mockData';

export const NavigationRail = ({ 
  currentTab, 
  setCurrentTab, 
  isMobileOpen, 
  setIsMobileOpen,
  onOpenHelp,
  onOpenLogout 
}) => {
  // Navigation items matching the reference visual language
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'explore',
      label: 'Explore Documents',
      icon: Compass,
    },
    {
      id: 'assistant',
      label: 'AI Assistant',
      icon: Target, // Matches the target / crosshair in the reference image
    },
    {
      id: 'conversations',
      label: 'My Conversations',
      icon: Briefcase, // Matches the briefcase in the reference image
    },
    {
      id: 'reader',
      label: 'Document Reader',
      icon: FileText,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings, // Matches the settings gear in the reference image
    }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ZONE 1: Dark Left Navigation Rail */}
      <nav className={`
        fixed top-0 bottom-0 left-0 z-50
        w-[92px] bg-[#171717] text-white
        flex flex-col items-center justify-between py-6 px-3
        border-r border-[#262626]
        transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top: Minimalist Geometric Logo (Inspired by reference) */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div 
            onClick={() => handleNavClick('home')}
            className="w-12 h-12 flex items-center justify-center cursor-pointer group"
            title="Infera AI Knowledge Studio"
          >
            {/* SVG Geometric Modernist Symbol matching reference logo */}
            <svg 
              className="w-8 h-8 text-white transition-transform group-hover:scale-105" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4" width="10" height="10" rx="2" fill="white" />
              <polygon points="18,4 28,4 28,14 18,14" fill="white" />
              <polygon points="4,18 14,18 14,28 4,28" fill="white" />
              <rect x="18" y="18" width="10" height="10" rx="2" fill="white" />
            </svg>
          </div>

          {/* Close for mobile */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-[#85898D] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Center: Main Icon Navigation with Large Vertical Spacing */}
        <div className="flex flex-col items-center gap-4 w-full py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                className={`
                  relative w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer
                  ${isActive 
                    ? 'bg-[#2A2A2A] text-white shadow-xs' 
                    : 'text-[#888888] hover:text-white hover:bg-[#202020]'
                  }
                `}
              >
                <Icon size={20} strokeWidth={1.8} />

                {/* Subtle active status indicator dot on left if desired */}
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom: Help & User Profile Access */}
        <div className="flex flex-col items-center gap-4 w-full pt-4 border-t border-[#262626]/80">
          <button
            onClick={onOpenHelp}
            title="Help & Shortcuts"
            className="w-10 h-10 rounded-lg text-[#888888] hover:text-white hover:bg-[#202020] flex items-center justify-center transition-colors cursor-pointer"
          >
            <HelpCircle size={18} strokeWidth={1.8} />
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => handleNavClick('settings')}
            title={`${currentUser.name} (${currentUser.role})`}
            className="relative w-10 h-10 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A] hover:border-white text-white flex items-center justify-center text-xs font-manrope font-semibold transition-all cursor-pointer group"
          >
            <span>{currentUser.initials}</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#526D5C] rounded-full border-2 border-[#171717]" />
          </button>
        </div>
      </nav>
    </>
  );
};
