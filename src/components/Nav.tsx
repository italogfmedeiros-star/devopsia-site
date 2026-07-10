"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo, Wordmark } from "./Logo";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#portfolio", label: "Portfólio" },
];

const CTA_LABEL = "Falar com a gente";

const CTA_CLASSES =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#41e59b] to-[#25b374] px-5 py-2.5 text-sm font-medium text-accent-on shadow-[0_8px_24px_rgba(56,214,142,0.22)] transition-all hover:shadow-[0_8px_30px_rgba(56,214,142,0.34)] hover:brightness-105 active:scale-[0.98]";

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <Wordmark className="text-foreground text-lg" />
        </a>

        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="#contato" className={CTA_CLASSES}>
            {CTA_LABEL}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-foreground lg:hidden"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-white/[0.06] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className={`mt-2 ${CTA_CLASSES}`}
              >
                {CTA_LABEL}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
