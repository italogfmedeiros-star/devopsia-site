"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { HeroDevices } from "./HeroDevices";

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-48 right-[-8%] h-[520px] w-[520px] rounded-full bg-accent/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute bottom-[-30%] left-[-12%] h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-[120px] [animation-delay:-7s]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-16 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-24 lg:pb-24">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-accent"
          >
            Especialistas no setor magistral
          </motion.span>

          <motion.h1
            {...fadeUp(0.05)}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground [text-wrap:balance] sm:text-5xl lg:text-6xl"
          >
            Sites e sistemas sob medida,{" "}
            <span className="text-gradient-accent">do zero à produção.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            A Devopsia projeta, desenvolve e mantém software com engenharia
            assistida por IA, para empresas que não podem depender de
            atalhos.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contato"
              className="pop inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374] px-6 py-3.5 text-sm font-medium text-accent-on shadow-[0_8px_24px_rgba(56,214,142,0.22)] hover:shadow-[0_12px_32px_rgba(56,214,142,0.4)] hover:brightness-105"
            >
              Falar com a gente
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href="#servicos"
              className="glass inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-foreground"
            >
              Ver serviços
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <HeroDevices />
        </motion.div>
      </div>
    </section>
  );
}
