# Referência de hero: premium-minimal-hero

## Quando usar
Build a refined, luxury-minimal hero over a fullscreen background video or image: lots of breathing room, a large overlapping two-line heading in two tones, a short subtitle, and understated pill CTAs. Light or airy palette, clean sans type, restrained motion. Use this skill whenever the user wants a "premium", "luxury", "high-end", "elegant", "sophisticated", or "expensive- looking" hero — think private aviation, fine hospitality, high jewelry, or a boutique service — or asks for an overlapping/stacked two-color headline with a calm, spacious feel. Prefer this over the moody/dark cinematic skills when the desired mood is bright, quiet, and upscale rather than dramatic.

> Nota: o padrão abaixo é descrito em React + Vite + Tailwind. Em projetos
> estáticos (HTML/CSS/JS puro), traduza o conceito visual mantendo a
> estética — mesmas cores, tamanhos, transições e coreografia de animação.

# Premium Minimal Hero

Understated luxury. A full-bleed video (or image) plays clean, content is pulled
toward the optical center, and a large two-line heading overlaps itself in two
tones — the quiet trick that reads as "expensive". Motion is minimal.

## Before building
Collect: `BRAND`,
`NAV_LINKS`, a small uppercase `EYEBROW` label (e.g. "PRIVATE JETS"), a two-part
`HEADLINE` where the two words stack and overlap (e.g. "Premium." /
"Accessible."), a one-line `SUBTITLE`, and two CTA labels. Palette: light and
airy — near-white or soft-gray surfaces, a deep neutral for the dark heading
tone (e.g. `#202A36`), muted gray for secondary text. Font: one clean sans
(Inter). No serif needed.

## Stack
React + Vite + TypeScript, Tailwind, `lucide-react` (`Menu`, `X`).
Single `App.tsx`, `useState` for the mobile menu.

## Layout
`min-h-screen bg-gray-50` outer; hero `relative h-screen overflow-hidden`.
1. **Background** (`z-0`): `<video autoPlay muted loop playsInline
   className="absolute inset-0 h-full w-full object-cover">` (or a `bg-cover`
   image). **No dark overlay** — keep it bright and raw.
2. **Navbar** (`z-10`, `max-w-7xl mx-auto px-8 py-6`, flex justify-between):
   brand left (`text-2xl font-semibold`, dark ink); centered/`md:flex` links in
   muted gray with `hover` to ink; a compact hamburger below `md` with a
   white/95 `backdrop-blur` dropdown.
3. **Hero content** (`z-10`, centered, often pulled up e.g. `-mt-40` to sit
   above optical center): the `EYEBROW` (`text-sm font-semibold tracking-wider`,
   gray), then the **overlapping heading**, then the `SUBTITLE`
   (`text-lg md:text-xl` muted), then two pill CTAs.

## The overlapping two-tone heading (signature)
Two stacked lines, same huge size, second pulled up to kiss the first, in two
colors:
```tsx
<h1 className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter">
  <span className="block text-gray-500">Premium.</span>
  <span className="block" style={{ color: "#202A36", marginTop: "-12px" }}>Accessible.</span>
</h1>
```
The subtle negative margin is what creates the refined overlap — keep it small.

## CTAs
Two `rounded-full px-4 py-2` pills side by side (`gap-4`): a soft neutral one
(`bg-gray-300 text-gray-800 hover:bg-gray-400`) and a solid dark one
(`bg-[#202A36] text-white hover:bg-[#1a2229]`). All transitions
`transition-colors`.

## Motion (restrained)
```css
@keyframes fade-rise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
```
Heading `fade-rise` (base), subtitle `+0.2s`, CTAs `+0.4s`, all `0.8s ease-out
both`. Nothing bouncy, nothing looping — the calm is the brand.

## Responsive
Mobile-first. Links + desktop CTA at `md:`; hamburger below. Heading scales
`text-6xl → md:text-7xl → lg:text-8xl`. Reduce the pull-up on small screens so
content stays clear of the navbar.

## Quality checklist
- [ ] Background plays clean, no dark overlay dimming it.
- [ ] Heading overlaps in two tones with a small negative margin.
- [ ] Generous whitespace; content sits near optical center.
- [ ] Motion is minimal (fade-rise only), palette light/airy.
- [ ] Hamburger works below `md`; check 375 / 768 / 1280px.
