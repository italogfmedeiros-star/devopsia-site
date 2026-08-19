---
name: aurora-lp-stack
description: Pipeline obrigatório da Aurora Labs para criar landing pages. Use SEMPRE que for criar, redesenhar ou montar qualquer LP em qualquer projeto — mesmo que o usuário não mencione a skill. Define o material do produto como origem da identidade visual (do que a coisa é feita na prática vira paleta, tipografia e movimento), a assinatura anti-repetição (cada LP com identidade própria, divergindo das anteriores), o orçamento máximo de seções, as regras rígidas de mobile (dvh, scroll-margin, nav hambúrguer, hover em touch, alvos de 44px) e as 4 camadas do padrão Aurora - referência visual por nicho (motionsites.ai), mídia real por nicho (Pexels API - fotos e vídeos), componentes modernos (OriginKit) e componentes de UI animados (Skiper UI). Funciona em conjunto com a skill flow-landing-pages.
---

# Aurora LP Stack — pipeline padrão de criação de LPs

Toda LP criada passa por estas 4 camadas, **nesta ordem**, sempre ancoradas no **nicho do cliente**. O nicho é o filtro de tudo: referências, mídia e componentes são escolhidos por ele.

Esta skill complementa a `flow-landing-pages` (briefing, direção visual, 8 pilares). O fluxo completo é:
briefing Flow → **camada 0 (material + assinatura)** → **camada 1 (referências)** → direção visual → **camada 2 (mídia)** → **camadas 3 e 4 (componentes)** → construção → auditoria Flow.

## Camada 0 — Assinatura do projeto (anti-repetição) — OBRIGATÓRIA

O maior risco não é LP feia: é LP boa que parece irmã da anterior. Antes de qualquer coisa, force a divergência.

### 0.1 — O material do produto (faça isto ANTES da tabela de eixos)

O nicho diz o *setor*. O material diz do que a coisa é **feita na prática** — e é dele que a identidade visual nasce. Sem esta etapa, "SaaS de IA" vira sempre fundo escuro com glow roxo e mockup de dashboard, e você acabou de fazer a mesma LP de novo com outro logo.

**Pergunte: se eu pudesse segurar este produto na mão, do que ele seria feito?** Texto? Água? Pele? Dinheiro? Tempo? Aço? Uma conversa? Uma rota? Um arquivo? Depois: **faça a página ser feita daquilo.**

Escreva 2–4 linhas na conversa antes de programar, no formato:

> **Material:** o produto da Contorna é *texto* — uma frase de objeção, uma leitura de causa raiz, uma resposta, uma nota. Não tem imagem, tem análise de conversa.
> **Metáfora:** dossiê de investigação sobre o “não”. Papel e tinta.
> **Consequências:** fundo claro de papel · mono de máquina para tudo que a IA fala · um único gesto de marca (a objeção riscada de vermelho) · mídia rara e em duotone, porque foto de gente sorrindo não é o material · movimento = digitar e riscar, não deslizar.

Regras que caem daqui:

- **O gesto de marca.** Toda LP precisa de **um** gesto visual único, repetível, que só faz sentido para aquele negócio (o risco vermelho da contorna, o marquee curvo da washinn). Um, não três.
- **A cor tem que sair do material, não do gosto.** Se o material é claro, a LP é clara — mesmo que as três anteriores sejam escuras. Inverter a temperatura do repo é uma vitória, não um risco.
- **O óbvio do setor é a armadilha.** Escreva qual seria a LP clichê daquele nicho (“IA = escuro + glow roxo”, “estética = rosa + serifada”, “fintech = azul + gráfico subindo”) e assuma explicitamente que não vai fazer aquilo.
- **Sem mídia é uma resposta válida.** Se o material do produto é linguagem, número ou processo, tipografia e cor bastam para o hero — a foto vai só diluir.

### 0.2 — Tabela de eixos

1. **Leia as 2 LPs mais recentes** do repo (`registry.json` + `lps/<slug>/src/App.tsx`) e anote em uma linha cada: arco de seções, layout do hero, sistema tipográfico, forma dos elementos e vocabulário de movimento.
2. **Preencha a tabela de eixos** para a LP nova. Em **pelo menos 4 dos 6 eixos** o valor precisa ser diferente das duas anteriores. Escreva a tabela na conversa antes de programar — se não está escrita, não foi decidida.

