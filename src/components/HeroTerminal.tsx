"use client";

import { motion, useReducedMotion } from "motion/react";

const LINES: { text: string; tone: "muted" | "accent" | "foreground" }[] = [
  { text: "$ git push origin main", tone: "muted" },
  { text: "✓ build concluído em 38s", tone: "accent" },
  { text: "$ devopsia deploy --prod", tone: "muted" },
  { text: "✓ testes de carga aprovados", tone: "accent" },
  { text: "✓ no ar em producao", tone: "accent" },
  { text: "$ _", tone: "foreground" },
];

const toneClass: Record<string, string> = {
  muted: "text-foreground-muted",
  accent: "text-accent",
  foreground: "text-foreground",
};

export function HeroTerminal() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent p-px shadow-2xl shadow-black/50">
      <div className="overflow-hidden rounded-[15px] bg-[#0b0d10]/70 backdrop-blur-2xl backdrop-saturate-150">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-foreground-dim">
            deploy.sh
          </span>
        </div>
        <div className="space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed">
          {LINES.map((line, i) => (
            <motion.p
              key={line.text}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + i * 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={toneClass[line.tone]}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
