import React from 'react';
import { 
  X, 
  FileText, 
  Copy, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const SourceInspector = ({ 
  source, 
  onClose, 
  onOpenInReader, 
  onAskFollowUp 
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!source) return null;

  const handleCopyCitation = () => {
    const citationText = `[Citation] ${source.title} (${source.filename}), Page ${source.page} - ${source.section}\n"${source.snippet}"`;
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-[#E8E8E8] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#E8E8E8] bg-[#F7F7F7] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF0EB] text-[#526D5C] flex items-center justify-center">
            <FileText size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#85898D]">
                Verified Citation Source
              </span>
              <span className="text-[10px] font-semibold bg-[#526D5C] text-white px-1.5 py-0.2 rounded">
                {source.relevanceScore || 'Grounding Match'}
              </span>
            </div>
            <h3 className="text-sm font-manrope font-bold text-[#202124] mt-0.5 truncate max-w-[240px]">
              {source.filename}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-[#85898D] hover:text-[#202124] hover:bg-[#E8E8E8] rounded-lg transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Document Metadata Box */}
        <div className="p-3.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] space-y-2 text-xs font-inter">
          <div className="flex items-center justify-between text-[#85898D]">
            <span>Document Title</span>
            <span className="font-semibold text-[#202124]">{source.title}</span>
          </div>
          <div className="flex items-center justify-between text-[#85898D]">
            <span>Referenced Location</span>
            <span className="font-mono font-bold text-[#171717] bg-white px-2 py-0.5 rounded border border-[#D6D6D6]">
              Page {source.page}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#85898D]">
            <span>Format</span>
            <span className="font-mono text-[#202124]">{source.fileType || 'PDF'}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-[#85898D]">
            Referenced Section
          </span>
          <h4 className="text-xs font-inter font-semibold text-[#202124] mt-1 p-2.5 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8]">
            {source.section || 'General Content'}
          </h4>
        </div>

        {/* Verbatim Excerpt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-[#85898D]">
              Verified Excerpt
            </span>
            <span className="text-[11px] text-[#526D5C] font-semibold flex items-center gap-1">
              <ShieldCheck size={13} />
              Exact Match
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F7F7] border-l-3 border-l-[#171717] border border-[#E8E8E8] text-xs sm:text-sm text-[#202124] font-inter leading-relaxed">
            <p className="italic">
              "{source.snippet}"
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="p-3 rounded-lg bg-[#EAF0EB] border border-[#D5E0D7] text-xs text-[#526D5C] leading-normal">
          Infera AI authenticated this passage directly against internal company repositories.
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#E8E8E8] bg-[#F7F7F7] space-y-2">
        <button
          onClick={() => onOpenInReader(source.docId, source.page)}
          className="w-full btn-primary-dark py-2 text-xs font-inter flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen size={14} />
          <span>Open Full Document (Page {source.page})</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyCitation}
            className="btn-outline-neutral py-1.5 text-xs font-inter flex items-center justify-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#526D5C]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy Citation</span>
              </>
            )}
          </button>

          <button
            onClick={() => onAskFollowUp(`Tell me more about ${source.section} on page ${source.page} of ${source.filename}`)}
            className="btn-outline-neutral py-1.5 text-xs font-inter flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles size={12} className="text-[#526D5C]" />
            <span>Follow-up</span>
          </button>
        </div>
      </div>
    </div>
  );
};
