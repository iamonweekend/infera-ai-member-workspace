import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  FileText, 
  Folder, 
  Clock, 
  Sparkles, 
  BookOpen, 
  X,
  FileCode,
  FileSpreadsheet,
  ArrowUpDown
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { documentsList, folderCategories } from '../data/mockData';

export const ExplorePage = ({ 
  activeFilter = 'all', 
  onSelectDocument, 
  onAskAIAboutDoc 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('updated'); // updated, title, size
  const [viewMode, setViewMode] = useState('list'); // default list for clean corporate feel

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documentsList
      .filter((doc) => {
        // Handle sidebar filter
        if (activeFilter.startsWith('folder-')) {
          const folderId = activeFilter.replace('folder-', '');
          if (doc.folderId !== folderId) return false;
        } else if (activeFilter === 'recently-updated') {
          // just mock condition
        } else if (activeFilter === 'starred') {
          if (!doc.hasHighlights) return false;
        } else if (activeFilter === 'format-pdf') {
          if (doc.fileType !== 'PDF') return false;
        } else if (activeFilter === 'format-docx') {
          if (doc.fileType !== 'DOCX') return false;
        } else if (activeFilter === 'format-txt') {
          if (doc.fileType !== 'TXT') return false;
        }

        // Inline format filter
        if (fileTypeFilter !== 'ALL' && doc.fileType !== fileTypeFilter) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            doc.title.toLowerCase().includes(q) ||
            doc.filename.toLowerCase().includes(q) ||
            doc.featuredExcerpt.toLowerCase().includes(q) ||
            doc.folderName.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'size') return parseFloat(b.fileSize) - parseFloat(a.fileSize);
        return 0;
      });
  }, [activeFilter, fileTypeFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Explore Documents"
        subtitle="Discover and query verified resources across your organisation."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-inter text-[#85898D]">
              Showing <span className="font-semibold text-[#202124]">{filteredDocuments.length}</span> documents
            </span>
          </div>
        }
      />

      {/* 2. Search, Filter & View Mode Controls */}
      <div className="bg-[#F7F7F7] p-3.5 rounded-xl border border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#85898D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by title or topic..."
            className="w-full py-2 pl-9 pr-8 rounded-lg bg-white border border-[#D6D6D6] focus:border-[#171717] text-xs font-inter text-[#202124] placeholder-[#85898D] focus:outline-hidden"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#85898D] hover:text-[#202124]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters and View Switcher */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* File type filters */}
          <div className="flex items-center gap-1 text-xs">
            {['ALL', 'PDF', 'DOCX', 'TXT'].map((type) => (
              <button
                key={type}
                onClick={() => setFileTypeFilter(type)}
                className={`px-2.5 py-1 rounded-md text-xs font-inter transition-colors cursor-pointer ${
                  fileTypeFilter === type
                    ? 'bg-white font-semibold text-[#202124] border border-[#D6D6D6] shadow-2xs'
                    : 'text-[#85898D] hover:text-[#202124]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#E8E8E8]" />

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#85898D]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#D6D6D6] rounded-md px-2 py-1 text-xs text-[#202124] focus:outline-hidden"
            >
              <option value="updated">Recently Updated</option>
              <option value="title">Alphabetical (A-Z)</option>
              <option value="size">File Size</option>
            </select>
          </div>

          {/* Grid/List Toggle */}
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#D6D6D6]">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#F0F1F2] text-[#202124]' : 'text-[#85898D]'
              }`}
              title="List View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#F0F1F2] text-[#202124]' : 'text-[#85898D]'
              }`}
              title="Grid View"
            >
              <Grid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Document List / Grid */}
      {filteredDocuments.length > 0 ? (
        viewMode === 'list' ? (
          /* List View (Clean Corporate Rows) */
          <div className="border border-[#E8E8E8] rounded-xl overflow-hidden divide-y divide-[#E8E8E8] bg-white">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 hover:bg-[#F7F7F7] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-mono font-bold text-[#202124]">
                      {doc.fileType}
                    </span>
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-[#F0F1F2] text-[#85898D] rounded">
                        {doc.folderName}
                      </span>
                      <span className="text-xs text-[#85898D]">
                        Updated {doc.lastUpdated}
                      </span>
                    </div>

                    <h3 className="text-sm font-inter font-semibold text-[#202124] group-hover:text-[#171717] truncate">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-[#85898D] font-inter line-clamp-1 max-w-2xl">
                      {doc.featuredExcerpt}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#85898D] pt-0.5">
                      <span>{doc.pagesCount} pages</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>Version: {doc.version}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onAskAIAboutDoc(doc)}
                    className="px-3 py-1.5 rounded-md text-xs font-inter font-medium text-[#202124] bg-[#F0F1F2] hover:bg-[#E2E4E6] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles size={12} className="text-[#526D5C]" />
                    <span>Inquire</span>
                  </button>
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="btn-primary-dark py-1.5 px-3.5 text-xs font-inter flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Open</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#171717] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-[#F0F1F2] text-[#202124] px-2 py-0.5 rounded">
                      {doc.fileType} • {doc.pagesCount} pgs
                    </span>
                    <span className="text-xs text-[#85898D] font-mono">
                      {doc.fileSize}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-manrope font-semibold text-[#202124] group-hover:text-[#171717] leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#85898D] font-inter mt-1.5 line-clamp-3 leading-relaxed">
                      {doc.featuredExcerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E8E8] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#85898D]">
                    <span>{doc.folderName}</span>
                    <span>{doc.lastUpdated}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAskAIAboutDoc(doc)}
                      className="w-full py-1.5 px-2 rounded-md text-xs font-inter font-medium text-[#202124] bg-[#F0F1F2] hover:bg-[#E2E4E6] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles size={12} className="text-[#526D5C]" />
                      <span>Inquire</span>
                    </button>
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="w-full btn-primary-dark py-1.5 px-2 text-xs font-inter flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <BookOpen size={12} />
                      <span>Open</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-12 text-center border border-[#E8E8E8] rounded-xl bg-[#F7F7F7] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#E2E4E6] text-[#85898D] flex items-center justify-center mx-auto">
            <FileText size={20} />
          </div>
          <h3 className="text-sm font-manrope font-bold text-[#202124]">
            No documents found
          </h3>
          <p className="text-xs text-[#85898D] max-w-sm mx-auto">
            No verified documents match the active filter criteria. Try clearing search filters or choosing another category in the secondary sidebar.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFileTypeFilter('ALL');
            }}
            className="btn-outline-neutral text-xs mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
