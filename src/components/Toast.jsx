import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#202C26] text-white rounded-xl shadow-2xl border border-[#294B3B] text-xs font-interface animate-in fade-in slide-in-from-bottom-2 duration-200">
      <CheckCircle2 size={16} className="text-[#E5EBDD] shrink-0" />
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
};