| Eixo | Valores possíveis (não exaustivo) |
|---|---|
| **Arco narrativo** | problema→solução · manifesto→prova · produto-primeiro · história/linha do tempo · comparação · bastidor/processo · objeção→resposta |
| **Layout do hero** | vídeo fullscreen · split editorial · tipografia gigante · grid de produto · fundo sólido + objeto único · texto puro sem mídia |
| **Sistema tipográfico** | serif display + sans corpo · sans grotesca única em pesos · mono de acento · condensada editorial · humanista arredondada |
| **Forma / geometria** | radius 0 brutalista · pill · cards suaves 16–24px · sem card (só réguas e espaço) · recorte diagonal · moldura/passe-partout |
| **Movimento** | reveal por scroll · sticky/baralho · marquee horizontal · scrub de vídeo · hover-driven, quase estático · transição de cor por seção |
| **Tratamento da mídia** | vídeo cinematográfico · foto full-bleed · mídia em recorte/máscara · duotone da paleta · mídia pequena e rara · zero foto (só cor e tipo) |

3. **Componentes compartilhados não são identidade.** `Reveal`, `AnimatedNumber` e `SeamlessVideo` podem se repetir — são infraestrutura. Mas cada LP precisa de **1–2 componentes autorais exclusivos** dela, nascidos do **material** (ex.: `ObjectionDeck` e `CauseMap` da contorna — o texto virando interface; `CurvedMarquee` da washinn; `StickyCard` da brn). Se a LP nova só usa componentes que já existem em outra pasta, ela ainda não tem cara própria.
4. **Proibido reciclar o esqueleto.** Copiar a ordem de seções da LP anterior é o erro nº 1. O arco vem do negócio, não do arquivo ao lado.

## Camada 1 — Referências por nicho (motionsites.ai)

Antes de desenhar qualquer coisa:

1. Identifique o nicho do cliente e mapeie para uma categoria do motionsites.ai: SaaS, Agency, Portfolio, Ecommerce, Travel, Wellness, Fintech, Fashion, Technology, 3D Website, Hero, Sections.
2. Navegue em `https://motionsites.ai/` (use o browser pane) filtrando pela categoria do nicho. Analise 3–5 exemplos: estrutura de hero, ritmo de seções, uso de animação/3D, paleta.
3. Extraia um mini-moodboard escrito: 3 padrões que vamos adotar + 1 que vamos evitar. Registre isso no início do trabalho para guiar a LP inteira.

Meta: a LP final deve ficar no nível visual dos sites dessa galeria — animada, design-forward, "fresh drop".

## Camada 2 — Mídia real por nicho (Pexels API) — OBRIGATÓRIA

**Toda LP precisa ter pelo menos 1 vídeo e imagens do Pexels coerentes com o nicho.** Nada de placeholder, nada de imagem genérica de banco que não conversa com o negócio.

### Como buscar e baixar (API oficial, gratuita)

- Chave em `PEXELS_API_KEY` no `.env` da raiz do repo. Se não existir, peça ao usuário para criar uma grátis em `https://www.pexels.com/api/` — não invente chave.
- Fotos: `GET https://api.pexels.com/v1/search?query=<termo>&orientation=landscape&per_page=15`
- Vídeos: `GET https://api.pexels.com/videos/search?query=<termo>&per_page=10`
- Header: `Authorization: <PEXELS_API_KEY>`
- Baixe pelo campo `src` (fotos — prefira `large2x` ou `original`) e `video_files` (vídeos — prefira HD 1920/2560, `.mp4`). Use `curl -o` para salvar em `lps/<projeto>/src/media/` — **`src/`, não `public/`** (ver "Mídia versionada" abaixo).
- Limites: 200 req/hora — busque com termos precisos, não force tentativa e erro.

### Regras de busca

- Monte queries em **inglês** derivadas do nicho: clínica estética → "aesthetic clinic", "skincare treatment", "spa minimal". Gere 3–5 termos por LP, do literal ao atmosférico.
- Priorize consistência: mesma temperatura de cor e mood entre todas as mídias da LP (aplicar a direção da skill `imagens-realistas-web` na curadoria).
- Vídeo de hero: loop sutil, sem cortes bruscos, que funcione mudo e com overlay escuro (padrão do crossfade de duas camadas já usado na LP aurora).
- Otimize após baixar: imagens → WebP < 200KB (`cwebp` ou `sharp`); vídeos → recomprimir com `ffmpeg` se > 8MB (`-crf 28`, sem áudio).

### Mídia versionada — `src/media/`, nunca `public/media/`

Arquivo em `public/` é copiado cru para o build: o nome não muda, então a URL não muda. Como `/media/` sai com cache longo (nginx e Cloudflare), trocar uma foto mantendo o nome deixa o visitante — e a borda do CDN — vendo a versão antiga por dias. Já aconteceu na fidelyx: a foto nova estava na origem e o Cloudflare do `www` servia a velha com `age` de 3 horas e TTL de 7 dias.

