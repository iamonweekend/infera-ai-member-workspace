import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Folder, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  CornerDownLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { currentUser, folderCategories, documentsList, suggestedInquiries } from '../data/mockData';
import { initialConversations } from '../data/mockConversations';

export const HomePage = ({ 
  onNavigate, 
  onAskAI, 
  onOpenDocument, 
  onSelectFolder 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAskAI(searchQuery);
  };

  const recentDocs = documentsList.slice(0, 4);
  const recentConversations = initialConversations.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* 1. Page Header */}
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(' ')[0]}`}
        subtitle="Your organisation's knowledge, all in one place."
        actions={
          <button
            onClick={() => onNavigate('explore')}
            className="btn-outline-neutral text-xs"
          >
            <BookOpen size={14} />
            <span>Browse Library</span>
          </button>
        }
      />

      {/* 2. Large Clean AI Search Section */}
      <section className="bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-inter font-semibold text-[#526D5C]">
            <Sparkles size={14} />
            <span>INFERA AI SEARCH</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-manrope font-bold text-[#202124] tracking-tight">
            What would you like to know today?
          </h2>
          <p className="text-xs sm:text-sm font-inter text-[#85898D]">
            Synthesize answers grounded in verified corporate policies, handbooks, and documentation.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center bg-white rounded-lg border border-[#D6D6D6] focus-within:border-[#171717] focus-within:ring-1 focus-within:ring-[#171717] transition-all">
            <Search size={18} className="ml-3.5 text-[#85898D] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything about your organisation..."
              className="w-full py-3.5 pl-3 pr-32 text-sm font-inter text-[#202124] placeholder-[#85898D] bg-transparent focus:outline-hidden"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className={`
                  px-3.5 py-1.5 rounded-md text-xs font-inter font-medium transition-all flex items-center gap-1.5 cursor-pointer
                  ${searchQuery.trim()
                    ? 'bg-[#171717] text-white hover:bg-[#262626]'
                    : 'bg-[#F0F1F2] text-[#85898D] cursor-not-allowed'
                  }
                `}
              >
                <span>Ask Infera</span>
                <CornerDownLeft size={12} />
              </button>
            </div>
          </div>
        </form>

        {/* Suggested Inquiries */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-inter font-semibold text-[#85898D] uppercase tracking-wider">
            Suggested questions
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedInquiries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onAskAI(item.query)}
                className="text-left p-3 rounded-lg bg-white border border-[#E8E8E8] hover:border-[#202124] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="truncate pr-2">
                  <span className="text-[10px] text-[#85898D] block uppercase font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs font-inter font-medium text-[#202124] group-hover:text-[#171717] truncate">
                    {item.query}
                  </span>
                </div>
                <ArrowRight size={13} className="text-[#85898D] group-hover:text-[#171717] shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section: Recently Accessed Documents */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-manrope font-bold text-[#202124] tracking-tight">
              Recently Accessed Documents
            </h2>
            <p className="text-xs text-[#85898D]">
              Verified company policies and references accessed by your workspace.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-inter font-medium text-[#202124] hover:text-[#526D5C] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all 116</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Clean Document Rows */}
        <div className="border border-[#E8E8E8] rounded-xl overflow-hidden divide-y divide-[#E8E8E8] bg-white">
          {recentDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onOpenDocument(doc)}
              className="p-4 hover:bg-[#F7F7F7] transition-colors flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-center text-[#202124] shrink-0">
                  <FileText size={16} />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-inter font-semibold text-[#202124] group-hover:text-[#171717] truncate">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#85898D] mt-0.5">
                    <span>{doc.folderName}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{doc.fileType}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {doc.lastAccessed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDocument(doc);
                  }}
                  className="px-3 py-1.5 rounded-md text-xs font-inter font-medium text-[#202124] bg-[#F0F1F2] hover:bg-[#E2E4E6] transition-colors"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Section: Browse Knowledge Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-manrope font-bold text-[#202124] tracking-tight">
              Browse Knowledge
            </h2>
            <p className="text-xs text-[#85898D]">
              Explore documentation grouped across organizational departments.
            </p>
          </div>
          <span className="text-xs text-[#85898D]">5 Folders</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {folderCategories.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onSelectFolder(folder.id)}
              className="p-4 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#171717] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F1F2] flex items-center justify-center text-[#202124]">
                    <Folder size={16} />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#85898D] bg-[#F0F1F2] px-2 py-0.5 rounded">
                    {folder.documentCount} docs
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-manrope font-semibold text-[#202124] group-hover:text-[#171717]">
                    {folder.name}
                  </h3>
                  <p className="text-xs text-[#85898D] font-inter line-clamp-2 mt-1">
                    {folder.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8E8E8] flex items-center justify-between text-xs font-inter text-[#202124] font-medium">
                <span>View category</span>
                <ChevronRight size={13} className="text-[#85898D] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Section: Recent Conversations & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-manrope font-bold text-[#202124] tracking-tight">
              Recent Conversations
            </h2>
            <button
              onClick={() => onNavigate('conversations')}
              className="text-xs font-inter text-[#85898D] hover:text-[#202124] flex items-center gap-1 cursor-pointer"
            >
              <span>All history</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="border border-[#E8E8E8] rounded-xl overflow-hidden divide-y divide-[#E8E8E8] bg-white">
            {recentConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onNavigate('assistant', { conversationId: conv.id })}
                className="p-4 hover:bg-[#F7F7F7] transition-colors cursor-pointer flex items-center justify-between gap-4 group"
              >
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
                  <p className="text-xs text-[#85898D] truncate">
                    {conv.preview}
                  </p>
                </div>

                <button className="px-3 py-1.5 rounded-md text-xs font-inter font-medium text-[#202124] bg-[#F0F1F2] group-hover:bg-[#E2E4E6] shrink-0">
                  Resume &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Card */}
        <div className="space-y-4">
          <h2 className="text-lg font-manrope font-bold text-[#202124] tracking-tight">
            Quick Access
          </h2>

          <div className="p-5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F7] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#526D5C]" />
              <span className="text-xs font-inter font-semibold text-[#202124]">
                Active Reading Session
              </span>
            </div>

            <div>
              <h3 className="text-sm font-manrope font-semibold text-[#202124]">
                Annual-Leave-&-PTO-Reference.pdf
              </h3>
              <p className="text-xs text-[#85898D] mt-1">
                Jump directly to Page 12 where Section 4.2 was cited by Infera AI.
              </p>
            </div>

            <button
              onClick={() => onNavigate('reader')}
              className="w-full btn-primary-dark text-xs mt-2"
            >
              <span>Continue Reading (Page 12)</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
