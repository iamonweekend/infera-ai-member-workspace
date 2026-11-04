import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Clock, 
  Folder, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { initialConversations } from '../data/mockConversations';

export const ConversationsPage = ({ 
  activeFilter = 'all',
  onContinueConversation, 
  onNewConversation,
  onShowToast
}) => {
  const [conversationsList, setConversationsList] = useState(initialConversations);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteConversation = (e, id) => {
    e.stopPropagation();
    setConversationsList(prev => prev.filter(c => c.id !== id));
    if (onShowToast) onShowToast("Conversation deleted");
  };

  const filtered = conversationsList.filter(c => {
    // Secondary sidebar filter
    if (activeFilter === 'group-today' && c.group !== 'Today') return false;
    if (activeFilter === 'group-yesterday' && c.group !== 'Yesterday') return false;
    if (activeFilter === 'group-7days' && c.group !== 'Previous 7 Days') return false;
    if (activeFilter === 'group-older' && c.group !== 'Older') return false;
    if (activeFilter === 'cat-hr' && c.folder !== 'Human Resources') return false;
    if (activeFilter === 'cat-finance' && c.folder !== 'Finance & Accounting') return false;
    if (activeFilter === 'cat-tech' && c.folder !== 'Technology & Systems') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.folder.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const groups = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <PageHeader
        title="My Conversations"
        subtitle="Browse, continue, and manage past research interactions with Infera AI."
        actions={
          <button
            onClick={onNewConversation}
            className="btn-primary-dark text-xs"
          >
            <Plus size={14} />
            <span>New Conversation</span>
          </button>
        }
      />

      {/* 2. Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85898D]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversation titles, queries, or topics..."
          className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#F7F7F7] border border-[#E8E8E8] focus:bg-white focus:border-[#171717] text-xs font-inter text-[#202124] placeholder-[#85898D] focus:outline-hidden transition-all"
        />
      </div>

      {/* 3. Grouped Conversation History */}
      <div className="space-y-8">
        {groups.map((groupName) => {
          const groupItems = filtered.filter(c => c.group === groupName);
          if (groupItems.length === 0) return null;

          return (
            <div key={groupName} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#202124]">
                  {groupName}
                </span>
                <span className="text-xs text-[#85898D]">({groupItems.length})</span>
              </div>

              <div className="border border-[#E8E8E8] rounded-xl overflow-hidden divide-y divide-[#E8E8E8] bg-white">
                {groupItems.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => onContinueConversation(conv.id)}
                    className="p-4 hover:bg-[#F7F7F7] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-center text-[#202124] shrink-0">
                        <MessageSquare size={16} />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-[#F0F1F2] text-[#85898D] rounded">
                            {conv.folder}
                          </span>
                          <span className="text-xs text-[#85898D]">
                            {conv.lastUpdated}
                          </span>
                        </div>

                        <h3 className="text-sm font-inter font-semibold text-[#202124] group-hover:text-[#171717] truncate">
                          {conv.title}
                        </h3>

                        <p className="text-xs text-[#85898D] line-clamp-1 max-w-2xl">
                          {conv.preview}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={(e) => handleDeleteConversation(e, conv.id)}
                        className="p-1.5 text-[#85898D] hover:text-red-700 hover:bg-[#F0F1F2] rounded transition-colors"
                        title="Delete conversation"
                      >
                        <Trash2 size={14} />
                      </button>

                      <button
                        className="px-3 py-1.5 rounded-md text-xs font-inter font-medium text-[#202124] bg-[#F0F1F2] group-hover:bg-[#E2E4E6] flex items-center gap-1 transition-colors"
                      >
                        <span>Resume</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center border border-[#E8E8E8] rounded-xl bg-[#F7F7F7] space-y-3">
            <MessageSquare size={22} className="mx-auto text-[#85898D]" />
            <h3 className="text-sm font-manrope font-bold text-[#202124]">
              No conversations found
            </h3>
            <p className="text-xs text-[#85898D] max-w-sm mx-auto">
              No conversations match the current search or filter. Start a new session with Infera AI.
            </p>
            <button
              onClick={onNewConversation}
              className="btn-primary-dark text-xs mt-2"
            >
              Start New Research Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
