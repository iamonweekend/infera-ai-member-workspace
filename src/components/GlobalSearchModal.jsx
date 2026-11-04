import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  CornerDownLeft 
} from 'lucide-react';
import { documentsList } from '../data/mockData';
import { initialConversations } from '../data/mockConversations';

export const GlobalSearchModal = ({ 
  isOpen, 
  onClose, 
  onSelectDocument, 
  onSelectConversation, 
  onAskAI 
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = documentsList.filter(doc => 
    doc.title.toLowerCase().includes(query.toLowerCase()) ||
    doc.filename.toLowerCase().includes(query.toLowerCase()) ||
    doc.folderName.toLowerCase().includes(query.toLowerCase()) ||
    doc.featuredExcerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredConvs = initialConversations.filter(conv =>
    conv.title.toLowerCase().includes(query.toLowerCase()) ||
    conv.preview.toLowerCase().includes(query.toLowerCase()) ||
    conv.folder.toLowerCase().includes(query.toLowerCase())
  );

  const handleDirectAsk = () => {
    if (!query.trim()) return;
    onAskAI(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-100">
      <div 
        className="w-full max-w-2xl bg-white border border-[#E8E8E8] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8E8E8] gap-3 bg-[#F7F7F7]">
          <Search size={18} className="text-[#85898D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDirectAsk();
            }}
            placeholder="Search documents or ask Infera a question..."
            className="flex-1 bg-transparent text-sm font-inter text-[#202124] placeholder-[#85898D] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#85898D] hover:text-[#202124]"
            >
              <X size={15} />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded text-[10px] font-mono text-[#85898D]">
            Esc
          </kbd>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#E8E8E8] bg-[#F0F1F2] text-xs font-inter">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-white text-[#202124] font-semibold shadow-2xs' 
                  : 'text-[#85898D] hover:text-[#202124]'
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => setActiveFilter('documents')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilter === 'documents' 
                  ? 'bg-white text-[#202124] font-semibold shadow-2xs' 
                  : 'text-[#85898D] hover:text-[#202124]'
              }`}
            >
              Documents ({filteredDocs.length})
            </button>
            <button
              onClick={() => setActiveFilter('inquiries')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeFilter === 'inquiries' 
                  ? 'bg-white text-[#202124] font-semibold shadow-2xs' 
                  : 'text-[#85898D] hover:text-[#202124]'
              }`}
            >
              Conversations ({filteredConvs.length})
            </button>
          </div>

          {query && (
            <button
              onClick={handleDirectAsk}
              className="text-xs text-[#526D5C] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ask AI this</span>
              <CornerDownLeft size={11} />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-3">
          {/* Ask AI Banner */}
          {query.trim().length > 2 && (
            <div
              onClick={handleDirectAsk}
              className="p-3 rounded-lg bg-[#EAF0EB] border border-[#D5E0D7] hover:border-[#526D5C] transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#526D5C] text-white flex items-center justify-center">
                  <Sparkles size={14} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#526D5C]">
                    Query AI Knowledge
                  </span>
                  <p className="text-xs font-inter font-semibold text-[#202124]">
                    Ask Infera: "{query}"
                  </p>
                </div>
              </div>
              <ArrowRight size={14} className="text-[#526D5C]" />
            </div>
          )}

          {/* Documents */}
          {(activeFilter === 'all' || activeFilter === 'documents') && filteredDocs.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#85898D] px-2 block">
                Documents ({filteredDocs.length})
              </span>
              {filteredDocs.slice(0, 4).map(doc => (
                <div
                  key={doc.id}
                  onClick={() => {
                    onSelectDocument(doc);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText size={15} className="text-[#85898D]" />
                    <div className="truncate">
                      <p className="text-xs font-inter font-semibold text-[#202124] group-hover:text-[#171717] truncate">
                        {doc.title}
                      </p>
                      <p className="text-[11px] text-[#85898D] truncate">
                        {doc.folderName} • {doc.fileSize}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#85898D] group-hover:text-[#171717]">
                    Open &rarr;
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Past Conversations */}
          {(activeFilter === 'all' || activeFilter === 'inquiries') && filteredConvs.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-mono uppercase text-[#85898D] px-2 block">
                Conversations ({filteredConvs.length})
              </span>
              {filteredConvs.slice(0, 3).map(conv => (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare size={14} className="text-[#85898D]" />
                    <div className="truncate">
                      <p className="text-xs font-inter font-semibold text-[#202124] group-hover:text-[#171717] truncate">
                        {conv.title}
                      </p>
                      <p className="text-[11px] text-[#85898D] truncate">
                        {conv.preview}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#85898D]">
                    {conv.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#F7F7F7] border-t border-[#E8E8E8] flex items-center justify-between text-[11px] text-[#85898D]">
          <span>Use <kbd className="px-1 py-0.2 bg-white border border-[#D6D6D6] rounded text-[10px]">↵</kbd> to select</span>
          <span>Infera AI Member Studio</span>
        </div>
      </div>
    </div>
  );
};
