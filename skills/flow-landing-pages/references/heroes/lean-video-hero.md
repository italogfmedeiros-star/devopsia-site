# Referência de hero: lean-video-hero

## Quando usar
Build a clean, minimal single-section landing hero with a fullscreen looping background video and lightweight UI — a slim navbar with a mobile menu, staggered fade-up hero text, and one or two CTAs. No glass, no ornament, no heavy effects. Use this skill whenever the user wants a "lean", "clean", "simple", "minimal", or "no-frills" video hero, a straightforward SaaS or studio landing header, or says something like "just a nice hero with a video behind it" — even if they don't say the word "lean". Prefer this over the more decorated video-hero skills when the brief emphasizes simplicity and fast load.

> Nota: o padrão abaixo é descrito em React + Vite + Tailwind. Em projetos
> estáticos (HTML/CSS/JS puro), traduza o conceito visual mantendo a
> estética — mesmas cores, tamanhos, transições e coreografia de animação.

# Lean Video Hero

A minimal, production-clean hero: one fullscreen video, a slim navbar, and
crisp staggered text. The restraint is the point — nothing competes with the
video and the headline.

## Before building
Collect the slots below; if the user didn't give the
video, ask for one (it is the whole background) and invent tasteful defaults
for the rest.

| Slot | Example |
|------|---------|
| `BRAND` | "Foldcraft", "flowpath" |
| `NAV_LINKS` | Home, Projects, Studio, Reach Us |
| `BADGE` | "Brand & Visual Storytelling" |
| `HEADLINE` | "Shaping visual narratives, one pixel at a time." (allow `<br/>`) |
| `SUBTEXT` | one sentence |
| `PRIMARY_CTA` (+ optional `SECONDARY_CTA`) | "Explore Work" |
| `VIDEO_URL` | fullscreen loop |
| `FONT` | one clean sans: Geist, Inter, or Helvetica Now Text |

## Stack
React + Vite + TypeScript, Tailwind CSS, `lucide-react` (`ArrowRight`, `Menu`,
`X`). Single `App.tsx`, `useState` for the mobile menu. No routing.

## Layout
Root: `relative h-screen w-full overflow-hidden bg-black font-<sans>`.

1. **Video** (behind everything): `<video autoPlay muted loop playsInline
   className="absolute inset-0 h-full w-full object-cover" src={VIDEO_URL} />`.
   Optionally `object-[70%_center]` to bias the focal point. Add at most a
   `bg-black/10` overlay — no more.
2. **Navbar** (`z-30`, `px-6 py-5 md:px-12 lg:px-16`, flex justify-between):
   brand left (`text-lg sm:text-xl font-semibold tracking-tight text-white`)
   with desktop links (`hidden md:flex`, `text-sm text-white/80 hover:text-white`);
   right = a solid white pill CTA on desktop
   (`rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform`)
   and a hamburger below `md`.
3. **Hero content** (`z-10`, fills remaining height): a `flex flex-col
   justify-between` block. Top: `BADGE` then the `HEADLINE`
   (`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1]
   tracking-tight text-white`, `max-w-3xl`). Bottom: `SUBTEXT`
   (`text-white/60 max-w-sm sm:max-w-lg`) then the CTA row.

## Mobile menu
Full-screen overlay `absolute inset-x-0 top-0`, `bg-black/98 backdrop-blur-xl`,
toggling `h-screen opacity-100` ↔ `h-0 opacity-0 pointer-events-none` with
`duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`. Links `text-3xl font-medium
text-white/90`; every link and the CTA call `setMenuOpen(false)`. Animate the
hamburger↔X with rotate/opacity (`duration-300`).

## Animation (CSS only — this is what keeps it lean)
```css
@keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
```
Apply staggered on each hero element via arbitrary values, e.g.
`animate-[fadeSlideUp_0.8s_ease_0.2s_both]` (badge `0.2s`, heading `0.4s`,
subtext `0.7s`, CTA `0.9s`). Do **not** add framer-motion; the whole appeal is
low-dependency.

## Responsive
Mobile-first, breakpoints `sm/md/lg`. Desktop links + CTA at `md:`, hamburger
below. Headline scales through the responsive prefixes. CTA row uses
`flex-wrap`.

## Quality checklist
- [ ] Video has `autoPlay muted loop playsInline` + `object-cover`.
- [ ] Chosen sans applies globally (font `<link>` in `index.html`).
- [ ] No liquid-glass, no serif display, no framer-motion — kept lean.
- [ ] Overlay is at most `bg-black/10`.
- [ ] Hamburger works below `md`; links close the menu.
- [ ] All slots filled; check 375 / 768 / 1280px.
