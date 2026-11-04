import React from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  LogOut, 
  ChevronRight,
  Search,
  Layers,
  X
} from 'lucide-react';
import { currentUser } from '../data/mockData';

export const Sidebar = ({ 
  currentTab, 
  setCurrentTab, 
  isMobileOpen, 
  setIsMobileOpen, 
  onOpenSearch, 
  onOpenHelp, 
  onOpenLogout 
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Compass,
      tag: null
    },
    {
      id: 'explore',
      label: 'Explore Documents',
      icon: BookOpen,
      tag: '116'
    },
    {
      id: 'assistant',
      label: 'AI Assistant',
      icon: Sparkles,
      tag: 'Live'
    },
    {
      id: 'conversations',
      label: 'My Conversations',
      icon: MessageSquare,
      tag: '5'
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
          className="fixed inset-0 bg-[#202C26]/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50
        w-64 lg:w-68 bg-[#F0F3EC] border-r border-[#E3E7DE]
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top: Brand & Workspace */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              {/* Minimal geometric brand mark */}
              <div className="w-8 h-8 rounded-lg bg-[#294B3B] text-white flex items-center justify-center shadow-xs">
                <span className="font-editorial text-lg italic font-bold">I</span>
              </div>
              <div className="flex flex-col">
                <span className="font-interface font-bold text-base tracking-tight text-[#202C26] leading-none">
                  Infera<span className="text-[#294B3B] font-editorial italic ml-0.5">AI</span>
                </span>
                <span className="editorial-label text-[10px] text-[#777F76] mt-0.5">
                  Member Studio
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 text-[#777F76] hover:text-[#202C26] hover:bg-[#E5EBDD] rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Workspace Pill */}
          <div className="px-3 py-2 rounded-lg bg-white/70 border border-[#E3E7DE] flex items-center justify-between mb-4 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-[#294B3B]" />
              <div className="truncate">
                <p className="text-xs font-interface font-semibold text-[#202C26] truncate">
                  {currentUser.workspace.name}
                </p>
                <p className="text-[10px] text-[#777F76] truncate">
                  Enterprise Workspace
                </p>
              </div>
            </div>
            <span className="text-[10px] font-interface font-medium bg-[#E5EBDD] text-[#294B3B] px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* Quick Search Shortcut Button */}
          <button
            onClick={onOpenSearch}
            className="w-full text-left px-3 py-2 rounded-lg bg-white border border-[#E3E7DE] hover:border-[#CCD3C5] text-[#777F76] hover:text-[#202C26] flex items-center justify-between transition-colors text-xs font-interface shadow-2xs group cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search size={14} className="text-[#777F76] group-hover:text-[#294B3B] transition-colors" />
              <span>Search documents...</span>
            </span>
            <kbd className="px-1.5 py-0.5 bg-[#F0F3EC] border border-[#E3E7DE] rounded text-[10px] font-mono text-[#777F76]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          <div className="px-3 pb-1 pt-2">
            <span className="editorial-label text-[10px]">Knowledge Navigation</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-interface font-medium transition-all text-left cursor-pointer
                  ${isActive 
                    ? 'bg-[#E5EBDD] text-[#294B3B] font-semibold shadow-2xs' 
                    : 'text-[#202C26] hover:bg-white/60 hover:text-[#202C26]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={17} 
                    className={isActive ? 'text-[#294B3B]' : 'text-[#777F76]'} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.tag && (
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-[#294B3B] text-white' 
                      : 'bg-white/80 text-[#777F76] border border-[#E3E7DE]'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}

          {/* Direct Document Reader Shortcut */}
          <div className="pt-4 px-3 pb-1">
            <span className="editorial-label text-[10px]">Active Reading</span>
          </div>
          <button
            onClick={() => handleNavClick('reader')}
            className={`
              w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-interface transition-all text-left cursor-pointer
              ${currentTab === 'reader'
                ? 'bg-[#E5EBDD] text-[#294B3B] font-semibold'
                : 'text-[#5A6359] hover:bg-white/60'
              }
            `}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98769]" />
              <span className="truncate">Annual-Leave-Guide.pdf</span>
            </div>
            <span className="text-[10px] text-[#777F76] font-mono">p.12</span>
          </button>
        </div>

        {/* Bottom: Utilities & User Profile */}
        <div className="p-3 border-t border-[#E3E7DE] bg-[#F0F3EC]/80 space-y-1">
          <button
            onClick={onOpenHelp}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-interface text-[#5A6359] hover:text-[#202C26] hover:bg-white/60 rounded-md transition-colors cursor-pointer text-left"
          >
            <HelpCircle size={15} className="text-[#777F76]" />
            <span>Help & Keyboard Shortcuts</span>
          </button>

          <button
            onClick={() => handleNavClick('settings')}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-xs font-interface rounded-md transition-colors cursor-pointer text-left
              ${currentTab === 'settings' 
                ? 'bg-[#E5EBDD] text-[#294B3B] font-semibold' 
                : 'text-[#5A6359] hover:text-[#202C26] hover:bg-white/60'
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={15} className="text-[#777F76]" />
              <span>Profile & Workspace</span>
            </div>
          </button>

          {/* Member Card & Logout */}
          <div className="pt-2 mt-1 border-t border-[#E3E7DE]/70 flex items-center justify-between px-2">
            <div 
              onClick={() => handleNavClick('settings')}
              className="flex items-center gap-2.5 cursor-pointer group min-w-0"
            >
              <div className="w-7 h-7 rounded-full bg-[#294B3B] text-white flex items-center justify-center text-xs font-interface font-semibold shrink-0">
                {currentUser.initials}
              </div>
              <div className="truncate">
                <p className="text-xs font-interface font-semibold text-[#202C26] truncate group-hover:text-[#294B3B] transition-colors">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-[#777F76] truncate">
                  {currentUser.role}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenLogout}
              title="Sign out"
              className="p-1.5 text-[#777F76] hover:text-[#C98769] hover:bg-white/80 rounded transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
