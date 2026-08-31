import React from 'react';
import { Check, Clock, AlertCircle, Truck, Package, ShieldCheck, Flame, Bell } from 'lucide-react';

/**
 * Standardized status and stage badge component across all ERP modules.
 */
export default function StatusBadge({
  status,
  size = 'sm',
  showDot = true,
  className = '',
}) {
  if (!status) return null;

  const normalized = String(status).toLowerCase().trim();

  let colorClasses = 'bg-surface-container-high text-on-surface-variant border-outline-variant';
  let dotClass = 'bg-on-surface-variant';
  let Icon = null;
  let pulse = false;

  // Semantic color mappings
  if (['completed', 'delivered', 'canvas in', 'received', 'paid', 'approved'].includes(normalized)) {
    colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    dotClass = 'bg-emerald-400';
    Icon = Check;
  } else if (['in transit', 'ongoing', 'fabricating', 'processing'].includes(normalized)) {
    colorClasses = 'bg-primary/10 text-primary border-primary/30';
    dotClass = 'bg-primary';
    pulse = normalized === 'in transit';
    Icon = normalized === 'in transit' ? Truck : Clock;
  } else if (['ready', 'ready to load', 'ready for inspection'].includes(normalized)) {
    colorClasses = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    dotClass = 'bg-cyan-400';
    Icon = Package;
  } else if (['pending', 'waiting', 'intake', 'awaiting'].includes(normalized)) {
    colorClasses = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    dotClass = 'bg-amber-400';
    Icon = Clock;
  } else if (['revision', 'blocked', 'cancelled', 'error'].includes(normalized)) {
    colorClasses = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
    dotClass = 'bg-rose-400';
    Icon = AlertCircle;
  } else if (['75% invoice submitted', 'hand over'].includes(normalized)) {
    colorClasses = 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    dotClass = 'bg-indigo-400';
    Icon = ShieldCheck;
  }

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 font-bold tracking-tight',
    sm: 'text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-bold',
  }[size] || 'text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${colorClasses} ${sizeClasses} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {showDot && !pulse && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      )}
      {Icon && !pulse && <Icon size={size === 'lg' ? 14 : 11} className="opacity-90" />}
      <span>{status}</span>
    </span>
  );
}
