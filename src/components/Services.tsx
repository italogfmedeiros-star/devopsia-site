"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AppWindow, Wrench, Plugs, Globe } from "@phosphor-icons/react";
import { SERVICE_PREVIEWS, type ServicePreviewKey } from "./ServicePreviews";

type Service = {
  index: string;
  icon: typeof Globe;
  title: string;
  description: string;
  preview: ServicePreviewKey;
};

const SERVICES: Service[] = [
  {
    index: "01",
    icon: Globe,
    title: "Sites e landing pages",
    description:
      "Sites institucionais e páginas de conversão, rápidos, responsivos e prontos para SEO desde o primeiro deploy.",
    preview: "landing",
  },
  {
    index: "02",
    icon: AppWindow,
    title: "Aplicativos e sistemas web",
    description:
      "Portais, dashboards e ferramentas internas construídos sob medida para o fluxo de trabalho da sua equipe.",
    preview: "app",
  },
  {
    index: "03",
    icon: Plugs,
    title: "Integrações",
    description:
      "Pagamentos, ERPs, CRMs e APIs próprias conectados ao seu produto.",
    preview: "integration",
  },
  {
    index: "04",
    icon: Wrench,
    title: "Manutenção e evolução",
    description:
      "Depois do ar, continuamos por perto: correções, novas funcionalidades e monitoramento.",
    preview: "maintenance",
  },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ServicePanel({
  service,
  isActive,
  onActivate,
}: {
  service: Service;
  isActive: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();
  const Icon = service.icon;
  const Preview = SERVICE_PREVIEWS[service.preview];

  return (
    <motion.button
      type="button"
      layout={!reduce}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onActivate}
      onMouseEnter={onActivate}
      aria-pressed={isActive}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-border-soft bg-background-elevated/50 text-left outline-none focus-visible:border-accent",
        isActive ? "h-[500px] lg:h-auto lg:flex-[3]" : "h-16 lg:h-auto lg:flex-1",
      )}
      style={{
        // Chrome/Safari can fail to clip a filtered child (the preview's
        // blurred shadows below) to this element's rounded corners once
        // it's promoted to its own compositing layer by the `layout`
        // animation above — the image then paints past the border-radius.
        // Forcing a mask on this element fixes the composition.
        WebkitMaskImage: "-webkit-radial-gradient(circle, white 100%, black 100%)",
        maskImage: "radial-gradient(circle, white 100%, black 100%)",
      }}
    >
      {/* soft accent glow behind the preview */}
      <div
        aria-hidden="true"
        className={cx(
          "absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_0%,rgba(56,214,142,0.14),transparent_70%)] transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* index label, top-right — same numbering language as Portfolio */}
      <span className="absolute right-4 top-4 font-mono text-xs text-foreground-dim">
        {service.index}
      </span>

      <Icon
        size={24}
        weight="duotone"
        className={cx(
          "absolute left-4 top-4 text-accent transition-transform duration-300 ease-out",
          isActive ? "" : "lg:left-1/2 lg:top-6 lg:-translate-x-1/2",
        )}
      />

      {/* collapsed label — vertical spine on desktop, horizontal on mobile/expanded */}
      <span
        className={cx(
          "absolute font-medium text-foreground transition-opacity duration-300",
          isActive
            ? "inset-x-16 top-4 text-sm opacity-0 lg:opacity-0"
            : "inset-x-16 top-4 text-sm opacity-100 lg:inset-x-0 lg:bottom-4 lg:top-auto lg:text-center lg:text-xs lg:[writing-mode:vertical-rl] lg:[transform:rotate(180deg)] lg:opacity-100",
        )}
      >
        {service.title}
      </span>

      {/* expanded content */}
      <div
        className={cx(
          "relative flex h-full flex-col p-6 pt-14 transition-opacity duration-300",
          isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
        )}
      >
        <div aria-hidden="true" className="min-h-0 flex-1">
          {isActive && <Preview />}
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">{service.title}</h3>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-foreground-muted">
          {service.description}
        </p>
      </div>
    </motion.button>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="servicos" className="bg-background-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance] sm:text-4xl"
        >
          O que fazemos
        </motion.h2>
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[55ch] text-base leading-relaxed text-foreground-muted"
        >
          Do primeiro rascunho ao suporte pós-lançamento, cuidamos de cada
          etapa do seu produto digital.
        </motion.p>

        <div className="mt-12 flex flex-col gap-3 lg:h-[480px] lg:flex-row">
          {SERVICES.map((service, i) => (
            <ServicePanel
              key={service.title}
              service={service}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
