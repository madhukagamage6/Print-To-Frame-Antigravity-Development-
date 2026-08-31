import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ModalWrapper - Centralized, reusable modal dialog wrapper across all modules
 * (Leads, Deals, Logistics, Fabrication, Customers, Partners, Invoices).
 * 
 * Standardizes:
 * - Backdrop: Consistent dark glassmorphism (bg-black/75 backdrop-blur-md)
 * - Container Box: Consistent 24px/32px rounded corners (rounded-3xl), high-contrast borders (border-outline-variant/70),
 *   and ambient deep shadow (shadow-[0_15px_60px_rgba(0,0,0,0.6)]).
 * - Typography: High-contrast headings and metadata labels.
 * - Accessibility: aria-modal, ESC key dismissal, click-outside-to-close (optional).
 */
export default function ModalWrapper({
  isOpen = true,
  onClose,
  children,
  maxWidth = 'max-w-6xl',
  height = 'h-[90vh] max-h-[920px]',
  ariaLabel = 'Modal Dialog',
  closeOnBackdropClick = true,
  className = ''
}) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div 
        className={`bg-surface-container rounded-3xl w-full ${maxWidth} ${height} flex flex-col shadow-[0_15px_60px_rgba(0,0,0,0.6)] overflow-hidden border border-outline-variant/70 animate-in zoom-in-95 duration-200 text-on-surface ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
