"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AppWindow, Wrench, Plugs, Globe } from "@phosphor-icons/react";
import { SpotlightCard } from "./SpotlightCard";

const SCREEN_IMAGES = [
  "/work/dermasys.png",
  "/work/busca-formula.png",
  "/work/gestao-ativos.png",
  "/work/relatorio-medico.png",
];

const ROTATE_INTERVAL_MS = 5000;

function useScreenRotation(imageCount: number) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || imageCount < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % imageCount);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, imageCount]);

  return index;
}

type Slice = { size: string; position: string };

const IDLE_SLICE: Slice = { size: "cover", position: "50% 50%" };

function useScreenSlices(tileCount: number) {
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [slices, setSlices] = useState<Slice[]>(() => Array(tileCount).fill(IDLE_SLICE));

  function setTileRef(index: number) {
    return (el: HTMLDivElement | null) => {
      tileRefs.current[index] = el;
    };
  }

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    function measure() {
      if (!grid) return;
      const { offsetWidth, offsetHeight } = grid;
      setSlices(
        tileRefs.current.map((tile) =>
          tile
            ? {
                size: `${offsetWidth}px ${offsetHeight}px`,
                position: `-${tile.offsetLeft}px -${tile.offsetTop}px`,
              }
            : IDLE_SLICE,
        ),
      );
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [tileCount]);

  return { gridRef, setTileRef, slices };
}

function ScreenLayer({ slice, image }: { slice: Slice; image: string }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          key={image}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 bg-no-repeat grayscale blur-[3px] transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: slice.size,
            backgroundPosition: slice.position,
          }}
        />
      </AnimatePresence>
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-color bg-gradient-to-br from-background via-accent-dim/70 to-accent/60"
      />
    </>
  );
}

export function Services() {
  const { gridRef, setTileRef, slices } = useScreenSlices(4);
  const screenIndex = useScreenRotation(SCREEN_IMAGES.length);
  const screenImage = SCREEN_IMAGES[screenIndex];

  return (
    <section id="servicos" className="bg-background-soft/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance] sm:text-4xl">
          O que fazemos
        </h2>
        <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-foreground-muted">
          Do primeiro rascunho ao suporte pós-lançamento, cuidamos de cada
          etapa do seu produto digital.
        </p>

        <div
          ref={gridRef}
          className="relative mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-2"
        >
          <div
            ref={setTileRef(0)}
            className="lg:col-span-7 lg:row-span-2"
          >
            <SpotlightCard className="group relative h-full overflow-hidden rounded-2xl">
              <ScreenLayer slice={slices[0]} image={screenImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[110px] transition-transform duration-700 group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="glass absolute right-7 top-7 hidden w-60 overflow-hidden rounded-xl sm:block"
              >
                <div className="flex items-center gap-1.5 border-b border-border-soft px-3 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-foreground-dim/30" />
                  <span className="h-2 w-2 rounded-full bg-foreground-dim/30" />
                  <span className="h-2 w-2 rounded-full bg-accent/60" />
                </div>
                <div className="space-y-2 p-4">
                  <div className="h-2 w-3/4 rounded-full bg-foreground-dim/20" />
                  <div className="h-2 w-1/2 rounded-full bg-foreground-dim/20" />
                  <div className="h-14 rounded-lg bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
                </div>
              </div>
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
          </div>

          <div
            ref={setTileRef(1)}
            className="lg:col-span-5"
          >
            <SpotlightCard
              delay={0.08}
              className="group relative h-full overflow-hidden rounded-2xl p-7"
            >
              <ScreenLayer slice={slices[1]} image={screenImage} />
              <div className="absolute inset-0 bg-background/70" />
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
          </div>

          <div
            ref={setTileRef(2)}
            className="lg:col-span-2"
          >
            <SpotlightCard
              delay={0.16}
              className="group relative h-full overflow-hidden rounded-2xl p-7"
            >
              <ScreenLayer slice={slices[2]} image={screenImage} />
              <div className="absolute inset-0 bg-background/70" />
              <div className="relative">
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
              </div>
            </SpotlightCard>
          </div>

          <div
            ref={setTileRef(3)}
            className="lg:col-span-3"
          >
            <SpotlightCard
              delay={0.24}
              className="group relative h-full overflow-hidden rounded-2xl p-7"
            >
              <ScreenLayer slice={slices[3]} image={screenImage} />
              <div className="absolute inset-0 bg-background/70" />
              <div className="relative">
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
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
