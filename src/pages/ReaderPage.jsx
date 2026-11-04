import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Search, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  X,
  CornerDownLeft
} from 'lucide-react';
import { readerSampleDocument } from '../data/mockData';

export const ReaderPage = ({ 
  documentId = 'doc-hr-01', 
  initialPage = 12 
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchInDoc, setSearchInDoc] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [quickAnswers, setQuickAnswers] = useState([
    {
      q: "What is the maximum carryover of unused leave?",
      a: "Under Section 4.2 on this page, full-time employees may carry forward up to 8 unused paid leave days into the next calendar year, expiring on June 30th."
    }
  ]);

  const doc = readerSampleDocument;
  const pageData = doc.pages[currentPage] || doc.pages[12];

  const handleNextPage = () => {
    if (currentPage < doc.totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(150, Math.max(75, prev + delta)));
  };

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;

    setQuickAnswers(prev => [
      ...prev,
      {
        q: assistantQuery,
        a: `Page ${currentPage} specifies: Corporate operational requirements mandate written supervisor approval before leave submission.`
      }
    ]);
    setAssistantQuery('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)]">
      {/* 1. Document Reader Top Toolbar */}
      <div className="pb-3 border-b border-[#E8E8E8] flex flex-wrap items-center justify-between gap-3">
        {/* Document Title & Page Count */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#85898D]">
            <span>{doc.filename}</span>
            <span>•</span>
            <span className="text-[#526D5C] font-semibold">Page {currentPage} of {doc.totalPages}</span>
          </div>
          <h2 className="text-base font-manrope font-bold text-[#202124]">
            {doc.title}
          </h2>
        </div>

        {/* Controls: Page navigation, zoom, find, toggle assistant */}
        <div className="flex items-center gap-2.5">
          {/* Page Jump */}
          <div className="flex items-center gap-1 bg-[#F0F1F2] px-2 py-1 rounded-lg border border-[#E8E8E8] text-xs">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-0.5 rounded hover:bg-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 font-medium font-inter">
              {currentPage} / {doc.totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= doc.totalPages}
              className="p-0.5 rounded hover:bg-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 bg-[#F0F1F2] px-2 py-1 rounded-lg border border-[#E8E8E8] text-xs font-mono">
            <button
              onClick={() => handleZoom(-15)}
              className="p-0.5 rounded hover:bg-white cursor-pointer"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-1 text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => handleZoom(15)}
              className="p-0.5 rounded hover:bg-white cursor-pointer"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Ask Infera Toggle */}
          <button
            onClick={() => setIsAssistantOpen(!isAssistantOpen)}
            className={`btn-primary-dark text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer ${isAssistantOpen ? 'bg-[#526D5C] border-[#526D5C]' : ''}`}
          >
            <Sparkles size={13} />
            <span>{isAssistantOpen ? 'Close Assistant' : 'Ask Infera About Page'}</span>
          </button>
        </div>
      </div>

      {/* 2. Central Reading Area & Assistant Drawer */}
      <div className="flex-1 flex overflow-hidden pt-4 gap-4">
        {/* Document Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-xl border border-[#E8E8E8] flex justify-center">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl transition-transform duration-200"
          >
            {/* Cited Passage Alert Banner */}
            {currentPage === 12 && (
              <div className="mb-4 p-3.5 rounded-lg bg-[#EAF0EB] border border-[#D5E0D7] flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#526D5C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-inter font-bold text-[#202124]">
                    Verified AI Citation Match: Section 4.2
                  </h4>
                  <p className="text-[11px] text-[#526D5C] mt-0.5">
                    This passage was extracted by Infera AI to verify your inquiry regarding 24 paid annual leave days and 8-day carryover rules.
                  </p>
                </div>
              </div>
            )}

            {/* Paper Sheet */}
            <div className="bg-white p-8 sm:p-12 border border-[#D6D6D6] rounded-xl shadow-xs space-y-6 text-[#202124] min-h-[750px]">
              {/* Header folio */}
              <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-3 text-xs text-[#85898D] font-mono">
                <span>Acme Corporation • Policy Manual</span>
                <span>POL-2026-HR01</span>
              </div>

              {/* Page Content */}
              {currentPage === 12 ? (
                <div className="space-y-5 font-inter text-xs sm:text-sm leading-relaxed">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#85898D]">
                    {pageData?.chapter}
                  </span>

                  <h2 className="text-xl sm:text-2xl font-manrope font-bold text-[#202124]">
                    Section 4.2: Annual Leave Policy & Accrual Rules
                  </h2>

                  {/* Highlighted Cited Block */}
                  <div className="p-4 rounded-lg bg-[#EAF0EB] border-l-4 border-l-[#526D5C] border border-[#D5E0D7] space-y-2">
                    <span className="text-[10px] font-inter font-bold uppercase tracking-wider text-[#526D5C]">
                      Verified Corporate Clause
                    </span>
                    <p className="font-medium text-[#202124] leading-relaxed">
                      Full-time permanent employees are entitled to <mark className="bg-white px-1 py-0.5 rounded font-bold text-[#171717]">24 paid leaves per calendar year</mark>, accruing at the rate of <mark className="bg-white px-1 py-0.5 rounded font-bold text-[#171717]">2.0 days per calendar month</mark> of active service. Accruals post automatically on the last calendar day of each pay period.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-manrope font-bold text-[#202124]">
                      Rollover and Carry-Forward Provisions
                    </h3>
                    <p className="text-[#85898D]">
                      Employees are actively encouraged to rest throughout the year. In situations where operational priorities restrict planned vacations:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#202124]">
                      <li>
                        <strong>Maximum Carryover:</strong> Up to <strong>8 unused paid leave days</strong> may be carried forward into the subsequent calendar year.
                      </li>
                      <li>
                        <strong>Expiration Threshold:</strong> Any carried-forward days must be utilized before <strong>June 30th</strong> of the following year.
                      </li>
                      <li>
                        <strong>Special Exceptions:</strong> Exceptions require written authorization from the Department Head and Chief People Officer prior to December 15th.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#E8E8E8]">
                    <h3 className="text-sm font-manrope font-bold text-[#202124]">
                      Advance Notice Schedules
                    </h3>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                      <div className="p-2.5 bg-[#F7F7F7] border border-[#E8E8E8] rounded-md">
                        <span className="text-[10px] text-[#85898D]">1–2 Days</span>
                        <p className="font-semibold text-[#202124]">48 Hours Notice</p>
                      </div>
                      <div className="p-2.5 bg-[#F7F7F7] border border-[#E8E8E8] rounded-md">
                        <span className="text-[10px] text-[#85898D]">3–5 Days</span>
                        <p className="font-semibold text-[#202124]">10 Days Notice</p>
                      </div>
                      <div className="p-2.5 bg-[#F7F7F7] border border-[#E8E8E8] rounded-md">
                        <span className="text-[10px] text-[#85898D]">5+ Days</span>
                        <p className="font-semibold text-[#202124]">4 Weeks Notice</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-inter text-xs sm:text-sm text-[#85898D] leading-relaxed">
                  <h2 className="text-xl font-manrope font-bold text-[#202124]">
                    {pageData?.chapter || `Page ${currentPage}`}
                  </h2>
                  <p>
                    This section governs general operational guidelines, benefits schedules, and compliance procedures across Acme Corporation.
                  </p>
                  <p>
                    Navigate to Page 12 to review the cited Annual Leave Policy or query Infera AI using the side panel.
                  </p>
                </div>
              )}

              {/* Footer Folio */}
              <div className="pt-6 border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#85898D]">
                <span>Confidential Internal Use Only</span>
                <span className="font-mono font-bold text-[#202124]">Page {currentPage} of {doc.totalPages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Assistant Split-Pane Drawer */}
        {isAssistantOpen && (
          <div className="w-80 bg-white border border-[#E8E8E8] rounded-xl flex flex-col shrink-0 animate-in slide-in-from-right duration-150">
            <div className="p-3.5 border-b border-[#E8E8E8] bg-[#F7F7F7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#171717] text-white flex items-center justify-center">
                  <Sparkles size={11} />
                </div>
                <span className="text-xs font-inter font-semibold text-[#202124]">
                  Infera Page Inspector
                </span>
              </div>
              <button
                onClick={() => setIsAssistantOpen(false)}
                className="p-1 text-[#85898D] hover:text-[#202124]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              {quickAnswers.map((item, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="bg-[#171717] text-white p-2.5 rounded-lg">
                    {item.q}
                  </div>
                  <div className="bg-[#F0F1F2] p-2.5 rounded-lg border border-[#E8E8E8] text-[#202124]">
                    <span className="text-[10px] font-semibold text-[#526D5C] block mb-1">
                      Grounded in Page {currentPage}
                    </span>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleQuickAsk} className="p-3 border-t border-[#E8E8E8] bg-[#F7F7F7]">
              <div className="relative">
                <input
                  type="text"
                  value={assistantQuery}
                  onChange={(e) => setAssistantQuery(e.target.value)}
                  placeholder={`Ask about page ${currentPage}...`}
                  className="w-full py-1.5 pl-2.5 pr-8 rounded-lg bg-white border border-[#D6D6D6] text-xs font-inter text-[#202124] focus:outline-hidden focus:border-[#171717]"
                />
                <button
                  type="submit"
                  disabled={!assistantQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#171717] disabled:opacity-30 cursor-pointer"
                >
                  <CornerDownLeft size={13} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
