# Kit Anti-Cara-de-IA (ferramentas open source + regras de execução)

"Cara de IA" tem diagnóstico preciso. Sites gerados sem direção compartilham
os mesmos sintomas: Inter em tudo, gradiente roxo/azul, hero centrado com 3
cards simétricos embaixo, glassmorphism gratuito, emoji como ícone, zero
textura, movimento nenhum ou movimento demais, copy genérica ("Soluções
inovadoras para o seu negócio"). Este kit ataca cada sintoma com uma
ferramenta open source e uma regra de uso.

## 1. Movimento com peso (o maior salto de percepção)

| Ferramenta | Licença | O que resolve |
|------------|---------|---------------|
| **Lenis** (darkroomengineering/lenis) | MIT | Scroll suave com inércia — a diferença tátil nº 1 entre site comum e site de estúdio. 2KB, uma linha para ativar. |
| **GSAP + ScrollTrigger** (gsap.com) | Gratuito (todos os plugins) | Orquestração de animação profissional: pin, scrub, stagger, timelines. |
| **Motion** (motion.dev) | MIT | Para projetos React: springs físicos, layout animations. |

```html
<script src="https://unpkg.com/lenis@1/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  // respeitar prefers-reduced-motion: só ativar se o usuário não pediu menos movimento
</script>
```

Regra: TODA animação com easing custom (`cubic-bezier(0.16,1,0.3,1)`),
durações 0.6–1.2s, stagger de 60–120ms. Nada de bounce default.

## 2. Tipografia com personalidade (o sintoma mais denunciante)

Inter/corpo + gradiente roxo = assinatura da IA. Alternativas gratuitas
com caráter (self-host via **Fontsource**, MIT, ou Google Fonts):

- **Display com alma**: Fraunces (variável, ótica), Bricolage Grotesque,
  Space Grotesk, Instrument Serif, Newsreader (itálico editorial).
- **Fontshare (gratuitas, ITF)**: Clash Display, General Sans, Cabinet
  Grotesk, Zodiak — cara de estúdio pago.
- **Mono técnica**: Geist Mono, JetBrains Mono, Fragment Mono.

Regras: display ≠ corpo (contraste real); pesos extremos (300 vs 600, não
400 vs 500); `letter-spacing` negativo em títulos grandes (-0.02 a -0.05em);
um itálico serifado OU uma mono como voz de acento — nunca os dois.

## 3. Textura e matéria (pixel perfeito demais = artificial)

O olho confia no que tem grão. Três técnicas, zero dependência:

```css
/* Grain overlay universal (SVG feTurbulence inline, sem asset) */
.grain::after {
  content: ""; position: fixed; inset: -50%; z-index: 9999;
  pointer-events: none; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 8s steps(10) infinite;
}
@keyframes grain { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-3%,2%)} 40%{transform:translate(2%,-3%)} 60%{transform:translate(-2%,-2%)} 80%{transform:translate(3%,3%)} }
```

- **Gradientes granulados**: gradiente + feTurbulence + blend (técnica
  "grainy gradients" — Codrops/CSS-Tricks têm demos open source).
- **Open Props** (MIT): tokens de design prontos (sombras em camadas,
  easings, gradientes) que fogem do default do Tailwind.

## 4. Ícones e detalhes (emoji nunca)

- **Lucide** (ISC) / **Phosphor** (MIT) / **Heroicons** (MIT) — stroke
  consistente 1.5px, tamanho alinhado ao texto.
- Detalhes que os sites de estúdio têm e os de IA não:
  `::selection` na cor da marca; scrollbar estilizada; favicon real;
  cursor custom em áreas interativas; `:focus-visible` desenhado;
  page transitions (View Transitions API — nativa, sem lib).

## 5. Componentes e efeitos de referência (código aberto de verdade)

- **Codrops** (tympanus.net/codrops) — dezenas de demos open source de
  efeitos de nível Awwwards para adaptar (créditos quando pedido).
- **shadcn/ui** (MIT) e **Magic UI** (MIT) — componentes React copiáveis.
- **21st.dev** — biblioteca de componentes com "Copiar Prompt" (fluxo já
  documentado na skill principal).
- **uiverse.io** (MIT) — micro-componentes CSS puros.

## 6. Layout: quebrar a simetria de propósito

A IA centraliza tudo porque é a média. O estúdio desloca:

- Grid de 12 colunas mas conteúdo ocupando 5+7 ou 4+8, nunca sempre 6+6.
- UM elemento rotacionado sutilmente (0.5–2°) ou sangrando da margem.
- Sobreposição deliberada (imagem invadindo a seção seguinte com margin
  negativa; número gigante atrás do título com opacidade 5%).
- Ritmo de espaçamento irregular-mas-intencional: seções não precisam
  ter todas o mesmo padding — a variação cria capítulos.
- Copy: cortar TODO adjetivo vazio ("inovador", "robusto", "soluções").
  Substituir por específico: número, nome, verbo forte.

## 7. Skills da comunidade para instalar no Claude Code

- **ui-ux-pro-max** (nextlevelbuilder/ui-ux-pro-max-skill, MIT) — a
  versão atual do que o curso cita: 84 estilos de UI, 192 paletas, 74
  pares tipográficos, 161 regras por indústria, 98 diretrizes de UX.
  Instalação:
  ```
  /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
  /plugin install ui-ux-pro-max@ui-ux-pro-max-skill
  ```
- **anthropics/skills** (github.com/anthropics/skills) — repositório
  oficial de skills da Anthropic (documentos, artefatos web etc.).

Ordem de precedência quando usadas juntas: o briefing do cliente manda;
esta skill (flow-landing-pages) define o processo; a ui-ux-pro-max é
consultada como banco de estilos/paletas na Etapa 2 (as 3 direções).

## Teste final do cheiro de IA (rodar antes de entregar)

- [ ] A fonte do corpo NÃO é Inter/Arial (e a display tem caráter)
- [ ] Nenhum gradiente roxo/azul default; paleta tem nome e história
- [ ] Existe textura em algum nível (grain, ruído, material)
- [ ] O scroll tem peso (Lenis) e as entradas têm stagger com easing custom
- [ ] Pelo menos uma quebra deliberada de simetria por dobra
- [ ] Ícones de biblioteca consistente — zero emoji
- [ ] ::selection, focus-visible e favicon cuidados
- [ ] Copy sem adjetivo vazio; específico > genérico
- [ ] Imagens/3D sob medida (skills imagens-realistas-web / imagem-para-3d)
- [ ] Mostraria este site num portfólio de estúdio sem legenda? Se hesitar, itere.
