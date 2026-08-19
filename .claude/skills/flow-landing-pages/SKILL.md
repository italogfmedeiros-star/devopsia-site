---
name: flow-landing-pages
description: >-
  Metodologia Flow completa para criar landing pages e sites com design
  premium ("cara de US$ 10.000"). Use esta skill SEMPRE que o usuário pedir
  uma landing page, página de vendas, LP, one-pager, site institucional,
  portfólio, hero section, ou qualquer página web onde a qualidade visual
  importa — mesmo que ele não diga "premium" nem "Flow". Cobre o fluxo
  completo: briefing magnético (7 perguntas), mood board de referências,
  3 direções visuais, 8 pilares do design premium, construção, auditoria
  crítica de tipografia/cores/espaçamento, 4 padrões de hero prontos,
  assets gerados com IA, revisão mobile, debugging e a camada Flow de
  scroll imersivo (scrollytelling: a página "atravessa" ambientes conforme
  o scroll, estilo tour por uma casa). Use também quando o usuário pedir
  efeitos de scroll cinematográficos, video scrubbing ou parallax narrativo.
---

# Flow — Landing Pages Premium

Um site de US$ 10.000 vende mais que um de US$ 200 não por funcionalidade,
mas por **confiança percebida**. Esta skill codifica a metodologia Flow:
um processo em etapas que sai de um pedido vago e chega em uma página com
design de estúdio — nunca com "cara de IA".

**Regra zero:** nunca pule direto para o código. O fluxo abaixo existe
porque cada minuto de briefing economiza dez de retrabalho.

## Os 8 Pilares do Design Premium (checklist mental permanente)

| # | Pilar | Regra prática |
|---|-------|---------------|
| 1 | **Ponto de vista** | Consistência narrativa: toda fonte, cor e imagem reforça UMA história ("carnívoro, rústico e premium"). Pergunte-se: "o que o cliente sente ao entrar no site?" |
| 2 | **Tipografia** | Serifadas (Fraunces, Lora, Playfair Display) = tradição/luxo; sans (Geist, Inter) = modernidade/tech. Regra de ouro: contraste — display marcante nos títulos + corpo legível. NUNCA Arial, Times New Roman ou Helvetica. Evite Inter no corpo (é a fonte com "cheiro de IA" — prefira Geist ou Lora). |
| 3 | **Cores** | Paleta restrita: 3 a 5 cores. Regra 60-30-10 (60% neutro, 30% secundária, 10% destaque). A cor de destaque aparece SÓ nos CTAs. Nomeie cores narrativamente ("latão", "vermelho-sangue"), não genericamente. |
| 4 | **Hierarquia** | H1 pelo menos 3× maior que o corpo (ex.: 48px/16px). Use peso e espaçamento para guiar o olho até a ação principal. Se tudo tem o mesmo tamanho, o site fica plano. |
| 5 | **Imagens** | O olho detecta imagem genérica de banco em 0,5s. Nunca use a primeira do Unsplash. Gere assets sob medida com IA (ver seção Assets). |
| 6 | **Movimento** | Microinterações sutis: fade-ins, leve atraso, parallax discreto (fator ~0.3). Sutil como carro de luxo, nunca bounce/rotação exagerada. |
| 7 | **Mobile-first** | 60%+ do tráfego é celular. Mobile é experiência REDESENHADA, não desktop encolhido. Botões ≥ 44px de altura. |
| 8 | **Performance** | Carregar < 2s, scroll a 60fps, HTML semântico, imagens comprimidas (< 200KB as de fundo mobile). |

## O Fluxo (etapas em ordem)

### Etapa 1 — Briefing Magnético

Antes de codificar, garanta respostas para as **7 perguntas**. Se o pedido
do usuário não as cobre, pergunte (poucas de cada vez, com sugestões):

