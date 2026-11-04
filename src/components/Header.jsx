import React from 'react';
import { 
  Menu, 
  Search, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { currentUser } from '../data/mockData';

export const Header = ({ 
  currentTab, 
  setCurrentTab, 
  setIsMobileOpen, 
  onOpenSearch, 
  onOpenHelp 
}) => {
  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'home':
        return { label: 'Knowledge Studio', sub: 'Home' };
      case 'explore':
        return { label: 'Knowledge Base', sub: 'Explore Documents' };
      case 'assistant':
        return { label: 'AI Knowledge Assistant', sub: 'Inquiry Workspace' };
      case 'conversations':
        return { label: 'Research Library', sub: 'My Conversations' };
      case 'reader':
        return { label: 'Document Reader', sub: 'Annual-Leave-&-PTO-Reference.pdf' };
      case 'settings':
        return { label: 'Account & Workspace', sub: 'Member Settings' };
      default:
        return { label: 'Infera AI', sub: 'Workspace' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#F7F6F0]/90 backdrop-blur-md border-b border-[#E3E7DE] px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-[#202C26] hover:bg-[#E5EBDD] rounded-lg transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <span className="editorial-label hidden sm:inline-block">
            {breadcrumb.label}
          </span>
          <span className="hidden sm:inline-block text-[#CCD3C5]">/</span>
          <h2 className="text-sm sm:text-base font-interface font-semibold text-[#202C26]">
            {breadcrumb.sub}
          </h2>
        </div>
      </div>

      {/* Right: Search, Sync status, Reader shortcut & Help */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Subtle Sync Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5EBDD]/60 border border-[#CCD3C5]/60 text-xs text-[#294B3B] font-interface">
          <div className="w-1.5 h-1.5 rounded-full bg-[#294B3B] animate-pulse" />
          <span>Knowledge verified</span>
        </div>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white border border-[#E3E7DE] hover:border-[#CCD3C5] text-xs font-interface text-[#777F76] transition-all hover:shadow-2xs cursor-pointer"
        >
          <Search size={14} className="text-[#777F76]" />
          <span>Search documents or ask AI...</span>
          <kbd className="px-1.5 py-0.5 bg-[#F0F3EC] border border-[#E3E7DE] rounded text-[10px] font-mono text-[#777F76]">
            ⌘K
          </kbd>
        </button>

        {/* Mobile Search Icon Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-[#202C26] hover:bg-[#E5EBDD] rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Quick Reader Pill (if not on reader page) */}
        {currentTab !== 'reader' && (
          <button
            onClick={() => setCurrentTab('reader')}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#E5EBDD] hover:bg-[#d8e0ce] text-xs font-interface font-medium text-[#294B3B] transition-colors cursor-pointer"
            title="Return to active document reader"
          >
            <FileText size={13} />
            <span>Open Cited Doc (p.12)</span>
          </button>
        )}

        {/* Help & Support Button */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-[#777F76] hover:text-[#202C26] hover:bg-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#E3E7DE]"
          title="Keyboard shortcuts & help"
        >
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
};
