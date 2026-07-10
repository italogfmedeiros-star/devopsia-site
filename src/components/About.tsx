"use client";

import { UsersThree, CalendarCheck, GitBranch } from "@phosphor-icons/react";
import { SpotlightCard } from "./SpotlightCard";

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
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Por que empresas escolhem a Devopsia
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground-muted">
          Somos um time enxuto de desenvolvedores que prefere entregar bem a
          entregar rápido demais.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {POINTS.map((point, i) => (
          <SpotlightCard
            key={point.title}
            delay={i * 0.1}
            className="group rounded-2xl p-7"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent/20">
              <point.icon
                size={24}
                weight="duotone"
                className="transition-transform duration-300 ease-out group-hover:-rotate-6"
              />
            </span>
            <h3 className="mt-5 text-base font-semibold text-foreground">
              {point.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {point.body}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
