"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function SpotlightCard({ delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`spotlight glass ${className}`}
    >
      {children}
    </motion.div>
  );
}
