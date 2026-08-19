# Referência de hero: oversized-type-hero

## Quando usar
Build a typography-first landing hero where a giant, viewport-scaled display word (usually the brand name) is the centerpiece, with words that pull up into place and body copy that reveals character-by-character on scroll. Editorial, moody, often with a warm cream palette. Use this skill whenever the user wants the TYPE to be the hero — an enormous headline, a "big wordmark" layout, a magazine/editorial feel, or asks for oversized display text, scroll-reveal text, or a brand name blown up across the screen. Prefer this when the brief is about statement typography rather than imagery or glass.

> Nota: o padrão abaixo é descrito em React + Vite + Tailwind. Em projetos
> estáticos (HTML/CSS/JS puro), traduza o conceito visual mantendo a
> estética — mesmas cores, tamanhos, transições e coreografia de animação.

# Oversized Type Hero

Here the word *is* the design. A brand name is set at 20vw+, pinned to the
bottom of the viewport, with a small support column beside it. Optional extra
sections (About / Features) reuse the same reveal animations.

## Before building
Collect: `BRAND` (the giant
word), a short `SUBTEXT`, a `PRIMARY_CTA`, an optional background `VIDEO_URL` or
solid dark bg, and any extra section copy. Default palette: black bg + warm
cream text `#E1E0CC` (Tailwind `primary: #DEDBC8`). Fonts: Almarai (body) +
Instrument Serif italic (accent), or Inter + a serif.

## Stack
React + Vite + TypeScript, Tailwind, `framer-motion`, `lucide-react`. Single
`App.tsx` (or a section per file).

## The giant heading
Bottom-aligned 12-column grid: left 8 cols = the word, right 4 cols = subtext +
CTA. The word uses `WordsPullUp`:

```tsx
import { motion, useInView } from "framer-motion";
function WordsPullUp({ text, className = "", showAsterisk = false }:
  { text: string; className?: string; showAsterisk?: boolean }) {
  const words = text.split(" ");
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="inline-flex flex-wrap">
      {words.map((w, i) => (
        <motion.span key={i} className={className} style={{ display: "inline-block", marginRight: "0.15em" }}
          initial={{ y: 20, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
          {i === words.length - 1 && showAsterisk ? (
            <span className="relative">{w}
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span></span>
          ) : w}
        </motion.span>
      ))}
    </span>
  );
}
```
Sizing for the wordmark: `text-[26vw] sm:text-[24vw] md:text-[22vw]
lg:text-[20vw] xl:text-[19vw] font-medium leading-[0.85] tracking-[-0.07em]`,
color via inline style. `showAsterisk` drops a superscript `*` on the last
letter — a signature accent.

A `WordsPullUpMultiStyle` variant takes `{text, className}[]` segments so one
heading can mix roman + italic-serif words (same animation, per-word class).

## Scroll-linked body reveal (the second signature)
Body paragraphs fade in **per character** as they scroll through view:

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
function AnimatedLetter({ char, index, total, progress }:
  { char: string; index: number; total: number; progress: any }) {
  const p = index / total;
  const opacity = useTransform(progress, [p - 0.1, p + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}
// parent: const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
// render: text.split("").map((c,i)=><AnimatedLetter .../>)
```

## Optional supporting sections
- **About**: centered card `bg-[#101010]`, small label, a `WordsPullUpMultiStyle`
  heading, then the scroll-reveal paragraph.
- **Features**: `min-h-screen` grid of cards that enter with
  `scale:0.95 → 1 + fade`, staggered `0.15s`, `useInView({ once:true, margin:"-100px" })`.

## Responsive
Wordmark scales via the `vw` ladder. Grid collapses to one column on mobile.
Support column stacks under the word below `lg`.

## Quality checklist
- [ ] The wordmark genuinely dominates (20vw+), pinned bottom.
- [ ] Words pull up on load; body reveals on scroll.
- [ ] Serif italic used only for accent words, not everything.
- [ ] Palette consistent (cream on black by default).
- [ ] Responsive at 375 / 768 / 1280px; wordmark never overflows horizontally.
