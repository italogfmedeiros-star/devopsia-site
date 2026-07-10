"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

type Project = {
  index: string;
  name: string;
  tag: string;
  description: string;
  stat: string;
  url?: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Busca Fórmula",
    tag: "Sistema web · Farmácia de manipulação",
    description:
      "Substituiu o controle manual da produção por um painel único: cada fórmula é acompanhada da conferência até a entrega, com alertas automáticos de atraso e risco por filial.",
    stat: "854 fórmulas em produção monitoradas ao mesmo tempo",
  },
  {
    index: "02",
    name: "Dermasys",
    tag: "Plataforma SaaS · Farmácia de manipulação",
    description:
      "Plataforma SaaS de controle de ocorrências e qualidade operacional: operadores registram desvios por setor e turno, moderadores avaliam contestações, e tudo alimenta um dashboard de métricas.",
    stat: "Menos de 2 minutos para registrar uma ocorrência, com rastreabilidade total",
    url: "https://www.dermasys.com.br",
  },
  {
    index: "03",
    name: "Derma Assist",
    tag: "Sistema web · Gestão de T.I.",
    description:
      "Gestão completa do parque de equipamentos de T.I: quem está com o quê, o que está pendente de devolução e o valor total do inventário, em um só lugar.",
    stat: "59 equipamentos e R$ 25.493,40 em inventário sob controle",
  },
  {
    index: "04",
    name: "SP Drones",
    tag: "Site institucional · Serviços audiovisuais",
    description:
      "Site institucional para captar clientes de filmagem e fotografia aérea com drone, com identidade visual própria e contato direto por WhatsApp.",
    stat: "“Uma nova perspectiva de visão.”",
    url: "https://www.spdrone.com.br/",
  },
];

export function Portfolio() {
  const reduce = useReducedMotion();

  return (
    <section id="portfolio" className="bg-background-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Projetos que já colocamos no ar
        </h2>
        <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-foreground-muted">
          Sistemas e sites reais, do controle de produção ao primeiro contato
          com o cliente.
        </p>

        <div className="mt-14 divide-y divide-border-soft border-t border-border-soft">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 gap-6 rounded-2xl py-10 transition-all duration-300 hover:bg-white/[0.04] lg:-mx-6 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-6 lg:py-12"
            >
              <div className="lg:col-span-4">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-foreground-muted transition-colors duration-300 group-hover:text-accent"
                >
                  {project.index}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">{project.tag}</p>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-[60ch] text-base leading-relaxed text-foreground-muted">
                  {project.description}
                </p>
                <p className="mt-4 font-mono text-sm text-accent">
                  {project.stat}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-all duration-300 hover:gap-2.5 hover:text-foreground"
                  >
                    Ver site
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
