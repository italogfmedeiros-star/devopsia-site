"use client";

import { motion, useReducedMotion } from "motion/react";

const STEPS = [
  {
    title: "Descoberta",
    body: "Entendemos seu negócio, seus usuários e o que realmente precisa ser construído.",
  },
  {
    title: "Design",
    body: "Prototipamos telas e fluxos antes de escrever a primeira linha de código.",
  },
  {
    title: "Desenvolvimento",
    body: "Construímos em ciclos curtos, com entregas visíveis a cada semana.",
  },
  {
    title: "Entrega e suporte",
    body: "Colocamos no ar e continuamos por perto para evoluir o produto.",
  },
];

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="processo" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance] sm:text-4xl">
          Como trabalhamos
        </h2>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[19px] hidden h-px bg-gradient-to-r from-transparent via-border-soft to-transparent lg:block"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374] font-mono text-sm font-semibold text-accent-on shadow-[0_4px_16px_rgba(56,214,142,0.25)]">
                {i + 1}
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-foreground-muted">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
