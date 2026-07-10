"use client";

import Image from "next/image";
import { AppWindow, Wrench, Plugs, Globe } from "@phosphor-icons/react";
import { SpotlightCard } from "./SpotlightCard";

export function Services() {
  return (
    <section id="servicos" className="bg-background-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          O que fazemos
        </h2>
        <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-foreground-muted">
          Do primeiro rascunho ao suporte pós-lançamento, cuidamos de cada
          etapa do seu produto digital.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <SpotlightCard className="group relative overflow-hidden rounded-2xl lg:col-span-7 lg:row-span-2">
            <Image
              src="https://picsum.photos/seed/devopsia-sites/1000/700"
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-end p-7">
              <Globe
                size={26}
                className="mb-4 text-accent transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
                weight="duotone"
              />
              <h3 className="text-xl font-semibold text-foreground">
                Sites e landing pages
              </h3>
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-foreground-muted">
                Sites institucionais e páginas de conversão, rápidos, responsivos
                e prontos para SEO desde o primeiro deploy.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard
            delay={0.08}
            className="group relative overflow-hidden rounded-2xl p-7 lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent"
            />
            <div className="relative">
              <AppWindow
                size={26}
                className="mb-4 text-accent transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
                weight="duotone"
              />
              <h3 className="text-xl font-semibold text-foreground">
                Aplicativos e sistemas web
              </h3>
              <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-foreground-muted">
                Portais, dashboards e ferramentas internas construídos sob medida
                para o fluxo de trabalho da sua equipe.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard delay={0.16} className="group rounded-2xl p-7 lg:col-span-2">
            <Plugs
              size={26}
              className="mb-4 text-accent transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
              weight="duotone"
            />
            <h3 className="text-lg font-semibold text-foreground">
              Integrações
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Pagamentos, ERPs, CRMs e APIs próprias conectados ao seu produto.
            </p>
          </SpotlightCard>

          <SpotlightCard delay={0.24} className="group rounded-2xl p-7 lg:col-span-3">
            <Wrench
              size={26}
              className="mb-4 text-accent transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
              weight="duotone"
            />
            <h3 className="text-lg font-semibold text-foreground">
              Manutenção e evolução
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Depois do ar, continuamos por perto: correções, novas
              funcionalidades e monitoramento.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
