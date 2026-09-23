"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const ACCENT = "#38d68e";

/* Each step gets a brand-drawn scene instead of a photo. The SVGs use
   `slice` so they fill the card like object-fit: cover, and the whole
   layer gets the Ken Burns zoom. */

function DiscoveryScene() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
      <defs>
        <radialGradient id="p-disc-glow" cx="68%" cy="38%" r="55%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#p-disc-glow)" />
      <g fill="none" stroke={ACCENT}>
        {[50, 100, 150, 200, 250, 300].map((r, i) => (
          <circle key={r} cx="540" cy="190" r={r} strokeOpacity={0.5 - i * 0.07} />
        ))}
        <line x1="540" y1="190" x2="770" y2="60" strokeOpacity="0.6" strokeWidth="2" />
      </g>
      {[
        [610, 120],
        [450, 250],
        [680, 280],
        [500, 90],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 7 : 4} fill={ACCENT} fillOpacity={i === 0 ? 1 : 0.6} />
      ))}
    </svg>
  );
}

function DesignScene() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
      <defs>
        <pattern id="p-design-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity="0.06" />
        </pattern>
        <radialGradient id="p-design-glow" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#p-design-grid)" />
      <rect width="800" height="500" fill="url(#p-design-glow)" />
      <g transform="translate(380 50)">
        <rect width="360" height="260" rx="14" fill="#0e1013" stroke="#ffffff" strokeOpacity="0.14" />
        <rect x="20" y="20" width="200" height="14" rx="7" fill="#ffffff" fillOpacity="0.8" />
        <rect x="20" y="44" width="140" height="10" rx="5" fill="#ffffff" fillOpacity="0.3" />
        <rect x="20" y="74" width="100" height="28" rx="14" fill={ACCENT} />
        <rect x="130" y="74" width="100" height="28" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.3" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={20 + i * 110} y="126" width="100" height="112" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />
        ))}
        <rect x="-8" y="-8" width="376" height="276" rx="18" fill="none" stroke={ACCENT} strokeOpacity="0.7" strokeDasharray="6 6" />
        {[
          [-8, -8],
          [368, -8],
          [-8, 268],
          [368, 268],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill="#08090b" stroke={ACCENT} strokeWidth="2" />
        ))}
      </g>
    </svg>
  );
}

function BuildScene() {
  const lines = [
    [0, 160, 0.8],
    [1, 220, 0.35],
    [1, 180, 0.35],
    [2, 120, 1],
    [2, 240, 0.35],
    [1, 90, 0.35],
    [0, 60, 0.8],
    [0, 0, 0],
    [0, 200, 0.8],
    [1, 150, 0.35],
    [1, 260, 1],
  ] as const;
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
      <defs>
        <radialGradient id="p-build-glow" cx="75%" cy="45%" r="55%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#p-build-glow)" />
      <g transform="translate(360 40)">
        {lines.map(([indent, w, o], i) => (
          <g key={i}>
            <text x="0" y={i * 26 + 12} fontFamily="monospace" fontSize="12" fill="#ffffff" fillOpacity="0.25">
              {String(i + 1).padStart(2, "0")}
            </text>
            {w > 0 && (
              <rect
                x={36 + indent * 28}
                y={i * 26 + 2}
                width={w}
                height="12"
                rx="6"
                fill={o === 1 ? ACCENT : "#ffffff"}
                fillOpacity={o}
              />
            )}
          </g>
        ))}
        <rect x="324" y="263" width="3" height="18" fill={ACCENT} />
      </g>
    </svg>
  );
}

function ShipScene() {
  const bars = [38, 52, 44, 66, 58, 80, 72, 96, 88, 120, 110, 148, 140, 176];
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="p-ship-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="p-ship-glow" cx="80%" cy="25%" r="55%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#p-ship-glow)" />
      <g transform="translate(340 60)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 30} y={260 - h} width="18" height={h} rx="4" fill="#ffffff" fillOpacity="0.07" />
        ))}
        <path
          d={`M9 ${260 - bars[0]} ${bars.map((h, i) => `L${i * 30 + 9} ${260 - h - 24}`).join(" ")} L${(bars.length - 1) * 30 + 9} 260 L9 260Z`}
          fill="url(#p-ship-area)"
        />
        <polyline
          points={bars.map((h, i) => `${i * 30 + 9},${260 - h - 24}`).join(" ")}
          fill="none"
          stroke={ACCENT}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx={(bars.length - 1) * 30 + 9} cy={260 - bars[bars.length - 1] - 24} r="7" fill={ACCENT} />
        <g transform="translate(250 0)">
          <rect width="130" height="34" rx="17" fill="#0e1013" stroke="#ffffff" strokeOpacity="0.14" />
          <circle cx="20" cy="17" r="5" fill={ACCENT} />
          <text x="34" y="22" fontFamily="monospace" fontSize="13" fill="#ffffff" fillOpacity="0.8">
            99.9% up
          </text>
        </g>
      </g>
    </svg>
  );
}

