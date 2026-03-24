# Exchange Design System — Prototype Kit

A CSS-based implementation of the **XDS Exchange Design System** and **Exchange Brand Playbook**, used as the mandatory base for all Exchange prototype work.

## Figma Sources

| File | URL |
|---|---|
| XDS — Exchange Design System | [Open in Figma](https://www.figma.com/design/S5vzHnfEkTU1uETKnVOl7x/XDS---Exchange-Design-System?node-id=3348-31706) |
| Exchange Brand Playbook | [Open in Figma](https://www.figma.com/slides/Oyb9M17fbUWZl4C7ZTO3jQ/Exchange-Brand-Playbook?node-id=1-101) |

> **Rule:** All prototypes MUST reference both files. When building a new prototype, always check these Figma sources first.

---

## File Structure

```
design-system/
├── tokens.css       ← All design tokens as CSS custom properties (--xds-*)
├── components.css   ← Base component classes built from tokens
└── README.md        ← This file
```

---

## How to Use in a Prototype

Add these two imports at the top of your HTML file's `<style>` block, or as `<link>` tags:

```html
<link rel="stylesheet" href="./design-system/tokens.css">
<link rel="stylesheet" href="./design-system/components.css">
```

Or inside a `<style>` tag:

```css
@import './design-system/tokens.css';
@import './design-system/components.css';
```

Then use the tokens directly in your custom CSS:

```css
.my-component {
  background: var(--xds-surface-elevated);
  color: var(--xds-text-primary);
  border: 1px solid var(--xds-surface-border);
  border-radius: var(--xds-radius-lg);
  padding: var(--xds-space-12);
}
```

---

## Token Reference

### Colours

| Token | Value | Use |
|---|---|---|
| `--xds-color-brand-blue` | `#1C6EF2` | Primary CTA, interactive elements |
| `--xds-color-brand-cyan` | `#00D2FF` | Charts, accents, highlights |
| `--xds-color-brand-gold` | `#F0B90B` | VIP, premium, rewards |
| `--xds-color-brand-green` | `#0ECB81` | Positive, gains, success |
| `--xds-color-brand-red` | `#F6465D` | Negative, losses, error |
| `--xds-surface-page` | `#0D0D1C` | Page root background |
| `--xds-surface-elevated` | `#12122A` | Cards, panels |
| `--xds-surface-overlay` | `#1A1A36` | Modals, dropdowns |
| `--xds-surface-border` | `#2A2A4A` | Dividers, borders |
| `--xds-text-primary` | `#FFFFFF` | Body text |
| `--xds-text-secondary` | `#B0B0C8` | Supporting text |
| `--xds-text-tertiary` | `#6E6E8A` | Captions, placeholders |

### Typography

| Token | Value |
|---|---|
| `--xds-font-family-base` | Inter, system-ui |
| `--xds-font-size-base` | 14px |
| `--xds-font-size-sm` | 12px |
| `--xds-font-size-md` | 16px |
| `--xds-font-size-lg` | 18px |
| `--xds-font-size-xl` | 20px |
| `--xds-font-size-2xl` | 24px |

### Spacing

Spacing uses a numeric scale: `--xds-space-{n}` where n = 0–48.
Common values: `4px (2)`, `8px (4)`, `12px (6)`, `16px (8)`, `24px (12)`, `32px (16)`.

### Component Classes

| Class | Description |
|---|---|
| `.xds-btn` | Base button |
| `.xds-btn-primary` | Blue filled button |
| `.xds-btn-secondary` | Blue outlined button |
| `.xds-btn-ghost` | Subtle bordered button |
| `.xds-btn-danger` | Red destructive button |
| `.xds-btn-sm / .xds-btn-lg` | Size variants |
| `.xds-card` | Elevated dark card |
| `.xds-input` | Text input |
| `.xds-select` | Dropdown select |
| `.xds-textarea` | Multi-line input |
| `.xds-badge-active` | Green "Active" status badge |
| `.xds-badge-scheduled` | Blue "Scheduled" badge |
| `.xds-badge-draft` | Grey "Draft" badge |
| `.xds-badge-ended` | Amber "Ended" badge |
| `.xds-badge-deactivated` | Red "Deactivated" badge |
| `.xds-table` | Data table |
| `.xds-tabs / .xds-tab` | Tab bar |
| `.xds-nav` | Top navigation bar |
| `.xds-info-block` | Contextual info message |
| `.xds-modal-overlay` | Modal backdrop |
| `.xds-modal` | Modal container |
| `.xds-toggle` | Toggle switch |

---

## Brand Guidelines Summary

From the **Exchange Brand Playbook**:

- **Tone:** Professional, trustworthy, performance-driven
- **Theme:** Always dark — light backgrounds are not used on Exchange surfaces
- **Primary Font:** Inter (all weights)
- **Logo usage:** The Exchange logo must always appear on dark backgrounds
- **Colour hierarchy:** Blue (primary action) → Cyan (data/charts) → Gold (premium/VIP)
- **Animation:** Subtle, functional — no decorative animation that adds noise
- **Spacing:** Generous — never crowded; use whitespace to create hierarchy

---

## Updating the Design System

When the Figma files are updated:

1. Open the Figma file in the desktop app
2. Select the relevant component or token layer
3. Use the Figma MCP in Cursor: `get_variable_defs` or `get_design_context`
4. Update `tokens.css` with any new/changed values
5. Commit and push to GitHub

```bash
git add design-system/
git commit -m "Update design tokens from Figma XDS"
git push origin main
```

---

## For Cursor AI

When generating a new prototype, always:

1. Import both CSS files from `./design-system/`
2. Use `var(--xds-*)` tokens for all colours, spacing, radius, and typography
3. Use `.xds-*` component classes for standard UI elements
4. Reference the Figma sources above for any component not yet in this kit
5. Default to dark theme — `background: var(--xds-surface-page)`
