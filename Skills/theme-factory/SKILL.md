---
name: theme-factory
description: Professional toolkit for applying, generating, and customizing cohesive visual themes across artifacts (slides, presentations, documentation, executive briefs, ERP portals, data dashboards, charts, invoices, and HTML interfaces). Includes 10 curated pre-set themes, a dedicated Kinetic Blueprint ERP industrial theme, and an algorithmic custom theme generator.
license: Complete terms in LICENSE.txt
---

# Theme Factory Skill

The `theme-factory` skill provides a comprehensive design system toolkit for styling visual artifacts, presentations, reports, dashboards, and enterprise application components with harmonious typography and mathematically balanced color palettes.

---

## Capabilities & Scope

1. **Pre-Set Curated Themes**: 10 distinct, production-ready themes spanning corporate, creative, botanical, minimal, and high-tech aesthetics, plus the specialized **Kinetic Blueprint** theme tailored for ERP and BIM engineering workflows.
2. **Dynamic Theme Generation**: On-the-fly synthesis of custom palettes respecting the 60-30-10 distribution rule, WCAG AA/AAA accessibility ratios, and optical sizing.
3. **Multi-Artifact Cross-Compatibility**: Ready-to-apply styling tokens for:
   - **Slide Decks & Presentations** (Marp, HTML slides, Reveal.js, Keynote format)
   - **Reports & Documents** (Markdown, PDF exports, Executive summaries, Invoices, Quotations)
   - **Web & ERP Dashboards** (React components, Tailwind CSS token injection, CSS Custom Properties)
   - **Data Visualizations** (Recharts, D3, Chart.js categorical & sequential palettes)

---

## Curated Themes Directory

Detailed definitions with hex codes, typography pairings, and chart series colors are stored in `/Skills/theme-factory/themes/catalog.json`:

| ID | Theme Name | Primary Tone | Best Used For |
|---|---|---|---|
| `ocean-depths` | **Ocean Depths** | Deep Navy & Sea Glass | Executive summaries, Finance reports, Trust dashboards |
| `sunset-boulevard` | **Sunset Boulevard** | Coral, Orange & Amber | Marketing decks, Pitch presentations, Creative showcases |
| `forest-canopy` | **Forest Canopy** | Evergreen & Moss | Sustainability, ESG reports, Wellness & Health |
| `modern-minimalist`| **Modern Minimalist** | Architectural Grayscale | Technical specifications, Developer tools, Portfolios |
| `golden-hour` | **Golden Hour** | Amber, Bronze & Caramel | Luxury branding, Editorial articles, Hospitality decks |
| `arctic-frost` | **Arctic Frost** | Ice Blue & Slate | Cloud infrastructure docs, Security dashboards, Analytics |
| `desert-rose` | **Desert Rose** | Terracotta & Sandstone | Design agencies, Fashion/lifestyle, Customer empathy briefs |
| `tech-innovation` | **Tech Innovation** | Cyber Indigo & Violet | SaaS platforms, AI product launches, Keynotes |
| `botanical-garden`| **Botanical Garden** | Eucalyptus, Mint & Sage | Non-profit impact decks, Environmental studies, Education |
| `midnight-galaxy` | **Midnight Galaxy** | Obsidian & Nebula Violet | Dark-mode apps, Developer consoles, Night-mode reporting |
| `kinetic-blueprint`| **Kinetic Blueprint** | Electric Cyan & Cool Slate | Print-To-Frame ERP portals, BIM viewers, Steel fabrication |

---

## Standard Workflow

### Step 1: Discover or Define Theme Needs
When styling an artifact or responding to a user request:
- Determine if an existing theme from the catalog fits the artifact domain.
- If the user provides specific brand guidelines, colors, or mood keywords, initiate the **Custom Theme Generator** (see `/Skills/theme-factory/reference/custom-theme-generator.md`).

### Step 2: Extract & Apply Token Set
Reference the theme JSON from `/Skills/theme-factory/themes/catalog.json`:
- **Surface & Backgrounds**: Apply `background`, `surface`, and `surfaceCard` with matching 1px `border` lines.
- **Typography Pairing**: Assign `headingFont` to Display/H1-H3 headers and `bodyFont` to interface/paragraph text. Use `monoFont` for numerical tables and code coordinates.
- **Action & Accentuation**: Reserve `accent` and `primary` for interactive buttons, progress bars, and critical state highlights.
- **Charts & Visuals**: Map `chartPalette` array to data visualizers.

### Step 3: Verify Visual Standards
- Check contrast compliance: ensure body text meets ≥ 4.5:1 against card/background surfaces.
- Maintain consistent border radii (standard 8px / 0.5rem for buttons and cards; 4px for chips/badges).
- Apply balanced rhythmic spacing using a 4px baseline grid.

---

## Reference Resources

- **Catalog Definitions**: `/Skills/theme-factory/themes/catalog.json`
- **Application Recipes (CSS, Tailwind, Slides, Docs, Charts)**: `/Skills/theme-factory/reference/theme-application-guide.md`
- **Custom Theme Generation & Mathematical Rules**: `/Skills/theme-factory/reference/custom-theme-generator.md`
- **Print-To-Frame ERP System Design Theme**: `/public/web and erp design theme.md`
