import React from 'react';

export const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-manrope font-bold text-[#202124] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-inter text-[#85898D]">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