A mídia vive em `src/media/` e é resolvida por glob, para o Vite hashear o nome e reescrever as referências:

```ts
const MEDIA = import.meta.glob('./media/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const media = (f: string) => {
  const url = MEDIA[`./media/${f}`]
  if (!url && import.meta.env.DEV) throw new Error(`mídia inexistente: src/media/${f}`)
  return url ?? ''
}
```

Ganhos: o build emite `/assets/<nome>-<hash>.<ext>`, então trocar o arquivo troca a URL e nenhum cache serve o antigo; o `base` do Vite entra sozinho, então funciona em `/` e em `/<slug>/` sem `import.meta.env.BASE_URL` na mão; e `/assets/` já é servido com `immutable` de 1 ano.

`public/` fica só para o que o `<head>` referencia (favicon, `og-image`), porque HTML não passa pelo hash — esses sim versione no nome à mão (`og-v1.jpg`) e use caminho **relativo** (`href="mark.webp"`), que resolve certo sob subpath.

### Licença

Pexels permite uso comercial gratuito sem atribuição obrigatória, mas a API exige link "Photos provided by Pexels" — coloque um crédito discreto no footer da LP.

## Camada 3 — Componentes modernos (OriginKit)

`https://www.originkit.dev/` — biblioteca de componentes/seções atuais (estilo registry shadcn).

1. Consulte o site (browser pane; o WebFetch retorna 403) e navegue pelas categorias.
2. Escolha componentes pelo nicho: fintech pede tabelas de pricing e stats sóbrios; agency pede carrossel de cases e marquee de logos; wellness pede seções arejadas com imagens grandes.
3. Instale via CLI do registry quando disponível (`npx shadcn@latest add <url-do-componente>`) ou copie o código adaptando para o stack da LP (Vite + React).
4. Sempre adapte tokens (cores, fonte, radius) para a direção visual da LP — nunca use o componente com o tema default.

## Camada 4 — UI animada (Skiper UI)

`https://skiper-ui.com/components` — componentes de UI com animação (estilo registry shadcn, free + pro).

1. Navegue nos componentes e escolha 2–4 por LP — onde a interação agrega: cards, carrosséis, textos animados, tabs, botões de CTA.
2. Instalação análoga à camada 3 (registry shadcn / copiar código). Docs em `/docs/quick-start`.
3. Regra de ouro: animação serve a hierarquia, não vira circo. Escolha componentes que reforcem o mood do nicho (fintech = preciso e contido; creative/fashion = expressivo).

## Camada 5 — Mobile (obrigatória, não é "responsivo depois")

Estes 7 bugs já apareceram nas LPs deste repo. Trate como regra de código, não como checklist de revisão.

**1. Altura: `dvh`, nunca `vh`.** No Safari iOS a barra de endereço come ~60px, então `100vh` corta o hero e empurra o CTA para fora. Use `min-h-[100dvh]` / `h-[100dvh]`. `h-screen` e `min-h-screen` do Tailwind são `vh` — proibidos em hero e qualquer bloco de tela cheia. Para gradiente/fundo que não pode "pular" durante o scroll, aí sim `100vh` é o correto — é a exceção, comente o porquê.

**2. Âncora + nav fixa: `scroll-margin-top`.** Toda LP daqui tem nav fixa e menu com âncoras (`#planos`, `#metodo`). Sem isso o clique leva o título para debaixo da nav. Padrão: `scroll-mt-24` (ou `scroll-margin-top` = altura da nav + 16px) em **todo** elemento com `id`. Uma linha no `index.css` resolve: `:target, section[id] { scroll-margin-top: 6rem; }`.

**3. Nav mobile é obrigatória.** `hidden md:flex` sem contrapartida deixa a nav vazia no celular. Ou você entrega menu hambúrguer (padrão do `fidelyx`: botão 44×44 + painel colapsável), ou a nav mobile carrega só o CTA principal. Esconder os links e não colocar nada no lugar não é opção.

**4. Interação nunca pode depender só de `hover:`.** Em touch não existe hover — `hover:` só dispara depois de um toque, ou nunca. Se o estado revela informação (linha que acende, card que expande, texto que aparece), no mobile ele precisa ser o estado **padrão**: `opacity-100 md:opacity-0 md:group-hover:opacity-100`. Regra: leia cada `hover:` e pergunte "o que o visitante de celular vê?". Se a resposta é "nada", está quebrado.

