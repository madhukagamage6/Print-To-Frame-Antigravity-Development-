# Canvas Rendering Recipes & Code Patterns

This guide provides technical recipes for programmatically generating high-resolution artwork, posters, diagrams, and static canvases in SVG, PNG, and PDF formats.

---

## 1. High-DPI Vector SVG Generator Recipe

SVG is the premier format for resolution-independent canvas art. It can be converted directly to PNG or embedded in PDF documents without loss of precision.

### Node / TypeScript SVG Canvas Generator Example
```typescript
export interface CanvasDimensions {
  width: number;
  height: number;
  dpi: number;
}

export class SvgCanvasBuilder {
  private width: number;
  private height: number;
  private elements: string[] = [];
  private defs: string[] = [];

  constructor(width = 1200, height = 1600) {
    this.width = width;
    this.height = height;
  }

  addBackground(color: string): this {
    this.elements.unshift(
      `<rect width="${this.width}" height="${this.height}" fill="${color}" />`
    );
    return this;
  }

  addLinearGradient(id: string, x1: string, y1: string, x2: string, y2: string, stops: { offset: string; color: string; opacity?: number }[]): this {
    const stopsHtml = stops
      .map(s => `<stop offset="${s.offset}" stop-color="${s.color}" stop-opacity="${s.opacity ?? 1}" />`)
      .join('');
    this.defs.push(`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stopsHtml}</linearGradient>`);
    return this;
  }

  addGridLines(step = 40, stroke = '#3b494c', opacity = 0.2, strokeWidth = 1): this {
    let gridSvg = `<g opacity="${opacity}">`;
    for (let x = 0; x <= this.width; x += step) {
      gridSvg += `<line x1="${x}" y1="0" x2="${x}" y2="${this.height}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }
    for (let y = 0; y <= this.height; y += step) {
      gridSvg += `<line x1="0" y1="${y}" x2="${this.width}" y2="${y}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }
    gridSvg += `</g>`;
    this.elements.push(gridSvg);
    return this;
  }

  addTechnicalRegistrationMarks(margin = 60, color = '#00daf3'): this {
    const marks = [
      { x: margin, y: margin },
      { x: this.width - margin, y: margin },
      { x: margin, y: this.height - margin },
      { x: this.width - margin, y: this.height - margin }
    ];

    const markSvg = marks.map(({ x, y }) => `
      <g stroke="${color}" stroke-width="1.5" fill="none">
        <circle cx="${x}" cy="${y}" r="12" opacity="0.6" />
        <circle cx="${x}" cy="${y}" r="4" fill="${color}" />
        <line x1="${x - 18}" y1="${y}" x2="${x + 18}" y2="${y}" opacity="0.8" />
        <line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y + 18}" opacity="0.8" />
      </g>
    `).join('');

    this.elements.push(markSvg);
    return this;
  }

  addMonolithicTypography(text: string, x: number, y: number, options: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fill?: string;
    letterSpacing?: string;
    textAnchor?: 'start' | 'middle' | 'end';
  } = {}): this {
    const {
      fontFamily = "'Poppins', 'Hanken Grotesk', sans-serif",
      fontSize = 48,
      fontWeight = 700,
      fill = '#141413',
      letterSpacing = '-0.02em',
      textAnchor = 'start'
    } = options;

    this.elements.push(`
      <text 
        x="${x}" 
        y="${y}" 
        font-family="${fontFamily}" 
        font-size="${fontSize}px" 
        font-weight="${fontWeight}" 
        fill="${fill}" 
        letter-spacing="${letterSpacing}" 
        text-anchor="${textAnchor}"
      >${text}</text>
    `);
    return this;
  }

  render(): string {
    return `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 ${this.width} ${this.height}" 
        width="${this.width}" 
        height="${this.height}"
      >
        <defs>
          ${this.defs.join('\n')}
        </defs>
        ${this.elements.join('\n')}
      </svg>
    `.trim();
  }
}
```

---

## 2. Generative Geometric Wave Field Algorithm (Canvas 2D / Node)

Generates organic yet mathematically rigorous wave forms reminiscent of wave interference or topographic elevation:

```typescript
export function generateWaveHarmonics(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  linesCount = 80,
  strokeColor = '#00daf3'
) {
  ctx.save();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = strokeColor;

  const startY = height * 0.25;
  const endY = height * 0.75;
  const stepY = (endY - startY) / linesCount;

  for (let i = 0; i < linesCount; i++) {
    const yBase = startY + i * stepY;
    const progress = i / linesCount;
    const amplitude = Math.sin(progress * Math.PI) * (height * 0.12);

    ctx.beginPath();
    ctx.globalAlpha = 0.15 + 0.85 * Math.sin(progress * Math.PI);

    for (let x = 0; x <= width; x += 10) {
      const nx = (x / width) * Math.PI * 4;
      const wave1 = Math.sin(nx + progress * 2) * amplitude;
      const wave2 = Math.cos(nx * 2 - progress * 3) * (amplitude * 0.35);
      const wave3 = Math.sin(nx * 0.5 + progress) * (amplitude * 0.5);
      const y = yBase + wave1 + wave2 + wave3;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
  ctx.restore();
}
```

---

## 3. High-Fidelity PDF & PNG Export Rules

1. **Aspect Ratios**:
   - **Poster Standard (ISO A-Series)**: 1 : 1.414 (A1 = 594 × 841 mm, A2 = 420 × 594 mm, Digital Canvas = 1200 × 1697 px).
   - **Screen & Display Standard**: 16 : 9 (1920 × 1080 px, 3840 × 2160 px).
   - **Editorial Square**: 1 : 1 (1400 × 1400 px, 2048 × 2048 px).
2. **Safe Margins**: Minimum 5% to 8% margin padding on all edges. No critical typography or focal lines should cross into outer bleed regions.
3. **Typography Anti-Aliasing**: Ensure SVG `text-rendering="geometricPrecision"` and canvas `imageSmoothingEnabled = true` with 2x or 3x device pixel ratio for crystal clear rendering.
