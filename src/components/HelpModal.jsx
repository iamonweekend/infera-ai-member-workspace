import React from 'react';
import { 
  X, 
  HelpCircle, 
  Keyboard, 
  ShieldCheck, 
  Mail 
} from 'lucide-react';

export const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
      <div 
        className="w-full max-w-lg bg-white border border-[#E8E8E8] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8E8E8] bg-[#F7F7F7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle size={16} className="text-[#171717]" />
            <h3 className="text-sm font-manrope font-bold text-[#202124]">
              Keyboard Shortcuts & Workspace Help
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#85898D] hover:text-[#202124]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs font-inter">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-[#202124] font-semibold">
              <Keyboard size={15} />
              <span>Keyboard Shortcuts</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-between">
                <span className="text-[#202124]">Omni-Search</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded font-mono text-[10px]">⌘K</kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-between">
                <span className="text-[#202124]">Submit Query</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded font-mono text-[10px]">↵ Enter</kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-between">
                <span className="text-[#202124]">Close Panels</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded font-mono text-[10px]">Esc</kbd>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-between">
                <span className="text-[#202124]">Zoom Reader</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#D6D6D6] rounded font-mono text-[10px]">+/-</kbd>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#EAF0EB] border border-[#D5E0D7] space-y-1">
            <div className="flex items-center gap-1.5 text-[#526D5C] font-semibold">
              <ShieldCheck size={15} />
              <span>Grounded Knowledge Assistant</span>
            </div>
            <p className="text-[#202124] leading-relaxed text-[11px]">
              Every response is verified against authenticated company files. Review citations in the source tray to verify legal clauses and HR guidelines.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#202124]">Missing a document?</p>
              <p className="text-[11px] text-[#85898D]">Contact your workspace administrator to request indexing.</p>
            </div>
            <a 
              href="mailto:knowledge-admin@acme.corp"
              className="btn-outline-neutral text-xs"
            >
              <Mail size={12} />
              <span>Contact Admin</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E8E8E8] bg-[#F7F7F7] flex items-center justify-end">
          <button
            onClick={onClose}
            className="btn-primary-dark text-xs py-1.5"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
