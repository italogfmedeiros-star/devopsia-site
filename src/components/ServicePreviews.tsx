"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import {
  CheckCircle,
  CircleNotch,
  CreditCard,
  Database,
  GitCommit,
  WhatsappLogo,
} from "@phosphor-icons/react";

// Mini UIs recreated from real projects (with fictitious data) shown inside
// the expanded Services cards. Each one mounts when its card opens, so the
// entry animations replay every time the visitor switches cards.

const EASE = [0.16, 1, 0.3, 1] as const;
// Lets the card's own width animation settle before the content shows up.
const BASE_DELAY = 0.25;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useCountUp(target: number, delay = 0) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(current.current, target, {
      duration: 1.1,
      delay: BASE_DELAY + delay,
      ease: EASE,
      onUpdate: (v) => {
        current.current = v;
        setValue(v);
      },
    });
    return () => controls.stop();
  }, [target, delay, reduce]);

  return reduce ? target : value;
}

function formatInt(v: number) {
  return Math.round(v).toLocaleString("pt-BR");
}

function Rise({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: BASE_DELAY + delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Frame({
  label,
  light = false,
  children,
}: {
  label: string;
  // Light chrome for previews of sites that are light themselves, so the
  // recreated page doesn't sit inside a dark window that isn't its own.
  light?: boolean;
  children: ReactNode;
}) {
  return (
    <Rise
      className={cx(
        "flex h-full flex-col overflow-hidden rounded-xl border shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        light ? "border-white/20 bg-[#fbfaf7]" : "border-white/10 bg-background-elevated/90",
      )}
    >
      <div
        className={cx(
          "flex items-center gap-1.5 border-b px-3 py-2",
          light ? "border-black/5 bg-[#f1efe9]" : "border-white/5",
        )}
      >
        <span className={cx("size-2 rounded-full", light ? "bg-black/15" : "bg-white/15")} />
        <span className={cx("size-2 rounded-full", light ? "bg-black/15" : "bg-white/15")} />
        <span className={cx("size-2 rounded-full", light ? "bg-black/15" : "bg-white/15")} />
        <span
          className={cx(
            "ml-2 truncate font-mono text-[10px]",
            light ? "text-[#6f746e]" : "text-foreground-dim",
          )}
        >
          {label}
        </span>
      </div>
      <div className={cx("relative min-h-0 flex-1 overflow-hidden", !light && "p-3")}>
        {children}
      </div>
    </Rise>
  );
}

/* 01 · Sites e landing pages — site da Dermaflora (dermaflora.com.br) */

// Same slides, copy and framing as the real hero carousel.
const DF_SLIDES = [
  {
    image: "/work/dermaflora/hero-banner.webp",
    position: "75% center",
    title: "O cuidado ideal começa com uma fórmula feita só para você.",
  },
  {
    image: "/work/dermaflora/hero-banner-3.webp",
    position: "78% center",
    title: "Seu tratamento, sempre com você.",
  },
  {
    image: "/work/dermaflora/hero-banner-4.webp",
    position: "72% center",
    title: "Ciência e cuidado em cada cápsula.",
  },
];

const DF_SLIDE_MS = 3200;

const DF_NAV = ["Sobre", "Serviços", "Depoimentos", "Perguntas", "Contato"];

const DF_PERKS = [
  { strong: "Parcelamento", text: "em até 3x sem juros" },
  { strong: "Entrega", text: "para todo o Brasil" },
  { strong: "Compra", text: "100% segura" },
  { strong: "Envie sua receita", text: "com agilidade" },
];

function LandingPreview() {
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const years = useCountUp(45, 0.45);
  const percent = useCountUp(100, 0.5);
  const fronts = useCountUp(4, 0.55);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % DF_SLIDES.length), DF_SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const trust = [
    { value: `${formatInt(years)} anos`, label: "de história" },
    { value: `${formatInt(percent)}%`, label: "fórmulas personalizadas" },
    { value: `${formatInt(fronts)} frentes`, label: "magistral à tricologia" },
    { value: "Gutfiber®", label: "linha própria" },
  ];

  return (
    <Frame label="dermaflora.com.br" light>
      <div className="flex h-full flex-col">
        {/* header */}
        <Rise
          delay={0.05}
          className="flex items-center justify-between gap-3 border-b border-black/5 bg-white/80 px-3 py-2"
        >
          <Image
            src="/work/dermaflora/logo.webp"
            alt=""
            width={400}
            height={82}
            className="h-3.5 w-auto"
          />
          <nav className="hidden flex-1 justify-center gap-3 text-[8px] font-medium text-[#3a3d3a] sm:flex">
            {DF_NAV.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="shrink-0 rounded-full bg-[#5ec27c] px-2 py-1 text-[8px] font-semibold text-white">
            Envie sua receita
          </span>
        </Rise>

        {/* perks bar */}
        <Rise
          delay={0.1}
          className="hidden grid-cols-4 gap-2 border-b border-black/5 bg-[#f2f7f4] px-3 py-1.5 sm:grid"
        >
          {DF_PERKS.map((p) => (
            <span key={p.strong} className="truncate text-[7px] text-[#6f746e]">
              <strong className="font-semibold text-[#1c1e1c]">{p.strong}</strong> {p.text}
            </span>
          ))}
        </Rise>

        {/* hero carousel */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#faf5ee]">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide}
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={DF_SLIDES[slide].image}
                alt=""
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
                style={{ objectPosition: DF_SLIDES[slide].position }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf5ee] via-[#faf5ee]/80 to-transparent" />

          <div className="relative flex h-full max-w-[62%] flex-col justify-center px-3 pb-6 sm:px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={slide}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-[13px] font-extrabold leading-[1.1] tracking-tight text-[#1c1e1c] sm:text-[17px]"
              >
                {DF_SLIDES[slide].title}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1.5 hidden text-[8px] leading-snug text-[#3a3d3a] sm:block">
              Fórmulas personalizadas para a sua necessidade.
            </p>
            <span className="mt-2 w-fit rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[8px] font-semibold text-[#1c1e1c] shadow-sm">
              Conhecer os serviços
            </span>
          </div>

          {/* slide dots, like the real carousel arrows */}
          <div className="absolute bottom-[38px] right-3 flex gap-1">
            {DF_SLIDES.map((s, i) => (
              <span
                key={s.image}
                className={cx(
                  "h-1 rounded-full transition-all duration-300",
                  i === slide ? "w-3 bg-[#1c1e1c]/70" : "w-1 bg-[#1c1e1c]/25",
                )}
              />
            ))}
          </div>

          {/* trust bar overlapping the hero's bottom edge */}
          <div className="absolute inset-x-2 bottom-2 grid grid-cols-4 gap-1.5">
            {trust.map((t, i) => (
              <Rise
                key={t.label}
                delay={0.4 + i * 0.06}
                className="rounded-md border border-white/80 bg-white/75 px-1 py-1 text-center shadow-[0_4px_12px_rgba(49,63,50,0.1)] backdrop-blur-sm"
              >
                <p className="truncate text-[10px] font-bold tabular-nums text-[#687a6a]">
                  {t.value}
                </p>
                <p className="hidden truncate text-[7px] text-[#6f746e] sm:block">{t.label}</p>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 02 · Aplicativos e sistemas web — Dermasys, histórico de ocorrências */

type Occurrence = { id: string; tag: string; tone: string; title: string; time: string };

const OCCURRENCES: Occurrence[] = [
  { id: "a", tag: "Laboratório", tone: "bg-rose-400/10 text-rose-300", title: "Pesagem", time: "08:14" },
  { id: "b", tag: "Triagem", tone: "bg-amber-400/10 text-amber-300", title: "Confirmação", time: "09:32" },
  { id: "c", tag: "Vendas", tone: "bg-sky-400/10 text-sky-300", title: "Preço", time: "10:05" },
  { id: "d", tag: "Orçamentos", tone: "bg-emerald-400/10 text-emerald-300", title: "Receita vencida", time: "11:47" },
];

const NEW_OCCURRENCE: Occurrence = {
  id: "new",
  tag: "Expedição",
  tone: "bg-violet-400/15 text-violet-300",
  title: "Rotulagem",
  time: "11:52",
};

function AppPreview() {
  const reduce = useReducedMotion();
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFresh(true), reduce ? 0 : 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  const kpis = [
    { label: "Registros", value: useCountUp(fresh ? 48 : 47), tone: "text-violet-300" },
    { label: "Resolvidos", value: useCountUp(38, 0.05), tone: "text-emerald-300" },
    { label: "Pendentes", value: useCountUp(fresh ? 10 : 9, 0.1), tone: "text-amber-300" },
  ];
  const rows = fresh ? [NEW_OCCURRENCE, ...OCCURRENCES].slice(0, 4) : OCCURRENCES;

  return (
    <Frame label="Dermasys · Qualidade">
      <div className="flex h-full flex-col gap-2.5">
        <Rise
          delay={0.05}
          className="flex items-center justify-between rounded-md bg-violet-500/80 px-2.5 py-1.5"
        >
          <span className="text-[11px] font-semibold text-white">Histórico de Ocorrências</span>
          <span className="text-[9px] font-medium text-white/70">hoje</span>
        </Rise>

        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k, i) => (
            <Rise
              key={k.label}
              delay={0.1 + i * 0.05}
              className="rounded-md border border-white/5 bg-white/[0.03] py-1.5 text-center"
            >
              <p className={cx("font-mono text-base font-semibold tabular-nums", k.tone)}>
                {formatInt(k.value)}
              </p>
              <p className="text-[9px] text-foreground-dim">{k.label}</p>
            </Rise>
          ))}
        </div>

        <div className="flex min-h-0 flex-col gap-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, x: row.id === "new" ? 0 : -12, scale: row.id === "new" ? 0.96 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: row.id === "new" ? 0 : BASE_DELAY + 0.25 + i * 0.07,
                  ease: EASE,
                }}
                className={cx(
                  "flex items-center gap-2 rounded-md border px-2 py-1.5",
                  row.id === "new"
                    ? "border-violet-400/30 bg-violet-400/[0.07]"
                    : "border-white/5 bg-white/[0.03]",
                )}
              >
                <span className={cx("rounded px-1.5 py-0.5 text-[9px] font-medium", row.tone)}>
                  {row.tag}
                </span>
                <span className="flex-1 truncate text-[11px] text-foreground">{row.title}</span>
                <span className="font-mono text-[9px] text-foreground-dim">{row.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}

/* 03 · Integrações — Busca Fórmula alimentado pelo ERP, pagamentos e WhatsApp */

const SOURCES = [
  { label: "ERP", icon: Database },
  { label: "Pagamentos", icon: CreditCard },
  { label: "WhatsApp", icon: WhatsappLogo },
];

function FlowLine({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-px flex-1 bg-gradient-to-r from-black/10 to-blue-500/40">
      {!reduce && (
        <motion.span
          className="absolute -top-[2px] size-[5px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            delay: BASE_DELAY + delay,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

// Light theme on purpose: the Services cards alternate light (01, 03) and
// dark (02, 04) previews. Stage tints follow the real Busca Fórmula dashboard.
function IntegrationPreview() {
  const stages = [
    { label: "Em conferência", value: useCountUp(18, 0.3), tone: "border-slate-200 bg-white", dot: "bg-slate-400", text: "text-slate-800" },
    { label: "Em produção", value: useCountUp(221, 0.35), tone: "border-amber-200 bg-amber-50", dot: "bg-amber-500", text: "text-amber-600" },
    { label: "Em expedição", value: useCountUp(27, 0.4), tone: "border-indigo-200 bg-indigo-50", dot: "bg-indigo-500", text: "text-indigo-600" },
    { label: "Finalizados", value: useCountUp(151, 0.45), tone: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-600" },
  ];

  return (
    <Frame label="Busca Fórmula · Controle de Produção" light>
      <div className="flex h-full flex-col justify-center gap-3 bg-[#f7f8fa] p-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 flex-col gap-1.5">
            {SOURCES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Rise key={s.label} delay={0.05 + i * 0.06} className="flex items-center gap-2">
                  <span className="flex w-[92px] shrink-0 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 shadow-sm">
                    <Icon size={12} weight="duotone" className="text-blue-600" />
                    {s.label}
                  </span>
                  <FlowLine delay={0.3 + i * 0.4} />
                </Rise>
              );
            })}
          </div>
          <Rise
            delay={0.25}
            className="flex w-[96px] shrink-0 flex-col items-center gap-1 rounded-lg bg-blue-600 px-2 py-3 text-center shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
          >
            <span className="text-[11px] font-semibold leading-tight text-white">Busca Fórmula</span>
            <span className="text-[9px] text-blue-100">802 fórmulas</span>
          </Rise>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stages.map((s, i) => (
            <Rise
              key={s.label}
              delay={0.3 + i * 0.05}
              className={cx("rounded-md border px-2 py-1.5", s.tone)}
            >
              <p className="flex items-center gap-1 truncate text-[9px] text-slate-500">
                <span className={cx("size-1.5 shrink-0 rounded-full", s.dot)} />
                {s.label}
              </p>
              <p className={cx("font-mono text-sm font-semibold tabular-nums", s.text)}>
                {formatInt(s.value)}
              </p>
            </Rise>
          ))}
        </div>

        <Rise delay={0.5} className="flex items-center gap-1.5 text-[9px] text-slate-500">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
            <span className="relative size-1.5 rounded-full bg-emerald-500" />
          </span>
          Sincronizado com o ERP · agora
        </Rise>
      </div>
    </Frame>
  );
}

/* 04 · Manutenção e evolução — Gestão de Ativos: uptime e entregas contínuas */

// Index of the one day with a short degradation, to keep the chart honest.
const INCIDENT_DAY = 17;

const RELEASES = [
  { version: "v2.4.0", title: "Filtro por colaboradores em home office", when: "agora" },
  { version: "v2.3.2", title: "Correção no alerta de devolução pendente", when: "há 3 d" },
  { version: "v2.3.1", title: "Monitoramento de erros em produção", when: "há 9 d" },
];

function MaintenancePreview() {
  const reduce = useReducedMotion();
  const uptime = useCountUp(99.98, 0.1);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPublished(true), reduce ? 0 : 2000);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <Frame label="Gestão de Ativos · Status">
      <div className="flex h-full flex-col gap-3">
        <Rise delay={0.05} className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-foreground-dim">Uptime · 30 dias</p>
            <p className="font-mono text-lg font-semibold tabular-nums text-accent">
              {uptime.toFixed(2).replace(".", ",")}%
            </p>
          </div>
          <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">
            Operacional
          </span>
        </Rise>

        <div className="flex h-6 items-end gap-[2px]">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: BASE_DELAY + 0.1 + i * 0.015, ease: EASE }}
              className={cx(
                "h-full flex-1 origin-bottom rounded-[2px]",
                i === INCIDENT_DAY ? "bg-amber-400/80" : "bg-accent/70",
              )}
            />
          ))}
        </div>

        <div className="flex min-h-0 flex-col gap-1.5">
          {RELEASES.map((r, i) => {
            const pending = i === 0 && !published;
            return (
              <Rise
                key={r.version}
                delay={0.35 + i * 0.08}
                className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5"
              >
                <GitCommit size={12} className="shrink-0 text-foreground-dim" />
                <span className="font-mono text-[9px] text-foreground-dim">{r.version}</span>
                <span className="flex-1 truncate text-[10px] text-foreground">{r.title}</span>
                {pending ? (
                  <span className="flex items-center gap-1 text-[9px] text-amber-300">
                    <CircleNotch size={10} className="animate-spin motion-reduce:animate-none" />
                    Publicando
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[9px] text-foreground-dim">
                    <CheckCircle size={10} weight="fill" className="text-accent" />
                    {r.when}
                  </span>
                )}
              </Rise>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

export const SERVICE_PREVIEWS = {
  landing: LandingPreview,
  app: AppPreview,
  integration: IntegrationPreview,
  maintenance: MaintenancePreview,
} as const;

export type ServicePreviewKey = keyof typeof SERVICE_PREVIEWS;
