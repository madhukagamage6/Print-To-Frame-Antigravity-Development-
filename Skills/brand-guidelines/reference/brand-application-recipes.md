# Brand Application Recipes

Practical, copy-paste recipes for applying Anthropic brand guidelines across web interfaces, presentation decks, executive documents, and data visualizations.

---

## 1. Web & Tailwind CSS Integration

### CSS Variables Root Configuration
```css
:root {
  /* Anthropic Brand Core Tokens */
  --brand-primary: #141413;
  --brand-surface-light: #faf9f5;
  --brand-surface-subtle: #f0ede6;
  --brand-surface-card: #ffffff;
  --brand-border: #e3e0d5;
  --brand-mid-gray: #b0aea5;
  --brand-light-gray: #e8e6dc;
  --brand-text-dark: #141413;
  --brand-text-muted: #69665d;
  
  /* Accents */
  --brand-accent-coral: #d97757;
  --brand-accent-blue: #6a9bcc;
  --brand-accent-green: #788c5d;
  
  /* Fonts */
  --font-heading: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Lora', Georgia, 'Times New Roman', serif;
  --font-interface: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Tailwind Component Patterns
```tsx
import React from 'react';

// Brand Button
export function BrandButton({ variant = 'primary', children, ...props }) {
  const styles = {
    primary: "bg-[#d97757] hover:bg-[#c26244] text-white font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm",
    secondary: "bg-[#faf9f5] hover:bg-[#f0ede6] text-[#141413] border border-[#e3e0d5] font-medium px-5 py-2.5 rounded-lg transition-all",
    dark: "bg-[#141413] hover:bg-[#2b2a27] text-[#faf9f5] font-medium px-5 py-2.5 rounded-lg transition-all",
    ghost: "text-[#69665d] hover:text-[#141413] hover:bg-[#f0ede6] px-4 py-2 rounded-lg transition-all"
  };

  return (
    <button className={`${styles[variant]} font-['Inter',sans-serif]`} {...props}>
      {children}
    </button>
  );
}