1. **Nome/negócio** — e a promessa de valor, não só o nome.
2. **Direção de estilo** — descritiva e sensorial ("speakeasy da era da
   Proibição com toques contemporâneos"), nunca vaga ("moderno").
3. **Seções** — lista cirúrgica (ex.: Herói, Menu com 3 itens, Sobre,
   Depoimentos, Contato. Sem blog, sem loja).
4. **Conteúdo** — quem escreve e o tom de voz. Ao gerar texto: sensorial,
   verbos fortes, sem adjetivos vazios ("A brasa encontra o sal" em vez de
   "comida deliciosa").
5. **Stack** — na dúvida, HTML/CSS/JS puro (estático, barato de hospedar).
   React + Vite + Tailwind quando o projeto pede ou o usuário já usa.
6. **Nível de animação** — estilo e intensidade (ex.: "suaves e
   cinemáticas, fade-ins e parallax, nada de bounce").
7. **Especificações extras** — logo, telefone fixo no canto, etc.

Se o usuário mandar **referências/screenshots**, aplique a técnica do mood
board: extraia UM elemento de cada (tipografia do site A, cores do B,
estrutura do C, movimento do D, tom de voz do E) e combine numa visão
única e original. Nunca clone um site inteiro — herda os defeitos, parece
genérico e prejudica SEO.

### Etapa 2 — As 3 Direções Visuais

Com o briefing pronto, apresente **3 direções visuais** antes de
programar, cada uma com paleta (hex), par de fontes e atmosfera:

- **Opção 1 — dramática/luxuosa** (ex.: "Steakhouse Manhattan": tons
  escuros, serifadas pesadas, íntimo e poderoso — restaurantes finos,
  marcas para executivos)
- **Opção 2 — orgânica/moderna** (ex.: "Noroeste Pacífico": verde musgo,
  madeira, sans modernas + serif leve — cafeterias, estúdios criativos,
  marcas jovens)
- **Opção 3 — clássica/atemporal** (ex.: "Clássico Vintage": sépia, creme,
  efeito papel envelhecido, serifadas clássicas — negócios com história)

Adapte as 3 ao briefing (nunca são iguais entre projetos). Recomende uma
com base em público-alvo, promessa de valor e dispositivo predominante —
mas deixe o usuário escolher. Só então programe.

### Etapa 3 — Escolha do padrão de Hero

O herói define a primeira impressão. Há 4 padrões prontos e testados em
`references/heroes/` — leia o arquivo do escolhido antes de construir:

| Padrão | Quando usar | Arquivo |
|--------|-------------|---------|
| **Lean Video Hero** | Brief pede simplicidade: vídeo fullscreen + navbar fina + texto em fade-up. SaaS, estúdios, "só um hero bonito com vídeo atrás" | `references/heroes/lean-video-hero.md` |
| **Oversized Type Hero** | A TIPOGRAFIA é o herói: wordmark gigante (20vw+), editorial, creme sobre preto | `references/heroes/oversized-type-hero.md` |
| **Premium Minimal Hero** | Luxo silencioso e claro: heading duplo sobreposto em dois tons, muito respiro. Aviação privada, hotelaria, joalheria | `references/heroes/premium-minimal-hero.md` |
| **Product Panels Hero** | Produto físico à venda: foto de produto oversized, cards flutuantes, painéis de conversão. Lojas, suplementos, gadgets | `references/heroes/product-panels-hero.md` |

Os 4 são escritos em React + Tailwind. Em projeto estático (vanilla),
**traduza o conceito visual** para HTML/CSS/JS puro mantendo a estética —
mesmas cores, tamanhos, transições e coreografia de animação — em vez de
forçar React num projeto que não precisa dele.

### Etapa 4 — Construção

**Arquitetura padrão (site estático):**

```
projeto/
├── index.html      ← one-pager: CSS interno no <head> (mais rápido)
├── style.css       ← se multi-página
├── script.js       ← ou <script> no FIM do <body>
└── assets/         ← imagens/vídeos, caminhos relativos ./assets/
```

Regras de código que evitam bugs clássicos:

- JS que toca o DOM sempre dentro de `DOMContentLoaded`.
- Classes semânticas e específicas (`.btn-primary`, `.hero`, `.menu-grid`)
  — nunca genéricas (`.button`). São elas que permitem ajustes cirúrgicos.
- Meta tags de SEO básico (viewport, description, title real).
- `!important` só em último caso.
- Componentes de inspiração (ex.: 21st.dev) em React podem ser
  reescritos em vanilla: analise o conceito visual, ignore JSX/hooks,
  traduza a lógica para DOM + event listeners, mantenha a estética.

### Etapa 4b — Camada Flow: Scroll Imersivo (opcional, o "uau")

Quando o brief pede uma experiência cinematográfica — a câmera que entra
na sala, passa ao quarto e chega à cozinha conforme o scroll — leia
`references/flow-scroll-imersivo.md` antes de construir. Resumo da
decisão: sequência de imagens em canvas (estilo Apple) é o padrão-ouro
para o tour por ambientes; vídeo com `currentTime` só com reencode
`-g 1` e apenas como protótipo; CSS `animation-timeline` para camadas
leves (parallax, legendas, progresso) com `@supports`; Three.js somente
com modelo 3D real em mãos — nesse caso leia também
`references/threejs-3d.md` (setup sem build via import map, câmera em
trilho, pipeline glTF/Draco, fallbacks). Sempre: seção de 300–500vh + elemento sticky,
lerp no progresso, orçamento de peso (< 6MB desktop / < 2MB mobile),
legendas narrativas por ambiente, fallback mobile redesenhado e
`prefers-reduced-motion` respeitado. O tour é UMA seção da página — o
resto continua seguindo as demais etapas.

### Etapa 4c — Kit Anti-Cara-de-IA (aplicar SEMPRE)

Antes da auditoria, leia `references/kit-anti-cara-de-ia.md` e aplique o
kit: Lenis para scroll com peso, tipografia com caráter (nunca Inter no
corpo), grain/textura, ícones de biblioteca (nunca emoji), quebra
deliberada de simetria, ::selection/focus-visible/favicon cuidados e
copy sem adjetivo vazio. O arquivo termina com o "teste do cheiro de IA"
— a página só é entregue se passar nele.

### Etapa 5 — Auditoria Crítica (obrigatória antes de entregar)

Não se apaixone pela primeira versão — procure ativamente o que melhorar,
nos 3 eixos:

**Tipografia**
- [ ] Corpo NÃO usa Inter/Arial/Times (troque por Geist ou Lora)
- [ ] H1 ≥ 3× o corpo; hierarquia guia o olho

**Cores**
- [ ] Contar as cores: mais de 5 = poluído, reduza
- [ ] Cor de destaque só nos CTAs
- [ ] Contraste de leitura confortável

**Espaçamento (o "luxo" do design)**
- [ ] O conteúdo respira? Se apertado, aumente o padding vertical das
  seções em ~40% (ex.: 40px → 80px)
- [ ] Sensação-alvo: calma e cara de caro, não "site de 2005"

**Microcirurgias comuns** (sempre com elemento + valor específico):
- Botão CTA pequeno → padding 16px vertical / 32px horizontal + cor de
  destaque da paleta
- Imagem cortando o ponto focal → `background-position: center top` ou
  `object-fit` (teste `cover` vs `contain`)
- Lista/menu longo demais → grid 2 colunas no desktop, 1 no mobile,
  `gap: 20px`

### Etapa 6 — Assets com IA (Prompt Reverso)

Nunca deixe imagem genérica de banco na página. Gere prompts de imagem
sob medida para o usuário levar ao Midjourney/DALL-E/Stable Diffusion:
descreva o asset com especificações fotográficas reais — lente (85mm),
abertura (f/1.8, profundidade de campo rasa), iluminação (golden hour,
dramática), color grading alinhado à paleta do site, composição. Salve os
arquivos em `assets/`.

Upgrade premium: sugerir transformar a imagem-chave em vídeo de movimento
sutil (fumaça subindo, luz se movendo) — vídeos chamam ~50% mais atenção.
No mobile, substitua o vídeo por imagem estática (< 200KB) via media query.

### Etapa 7 — Revisão Mobile (auditoria de usabilidade, não só de código)

Breakpoint padrão: `@media (max-width: 768px)`. Referência de tela: 390px.
Fazer o site "caber" não basta — audite como um designer mobile:

- [ ] Alvos de toque ≥ 44px de altura (`min-height: 44px; padding: 12px 20px`)
- [ ] Menu com 4+ itens vira hambúrguer (colapsa < 768px, expande ao toque)
- [ ] H1: 80px desktop → 32–40px mobile (ex.: 36px, `line-height: 1.2`)
- [ ] Vídeo de fundo → imagem estática < 200KB
- [ ] Elementos puramente decorativos escondidos (`display: none`) —
  no mobile, conteúdo é rei
- [ ] Ordem de leitura reorganizada com `flex-direction: column` + `order`:
  texto primeiro, CTA depois, imagem por último
- [ ] Texto flui sem cortes nem overflow horizontal
- [ ] Testar em 375 / 768 / 1280px

### Etapa 8 — Debugging

Metodologia: identificar **sintoma + comportamento esperado**; o console
(F12) mostra o erro exato. Os 3 cenários clássicos:

1. **404 em asset** → caminho errado; corrigir `src` para `./assets/...`
2. **Scroll/animação morta** → JS rodou antes do DOM; envolver em
   `DOMContentLoaded`
3. **Estilo bagunçado** → conflito de classes; isolar com classe
   específica (`.btn-primary`) e maior especificidade

## Checklist final de entrega

- [ ] Os 8 pilares revisados um a um
- [ ] Paleta 3–5 cores, 60-30-10, destaque só em CTA
- [ ] Zero fontes proibidas; hierarquia H1 ≥ 3× corpo
- [ ] Whitespace generoso (padding de seção estilo 80px+)
- [ ] Animações sutis com easing suave (ex.: `cubic-bezier(0.16,1,0.3,1)`)
- [ ] Nenhuma imagem genérica de banco
- [ ] Mobile auditado (44px, hambúrguer, títulos, vídeo→imagem, order)
- [ ] Sem erros no console; assets com caminhos relativos
- [ ] Texto sensorial, verbos fortes, sem adjetivos vazios

## Referências desta skill

- `references/heroes/lean-video-hero.md` — hero minimalista com vídeo
- `references/heroes/oversized-type-hero.md` — hero tipográfico gigante
- `references/heroes/premium-minimal-hero.md` — hero de luxo claro
- `references/heroes/product-panels-hero.md` — hero de produto/e-commerce
- `references/prompts-do-curso.md` — prompts originais do curso Flow
  (síntese de mood board, revisão mobile, prompt reverso de assets) para
  consulta e reuso verbatim
- `references/flow-scroll-imersivo.md` — a camada Flow: scrollytelling e
  tour imersivo por ambientes (4 técnicas, receitas ffmpeg, código
  vanilla completo, fallbacks)
- `references/threejs-3d.md` — 3D real com Three.js: quando se justifica,
  setup sem build, câmera em trilho pelo scroll, pipeline de assets
  glTF/Draco e regras de performance
- `references/kit-anti-cara-de-ia.md` — ferramentas open source (Lenis,
  GSAP, Open Props, Fontsource, Lucide, Codrops) e regras para eliminar
  o aspecto genérico de site gerado por IA; inclui o teste final
