---
name: brand-guidelines
description: Applies official corporate brand identity, color palettes, and typography to any artifact (web interfaces, dashboards, slide decks, executive summaries, reports, charts, and technical documentation). Features Anthropic's official brand design system and flexible enterprise multi-brand tokens.
license: Complete terms in LICENSE.txt
---

# Brand Guidelines Skill

The `brand-guidelines` skill provides an end-to-end framework for applying official brand identity standards, typography pairings, color distribution ratios, and layout rules across diverse digital artifacts.

---

## Core Brand Palette: Anthropic Official Design System

### 1. Primary Colors
| Role | Token / Name | Hex Code | Visual Application |
|---|---|---|---|
| **Dark Base** | `primaryDark` | `#141413` | Primary text, dark backgrounds, high-contrast structural headers |
| **Light Canvas** | `surfaceLight` | `#faf9f5` | Main document canvas, warm editorial light backgrounds |
| **Mid Neutral** | `midGray` | `#b0aea5` | Secondary captions, subheadings, subtle icons |
| **Light Neutral** | `lightGray` | `#e8e6dc` | Dividers, alternating row fills, subtle card backgrounds |
| **Card Surface** | `surfaceCard` | `#ffffff` | Elevated component surfaces and modal containers |
| **Border Tone** | `border` | `#e3e0d5` | 1px clean separation borders |

### 2. Accent Colors
| Accent Role | Name | Hex Code | Purpose |
|---|---|---|---|
| **Primary Accent** | Coral / Terracotta | `#d97757` | Primary action buttons, focal metrics, active highlights |
| **Secondary Accent**| Slate Blue | `#6a9bcc` | Secondary charts, informational badges, link states |
| **Tertiary Accent** | Olive Green | `#788c5d` | Success states, positive trends, environmental callouts |

---

## Typography Standards

The brand identity pairs modern geometric headings with humanistic editorial body copy:

- **Headings & Display (24pt+)**: `Poppins` (Fallback: `-apple-system`, `BlinkMacSystemFont`, `Arial`)
  - Weight: `600` (SemiBold) or `700` (Bold)
  - Tracking: `-0.02em` for tight, clean display aesthetics
- **Body & Long-form Text**: `Lora` (Fallback: `Georgia`, `Times New Roman`, `serif`)
  - Weight: `400` (Regular) or `500` (Medium)
  - Line Height: `1.6` – `1.7` for optimal reading flow
- **Functional Interface & Microcopy**: `Inter` (Fallback: `sans-serif`)
  - Weight: `500` / `600` for buttons, table headers, and form labels
- **Data, Code & IDs**: `JetBrains Mono` (Fallback: `Fira Code`, `Consolas`, `monospace`)
  - Numeric alignment and coordinate specifications

---

## The 60-30-10 Brand Execution Principle

To preserve brand dignity and prevent visual fatigue:
- **60% Neutral Canvas**: `#faf9f5` background in light mode or `#141413` in dark mode.
- **30% Structural Elements**: `#141413` typography, `#e3e0d5` card borders, and `#f0ede6` subtle panels.
- **10% High-Intent Accents**: Strictly reserved for primary CTAs, active status chips, and leading chart series.

---

## Standard Workflow

### Step 1: Identify Artifact Type & Target Audience
Determine whether the artifact is an executive document, web dashboard, presentation slide deck, or chart visualizer.

### Step 2: Apply Typography & Color Tokens
Reference `/Skills/brand-guidelines/reference/brand-tokens.json`:
- Ensure headings use `Poppins`, body uses `Lora`, and data/tables use `JetBrains Mono`.
- Apply `#d97757` coral for primary interactive elements, supported by `#6a9bcc` and `#788c5d`.

### Step 3: Implement Layout & Spacing Rules
- Outer container padding ≥ 24px (`p-6`).
- Card corner radius: 12px (`rounded-xl`).
- Button corner radius: 8px (`rounded-lg`).
- Check WCAG contrast compliance: verify normal text achieves ≥ 4.5:1 ratio.

---

## Quick Reference Guides

- **Brand Tokens (JSON Schema)**: `/Skills/brand-guidelines/reference/brand-tokens.json`
- **Governance, Spacing Math & Anti-Patterns**: `/Skills/brand-guidelines/reference/brand-governance-and-rules.md`
- **Application Recipes (Web, Slides, Reports, Charts)**: `/Skills/brand-guidelines/reference/brand-application-recipes.md`
- **Print-To-Frame Industrial Theme Complement**: `/Skills/theme-factory/themes/catalog.json` (`kinetic-blueprint`)
