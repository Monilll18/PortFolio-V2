# Site DNA — Sujit Pradhan (https://www.sujitpradhan.com/)

AUDIT_MODE: high-fidelity

---

## 1.1 — PAGE ARCHITECTURE

Total viewport sections: 9
Section-identification strategy: Top-level divs under framework root (Framer/React)

```
╔══════════════════════════════════════════════════════╗
║  SECTION 1: NAVBAR               HEIGHT: ~72px      ║
║  BG: transparent → solid #0A0A0A on scroll           ║
║  LAYOUT: full-bleed, max-w-1280px centered           ║
╠══════════════════════════════════════════════════════╣
║  SECTION 2: HERO                 HEIGHT: 100vh       ║
║  BG: solid #0A0A0A w/ subtle radial glow             ║
║  LAYOUT: two-column asymmetric (55% text / 45% img)  ║
╠══════════════════════════════════════════════════════╣
║  SECTION 3: PROJECTS             HEIGHT: auto ~300vh ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: horizontal scroll carousel + grid cards     ║
╠══════════════════════════════════════════════════════╣
║  SECTION 4: EXPERIENCE           HEIGHT: auto ~200vh ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: vertical timeline, alternating cards         ║
╠══════════════════════════════════════════════════════╣
║  SECTION 5: BEYOND PIXELS (IG)   HEIGHT: auto ~80vh  ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: marquee/carousel of IG-style images          ║
╠══════════════════════════════════════════════════════╣
║  SECTION 6: SPOTLIGHT            HEIGHT: auto ~250vh ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: 2-col grid of speaker/podcast cards          ║
╠══════════════════════════════════════════════════════╣
║  SECTION 7: CONNECT              HEIGHT: auto ~60vh  ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: centered CTA w/ social links                 ║
╠══════════════════════════════════════════════════════╣
║  SECTION 8: FAQ                  HEIGHT: auto ~80vh  ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: vertical accordion stack                     ║
╠══════════════════════════════════════════════════════╣
║  SECTION 9: FOOTER               HEIGHT: ~120px      ║
║  BG: #0A0A0A                                         ║
║  LAYOUT: centered text, nav links                     ║
╚══════════════════════════════════════════════════════╝
```

OVERLAPPING sections: Navbar overlaps Hero (fixed/sticky position). Experience timeline cards may use negative margins for overlap effect.

---

## 1.2 — DESIGN TOKENS

```
PALETTE:
  Background "Void Black":    #0A0A0A / rgb(10,10,10)       → page bg, section bg
  Surface "Card Dark":        #141414 / rgb(20,20,20)       → card backgrounds
  Surface Elevated "Slate":   #1A1A1A / rgb(26,26,26)       → hover cards, elevated surfaces
  Border "Whisper":           #2A2A2A / rgb(42,42,42)       → card borders, dividers
  Text Primary "Chalk":       #F5F5F5 / rgb(245,245,245)    → headings, primary text
  Text Secondary "Ash":       #999999 / rgb(153,153,153)    → body text, descriptions
  Text Tertiary "Smoke":      #666666 / rgb(102,102,102)    → labels, dates
  Accent Primary "Warm Gold": #C8A97E / rgb(200,169,126)    → accent lines, subtle highlights
  Accent Glow "Amber Soft":   rgba(200,169,126,0.15)        → radial glows behind hero
  Link Hover "White":         #FFFFFF / rgb(255,255,255)    → link hover state
  CTA "Soft White":           #F0F0F0 / rgb(240,240,240)    → primary button bg

TYPOGRAPHY SCALE:
  Role       | Font Family           | Weight | Size              | Tracking  | Line-Height | Style
  ─────────────────────────────────────────────────────────────────────────────────────────────
  Display    | Inter / system-ui     | 700    | clamp(2.5rem,5vw,4rem) | -0.02em | 1.1        | normal
  Heading 1  | Inter / system-ui     | 600    | 2.25rem           | -0.015em  | 1.2         | normal
  Heading 2  | Inter / system-ui     | 600    | 1.5rem            | -0.01em   | 1.3         | normal
  Body       | Inter / system-ui     | 400    | 1rem              | 0         | 1.6         | normal
  Label      | Inter / system-ui     | 500    | 0.75rem           | 0.05em    | 1.4         | uppercase
  Mono/Data  | JetBrains Mono        | 400    | 0.875rem          | 0         | 1.5         | normal
  ⚑ DRAMA NOTES: The drama is the contrast between massive 700-weight Display type for the name
  ("Sujit Pradhan" ~4rem) against delicate 400-weight #999 body text at 1rem. The ratio is ~4:1.
  This creates a "whisper vs shout" effect. The warm gold accent color appearing sparingly against
  the monochrome palette IS the site's emotional heartbeat. Losing the gold = losing the warmth.

SPACING GRID: Base unit = 8px. Scale: 4, 8, 16, 24, 32, 48, 64, 80, 96, 120, 160
BORDER RADIUS: sm: 8px — used on small buttons, tags
               md: 12px — used on cards
               lg: 16px — used on project cards
               xl: 24px — used on featured elements
               pill: 999px — used on CTAs, badges
SHADOW SYSTEM: none: 0 — default dark theme (no visible shadows, uses border instead)
               subtle: 0 4px 24px rgba(0,0,0,0.4) — card hover
               glow: 0 0 60px rgba(200,169,126,0.08) — accent glow
TEXTURE: None visible. Pure flat dark surfaces with border separation.
```

