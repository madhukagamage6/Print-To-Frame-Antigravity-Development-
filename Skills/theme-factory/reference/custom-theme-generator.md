# Custom Theme Generator

When standard themes do not fit the specific domain, mood, or brand, use this methodology to synthesize a new, cohesive, WCAG-compliant theme.

---

## 1. Mathematical Rules & Distribution

### The 60-30-10 Rule
- **60% Dominant Base**: Background and surface neutrals (`background`, `surfaceCard`, `surface`). Creates calm, uncrowded canvas space.
- **30% Structural Secondary**: Primary text, container borders, table headers, and structural elements (`primary`, `border`, `text`).
- **10% High-Intent Accent**: Primary action buttons, active states, key metric highlights, and focus rings (`accent`, `secondary`).

### Contrast Standards (WCAG 2.1 AA & AAA)
- **Normal Text (16px+)**: Minimum contrast ratio **4.5:1** against background.
- **Large Text (18pt / 24px+) & UI Controls**: Minimum contrast ratio **3.0:1**.
- **Dark Mode Surfaces**: Avoid pitch black (`#000000`) for text canvas. Add 2-5% saturation to dark neutrals (e.g. `#0e1416` or `#0b0c16`) to maintain optical warmth and depth.

---

## 2. Dynamic Palette Synthesis Checklist

When generating a custom theme from a prompt (e.g., *"Make a clinical diagnostics theme"* or *"Create a cyberpunk neon theme"*):

1. **Extract Dominant Mood & Tone**:
   - Industry context (e.g. Healthcare = pristine cyan/teal + crisp white; Luxury = deep amber/bronze + cream).
2. **Assign Base Anchor**:
   - Light vs. Dark canvas mode.
   - Primary brand color with sufficient optical weight.
3. **Generate Tonal Scale**:
   - `primary` (core anchor)
   - `primaryLight` (+20% lightness / -10% saturation)
   - `primaryDark` (-20% lightness)
   - `accent` (complementary or split-complementary hue)
   - `surface` (tinted neutral at 5-10% alpha of primary hue)
   - `border` (subtle separating outline, low contrast against surface)
4. **Select Typographic Pair**:
   - Display/Heading font that communicates character.
   - High-legibility Body font with complete glyph coverage.
   - Monospace font for numerical, tabular, or code output.
5. **Construct 6-Color Chart Palette**:
   - High hue distance to ensure distinguishable chart series.
   - Colorblind-friendly (avoid relying solely on green vs red distinction; pair with shapes/labels).

---

## 3. Custom Theme Schema

Output custom themes in the standard JSON structure:

```json
{
  "id": "custom-theme-id",
  "name": "Display Name",
  "tagline": "One-line visual description",
  "bestFor": ["UseCase 1", "UseCase 2"],
  "colors": {
    "primary": "#...",
    "primaryLight": "#...",
    "primaryDark": "#...",
    "secondary": "#...",
    "accent": "#...",
    "surface": "#...",
    "surfaceCard": "#...",
    "background": "#...",
    "text": "#...",
    "textMuted": "#...",
    "border": "#...",
    "borderLight": "#...",
    "success": "#...",
    "warning": "#...",
    "error": "#...",
    "info": "#..."
  },
  "typography": {
    "headingFont": "...",
    "bodyFont": "...",
    "monoFont": "...",
    "headingWeight": "600|700",
    "bodyWeight": "400"
  },
  "chartPalette": ["#...", "#...", "#...", "#...", "#...", "#..."]
}
```