**5. `overflow-x: hidden` no body é curativo, não conserto.** Ele esconde o vazamento e ainda quebra `position: sticky` em cadeia. Ache o culpado — quase sempre é largura em `vw`, `w-[120%]`, marquee sem wrapper, ou grid com `gap` estourando o padding. Se precisar de contenção estrutural, use `overflow-x: clip` (não quebra sticky), como já está no `cold-code-labs`.

**6. Alvo de toque ≥ 44px.** Nenhuma LP do repo tem isso hoje. Todo link de nav, botão, chip de filtro, item de FAQ e ícone de social: `min-h-11 min-w-11` (44px) com padding real. Link de texto solto dentro de parágrafo é a única exceção.

**7. Tipografia em `vw` sempre dentro de `clamp()`.** `text-[4vw]` vira 15,6px num iPhone de 390px e 77px num monitor de 1920. Use `clamp(min, valor-vw, max)` — ex.: `text-[clamp(2rem,6vw,5.5rem)]`. `vw` puro só em elemento decorativo cujo tamanho não afeta legibilidade.

**Verificação antes de entregar** — abra a LP no browser pane, `resize_window` em **390 × 844** e confira, nesta ordem:

- [ ] Zero scroll horizontal (`document.documentElement.scrollWidth === clientWidth`)
- [ ] Hero completo na primeira dobra, CTA visível sem scroll
- [ ] Cada âncora do menu para com o título abaixo da nav
- [ ] Nenhum conteúdo revelado apenas por hover
- [ ] Nada de texto abaixo de 14px nem título estourando a caixa
- [ ] Vídeo de hero: `playsInline muted loop` (sem `playsInline` o iOS abre em fullscreen sozinho); no mobile, poster estático se > 2MB
- [ ] Repetir em **768 × 1024** — o breakpoint do meio é onde o grid de 3 colunas costuma quebrar

## Orçamento de seções — teto de 7

LP longa não converte mais: cansa. O padrão do repo vinha inflando (8 a 11 seções de conteúdo) e o meio da página virava enchimento.

**Regra:** no máximo **7 seções de conteúdo**. Nav, footer e CTA final não contam. O alvo confortável é **5 a 6** — chegue em 7 só quando o negócio realmente exige.

Como caber:

- **Fusão antes de corte.** "Problema" + "método" viram uma seção de virada. "Planos" absorve a garantia. "Resultados" absorve os depoimentos. Duas seções fracas fundidas dão uma forte.
- **Uma seção = uma ideia = uma decisão do visitante.** Se você não consegue nomear o que ela muda na cabeça de quem lê, ela sai.
- **Corte primeiro:** faixa/marquee decorativa, seção "sobre nós" institucional, FAQ genérico, features listadas duas vezes em formatos diferentes, prova social espalhada em três lugares.
- **Densidade > quantidade.** É melhor uma seção de produto rica e bem construída do que três seções rasas em sequência.
- Antes de codar, **escreva o arco em uma linha** (`hero → virada → produto → prova → planos → CTA`) e conte. Se passou de 7, funda — não empurre para o final.

## Checklist final (antes de considerar a LP pronta)

- [ ] Material + metáfora + gesto de marca escritos antes de programar (camada 0.1), e o clichê do nicho nomeado e evitado
- [ ] Tabela de eixos preenchida: ≥ 4 dos 6 diferentes das 2 LPs anteriores
- [ ] 1–2 componentes autorais exclusivos desta LP
- [ ] Máximo 7 seções de conteúdo (alvo 5–6), arco escrito e contado
- [ ] Referências do motionsites.ai consultadas e moodboard registrado
- [ ] ≥ 1 vídeo do Pexels coerente com o nicho (hero ou seção)
- [ ] Imagens do Pexels em todas as seções que pedem mídia, mesmo mood/paleta
- [ ] Mídia otimizada (WebP < 200KB, vídeo < 8MB) em `src/media/`, resolvida pelo helper `media()` com `import.meta.glob`
- [ ] Crédito Pexels no footer
- [ ] Componentes OriginKit e Skiper UI usados e re-tematizados para o nicho
- [ ] Camada 5 (mobile) verificada em 390px e 768px no browser pane
- [ ] Auditoria da skill `flow-landing-pages` executada
- [ ] LP registrada no `registry.json` da raiz
- [ ] Compatível com subpath: mídia via `media()` (o Vite injeta o base) e, no `index.html`, caminho relativo — nunca `/media/...` absoluto. LPs sem domínio próprio servem em `aurora.coldcodelabs.com/<slug>/` (Dockerfile da raiz builda com `--base=/<slug>/`)