---

## 1.3 — SECTION BLUEPRINTS

### SECTION 1: NAVBAR

Height: 72px | BG: transparent → #0A0A0A/90 + backdrop-blur(12px) on scroll | Padding: 0 24px
Content max-width: 1280px centered

**INTERNAL ASCII WIREFRAME:**

```
┌─────────────────────────────────────────────────────┐
│ [Logo: "Sujit Pradhan"] ─── | ── [Home] [Projects] │
│                                  [Experience]        │
│                                  [Beyond Pixels]     │
│                                  [Spotlight]          │
│                                  [Connect] [Resume]   │
└─────────────────────────────────────────────────────┘
Layout: Flexbox row, justify-between, align-center
```

**TYPOGRAPHY + CONTENT MAP:**

```
  Logo → "Sujit Pradhan" | Style: Body 600wt | Color: Chalk
  Nav links → "Home" "Projects" "Experience" "Beyond Pixels" "Spotlight" "Connect" | Style: Body 400wt | Color: Ash → Chalk on hover
  Resume → "Resume" | Style: Body 500wt | Color: Chalk | Type: ghost button w/ border
```

### SECTION 2: HERO

Height: 100vh | BG: #0A0A0A + radial-gradient(ellipse at 60% 50%, rgba(200,169,126,0.08) 0%, transparent 60%) | Padding: 120px 48px
Content max-width: 1280px centered