// Brand Stat Card
export function BrandStatCard({ title, value, change, accent = 'coral' }) {
  const accentColors = {
    coral: 'text-[#d97757]',
    blue: 'text-[#6a9bcc]',
    green: 'text-[#788c5d]'
  };

  return (
    <div className="bg-[#ffffff] border border-[#e3e0d5] rounded-xl p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-[#69665d] font-['Inter',sans-serif]">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className={`text-3xl font-bold font-['Poppins',sans-serif] ${accentColors[accent]}`}>{value}</span>
        {change && (
          <span className="text-xs font-mono text-[#788c5d] bg-[#f0f4ea] px-2 py-0.5 rounded">
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
```

---

## 2. Presentation Slide Decks (HTML / Marp / Keynote Style)

### Archetype 1: Master Title Slide
```html
<section style="
  background-color: #141413;
  color: #faf9f5;
  padding: 5rem 6rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
">
  <div style="display: flex; align-items: center; gap: 0.75rem;">
    <div style="width: 12px; height: 12px; background-color: #d97757; border-radius: 2px;"></div>
    <span style="font-family: 'Inter', sans-serif; font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase; color: #b0aea5;">
      Anthropic Research & Strategy
    </span>
  </div>

  <div>
    <h1 style="font-size: 3.5rem; font-weight: 700; line-height: 1.15; margin-bottom: 1.5rem; max-width: 800px;">
      Frontier AI Safety & Alignment Architecture
    </h1>
    <p style="font-family: 'Lora', serif; font-size: 1.35rem; color: #b0aea5; max-width: 650px; line-height: 1.6;">
      Evaluating model steering, constitutional feedback loops, and empirical safety thresholds.
    </p>
  </div>

  <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #69665d; border-top: 1px solid #383733; padding-top: 1.5rem;">
    <span>Q3 Strategic Review</span>
    <span style="font-family: 'JetBrains Mono', monospace;">CONFIDENTIAL // DOC-2026-V4</span>
  </div>
</section>
```

### Archetype 2: 3-Column Content Slide
```html
<section style="
  background-color: #faf9f5;
  color: #141413;
  padding: 4rem 5rem;
  font-family: 'Lora', serif;
">
  <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 600; margin-bottom: 0.5rem;">
    Core Alignment Pillars
  </h2>
  <p style="color: #69665d; font-size: 1.1rem; margin-bottom: 3rem;">
    Methodologies governing autonomous agent boundaries and reliability.
  </p>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
    <!-- Card 1 -->
    <div style="background: #ffffff; border: 1px solid #e3e0d5; border-radius: 12px; padding: 2rem;">
      <div style="width: 32px; height: 4px; background-color: #d97757; margin-bottom: 1.5rem; border-radius: 2px;"></div>
      <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">1. Constitutional AI</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #383733;">Self-critique mechanisms that evaluate responses against explicit safety principles without human-in-the-loop bottlenecks.</p>
    </div>

    <!-- Card 2 -->
    <div style="background: #ffffff; border: 1px solid #e3e0d5; border-radius: 12px; padding: 2rem;">
      <div style="width: 32px; height: 4px; background-color: #6a9bcc; margin-bottom: 1.5rem; border-radius: 2px;"></div>
      <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">2. Interpretability</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #383733;">Monosemantic feature dictionary mapping internal activations to verifiable, human-interpretable concepts.</p>
    </div>

    <!-- Card 3 -->
    <div style="background: #ffffff; border: 1px solid #e3e0d5; border-radius: 12px; padding: 2rem;">
      <div style="width: 32px; height: 4px; background-color: #788c5d; margin-bottom: 1.5rem; border-radius: 2px;"></div>
      <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">3. Scalable Oversight</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #383733;">Automated evaluation harnesses measuring reasoning fidelity across multi-step agentic workflows.</p>
    </div>
  </div>
</section>
```

---

## 3. Executive Summaries & Reports

### Report Structure
1. **Header Block**: Clean layout with document title, version, date, and classification.
2. **Abstract / Executive Summary**: Set in `Lora` body font at 18px (`text-lg`), 1.6 line height.
3. **Data Tables**:
   - Headers: Background `#f0ede6`, Text `#141413`, Weight 600 in `Inter`.
   - Data Rows: Alternating white and `#faf9f5`.
   - Numerical Columns: Right-aligned in `JetBrains Mono`.

```html
<table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 0.875rem;">
  <thead>
    <tr style="background-color: #f0ede6; border-bottom: 2px solid #e3e0d5; text-align: left;">
      <th style="padding: 12px 16px; font-weight: 600; color: #141413;">Metric</th>
      <th style="padding: 12px 16px; font-weight: 600; color: #141413;">Baseline</th>
      <th style="padding: 12px 16px; font-weight: 600; color: #141413;">Target</th>
      <th style="padding: 12px 16px; font-weight: 600; color: #141413; text-align: right;">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e3e0d5;">
      <td style="padding: 12px 16px; font-family: 'Lora', serif;">Reasoning Accuracy</td>
      <td style="padding: 12px 16px; font-family: 'JetBrains Mono', monospace;">78.4%</td>
      <td style="padding: 12px 16px; font-family: 'JetBrains Mono', monospace;">85.0%</td>
      <td style="padding: 12px 16px; font-family: 'JetBrains Mono', monospace; font-weight: 600; color: #788c5d; text-align: right;">89.2%</td>
    </tr>
  </tbody>
</table>
```

---

## 4. Data Visualizations (Recharts / D3)

When styling charts under the brand guidelines:

```tsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ANTHROPIC_PALETTE = {
  coral: '#d97757',
  blue: '#6a9bcc',
  green: '#788c5d',
  charcoal: '#141413',
  midGray: '#b0aea5',
  border: '#e3e0d5',
  card: '#ffffff'
};

export function ThemedAreaChart({ data }) {
  return (
    <div className="bg-[#ffffff] border border-[#e3e0d5] rounded-xl p-6 shadow-sm">
      <h4 className="font-['Poppins',sans-serif] font-semibold text-lg text-[#141413] mb-4">
        Model Inference Latency Trend
      </h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="coralGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ANTHROPIC_PALETTE.coral} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={ANTHROPIC_PALETTE.coral} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" vertical={false} />
            <XAxis dataKey="time" stroke="#69665d" tick={{ fontSize: 12, fontFamily: 'Inter' }} />
            <YAxis stroke="#69665d" tick={{ fontSize: 12, fontFamily: 'JetBrains Mono' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: ANTHROPIC_PALETTE.card,
                borderColor: ANTHROPIC_PALETTE.border,
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="latency"
              stroke={ANTHROPIC_PALETTE.coral}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#coralGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```
