# 📋 AGENTS.md — UI Guidelines

> Concise rules for building accessible, fast, delightful interfaces.
> Based on [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)

---

### 🎹 Interactions

| Rule | Type | Description |
|------|------|-------------|
| Keyboard works everywhere | **MUST** | All flows keyboard-operable, follow WAI-ARIA Patterns |
| Clear focus rings | **MUST** | Visible `:focus-visible` on every focusable element |
| Focus management | **MUST** | Focus traps in modals, return focus on close |
| Hit targets ≥24px | **MUST** | Mobile minimum 44px. Expand small visuals |
| Mobile input ≥16px | **MUST** | Prevent iOS Safari auto-zoom |
| Browser zoom | **NEVER** | Never disable zoom |
| Paste blocking | **NEVER** | Never block paste in inputs |
| Hydration-safe | **MUST** | Inputs keep focus/value after hydration |
| Loading buttons | **MUST** | Show spinner, keep original label |
| URL as state | **MUST** | Filters, tabs, pagination in URL |
| Optimistic updates | **SHOULD** | Update UI immediately, rollback on failure |
| Destructive confirm | **MUST** | Require confirmation or provide Undo |
| No dead zones | **MUST** | Clickable areas must be interactive |
| Links are links | **MUST** | Use `<a>`/`<Link>`, never `<button>` for nav |
| Announce updates | **MUST** | `aria-live` for toasts & async feedback |

### 🎬 Animations

| Rule | Type | Description |
|------|------|-------------|
| Reduced motion | **MUST** | Honor `prefers-reduced-motion` |
| GPU properties | **MUST** | Use `transform`, `opacity` only |
| `transition: all` | **NEVER** | Explicitly list animated properties |
| Interruptible | **MUST** | User input cancels animation |
| Duration <200ms | **SHOULD** | Faster feels more responsive |
| Transform origin | **MUST** | Anchor to physical start point |

### 📐 Layout

| Rule | Type | Description |
|------|------|-------------|
| 8px grid | **MUST** | Consistent spacing scale |
| Deliberate alignment | **MUST** | Every element aligns intentionally |
| Responsive | **MUST** | Test mobile, laptop, ultra-wide |
| Safe areas | **MUST** | Use `env(safe-area-inset-*)` |
| Excessive scrollbars | **NEVER** | Fix overflow, don't hide scrollbars |
| JS sizing | **NEVER** | Prefer CSS flex/grid over JS measurement |

### 📝 Content

| Rule | Type | Description |
|------|------|-------------|
| Stable skeletons | **MUST** | Match final layout exactly |
| Page titles | **MUST** | `<title>` reflects current page |
| No dead ends | **MUST** | Always offer next step |
| All states | **MUST** | Empty, loading, error, success designed |
| Color + text | **MUST** | Never color alone for status |
| Icon labels | **MUST** | Text alternative for screen readers |
| Skip link | **MUST** | "Skip to content" for keyboard users |
| Semantic HTML | **MUST** | Native elements before ARIA |

### 📋 Forms

| Rule | Type | Description |
|------|------|-------------|
| Enter submits | **MUST** | Single input forms submit on Enter |
| Labels everywhere | **MUST** | Every input has visible label |
| Error placement | **MUST** | Errors next to field, focus first error |
| Block typing | **NEVER** | Allow any input, validate after |
| Pre-disable submit | **NEVER** | Let users submit to see errors |
| Autocomplete | **MUST** | Set `autocomplete` for autofill |
| Unsaved warning | **MUST** | Warn before losing form data |

### ⚡ Performance

| Rule | Type | Description |
|------|------|-------------|
| SSR for SEO | **MUST** | Server-render public pages |
| Image dimensions | **MUST** | Explicit width/height, no CLS |
| API <500ms | **MUST** | Mutations complete fast |
| Virtualize lists | **MUST** | Large lists use virtualization |
| Preload fonts | **MUST** | Critical fonts preloaded |
| Main thread | **NEVER** | Never block with heavy sync work |

### 🎨 Design

| Rule | Type | Description |
|------|------|-------------|
| Contrast APCA | **MUST** | Meet APCA contrast ratios |
| Hover increases contrast | **MUST** | Interactive states more visible |
| Nested radii | **MUST** | Child radius ≤ parent radius |
| Theme color | **MUST** | `<meta name="theme-color">` set |
| CTA color change | **NEVER** | Never change CTA during checkout |

### ✍️ Copywriting

| Rule | Type | Description |
|------|------|-------------|
| Active voice | **MUST** | "Install" not "will be installed" |
| Title Case | **MUST** | Headings & buttons (Chicago) |
| Numerals | **MUST** | "8 items" not "eight items" |
| Specific labels | **MUST** | "Save Product" not "Continue" |
| Error guidance | **MUST** | Tell user how to fix, not just what's wrong |