**INTERNAL ASCII WIREFRAME:**

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌────────────────────┐  ┌──────────────────────┐   │
│  │  LEFT (55%)        │  │  RIGHT (45%)         │   │
│  │                    │  │                      │   │
│  │  [Intro paragraph  │  │  [Hero visual/       │   │
│  │   small #999]      │  │   photo or Lottie    │   │
│  │                    │  │   animation]         │   │
│  │  [NDA notice box]  │  │                      │   │
│  │                    │  │                      │   │
│  └────────────────────┘  └──────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
Layout: CSS Grid: 55fr 45fr, gap 48px, align-center
```

**TYPOGRAPHY + CONTENT MAP:**

```
  Intro → "Designing for the 'Next Billion'..." | Style: Body | Color: Ash
  Tagline → "Translating ambiguous, high-stakes problems into scalable solutions." | Style: H2 600wt | Color: Chalk
  NDA box → "For NDA compliance..." | Style: Label + Body sm | Color: Smoke | BG: Surface, border: Whisper, radius: 12px
```

### SECTION 3: PROJECTS

Height: auto | BG: #0A0A0A | Padding: 96px 48px
Content max-width: 1280px

**INTERNAL ASCII WIREFRAME:**

```
┌─────────────────────────────────────────────────────┐
│  [Section heading? implied via cards]                │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ PROJECT  │  │ PROJECT  │  │ PROJECT  │  ...      │
│  │ CARD     │  │ CARD     │  │ CARD     │          │
│  │          │  │          │  │          │          │
│  │ [image]  │  │ [image]  │  │ [image]  │          │
│  │ [title]  │  │ [title]  │  │ [title]  │          │
│  │ [desc]   │  │ [desc]   │  │ [desc]   │          │
│  │ [CTA]    │  │ [CTA]    │  │ [CTA]    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  (horizontal scroll OR 2-col grid for 8 projects)    │
└─────────────────────────────────────────────────────┘
Layout: Grid 2-col or horizontal scroll carousel
Gap: 24px
```

**TYPOGRAPHY + CONTENT MAP:**

```
  Card title → "Lumi AI Camera" / "Prism" / etc | Style: H2 600wt | Color: Chalk
  Card desc → project description | Style: Body sm | Color: Ash
  Card CTA → "View details" | Style: Label | Color: Warm Gold | Type: text link
  Card BG → Surface #141414 | Border: 1px solid #2A2A2A | Radius: 16px
```

**Projects (8 total):**
1. Lumi AI Camera — multimodal AI camera
2. Prism — Edge Add-ons Store redesign
3. Takelessons — education marketplace
4. Deal Flux — Bing Shopping price viz
5. Amazon Brand Store — self-service store builder
6. ONN Bikes App — bike rental UX
7. Illustrations - Behance — Wanderlust travel art
8. (Duplicate Takelessons — likely carousel loop)

### SECTION 4: EXPERIENCE

Height: auto | BG: #0A0A0A | Padding: 96px 48px

**INTERNAL ASCII WIREFRAME:**

```
┌─────────────────────────────────────────────────────┐
│  [Intro text: "Designing for the 'Next Billion'..."] │
│                                                      │
│  TIMELINE (vertical, left-aligned dates)             │
│                                                      │
│  [Apr 2022-Aug 2025]──┐                              │
│                       ├── Product Designer II        │
│                       │   Microsoft description      │
│  [Sep 2025-Present]──┤                               │
│                       ├── UX Designer III             │
│                       │   Google description          │
│  [May 2018-Mar 2022]─┤                               │
│                       ├── UX Designer                 │
│                       │   Amazon description          │
│  [Feb 2017-Apr 2018]─┤                               │
│                       ├── UI/UX Designer              │
│                       │   ONN Bikes description       │
│  [Sep-Nov 2016]──────┤                               │
│                       ├── Associate Developer         │
│                       │   SAP description             │
└─────────────────────────────────────────────────────┘
Layout: Flexbox column. Timeline uses border-left or pseudo-element line.
```

**TYPOGRAPHY + CONTENT MAP:**

```
  Date range → "Apr 2022 - Aug 2025" | Style: Label | Color: Smoke
  Role title → "Product Designer II" | Style: H2 600wt | Color: Chalk
  Description → role desc | Style: Body sm | Color: Ash
  Timeline line → 1px solid #2A2A2A vertical connector
  Timeline dot → 8px circle, border: 2px solid Warm Gold
```

### SECTION 5: BEYOND PIXELS (Instagram)

Height: auto ~80vh | BG: #0A0A0A | Padding: 64px 0

```
┌─────────────────────────────────────────────────────┐
│  [CTA: "Follow me" with IG link]                     │
│  [Subtitle: "My digital sketchbook..."]              │
│                                                      │
│  ←← [IMG] [IMG] [IMG] [IMG] [IMG] →→ MARQUEE        │
│                                                      │
└─────────────────────────────────────────────────────┘
Layout: Marquee/infinite scroll of images, full-bleed
```

### SECTION 6: SPOTLIGHT (Speaking/Podcasts)

Height: auto | BG: #0A0A0A | Padding: 96px 48px

```
┌─────────────────────────────────────────────────────┐
│  [Intro: "Impact goes beyond the pixel..."]          │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ UX meetup    │  │ Google       │                 │
│  │ Hyderabad    │  │ DevFest      │                 │
│  │ [desc]       │  │ [desc]       │                 │
│  │ [View link]  │  │ [View link]  │                 │
│  ├──────────────┤  ├──────────────┤                 │
│  │ NID          │  │ NIT Rourkela │                 │
│  │ Bengaluru    │  │ Design       │                 │
│  ├──────────────┤  ├──────────────┤                 │
│  │ Designing    │  │ Top 1%       │                 │
│  │ with AI      │  │ ADPList      │                 │
│  ├──────────────┤  ├──────────────┤                 │
│  │ Cracking UX  │  │ Engineer to  │                 │
│  │ Career       │  │ Designer     │                 │
│  └──────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
Layout: Grid 2-col, gap 24px
```

### SECTION 7: CONNECT

Height: auto ~60vh | BG: #0A0A0A | Padding: 96px 48px

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  [Intro text: "No gatekeepers here..."]              │
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────────┐            │
│  │LinkedIn│  │Insta   │  │1:1 Mentor  │            │
│  │  link  │  │  link  │  │160+ sess   │            │
│  └────────┘  └────────┘  └────────────┘            │
│                                                      │
└─────────────────────────────────────────────────────┘
Layout: Flexbox row, centered, gap 24px
```

### SECTION 8: FAQ

Height: auto | BG: #0A0A0A | Padding: 96px 48px

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌─── Q: "My portfolio is messy..." ──────────── ▼ │
│  │   A: "Not at all. In fact..."                    │
│  ├─── Q: "Switching from Engineering?" ────────  ▼ │
│  │   A: "100%. I made that exact jump..."           │
│  ├─── Q: "What is your feedback style?" ───────  ▼ │
│  │   A: "I'm kind, but I'm not here..."            │
│  ├─── Q: "How can I make sure..." ─────────────  ▼ │
│  │   A: "Come with a specific goal..."              │
│  └──────────────────────────────────────────────────│
│                                                      │
└─────────────────────────────────────────────────────┘
Layout: Flexbox col, max-w-800px centered. Accordion items.
```

### SECTION 9: FOOTER

Height: ~120px | BG: #0A0A0A | Border-top: 1px solid #2A2A2A

```
┌─────────────────────────────────────────────────────┐
│  "Designed with ❤️, Logic, and a lot of Chai."       │
│  "Copyright ©2026 Sujit Kumar Pradhan."              │
│  "All rights reserved."                              │
└─────────────────────────────────────────────────────┘
Layout: Centered text stack
```

---

## 1.3b — COMPOSITION MAPS

### COMPOSITION MAP: Hero Section

Element count: 4 distinct visual objects

```
CENTER-LEFT: Intro text block
             Position: left 55% of viewport, vertically centered
             Contains: paragraph text + NDA notice card

CENTER-RIGHT: Portrait photo / visual element
              Size: ~45% width, full section height bleed
              Position: right-aligned, may extend beyond container
              Treatment: B&W or desaturated photo with subtle warm overlay
              Z-index: behind any floating UI elements

AMBIENT:   Radial gradient glow behind portrait
           Gradient: radial-gradient(ellipse at 65% 50%, rgba(200,169,126,0.08) 0%, transparent 55%)
           Creates subtle warm halo around right side

AMBIENT2:  Possible particle/line animation (subtle data visualization lines)
           Thin lines with dots, color: rgba(200,169,126,0.2)
           Suggests "data flowing" or "connections" theme
```

---

## 1.4 — ANIMATION TIMELINES

```
ANIMATION: Hero Text Entrance
Section: 2 (Hero)
Trigger: page-load
Library: CSS / Framer Motion (inferred)
TIMELINE:
  t=0ms     intro-text     FROM: opacity:0, transform:translateY(20px)
  t=300ms   intro-text     TO:   opacity:1, transform:translateY(0)      DURATION:600ms  EASING:cubic-bezier(0.25,0.1,0.25,1)
  t=500ms   tagline        TO:   opacity:1, transform:translateY(0)      DURATION:600ms  EASING:cubic-bezier(0.25,0.1,0.25,1)
  t=700ms   nda-box        TO:   opacity:1, transform:translateY(0)      DURATION:500ms  EASING:ease-out
PROPERTIES ANIMATED: opacity, transform
LOOP: no
RESET: no

ANIMATION: Project Card Scroll Reveal
Section: 3 (Projects)
Trigger: scroll-enter(top 80vh)
Library: CSS / Intersection Observer
TIMELINE:
  t=0ms     card[n]        FROM: opacity:0, transform:translateY(30px)
  t=200ms   card[n]        TO:   opacity:1, transform:translateY(0)      DURATION:500ms  EASING:ease-out
  Stagger: 100ms between cards
PROPERTIES ANIMATED: opacity, transform
LOOP: no
RESET: no

ANIMATION: Experience Timeline Reveal
Section: 4 (Experience)
Trigger: scroll-enter(top 75vh)
Library: CSS
TIMELINE:
  t=0ms     timeline-item[n]  FROM: opacity:0, transform:translateX(-20px)
  t=200ms   timeline-item[n]  TO:   opacity:1, transform:translateX(0)   DURATION:500ms  EASING:ease-out
  Stagger: 150ms per item
PROPERTIES ANIMATED: opacity, transform
LOOP: no
RESET: no

ANIMATION: Instagram Marquee
Section: 5 (Beyond Pixels)
Trigger: auto-interval(continuous)
Library: CSS @keyframes
TIMELINE:
  Continuous translateX from 0 to -100% of total width
  DURATION: ~30s  EASING: linear
  Seamless loop via duplicated content
LOOP: yes, infinite
RESET: no
```

---

## 1.5 — MICRO-INTERACTIONS

```
INTERACTION: Nav Link
STATE         | background    | color      | transform    | box-shadow | other
──────────────────────────────────────────────────────────────────────────
DEFAULT       | transparent   | #999999    | none         | none       | –
HOVER         | transparent   | #FFFFFF    | none         | none       | –
MECHANISM: CSS transition
DURATION: 200ms  EASING: ease
⚑ SPECIAL BEHAVIOR: Simple color transition. Possibly underline via ::after pseudo width 0→100%.

INTERACTION: Project Card
STATE         | background    | color      | transform       | box-shadow                  | other
──────────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | #141414       | –          | scale(1)        | none                        | border: 1px solid #2A2A2A
HOVER         | #1A1A1A       | –          | scale(1.02)     | 0 8px 32px rgba(0,0,0,0.3) | border: 1px solid #3A3A3A
MECHANISM: CSS transition on all properties
DURATION: 300ms  EASING: cubic-bezier(0.25,0.1,0.25,1)
⚑ SPECIAL BEHAVIOR: Card image may have slight parallax shift on hover. The "View details" text link may get underline on card hover.

INTERACTION: CTA / View Details Link
STATE         | background    | color      | transform    | box-shadow | other
──────────────────────────────────────────────────────────────────────────
DEFAULT       | transparent   | #C8A97E    | none         | none       | –
HOVER         | transparent   | #FFFFFF    | none         | none       | underline
MECHANISM: CSS transition
DURATION: 200ms  EASING: ease

INTERACTION: FAQ Accordion Item
STATE         | background    | color      | transform    | box-shadow | other
──────────────────────────────────────────────────────────────────────────
DEFAULT       | #141414       | #F5F5F5    | none         | none       | border-bottom: 1px solid #2A2A2A
OPEN          | #1A1A1A       | #F5F5F5    | none         | none       | answer slides down
MECHANISM: CSS transition + max-height toggle
DURATION: 300ms  EASING: ease-in-out
⚑ SPECIAL BEHAVIOR: Chevron rotates 180deg on open. Answer area uses max-height:0 → max-height:500px with overflow:hidden.

INTERACTION: Social Link Cards (Connect section)
STATE         | background    | color      | transform       | box-shadow                    | other
──────────────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | #141414       | #F5F5F5    | scale(1)        | none                          | border: 1px solid #2A2A2A
HOVER         | #1A1A1A       | #FFFFFF    | scale(1.03)     | 0 4px 20px rgba(0,0,0,0.3)   | border: 1px solid #3A3A3A
MECHANISM: CSS transition
DURATION: 250ms  EASING: ease
```

---

## 1.6 — STATE MACHINES

```
STATE MACHINE: Project Card Carousel (if horizontal scroll)
Location: Section 3
Type: Cycler / Horizontal Scroll
STATES:
  Continuous scroll through 8 project cards
  Cards duplicated for seamless loop
INITIAL STATE: First 2-3 cards visible
TRANSITION:
  Trigger: user scroll / drag / auto-interval
  Cards translate horizontally
  Snap-to-card behavior likely via scroll-snap-type: x mandatory
LOOP: wraps around via duplication
INTERNAL LAYOUT:
  Container: overflow-x: auto, scroll-snap-type: x mandatory
  Each card: min-width ~400px, scroll-snap-align: start

STATE MACHINE: FAQ Accordion
Location: Section 8
Type: Toggle (one-at-a-time)
STATES:
  State A (closed): Only question visible, chevron pointing down
  State B (open): Question + answer visible, chevron rotated 180deg
INITIAL STATE: All closed
TRANSITION A→B:
  Trigger: click on question
  Answer: max-height 0→auto over 300ms ease-in-out
  Chevron: rotate(0deg) → rotate(180deg) over 200ms
  Other open items: close (B→A)
TRANSITION B→A:
  Trigger: click same question OR click different question
  Reverse of above
LOOP: user-controlled

STATE MACHINE: Instagram Marquee
Location: Section 5
Type: Cycler (infinite)
STATES:
  Continuous horizontal scroll of image items
INITIAL STATE: Start position
TRANSITION:
  Trigger: auto, continuous
  translateX: 0 → -50% (duplicated content for seamless loop)
  Duration: ~30s, linear
LOOP: infinite
```

---

## 1.7 — SCROLL CHOREOGRAPHY MAP

```
Scroll %  │ Viewport Position    │ Event / Animation Trigger
─────────────────────────────────────────────────────────────────────
0%        │ Page load            │ Hero text fade-in stagger (300ms intervals)
~5%       │ Hero scrolling       │ Navbar bg transitions transparent → solid + blur
~15%      │ Projects enter vh    │ Project cards fade-up with 100ms stagger
~35%      │ Experience enter vh  │ Timeline items slide-in from left, 150ms stagger
~50%      │ Beyond Pixels enter  │ Marquee auto-starts (always running)
~60%      │ Spotlight enter vh   │ Speaker cards fade-up with stagger
~75%      │ Connect enter vh     │ Social links scale-up entrance
~85%      │ FAQ enter vh         │ Accordion items fade-in
~95%      │ Footer enter vh      │ Footer text fade-in
─────────────────────────────────────────────────────────────────────
SCROLL BEHAVIORS:
  Parallax elements: Hero portrait image slight parallax (0.8x scroll speed)
  Sticky elements: Navbar — sticky at top, always visible
  Nav state change: ~72px scroll → navbar gets bg #0A0A0A/90 + backdrop-blur(12px)
```

---

## 1.8 — TECHNICAL STACK

```
  Framework: React (Framer / Next.js — confidence: high, based on Framer patterns in content structure)
  Animation: Framer Motion (inferred from data patterns) + CSS transitions
  Scroll:    Native scroll + Intersection Observer for reveals
  UI Lib:    Custom CSS / Framer's built-in styling
  Other:     Google Fonts (Inter), possible Lottie for hero visual
```

---

## 1.9 — MOTION PHILOSOPHY + COPY VOICE

```
MOTION PHILOSOPHY:
The motion is deliberate and restrained — functional minimalism. Animations serve
to guide attention, not to entertain. Fade-up reveals with subtle translateY create
a "content rising from depth" metaphor consistent with the dark void background.
Stagger timing creates hierarchy: the eye reads in the order the designer intended.
The marquee in the Instagram section is the only "playful" motion — everything else
is clinical and purposeful. If all animations were removed, the site would still work
but would feel static and lifeless — the animations add the "breathing" quality that
makes the dark theme feel alive rather than dead.

COPY VOICE PATTERN:
  Tone:          Confident, philosophical, first-person, warm but authoritative
  Sentence form: Mix of fragments and full sentences. Uses single-quoted emphasis for concepts.
  Key device:    Contrast/paradox — juxtaposes technical with emotional ("logic meets emotion",
                 "maker to director", "friction from systems that shape our lives")
  Example pattern: "Designing for the 'Next Billion' and the 'Next Big Thing.'" — pairs aspirational
                   scale with insider shorthand. Uses rhetorical framing: states the problem,
                   then positions self as the solver.
```
