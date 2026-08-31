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
    <div className="flex justify-between items-center px-6 sm:px-8 py-4.5 flex-shrink-0 border-b border-outline-variant/60 bg-surface-container-low/60">
      <div className="flex items-center space-x-3.5 min-w-0">
        {badge && <div className="flex-shrink-0">{badge}</div>}
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-black text-on-surface truncate tracking-tight">
              {title}
            </h2>
            {id && (
              <span className="font-mono text-xs font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md border border-outline-variant/60">
                {id}
              </span>
            )}
          </div>
          {subtitle && (
            <div className="text-[11px] font-semibold text-on-surface-variant flex items-center gap-2 mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
        {actions}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 bg-surface-container-high text-on-surface-variant rounded-full hover:bg-surface-variant hover:text-on-surface transition-all hover:rotate-90 duration-200 border border-outline-variant/40"
            title="Close Inspector (ESC)"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
