import React from 'react';
import { Menu, Search, HelpCircle, CheckCircle2 } from 'lucide-react';
import { currentUser } from '../data/mockData';

export const MainWorkspace = ({ 
  children, 
  onOpenSearch, 
  onOpenHelp, 
  setIsMobileNavOpen 
}) => {
  return (
    <div className="flex-1 md:pl-[372px] bg-[#FFFFFF] min-h-screen flex flex-col">
      {/* Workspace Top Toolbar */}
      <header className="sticky top-0 z-10 h-14 bg-white/95 backdrop-blur-xs border-b border-[#E8E8E8] px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Mobile Menu & Workspace Identifier */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden p-2 text-[#202124] hover:bg-[#F0F1F2] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation rail"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2 text-xs font-inter text-[#85898D]">
            <span className="font-semibold text-[#202124]">{currentUser.workspace.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#526D5C] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526D5C]" />
              116 Verified Documents Online
            </span>
          </div>
        </div>

        {/* Right: Quick Search & Help Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0F1F2] hover:bg-[#E7E8EA] text-xs font-inter text-[#85898D] hover:text-[#202124] transition-colors cursor-pointer"
          >
            <Search size={14} className="text-[#85898D]" />
            <span className="hidden sm:inline">Search documents or ask AI...</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded text-[10px] font-mono text-[#85898D]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenHelp}
            className="p-1.5 text-[#85898D] hover:text-[#202124] hover:bg-[#F0F1F2] rounded-lg transition-colors cursor-pointer"
            title="Keyboard shortcuts & help"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </header>

      {/* Main Workspace Scrollable Body */}
      <main className="flex-1 px-6 sm:px-10 lg:px-12 py-8 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
};
