"use client";

import { useReducedMotion } from "motion/react";

export function HeroDevices() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative w-full max-w-[38.4rem] select-none"
      role="img"
      aria-label="Site da Devopsia exibido em um MacBook, um iPad e um iPhone"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[70px]"
      />

      <div className="relative aspect-[1024/578]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reduce ? "/hero-devices-poster.webp" : "/hero-devices.webp"}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
