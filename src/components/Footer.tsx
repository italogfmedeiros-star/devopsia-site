import Link from "next/link";
import { Logo, Wordmark } from "./Logo";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Como trabalhamos" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#contato", label: "Falar com a gente" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <Link href="/#top" className="pop flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <Wordmark className="text-foreground text-lg" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Sites, aplicativos e sistemas sob medida para empresas que
              precisam de software confiável.
            </p>
          </div>

          <nav className="flex flex-col gap-3 sm:items-end">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-muted transition-all duration-300 hover:translate-x-1 hover:text-foreground sm:hover:-translate-x-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-sm text-foreground-dim sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>© {year} Devopsia. Todos os direitos reservados.</p>
            <span aria-hidden="true" className="hidden text-white/15 sm:inline">
              ·
            </span>
            <Link href="/politica-de-privacidade" className="hover:text-foreground-muted">
              Política de Privacidade
            </Link>
          </div>
          <a href="mailto:contato@devopsia.com.br" className="hover:text-foreground-muted">
            contato@devopsia.com.br
          </a>
        </div>
      </div>
    </footer>
  );
}
