import React from 'react';
import { X } from 'lucide-react';

/**
 * DetailModalHeader - Standardized top bar for all detail pop-ups.
 * Includes module badge, ID, dynamic title, metadata subtitle, and animated close button.
 */
export default function DetailModalHeader({
  title,
  id,
  badge,
  subtitle,
  onClose,
  actions
}) {
  return (
    <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4.5 flex-shrink-0 border-b border-outline-variant/60 bg-surface-container-low/60">
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1">
        {badge && <div className="flex-shrink-0">{badge}</div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 flex-wrap">
            <h2 className="text-base sm:text-lg md:text-xl font-black text-on-surface truncate tracking-tight">
              {title}
            </h2>
            {id && (
              <span className="font-mono text-[10px] sm:text-xs font-bold text-on-surface-variant bg-surface-container-high px-1.5 sm:px-2 py-0.5 rounded-md border border-outline-variant/60">
                {id}
              </span>
            )}
          </div>
          {subtitle && (
            <div className="text-[10px] sm:text-[11px] font-semibold text-on-surface-variant flex items-center gap-1.5 sm:gap-2 mt-0.5 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0 ml-2 sm:ml-4">
        {actions}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 bg-surface-container-high text-on-surface-variant rounded-full hover:bg-surface-variant hover:text-on-surface transition-all hover:rotate-90 duration-200 border border-outline-variant/40 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Close Inspector (ESC)"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
