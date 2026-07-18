"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple, WhatsappLogo, Clock } from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "5511941285590";
const CONTACT_EMAIL = "contato@devopsia.com.br";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSpotlight(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Não foi possível enviar. Tente novamente.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Não foi possível enviar. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vamos conversar sobre o seu projeto
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-foreground-muted">
            Conte o que você precisa construir. Respondemos pessoalmente,
            sem formulário automático de vendas.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nome
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar"
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com"
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Mensagem
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte um pouco sobre o projeto ou a ideia"
                className="resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                {errorMsg}
              </p>
            )}

            {status === "success" ? (
              <p className="rounded-lg border border-accent-dim bg-accent/10 px-4 py-3 text-sm text-accent">
                Mensagem enviada. Voltamos em breve.
              </p>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="pop inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#41e59b] to-[#25b374] px-6 py-3.5 text-sm font-medium text-accent-on shadow-[0_8px_24px_rgba(56,214,142,0.22)] hover:shadow-[0_12px_32px_rgba(56,214,142,0.4)] hover:brightness-105 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
              </button>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleSpotlight}
            className="spotlight glass flex items-center gap-4 rounded-2xl p-6 hover:border-accent-dim"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <WhatsappLogo size={22} weight="fill" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                Chamar no WhatsApp
              </span>
              <span className="block text-sm text-foreground-muted">
                Resposta rápida em horário comercial
              </span>
            </span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onMouseMove={handleSpotlight}
            className="spotlight glass flex items-center gap-4 rounded-2xl p-6 hover:border-accent-dim"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <EnvelopeSimple size={22} weight="fill" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {CONTACT_EMAIL}
              </span>
              <span className="block text-sm text-foreground-muted">
                Para propostas e detalhes por escrito
              </span>
            </span>
          </a>

          <div
            onMouseMove={handleSpotlight}
            className="spotlight glass flex items-center gap-4 rounded-2xl p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-foreground-muted">
              <Clock size={22} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                Até 1 dia útil
              </span>
              <span className="block text-sm text-foreground-muted">
                Tempo médio de primeira resposta
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
