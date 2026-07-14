// Original CSS/framer-motion mockup for HeroDevices, kept for reference.
// Not imported anywhere — HeroDevices.tsx now renders the generated
// transparent WebP animation instead. Swap the import in Hero.tsx to
// revert if needed.
"use client";

import { motion, useReducedMotion } from "motion/react";

/* Miniature skeleton of the Devopsia site rendered inside each device screen */
function MiniSite({ variant }: { variant: "desktop" | "tablet" | "phone" }) {
  const isPhone = variant === "phone";
  const isTablet = variant === "tablet";

  return (
    <div className="flex h-full flex-col bg-[#0b0d10]">
      {/* mini nav */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-[6%] py-[3.5%]">
        <div className="flex items-center gap-[6px]">
          <span className="flex h-[11px] w-[11px] items-center justify-center rounded-[3px] bg-accent" />
          {!isPhone && (
            <span className="text-[8px] font-semibold leading-none tracking-tight text-white/90">
              Devopsia
            </span>
          )}
        </div>
        {isPhone ? (
          <span className="block h-[7px] w-[11px] rounded-[2px] bg-white/20" />
        ) : (
          <span className="block h-[8px] w-[32px] rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374]" />
        )}
      </div>

      {/* mini hero */}
      <div className="px-[6%] pt-[6%]">
        <div className="h-[9px] w-[85%] rounded-[3px] bg-white/85" />
        <div className="mt-[5px] flex h-[9px] w-[60%] overflow-hidden rounded-[3px]">
          <span className="h-full w-[45%] bg-white/85" />
          <span className="h-full w-[55%] bg-gradient-to-r from-[#7fe7b6] to-accent" />
        </div>
        <div className="mt-[8px] h-[4px] w-[70%] rounded-full bg-white/25" />
        <div className="mt-[3px] h-[4px] w-[50%] rounded-full bg-white/25" />
        <div className="mt-[9px] flex items-center gap-[6px]">
          <span className="h-[11px] w-[34px] rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374]" />
          <span className="h-[11px] w-[27px] rounded-full border border-white/15 bg-white/[0.05]" />
        </div>
      </div>

      {/* mini cards */}
      <div
        className={`mt-auto grid gap-[6px] px-[6%] pb-[6%] pt-[7%] ${
          isPhone ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {Array.from({ length: isPhone ? 2 : isTablet ? 2 : 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[4px] border border-white/[0.08] bg-white/[0.04] p-[7px]"
          >
            <span className="block h-[6px] w-[6px] rounded-full bg-accent/80" />
            <span className="mt-[4px] block h-[4px] w-[75%] rounded-full bg-white/60" />
            <span className="mt-[3px] block h-[3px] w-[90%] rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroDevicesLegacy() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div
      className="relative w-full max-w-lg select-none"
      role="img"
      aria-label="Site da Devopsia exibido em um MacBook, um iPad e um iPhone"
    >
      <div className="relative aspect-[10/8]">
        {/* ambient glow behind the stack */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[70px]"
        />

        {/* MacBook — back, anchored left */}
        <motion.div
          {...enter(0.2)}
          className="absolute left-0 top-0 w-[80%]"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-[12px] rounded-b-none border border-b-0 border-white/10 bg-gradient-to-b from-[#23262c] to-[#14161a] p-[6px] pb-0 shadow-2xl shadow-black/60">
              <div className="aspect-[16/10] overflow-hidden rounded-[7px] rounded-b-none">
                <MiniSite variant="desktop" />
              </div>
            </div>
            {/* base / keyboard deck */}
            <div className="relative mx-[-5%] h-[10px] rounded-b-[10px] rounded-t-[2px] bg-gradient-to-b from-[#2e323a] via-[#1c1f24] to-[#101215] shadow-lg shadow-black/40">
              <span className="absolute left-1/2 top-0 h-[4px] w-[14%] -translate-x-1/2 rounded-b-[4px] bg-black/40" />
            </div>
          </motion.div>
        </motion.div>

        {/* iPad — in front of the MacBook, cascading right */}
        <motion.div
          {...enter(0.35)}
          className="absolute right-[13%] top-[26%] z-10 w-[34%]"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[10px] border border-white/10 bg-gradient-to-b from-[#23262c] to-[#14161a] p-[5px] shadow-2xl shadow-black/60"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-[6px]">
              <MiniSite variant="tablet" />
            </div>
          </motion.div>
        </motion.div>

        {/* iPhone — frontmost, far right, gently floating */}
        <motion.div
          {...enter(0.5)}
          className="absolute bottom-0 right-0 z-20 w-[20%]"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[14px] border border-white/[0.14] bg-gradient-to-b from-[#26292f] to-[#131519] p-[4px] shadow-2xl shadow-black/60"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[11px]">
              {/* dynamic island */}
              <span className="absolute left-1/2 top-[3%] z-10 h-[5px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
              <MiniSite variant="phone" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
