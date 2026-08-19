# Referência de hero: product-panels-hero

## Quando usar
Build a commercial / e-commerce hero: a full-viewport background image with an oversized product shot bleeding off the edges, floating product cards, stat overlays (ratings, follower counts), and a bottom strip of panels (feature card carousel, social proof, CTA). Bright, playful, conversion-oriented, with word-pop entrance animations. Use this skill whenever the user is selling a physical product — a store, shop, supplement, gadget, pet brand, catalogue — or asks for a hero with product cards, price tags, ratings, "add to cart" energy, or a landing page that looks like a real storefront. Prefer this over the video-hero skills whenever there's a product to showcase.

> Nota: o padrão abaixo é descrito em React + Vite + Tailwind. Em projetos
> estáticos (HTML/CSS/JS puro), traduza o conceito visual mantendo a
> estética — mesmas cores, tamanhos, transições e coreografia de animação.

# Product Panels Hero

A storefront hero. A hero image sets the mood, a big product shot anchors it,
small cards and stat badges add proof, and a bottom panel grid drives action.
`h-screen`, no scroll.

## Before building
Collect: `BRAND`,
`NAV_LINKS`, `HEADLINE` (3–5 words, split across lines, some words dimmed),
`BG_IMAGE`, one or more `PRODUCT_IMAGE`s, price/rating/stat values, and CTA
labels. Pick a bright palette (mint `#EFFDF0` + dark green `#1a3d1a` + orange
accent, or clean white + one accent). Fonts: a friendly sans (Inter / DM Sans)
+ optionally a serif display (DM Serif Display) for the headline.

## Stack
React + Vite + TypeScript, Tailwind, `lucide-react` (`Search`, `ShoppingBag`/
`ShoppingCart`, `Star`, `ArrowUpRight`, `ArrowRight`, `Play`, `Plus`,
`Menu`, `X`). Single `App.tsx`, `useState` for menu + any carousel.

## Layout (desktop `lg+`)
`h-screen flex flex-col overflow-hidden`.
1. **Header** (`shrink-0`, `z-30`): logo left; centered nav links (`hidden
   md:flex`); right cluster of circular icon buttons with small badge counts
   (`absolute -top-1 -right-1`, orange, white number) + round avatar.
2. **Hero body** (`flex-1 relative`): a serif/display `HEADLINE` centered near
   the top, each word an `inline-block` with a staggered `word-pop`. Absolutely
   positioned **product cards** (`top-[50px] left-12` / `right-12`, widths via
   `clamp()`) each with rounded image, a corner arrow button, and a
   title/price. Oversized **product shot** bleeding off the bottom/side
   (`clamp()` width, negative offsets).
3. **Bottom panels** (`z-10`): a `grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr]`.
   - Panel A: headline + underlined text link + decorative image.
   - Panel B: an auto-rotating feature card (cycle every ~3500ms; active card
     `opacity-100 translate-y-0`, others `opacity-0 translate-y-4 absolute`;
     progress dots at the bottom). Icons in colored round chips.
   - Panel C: dark panel with a product thumb + a big stat ("+14K") + label.

Below `lg`, swap the absolute product cards for a simple stacked layout (title
+ subtitle + CTA, two cards side by side, a stats row, then the images).

## Signature animations
```css
@keyframes wordReveal { from{opacity:0;transform:translateY(100%);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes wordPop { 0%{opacity:0;transform:translateY(60px) scale(0.7) rotate(-4deg) blur(8px)} 100%{opacity:1;transform:translateY(0) scale(1) rotate(0) blur(0)} }
@keyframes photoReveal { from{opacity:0;transform:translateY(80px) scale(1.02)} to{opacity:1;transform:translateY(0) scale(1)} }
```
Each headline word wraps in an `overflow-hidden` box; the inner span runs
`wordReveal`/`wordPop`. Stagger with `.delay-100 … .delay-1200` classes.
Order: header fades in → heading words pop (200–600ms) → side cards slide in
(600–700ms) → bottom photos `photoReveal` (center first) → stat overlays pop
(1000–1200ms). Easing `cubic-bezier(0.16,1,0.3,1)`, `fill-mode: both`.

## Responsive
Use show/hide (`hidden lg:flex`) for the three layouts, not just CSS media
queries. `clamp()` everywhere for fluid type and spacing. Product shot bleeds
harder on mobile (`w-[180%]`, negative bottom margin).

## Quality checklist
- [ ] `h-screen`, no page scroll.
- [ ] Product shot is oversized and bleeds off an edge.
- [ ] Cards + stat overlays have real values (price, rating, count).
- [ ] Headline words pop in staggered; photos reveal upward.
- [ ] Distinct mobile / tablet / desktop layouts, all filled.