const STEPS: { title: string; body: string; scene: ReactNode }[] = [
  {
    title: "Descoberta",
    body: "Entendemos seu negócio, seus usuários e o que realmente precisa ser construído.",
    scene: <DiscoveryScene />,
  },
  {
    title: "Design",
    body: "Prototipamos telas e fluxos antes de escrever a primeira linha de código.",
    scene: <DesignScene />,
  },
  {
    title: "Desenvolvimento",
    body: "Construímos em ciclos curtos, com entregas visíveis a cada semana.",
    scene: <BuildScene />,
  },
  {
    title: "Entrega e suporte",
    body: "Colocamos no ar e continuamos por perto para evoluir o produto.",
    scene: <ShipScene />,
  },
];

type Step = (typeof STEPS)[number];

function CardFace({ step, index, animate }: { step: Step; index: number; animate: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 max-sm:top-20 ${animate ? "animate-kenburns" : ""}`}
        style={animate ? { animationDelay: `${-index * 4.5}s` } : undefined}
      >
        {step.scene}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
      />
      <div className="flex items-center gap-3 p-6 sm:p-10">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374] font-mono text-sm font-semibold text-accent-on shadow-[0_4px_16px_rgba(56,214,142,0.25)]">
          {index + 1}
        </span>
        <span className="font-mono text-xs text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="max-w-xl p-6 sm:p-10">
        <h3 className="text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
          {step.body}
        </p>
      </div>
    </>
  );
}

const CARD_CLASS =
  "isolate flex flex-col justify-between overflow-hidden rounded-3xl border border-border-soft bg-background-elevated";

/* `depth` is how far this card sits behind the front one: 0 = front,
   1 = next in line, negative = already passed. Queued cards shrink and
   rise so their top edge peeks out; passed cards zoom toward the viewer
   and fade away. */
function StackCard({ step, index, progress }: { step: Step; index: number; progress: MotionValue<number> }) {
  const depth = useTransform(progress, (p) => index - p);
  const scale = useTransform(depth, (d) => (d >= 0 ? 1 - d * 0.07 : 1 - d * 0.18));
  const y = useTransform(depth, (d) => (d >= 0 ? d * -36 : 0));
  const opacity = useTransform(depth, (d) =>
    d >= 0 ? Math.min(1, Math.max(0, 3 - d)) : Math.max(0, 1 + d * 3),
  );
  const shade = useTransform(depth, (d) => (d > 0 ? Math.min(0.65, d * 0.35) : 0));

  return (
    <motion.li
      style={{ scale, y, opacity, zIndex: STEPS.length - index }}
      className={`${CARD_CLASS} absolute inset-0 will-change-transform`}
    >
      <CardFace step={step} index={index} animate />
      <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-black" />
    </motion.li>
  );
}

/* Holds each card still for a moment before easing to the next one. */
function dwell(v: number) {
  const k = Math.floor(v);
  const t = Math.min(1, Math.max(0, (v - k - 0.2) / 0.6));
  return k + (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
}

function CardStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, (v) => dwell(v * (STEPS.length - 1)));

  return (
    <div ref={ref} style={{ height: `calc(100dvh + ${(STEPS.length - 1) * 115}dvh)` }}>
      <div className="sticky top-16 flex h-[calc(100dvh-4rem)] items-center">
        <ol className="relative mt-10 h-[min(70dvh,620px)] w-full">
          {STEPS.map((step, i) => (
            <StackCard key={step.title} step={step} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="processo" className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance] sm:text-4xl">
            Como trabalhamos
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
            Do primeiro papo ao produto no ar: um processo curto, visível e
            sem surpresa no meio do caminho.
          </p>
        </motion.div>

        {reduce ? (
          <ol className="mt-12 flex flex-col gap-4 sm:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className={`${CARD_CLASS} relative h-[420px] sm:h-[520px]`}>
                <CardFace step={step} index={i} animate={false} />
              </li>
            ))}
          </ol>
        ) : (
          <CardStack />
        )}
      </div>
    </section>
  );
}
