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
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-2.5 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex-shrink-0 border-t border-outline-variant/60 bg-surface-container-low/90 backdrop-blur-md pb-safe">
      <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
        {secondaryActions}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold text-xs sm:text-sm rounded-xl transition-all border border-outline-variant/60 active:scale-95 cursor-pointer min-h-[40px] flex items-center justify-center"
          >
            {closeText}
          </button>
        )}
        {primaryActions}
      </div>
    </div>
  );
}
