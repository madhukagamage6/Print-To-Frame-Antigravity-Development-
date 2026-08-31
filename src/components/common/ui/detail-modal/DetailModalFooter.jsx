import React from 'react';

/**
 * DetailModalFooter - Standardized sticky bottom action bar.
 * Keeps secondary actions (print, WhatsApp, export) on the left and primary actions (save, complete) on the right.
 */
export default function DetailModalFooter({
  secondaryActions,
  primaryActions,
  onClose,
  closeText = "Close"
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 px-6 sm:px-8 py-4 flex-shrink-0 border-t border-outline-variant/60 bg-surface-container-low/80 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
        {secondaryActions}
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold text-xs sm:text-sm rounded-xl transition-all border border-outline-variant/60 active:scale-95"
          >
            {closeText}
          </button>
        )}
        {primaryActions}
      </div>
    </div>
  );
}
