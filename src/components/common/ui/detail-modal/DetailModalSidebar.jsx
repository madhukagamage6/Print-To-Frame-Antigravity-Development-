import React from 'react';

/**
 * DetailModalSidebar - Scrollable right pane (40% width on desktop)
 * for customer info, assignments, stage transitions, and financial metadata.
 */
export default function DetailModalSidebar({ children, className = '' }) {
  return (
    <div className={`p-6 sm:p-8 space-y-6 lg:w-[420px] xl:w-[460px] flex-shrink-0 bg-surface-container-low/30 overflow-y-auto custom-scrollbar flex flex-col ${className}`}>
      {children}
    </div>
  );
}
