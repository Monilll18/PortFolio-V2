# Replication Prompt — Monil Jain Portfolio

---

## 1. ROLE + AESTHETIC IDENTITY

**Role:** Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer.

**Aesthetic Identity:** Precision Void — Minimal Dark Luxury, Code Meets Craft

---

## 2. CORE DESIGN SYSTEM

### Palette

| Semantic Name | Descriptive Word | Hex | Usage |
|---|---|---|---|
| Background | Void | #0A0A0A | Page bg, all section bg |
| Surface | Obsidian | #141414 | Card bg, elevated surfaces |
| Surface Elevated | Slate | #1A1A1A | Hover cards, active states |
| Border | Whisper | #2A2A2A | Card borders, dividers, timeline |
| Text Primary | Chalk | #F5F5F5 | Headings, names, primary content |
| Text Secondary | Ash | #999999 | Body text, descriptions |
| Text Tertiary | Smoke | #666666 | Labels, dates, metadata |
| Accent | Warm Gold | #C8A97E | Accent lines, highlights, timeline dots, CTA hover |
| Accent Glow | Amber Soft | rgba(200,169,126,0.15) | Radial glows, ambient light |
| CTA Fill | Soft White | #F0F0F0 | Primary button backgrounds |
| Link Hover | White | #FFFFFF | Nav hover, link hover states |

### Typography

| Role | Font Family | Weight | Size | Line-Height | Notes |
|---|---|---|---|---|---|
| Display | Inter | 700 | clamp(2.5rem, 5vw, 4rem) | 1.1 | Hero name — largest element |
| Heading 1 | Inter | 600 | 2.25rem | 1.2 | Section headings |
| Heading 2 | Inter | 600 | 1.5rem | 1.3 | Card titles, role names |
| Body | Inter | 400 | 1rem | 1.6 | Descriptions, paragraphs |
| Label | Inter | 500 | 0.75rem | 1.4 | Dates, tags — uppercase, tracking: 0.05em |
| Mono | JetBrains Mono | 400 | 0.875rem | 1.5 | Code refs, tech stack tags |

**⚑ Drama Ratio:** The drama is 700-weight Display at ~4rem for "Monil Jain" against 400-weight #999 body at 1rem. Ratio ~4:1. The name SHOUTS against the whisper of body text. The warm gold (#C8A97E) appearing sparingly against monochrome IS the emotional heartbeat. Losing gold = losing warmth. Losing weight contrast = losing authority.

### Texture System

- Noise/grain: None. Pure flat dark surfaces. Depth via border separation only.
- Border radius scale: sm: 8px (tags, small btns) | md: 12px (cards) | lg: 16px (project cards) | xl: 24px (featured) | pill: 999px (CTAs, badges)
- Shadow system: none (default) | subtle: 0 4px 24px rgba(0,0,0,0.4) on hover | glow: 0 0 60px rgba(200,169,126,0.08) for accent elements

---

## 3. COMPONENT ARCHITECTURE

### SECTION 1: Navbar — "The Floating Island"

```
┌─────────────────────────────────────────────────────┐
│ [Logo: "Monil Jain"] ─── | ── [Home] [Projects]    │
│                                [Experience]          │
│                                [Beyond Code]         │
│                                [Spotlight]            │
│                                [Connect] [Resume]     │
└─────────────────────────────────────────────────────┘
Layout: Flexbox row, justify-between, align-center
Max-width: 1280px centered. Height: 72px. Padding: 0 24px.
```

**BEHAVIOR:**
- Initial state: `background: transparent`, `position: fixed`, `z-index: 50`
- After ~72px scroll: `background: rgba(10,10,10,0.9)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid #2A2A2A`
- Transition: 300ms ease

**TYPOGRAPHY:**
```
  Logo → "Monil Jain" | Inter 600 1rem | Color: #F5F5F5
  Nav links → "Home" "Projects" "Experience" "Beyond Code" "Spotlight" "Connect" | Inter 400 0.875rem | Color: #999 → #FFF on hover
  Resume → "Resume" | Inter 500 0.875rem | pill border 1px solid #2A2A2A | hover: bg #1A1A1A
```

**INTERACTION: Nav Link**
```
STATE         | background    | color      | transform    | other
──────────────────────────────────────────────────────────────
DEFAULT       | transparent   | #999999    | none         | –
HOVER         | transparent   | #FFFFFF    | none         | ::after width 0→100%, h:1px, bg:#C8A97E, bottom:-4px
MECHANISM: CSS transition 200ms ease + ::after pseudo-element underline wipe
```

