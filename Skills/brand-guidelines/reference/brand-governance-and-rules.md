# Brand Governance & Design Standards

This document establishes the official brand governance rules, accessibility requirements, and layout principles for crafting high-fidelity artifacts aligned with brand guidelines.

---

## 1. The Core Brand Philosophy

A brand is defined by discipline, intentionality, and restraint:
1. **Hierarchy over Decoration**: Strong typography and generous whitespace communicate quality better than ornamental boxes, heavy drop-shadows, or cluttered borders.
2. **Restrained Color Distribution (60-30-10 Rule)**:
   - **60% Base / Canvas**: Dominant neutral canvas (`#faf9f5` in light mode, `#141413` in dark mode).
   - **30% Structure & Text**: High-contrast typography, structural rules, table headers, card borders (`#141413` / `#e8e6dc`).
   - **10% Intentional Accents**: Targeted focus on CTAs, active status badges, and key metrics (`#d97757` coral, `#6a9bcc` slate blue, `#788c5d` olive green).
3. **Typographic Identity**:
   - **Display / Headers (24px+)**: `Poppins` (geometric, modern, forward-looking).
   - **Body & Long-form Narrative**: `Lora` (warm, humanistic serif with high editorial readability).
   - **Microcopy & Functional UI**: `Inter` or system sans-serif for forms and chips.
   - **Code, Data & Coordinates**: `JetBrains Mono` for IDs, formulas, and tabular numbers.

---

## 2. Color System & Accessibility Compliance

### Contrast Matrix (WCAG 2.1 AA / AAA)
| Element | Foreground | Background | Contrast Ratio | Compliance |
|---|---|---|---|---|
| Dark Body Text | `#141413` | `#faf9f5` | **16.1 : 1** | AAA Pass |
| Dark Body Text | `#141413` | `#ffffff` | **17.8 : 1** | AAA Pass |
| Light Body Text | `#faf9f5` | `#141413` | **16.1 : 1** | AAA Pass |
| Muted Text | `#69665d` | `#faf9f5` | **5.4 : 1** | AA Pass |
| Coral Accent (Button text white) | `#ffffff` | `#d97757` | **3.6 : 1 (Bold/Large)** | AA Large |
| Coral on Dark | `#d97757` | `#141413` | **4.8 : 1** | AA Pass |
| Blue Accent Text | `#6a9bcc` | `#141413` | **6.1 : 1** | AA Pass |
| Olive Green Accent | `#788c5d` | `#faf9f5` | **4.6 : 1** | AA Pass |

### Prohibited Color Anti-Patterns
- **NEVER** use primary accent coral (`#d97757`) as small body text on light backgrounds (fails contrast).
- **NEVER** combine multiple conflicting accent colors in the same button or header.
- **NEVER** apply bright pure cyan or rainbow gradients when Anthropic brand styling is requested.

---

## 3. Typographic Hierarchy & Spacing Math

### Step-Ratio Typography
All headings must step logically down in size:
- **Display**: `3.5rem` (56px) / Weight 700 / Line Height 1.1 / Poppins
- **H1 (Document / Slide Title)**: `2.25rem` (36px) / Weight 600 / Line Height 1.2 / Poppins
- **H2 (Section Header)**: `1.75rem` (28px) / Weight 600 / Line Height 1.25 / Poppins
- **H3 (Card Title / Subhead)**: `1.375rem` (22px) / Weight 600 / Line Height 1.3 / Poppins
- **Body Large (Lead Intro)**: `1.125rem` (18px) / Weight 400 / Line Height 1.6 / Lora
- **Body (Standard Copy)**: `1.0rem` (16px) / Weight 400 / Line Height 1.6 / Lora
- **Caption / Metadata**: `0.875rem` (14px) / Weight 400 / Line Height 1.4 / Inter
- **Code / Data**: `0.875rem` (14px) / Weight 400 / Line Height 1.5 / JetBrains Mono

### Spacing & Corner Radii Math
- **Container Outer Padding**: Minimum `24px` (`p-6`). Outer padding must always be greater than or equal to inner child gaps (`gap-4` or `16px`).
- **Card Corner Radius**: `12px` (`rounded-xl`).
- **Button Corner Radius**: `8px` (`rounded-lg`).
- **Nested Border Radius Rule**: `Inner Radius = Outer Radius - Padding`. For an outer card with radius `12px` and padding `8px`, an inner container must have radius `4px`.

---

## 4. Logo, Badge & Clear Space Rules

1. **Clear Space**: Always maintain clear space around logos or brand marks equal to at least 50% of the mark's height.
2. **No Alterations**: Do not stretch, rotate, skew, drop-shadow, or color-modify official brand marks.
3. **Dark vs. Light Variants**: Always select the high-contrast logo variant corresponding to the background luminosity.

---

## 5. Official Dos and Don'ts Matrix

| Context | DO | DON'T |
|---|---|---|
| **Canvas** | Use warm light `#faf9f5` or deep charcoal `#141413`. | Use blinding pure `#ffffff` canvas with harsh blue tint or pitch `#000000`. |
| **Typography** | Pair Poppins (headings) with Lora (body). | Use Inter or Roboto for everything; don't use more than 2 distinct font families. |
| **Accents** | Use coral (`#d97757`), blue (`#6a9bcc`), or olive (`#788c5d`) for focal accents. | Saturate entire background sections with bright orange or neon shades. |
| **Data & Tables** | Align numeric values to the right in `JetBrains Mono`. | Center-align monetary amounts in serif or non-proportional fonts. |
| **Cards & Borders** | Use subtle 1px `#e3e0d5` borders with delicate background elevation. | Use heavy 3px dark borders, arbitrary 3D shadows, or gradient outlines. |
