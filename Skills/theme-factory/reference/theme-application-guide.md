# Theme Application Guide

This guide provides exact rules and copy-paste recipes for applying `theme-factory` palettes and typography across diverse artifact formats.

---

## 1. Web Applications & Tailwind CSS

### CSS Custom Properties Mapping
Define CSS variables at the root level for easy runtime switching:

```css
:root {
  --color-primary: #0f2b48;
  --color-primary-light: #1d4e7d;
  --color-secondary: #0284c7;
  --color-accent: #38bdf8;
  --color-surface: #f0f9ff;
  --color-surface-card: #ffffff;
  --color-background: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-border: #cbd5e1;
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Tailwind Config Token Integration
```js
// tailwind.config.js or CSS theme layer
module.exports = {
  theme: {
    extend: {
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          'primary-light': 'var(--color-primary-light)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          surface: 'var(--color-surface)',
          card: 'var(--color-surface-card)',
          bg: 'var(--color-background)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      }
    }
  }
}
```

---

## 2. Presentation Slide Decks (HTML / Marp / Reveal.js)

### Slide Archetype Rules
1. **Title Slide**: Primary dominant color background, crisp light text or accent highlights. Single focal headline with 1.25x line height.
2. **Content / Multi-Column**: Clean surface background (`--color-background`), card containers (`--color-surface-card`) with 1px border (`--color-border`).
3. **Data / Stat Callouts**: Use `--color-accent` or `--color-primary` for the metric figure (48px+), paired with a short muted label (14px).
4. **Conclusion / CTA Slide**: Symmetrical balance with high-contrast accent button.

### Inline CSS Template for HTML Slides
```html
<section style="
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
  padding: 4rem;
  min-height: 100vh;
">
  <h1 style="
    font-family: var(--font-heading);
    color: var(--color-primary);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  ">
    Quarterly Growth & Strategic Milestones
  </h1>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <!-- Stat Card -->
    <div style="
      background-color: var(--color-surface-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
    ">
      <span style="font-size: 2rem; font-weight: 700; color: var(--color-secondary);">+142%</span>
      <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.5rem;">Efficiency Gain</p>
    </div>
  </div>
</section>
```

---

## 3. Documents, Invoices & Executive Summaries

### Layout Hierarchy
- **Header**: Logo, company metadata, document ID in `--font-mono`.
- **Dividers**: 1px solid hairline borders using `--color-border`.
- **Tables**:
  - Header Row: Background `--color-surface`, Text `--color-primary`, Weight `600`.
  - Alternating Rows: Subtle alternating tint for readability.
  - Totals Row: Bold `--color-primary`, right-aligned monetary values in `--font-mono`.

---

## 4. Data Visualizations & Charts (Recharts & D3)

When generating charts with Recharts or D3, map the theme's `chartPalette` array to data series:

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PALETTE = ["#0f2b48", "#0284c7", "#38bdf8", "#059669", "#f59e0b", "#64748b"];

export function ThemedChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="var(--color-text-muted)" />
        <YAxis stroke="var(--color-text-muted)" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-surface-card)', 
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            borderRadius: '8px'
          }} 
        />
        <Bar dataKey="value" fill={PALETTE[0]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```