---

### SECTION 2: Hero — "The Void Declaration"

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌────────────────────┐  ┌──────────────────────┐   │
│  │  LEFT (55%)        │  │  RIGHT (45%)         │   │
│  │                    │  │                      │   │
│  │  [Intro paragraph  │  │  [Portrait/Visual    │   │
│  │   #999 body text]  │  │   placeholder with   │   │
│  │                    │  │   ambient glow]       │   │
│  │  ┌──────────────┐  │  │                      │   │
│  │  │ CTA: Let's   │  │  │                      │   │
│  │  │ Connect      │  │  │                      │   │
│  │  │ View Resume  │  │  │                      │   │
│  │  └──────────────┘  │  │                      │   │
│  └────────────────────┘  └──────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
Height: 100vh. BG: #0A0A0A + radial-gradient(ellipse at 60% 50%, rgba(200,169,126,0.08) 0%, transparent 60%)
Layout: CSS Grid: 55fr 45fr, gap 48px, align-center. Max-width: 1280px centered. Padding: 120px 48px.
```

**TYPOGRAPHY + CONTENT:**
```
  Intro → "Building at the intersection of AI and full-stack engineering. I ship fast, learn faster, and turn cutting-edge tech into production-ready products." | Body 400 1rem | Color: #999
  Tagline → "Translating complex AI capabilities into seamless, scalable applications." | H2 600 1.5rem | Color: #F5F5F5
  CTA Primary → "Let's Connect" | pill btn, bg:#F0F0F0, color:#0A0A0A, padding:12px 32px, radius:999px
  CTA Secondary → "View Resume" | pill btn, bg:transparent, border:1px solid #2A2A2A, color:#F5F5F5, padding:12px 32px
```

**ANIMATION TIMELINE:**
```
ANIMATION: Hero Void Declaration
Trigger: page-load
Library: GSAP + Framer Motion
TIMELINE:
  t=0ms     hero-portrait    FROM: opacity:0, scale:0.95, filter:blur(8px)
  t=200ms   hero-portrait    TO:   opacity:1, scale:1, filter:blur(0)        DURATION:800ms  EASING:power2.out
  t=100ms   intro-text       FROM: opacity:0, translateY:30px
  t=400ms   intro-text       TO:   opacity:1, translateY:0                   DURATION:600ms  EASING:power2.out
  t=600ms   tagline          FROM: opacity:0, translateY:20px
  t=800ms   tagline          TO:   opacity:1, translateY:0                   DURATION:600ms  EASING:power2.out
  t=800ms   cta-primary      FROM: opacity:0, translateY:15px
  t=1000ms  cta-primary      TO:   opacity:1, translateY:0                   DURATION:400ms  EASING:power2.out
  t=900ms   cta-secondary    FROM: opacity:0, translateY:15px
  t=1100ms  cta-secondary    TO:   opacity:1, translateY:0                   DURATION:400ms  EASING:power2.out
  t=0ms     ambient-glow     FROM: opacity:0, scale:0.8
  t=500ms   ambient-glow     TO:   opacity:1, scale:1                        DURATION:1200ms EASING:power1.out
LOOP: no
```

**COMPOSITION MAP:**
```
CENTER-LEFT: Text block (intro + tagline + CTAs). Vertically centered.
CENTER-RIGHT: Portrait placeholder (dark silhouette or abstract visual), ~45% width, desaturated.
AMBIENT: Radial gradient glow: radial-gradient(ellipse at 65% 50%, rgba(200,169,126,0.08) 0%, transparent 55%)
AMBIENT2: Subtle animated particle lines — thin strokes with dots, color rgba(200,169,126,0.15), suggesting data flow / neural connections.
```

**INTERACTION: CTA Primary**
```
STATE         | background    | color      | transform       | box-shadow
──────────────────────────────────────────────────────────────────────
DEFAULT       | #F0F0F0       | #0A0A0A    | scale(1)        | none
HOVER         | #FFFFFF       | #0A0A0A    | scale(1.05)     | 0 4px 20px rgba(240,240,240,0.15)
ACTIVE        | #E0E0E0       | #0A0A0A    | scale(0.97)     | none
MECHANISM: CSS transition 250ms cubic-bezier(0.25,0.1,0.25,1)
```

---

### SECTION 3: Projects — "The Showcase Archive"

```
┌─────────────────────────────────────────────────────┐
│  [Section Label: "Selected Work" — Label style]      │
│                                                      │
│  ┌──────────┐  ┌──────────┐                         │
│  │ PROJECT  │  │ PROJECT  │                         │
│  │ CARD 1   │  │ CARD 2   │                         │
│  │ [image]  │  │ [image]  │                         │
│  │ [title]  │  │ [title]  │                         │
│  │ [desc]   │  │ [desc]   │                         │
│  │ [CTA]    │  │ [CTA]    │                         │
│  ├──────────┤  ├──────────┤                         │
│  │ PROJECT  │  │ PROJECT  │                         │
│  │ CARD 3   │  │ CARD 4   │                         │
│  ├──────────┤  ├──────────┤                         │
│  │ PROJECT  │  │ PROJECT  │                         │
│  │ CARD 5   │  │ CARD 6   │                         │
│  └──────────┘  └──────────┘                         │
└─────────────────────────────────────────────────────┘
Layout: Grid 2-col, gap:24px. Max-width:1280px. Padding: 96px 48px.
```

**CARD STRUCTURE:**
```
  Card → bg:#141414, border:1px solid #2A2A2A, radius:16px, overflow:hidden
  Card Image → 16:9 ratio placeholder, filter:grayscale(20%), object-fit:cover
  Card Title → "Project Name" | H2 600 1.5rem | Color: #F5F5F5
  Card Desc → project summary | Body 400 0.875rem | Color: #999
  Card CTA → "View details" | Label 500 0.75rem | Color: #C8A97E
  Card padding: 0 (image flush top) + 24px sides/bottom for text
```

**Placeholder projects (6):**
1. AI Procurement System — intelligent procurement platform
2. Real-Time Analytics Dashboard — data viz framework
3. AI Voice Assistant — conversational AI integration
4. E-Commerce Platform — scalable marketplace
5. Developer Portfolio — Next.js showcase
6. Open Source Contributions — community tools

**ANIMATION:**
```
ANIMATION: Archive Reveal
Trigger: scroll-enter(top 80vh)
Library: GSAP ScrollTrigger
TIMELINE:
  t=0ms     card[0]    FROM: opacity:0, translateY:40px     TO: opacity:1, translateY:0    DURATION:600ms EASING:power2.out
  Stagger: 150ms per card
LOOP: no. RESET: no.
```

**INTERACTION: Project Card**
```
STATE         | background | transform       | box-shadow                    | border
────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | #141414    | scale(1)        | none                          | 1px solid #2A2A2A
HOVER         | #1A1A1A    | scale(1.02)     | 0 8px 32px rgba(0,0,0,0.3)   | 1px solid #3A3A3A
MECHANISM: CSS transition 300ms cubic-bezier(0.25,0.1,0.25,1)
⚑ SPECIAL: Image shifts translateY(-4px) on card hover creating subtle parallax. "View details" gains underline.
```

---

### SECTION 4: Experience — "The Timeline Spine"

```
┌─────────────────────────────────────────────────────┐
│  [Intro: "Building at the intersection of AI..."]    │
│                                                      │
│  ──[dot]── Apr 2024 - Present                       │
│  │         AI Full Stack Developer                   │
│  │         Current role description                  │
│  │                                                   │
│  ──[dot]── Jan 2023 - Mar 2024                      │
│  │         Full Stack Developer                      │
│  │         Previous role description                 │
│  │                                                   │
│  ──[dot]── Jun 2022 - Dec 2022                      │
│  │         Frontend Developer                        │
│  │         Earlier role description                  │
│  │                                                   │
│  (placeholder timeline — 4-5 entries)                │
└─────────────────────────────────────────────────────┘
Layout: Flexbox col. Timeline line: 1px solid #2A2A2A. Max-width:800px centered.
```

**TYPOGRAPHY:**
```
  Date → "Apr 2024 - Present" | Label 500 0.75rem uppercase | Color: #666
  Role → "AI Full Stack Developer" | H2 600 1.5rem | Color: #F5F5F5
  Desc → role description | Body 400 0.875rem | Color: #999
  Timeline dot → 8px circle, border:2px solid #C8A97E, bg:#0A0A0A
  Timeline line → 1px solid #2A2A2A, position:absolute left
```

**ANIMATION:**
```
ANIMATION: Timeline Spine Reveal
Trigger: scroll-enter(top 75vh)
Library: GSAP ScrollTrigger
TIMELINE:
  t=0ms     timeline-item[n]   FROM: opacity:0, translateX:-30px
  t=200ms   timeline-item[n]   TO:   opacity:1, translateX:0      DURATION:500ms EASING:power2.out
  Stagger: 150ms per item
  Timeline line: draws from top to bottom via scaleY(0→1) synced with scroll
```

---

### SECTION 5: Beyond Code — "The Digital Sketchbook"

```
┌─────────────────────────────────────────────────────┐
│  [CTA: "Follow me" + link]                           │
│  [Sub: "My digital lab. Experiments and explorations."]│
│                                                      │
│  ←← [IMG] [IMG] [IMG] [IMG] [IMG] [IMG] →→ MARQUEE  │
│                                                      │
└─────────────────────────────────────────────────────┘
Full-bleed marquee. Padding: 64px 0.
```

**STATE MACHINE: Infinite Marquee**
```
STATE MACHINE: Digital Sketchbook Marquee
Type: Cycler (infinite)
STATES: Continuous horizontal scroll of image cards
TRANSITION:
  CSS @keyframes marquee { from { translateX(0) } to { translateX(-50%) } }
  Content duplicated for seamless loop
  Duration: 30s linear infinite
  Pause on hover: animation-play-state: paused
INTERNAL LAYOUT:
  Container: overflow:hidden, width:100vw
  Items: inline-flex, gap:24px, each ~300px wide, radius:12px
  Images: placeholder dark/moody aesthetic, 4:3 ratio
```

---

### SECTION 6: Spotlight — "The Signal Board"

```
┌─────────────────────────────────────────────────────┐
│  [Intro: "Impact beyond the code..."]                │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ Talk/Event 1 │  │ Talk/Event 2 │                 │
│  │ [title]      │  │ [title]      │                 │
│  │ [desc]       │  │ [desc]       │                 │
│  │ [link]       │  │ [link]       │                 │
│  ├──────────────┤  ├──────────────┤                 │
│  │ Talk/Event 3 │  │ Talk/Event 4 │                 │
│  ├──────────────┤  ├──────────────┤                 │
│  │ Talk/Event 5 │  │ Talk/Event 6 │                 │
│  └──────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
Layout: Grid 2-col, gap:24px. Max-width:1280px. Padding: 96px 48px.
```

**CARD STRUCTURE:**
```
  Card → bg:#141414, border:1px solid #2A2A2A, radius:12px, padding:24px
  Title → "Event Name" | H2 600 1.25rem | Color: #F5F5F5
  Desc → event description | Body 400 0.875rem | Color: #999
  Link → "View details" | Label 500 0.75rem | Color: #C8A97E | hover: #FFF
```

**Placeholder items:** Tech talks, open-source contributions, blog posts, community events.

**ANIMATION:** Same stagger reveal as Projects — scroll-enter 80vh, 150ms stagger, fade-up.

---

### SECTION 7: Connect — "The Open Channel"

```
┌─────────────────────────────────────────────────────┐
│  [Intro: "No gatekeepers — just open channels..."]   │
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────────┐            │
│  │LinkedIn│  │GitHub  │  │1:1 Chat    │            │
│  │  icon  │  │  icon  │  │ Book Now   │            │
│  └────────┘  └────────┘  └────────────┘            │
└─────────────────────────────────────────────────────┘
Layout: Flexbox row, centered, gap:24px. Max-width:800px. Padding: 96px 48px.
```

**INTERACTION: Social Card**
```
STATE         | background | color      | transform       | border
────────────────────────────────────────────────────────────────────
DEFAULT       | #141414    | #F5F5F5    | scale(1)        | 1px solid #2A2A2A
HOVER         | #1A1A1A    | #FFFFFF    | scale(1.05)     | 1px solid #3A3A3A
MECHANISM: CSS transition 250ms ease. Cards ~200px wide, radius:12px, padding:32px, text-align:center.
```

---

### SECTION 8: FAQ — "The Candid Accordion"

```
┌─────────────────────────────────────────────────────┐
│  ┌─── Q: "What tech stack do you work with?" ── ▼  │
│  │   A: answer text                                  │
│  ├─── Q: "Are you open to freelance?" ────────  ▼  │
│  │   A: answer text                                  │
│  ├─── Q: "How fast can you ship?" ────────────  ▼  │
│  │   A: answer text                                  │
│  ├─── Q: "Do you mentor juniors?" ────────────  ▼  │
│  │   A: answer text                                  │
│  └──────────────────────────────────────────────────│
└─────────────────────────────────────────────────────┘
Max-width: 800px centered. Padding: 96px 48px.
```

**STATE MACHINE: Accordion**
```
STATE MACHINE: Candid Accordion
Type: Toggle (one-at-a-time)
STATES:
  Closed: question visible, chevron ▼, answer hidden (max-height:0, overflow:hidden)
  Open: question + answer visible, chevron rotated 180deg
INITIAL: All closed
TRANSITION Closed→Open:
  Trigger: click
  Answer: max-height:0 → max-height:500px over 300ms ease-in-out
  Chevron: rotate(0) → rotate(180deg) over 200ms ease
  Other items: close simultaneously
INTERNAL LAYOUT:
  Item: border-bottom:1px solid #2A2A2A, padding:24px 0
  Question: Inter 500 1rem #F5F5F5, cursor:pointer
  Answer: Inter 400 0.875rem #999, padding-top:16px
```

---

### SECTION 9: Footer — "The Quiet Signature"

```
┌─────────────────────────────────────────────────────┐
│  "Built with ☕, curiosity, and a lot of commits."   │
│  "© 2026 Monil Jain. All rights reserved."           │
└─────────────────────────────────────────────────────┘
Border-top: 1px solid #2A2A2A. Padding: 48px. Text-align: center.
Typography: Body 400 0.875rem #666.
```

---

### GLOBAL: Custom Cursor — "The Precision Dot"

```
Custom cursor: 12px circle, border:1px solid #C8A97E, bg:transparent
Follows mouse with gsap.to() and 0.15s lerp delay → feels floaty/smooth
On hoverable elements: cursor scales to 40px, bg:rgba(200,169,126,0.1)
Implementation: div.cursor-dot + div.cursor-ring, position:fixed, pointer-events:none, z-index:9999
GSAP: gsap.set('.cursor-dot', {xPercent:-50, yPercent:-50})
      document.addEventListener('mousemove', e => gsap.to('.cursor-dot', {x:e.clientX, y:e.clientY, duration:0.15}))
```

### GLOBAL: Smooth Scroll — "The Silk Thread"

```
Lenis smooth scroll wrapper. Config: duration:1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
Integrates with GSAP ScrollTrigger via lenis.on('scroll', ScrollTrigger.update)
```

### GLOBAL: Page Loader — "The Void Awakening"

```
Full-screen #0A0A0A overlay, z-index:9999
"Monil Jain" text fades in center (opacity 0→1, 400ms)
Then overlay slides up (translateY:0 → -100%, 600ms, power2.inOut)
Reveals hero section underneath
Total duration: ~1200ms
```

---

## 4. TECHNICAL REQUIREMENTS

```
TECHNICAL REQUIREMENTS
  Stack:                Next.js 14+ (App Router), TypeScript, React 18+
  Animation:            GSAP 3.12+ (gsap, ScrollTrigger, SplitText if available)
                        Framer Motion 10+ (layout animations, AnimatePresence)
  Scroll:               Lenis (smooth scroll) + GSAP ScrollTrigger
  Animation Lifecycle:  useGSAP hook or gsap.context() scoped to component ref inside useEffect;
                        return context.revert() on cleanup. Framer Motion uses motion components.
  Scroll Trigger Setup: Register ScrollTrigger plugin globally in layout.tsx.
                        trigger:'[selector]', start:'top 80%', toggleActions:'play none none none'
                        Stagger via gsap.utils.toArray + forEach with delay index * 0.15
  Hover Implementation: CSS transitions for simple states. Pseudo-element ::after for underline wipes.
                        GSAP for complex hover (cursor scale, card parallax).
  Custom Cursor:        div.cursor-dot (12px) + div.cursor-ring (40px on hover).
                        GSAP lerp follow. Hide on mobile (media query).
  Font Loading:         Google Fonts: Inter (400,500,600,700) + JetBrains Mono (400)
                        next/font/google for optimized loading
  Image Sources:        Placeholder images via generated dark/moody aesthetic.
                        All images to be replaced later by user.
```

---

## 5. EXECUTION DIRECTIVE

*"Do not build a portfolio; build a void that speaks — where every pixel of darkness is intentional, and every flicker of gold is earned."*
