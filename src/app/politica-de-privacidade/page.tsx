import type { Metadata } from "next";
import { Logo, Wordmark } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const CONTACT_EMAIL = "contato@devopsia.com.br";
const LAST_UPDATED = "12 de novembro de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade - Devopsia",
  description:
    "Como a Devopsia trata dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const SECTIONS = [
  { id: "quem-somos", label: "Quem somos" },
  { id: "dados", label: "Dados que tratamos" },
  { id: "operadores", label: "Operadores e transferência internacional" },
  { id: "base-legal", label: "Base legal" },
  { id: "retencao", label: "Retenção" },
  { id: "direitos", label: "Seus direitos" },
  { id: "exclusao", label: "Como pedir a exclusão" },
  { id: "contato", label: "Contato e atualizações" },
];

function Mail() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/[0.06] pt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground-muted [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-accent">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="pop flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <Wordmark className="text-foreground text-lg" />
          </Link>
          <Link
            href="/"
            className="text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              LGPD · Lei nº 13.709/2018
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
              Este documento explica, em linguagem direta, quais dados pessoais a
              Devopsia trata, para quê, com quem eles são compartilhados e como
              você pode exercer seus direitos.
            </p>
            <p className="mt-4 text-sm text-foreground-dim">
              Última atualização: {LAST_UPDATED}
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="Seções da política" className="hidden lg:block">
              <ol className="sticky top-24 space-y-2.5 text-sm">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-3 text-foreground-dim transition-colors hover:text-foreground"
                    >
                      <span className="font-mono text-xs text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="max-w-3xl space-y-12">
              <Section id="quem-somos" title="1. Quem somos">
                <p>
                  A <strong>Devopsia</strong> desenvolve sites, aplicativos e
                  sistemas sob medida. Para os fins da LGPD, a Devopsia é a{" "}
                  <strong>controladora</strong> dos dados pessoais descritos nesta
                  política, ou seja, é quem decide como e por que esses dados são
                  tratados.
                </p>
              </Section>

              <Section id="dados" title="2. Dados que tratamos">
                <p>
                  Quando você preenche o formulário de contato do site, recebemos
                  o <strong>nome</strong>, o <strong>e-mail</strong> e a{" "}
                  <strong>mensagem</strong> que você escreveu. Usamos essas
                  informações apenas para responder ao seu contato e conversar
                  sobre o projeto que você trouxe.
                </p>
                <p>
                  <strong>Não vendemos seus dados</strong> e{" "}
                  <strong>não os usamos para publicidade</strong>.
                </p>
              </Section>

              <Section
                id="operadores"
                title="3. Operadores e transferência internacional"
              >
                <p>
                  Contamos com empresas que tratam dados em nosso nome
                  (operadores):
                </p>
                <ul>
                  <li>
                    <strong>Vercel</strong>: hospedagem do site, nos Estados
                    Unidos.
                  </li>
                  <li>
                    <strong>Resend</strong>: envio da mensagem do formulário até
                    a nossa caixa de e-mail.
                  </li>
                </ul>
                <p>
                  Como esses fornecedores operam fora do Brasil, pode haver{" "}
                  <strong>transferência internacional de dados</strong>,
                  principalmente para os Estados Unidos. Ela ocorre na medida
                  necessária para atender ao seu pedido, nos termos do art. 33
                  da LGPD.
                </p>
              </Section>

              <Section id="base-legal" title="4. Base legal">
                <p>Tratamos seus dados com base em:</p>
                <ul>
                  <li>
                    <strong>Atendimento ao que você solicitou</strong> (art. 7º,
                    V, da LGPD): sem esses dados não é possível responder ao seu
                    contato;
                  </li>
                  <li>
                    <strong>Consentimento</strong> do titular (art. 7º, I), que
                    você pode revogar a qualquer momento.
                  </li>
                </ul>
              </Section>

              <Section id="retencao" title="5. Por quanto tempo guardamos">
                <p>
                  Os dados são mantidos{" "}
                  <strong>enquanto forem necessários para o atendimento</strong>{" "}
                  e são <strong>apagados quando você pedir</strong>.
                </p>
              </Section>

              <Section id="direitos" title="6. Seus direitos">
                <p>
                  Pelo art. 18 da LGPD, você pode pedir à Devopsia, a qualquer
                  momento:
                </p>
                <ul>
                  <li>Confirmação de que tratamos seus dados;</li>
                  <li>Acesso aos dados que temos sobre você;</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                  <li>Anonimização, bloqueio ou eliminação de dados;</li>
                  <li>Portabilidade dos dados a outro fornecedor;</li>
                  <li>Revogação do consentimento.</li>
                </ul>
                <p>
                  Para exercer qualquer um desses direitos, envie um pedido para{" "}
                  <Mail />.
                </p>
              </Section>

              <Section id="exclusao" title="7. Como pedir a exclusão dos seus dados">
                <p>
                  Envie um e-mail para <Mail /> com o assunto{" "}
                  <strong>“Exclusão de dados”</strong>, informando o e-mail que
                  você usou no formulário do site e se quer apagar todos os
                  dados ou apenas parte deles.
                </p>
                <p>
                  Podemos pedir uma confirmação simples para ter certeza de que o
                  pedido veio do próprio titular. Depois da exclusão, respondemos
                  confirmando.
                </p>
              </Section>

              <Section id="contato" title="8. Contato e atualizações">
                <p>
                  Dúvidas sobre esta política ou sobre seus dados: <Mail />.
                </p>
                <p>
                  Podemos atualizar esta política quando nossos serviços mudarem.
                  A data da última atualização fica sempre no topo da página.
                  Última atualização: <strong>{LAST_UPDATED}</strong>.
                </p>
              </Section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
