"use client";

import { UsersThree, CalendarCheck, GitBranch } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const POINTS = [
  {
    icon: UsersThree,
    title: "Equipe sênior, direto com você",
    body: "Sem gerentes de conta entre você e quem escreve o código. Você fala com quem constrói.",
  },
  {
    icon: CalendarCheck,
    title: "Entregas em etapas curtas",
    body: "Você acompanha o progresso a cada semana, com algo funcionando desde o início.",
  },
  {
    icon: GitBranch,
    title: "O código é seu",
    body: "Repositório, infraestrutura e documentação ficam com a sua empresa, sem dependência.",
  },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance] sm:text-4xl">
            Por que empresas escolhem a Devopsia
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-foreground-muted">
            Somos um time enxuto de desenvolvedores que prefere entregar bem a
            entregar rápido demais.
          </p>
        </div>

        <dl className="border-t border-border-soft lg:col-span-7">
          {POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex gap-5 border-b border-border-soft py-7 first:pt-0"
            >
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent/20">
                <point.icon
                  size={22}
                  weight="duotone"
                  className="transition-transform duration-300 ease-out group-hover:-rotate-6"
                />
              </span>
              <div>
                <dt className="text-base font-semibold text-foreground">
                  {point.title}
                </dt>
                <dd className="mt-1.5 max-w-[50ch] text-sm leading-relaxed text-foreground-muted">
                  {point.body}
                </dd>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
