import React from 'react';

/**
 * Standardized Page Header component across all CRM and Operations modules.
 * @param {Object} props
 * @param {string} props.title - Page main heading
 * @param {string} props.subtitle - Descriptive subtext
 * @param {Array<{label: string, value: string|number, color?: string}>} [props.metrics] - Key metrics chips
 * @param {React.ReactNode} [props.actions] - Action buttons on the right
 * @param {React.ReactNode} [props.tabs] - Optional secondary navigation tabs
 */
export default function PageHeader({
  title,
  subtitle,
  metrics = [],
  actions,
  tabs,
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              {title}
            </h1>
            {metrics.map((m, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  m.color === 'secondary' || m.color === 'emerald'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : m.color === 'primary' || m.color === 'cyan'
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : m.color === 'amber' || m.color === 'warning'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-surface-container-high text-on-surface-variant border-outline-variant'
                }`}
              >
                <span className="opacity-70 mr-1.5">{m.label}:</span>
                <span className="font-bold text-on-surface">{m.value}</span>
              </span>
            ))}
          </div>
          {subtitle && (
            <p className="text-on-surface-variant text-sm mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Optional Tabs Bar */}
      {tabs && (
        <div className="border-b border-outline-variant/60 pt-2">
          {tabs}
        </div>
      )}
    </div>
  );
}
