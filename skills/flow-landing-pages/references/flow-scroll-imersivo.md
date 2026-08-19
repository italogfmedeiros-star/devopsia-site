# Camada Flow — Scroll Imersivo (Scrollytelling)

O efeito: conforme o usuário rola, a página "anda" por um espaço — a câmera
entra na sala, passa pro quarto, chega na cozinha. O scroll deixa de ser
navegação e vira **linha do tempo de uma câmera**. É o nível mais alto de
percepção premium que uma LP pode ter, e também o mais fácil de estragar
com peso e engasgo. Esta referência explica as 4 técnicas, quando usar
cada uma e a receita completa do "tour pela casa".

## O princípio universal

Toda técnica de scroll imersivo é a mesma ideia com roupas diferentes:

1. Uma seção alta (ex.: 300–500vh) cria "combustível de scroll".
2. O elemento visual fica **preso na tela** (`position: sticky`/pinned)
   enquanto a seção passa por trás.
3. O progresso do scroll dentro da seção (0 → 1) é mapeado para o
   progresso da animação (frame do vídeo, imagem da sequência, posição da
   câmera 3D).

```
progresso = (scrollY - topoDaSecao) / (alturaDaSecao - alturaDaViewport)
```

O usuário controla o tempo. Rolar devagar = câmera anda devagar.

## As 4 técnicas (tabela de decisão)

| Técnica | Quando usar | Suavidade | Peso | Complexidade |
|---------|-------------|-----------|------|--------------|
| **1. Sequência de imagens em canvas** ("estilo Apple") | O padrão-ouro do tour por ambientes. Sempre que houver um vídeo/render da câmera passeando | Excelente (inclusive Android) | Alto (2–6MB) | Média |
| **2. Vídeo com `currentTime` scrubbed** | Protótipo rápido, ou vídeo curto; exige reencode com keyframe por frame | Boa no desktop, ruim no Android | Médio | Baixa |
| **3. CSS scroll-driven animations** (`animation-timeline`) | Camadas 2.5D, parallax, textos, barras de progresso — sem JS. Progressive enhancement | Excelente (roda no compositor) | Zero | Baixa |
| **4. Three.js + câmera em trilho** | Só quando existe modelo 3D real da casa e o cliente topa o custo | Excelente | Alto | Alta |

**GSAP ScrollTrigger** não é uma 5ª técnica — é o **maestro** que pina a
seção e faz o scrub de qualquer uma das quatro (hoje é 100% gratuito,
incluindo todos os plugins). Em projetos vanilla simples dá pra viver sem
ele (sticky + listener), mas com 2+ cenas encadeadas ele paga o próprio
peso.

## Técnica 1 — Sequência de imagens em canvas (a recomendada)

Como a Apple faz nas páginas de produto (AirPods usa 148 frames JPG de
~30KB). O vídeo do passeio pela casa vira 100–180 imagens; o canvas fica
sticky; cada posição de scroll desenha o frame correspondente.

### Preparando os frames (ffmpeg)

```bash
# vídeo do passeio (8–12s) → frames JPG numerados
ffmpeg -i passeio.mp4 -vf "scale=1600:-2,fps=15" -q:v 4 frames/%04d.jpg
# alvo: 120–180 frames, 30–60KB cada, total < 6MB
# mobile: gerar segunda leva em 900px (frames-m/%04d.jpg)
```

### Implementação vanilla (o esqueleto completo)

```html
<section class="tour" id="tour">          <!-- height: 400vh -->
  <div class="tour-sticky">               <!-- position: sticky; top: 0; height: 100vh -->
    <canvas id="tour-canvas"></canvas>
    <div class="tour-caption" data-range="0,0.3">A sala recebe o sol da manhã.</div>
    <div class="tour-caption" data-range="0.35,0.65">O quarto abraça o silêncio.</div>
    <div class="tour-caption" data-range="0.7,1">A cozinha reúne a casa.</div>
  </div>
</section>
```

```js
const frameCount = 148;
const currentFrame = i => `./assets/frames/${String(i).padStart(4,'0')}.jpg`;
const images = [];
let loaded = 0;

// pré-carregar TUDO antes de liberar a seção (mostre um progresso discreto)
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.onload = () => { if (++loaded === frameCount) ready(); };
  img.src = currentFrame(i);
  images.push(img);
}

const section = document.getElementById('tour');
const canvas = document.getElementById('tour-canvas');
const ctx = canvas.getContext('2d');
let target = 0, current = 0;

function progress() {
  const r = section.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  return Math.min(1, Math.max(0, -r.top / total));
}

// lerp: suaviza o scroll bruto → câmera com peso, sensação cinematográfica
function tick() {
  current += (target - current) * 0.12;
  const frame = Math.min(frameCount - 1, Math.floor(current * frameCount));
  ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
  updateCaptions(current);
  requestAnimationFrame(tick);
}
window.addEventListener('scroll', () => { target = progress(); }, { passive: true });
```

Legendas por ambiente: cada `.tour-caption` tem um intervalo de progresso
(`data-range`); fade-in quando o progresso entra no intervalo, fade-out
quando sai. É isso que transforma o efeito em NARRATIVA (sala → quarto →
cozinha), não só em vídeo bonito.

### Regras de qualidade desta técnica

- `drawImage` com lógica de `object-fit: cover` manual (comparar aspect
  ratio do canvas e do frame) para nunca distorcer.
- Redesenhar só quando o frame muda (guardar o último índice).
- Pré-carregamento com indicador sutil; nunca deixar o usuário scrollar
  para frames ainda não carregados (flicker).
- `image-rendering` padrão; canvas do tamanho do viewport × dpr (máx 2).

## Técnica 2 — Vídeo scrubbed (`video.currentTime`)

A mais intuitiva ("eu acho que ele usa vídeo") e a mais traiçoeira. Mudar
`currentTime` no scroll trava porque o navegador só decodifica rápido em
**keyframes** — e o encode padrão coloca 1 keyframe a cada ~72 frames.

**Reencode obrigatório — keyframe em TODO frame:**

```bash
ffmpeg -i passeio.mp4 -g 1 -an -movflags +faststart -crf 23 passeio-scrub.mp4
# -g 1 = keyframe interval 1 (arquivo cresce ~3-4x; mantenha o vídeo curto)
```

```js
// nunca setar currentTime direto no evento de scroll — sempre com lerp + rAF
video.currentTime = current * video.duration;
```

Limitações: Android engasga mesmo com `-g 1` (nesses casos, caia para a
Técnica 1 ou para o fallback mobile). iOS exige `muted playsinline` e às
vezes só decodifica após interação. Use esta técnica para protótipos e
validação de conceito; para produção, prefira a sequência em canvas.

## Técnica 3 — CSS scroll-driven animations (sem JS)

Nativa: `animation-timeline: scroll()` / `view()` + `animation-range`.
Roda no compositor (60fps de graça). Suporte: Chrome/Edge 115+, Firefox
128+; Safari ainda parcial → **sempre** com `@supports` e a página
funcionando sem o efeito.

```css
/* camadas 2.5D: fundo, meio e primeiro plano em velocidades diferentes */
@supports (animation-timeline: scroll()) {
  .layer-back  { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }
  .layer-front { animation: rise linear both; animation-timeline: view(); animation-range: entry 20% cover 90%; }
}
@keyframes rise { from { transform: translateY(12vh); } to { transform: translateY(0); } }
```

Ótima para: parallax de camadas (foto do ambiente recortada em planos),
barra de progresso do tour, textos que entram/saem, darkening do fundo.
Combina com as Técnicas 1/2: o pesado no canvas, o leve no CSS.

## Técnica 4 — Three.js com câmera em trilho

A câmera percorre uma `CatmullRomCurve3` pela casa 3D real; o progresso
do scroll vira posição na curva (`curve.getPointAt(progress)`). Reserve
para quando o cliente TEM o modelo 3D (arquitetos costumam ter!) e o
projeto justifica React/bundler. GSAP ScrollTrigger com `scrub: 1` +
seção pinada é o padrão para dirigir a timeline. Custo: glTF otimizado
(< 5MB, Draco), iluminação bakeada, e um fallback completo.

## De onde vem o material do passeio? (o segredo do resultado "lindo")

O código é 30% do efeito; o **footage** é os outros 70%. Três origens:

1. **Render 3D do próprio projeto** — arquitetos têm SketchUp/Revit/
   Lumion/D5: pedir um fly-through de 8–12s, movimento LENTO e contínuo,
   sem cortes, 24–30fps, 1080p+.
2. **Vídeo gerado por IA** — gerar a imagem de cada ambiente (prompt
   reverso do curso, mesma paleta/iluminação) e animar com image-to-video
   (movimento de câmera "dolly in/pan lento"), depois encadear. Movimento
   sutil > movimento espetacular.
3. **Filmagem real** — gimbal, caminhada lenta, UMA tomada contínua.

Regra de direção: a câmera anda **para frente** (dolly), nunca chacoalha;
transições entre ambientes atravessando portas/portais mantêm a sensação
de "entrar". 

## Performance e fallbacks (inegociável)

- **Orçamento**: sequência completa < 6MB desktop, < 2MB mobile.
- **Mobile**: frames menores e menos frames (ex.: 60 × 900px) — ou
  degradar com elegância: uma foto full-bleed por ambiente com fade
  (view-timeline/IntersectionObserver). O pilar mobile-first manda:
  experiência REDESENHADA, não encolhida.
- **`prefers-reduced-motion: reduce`**: desativar o scrub; mostrar os
  ambientes como seções estáticas. Sempre.
- **Lazy**: só iniciar o preload quando a seção do tour se aproxima
  (IntersectionObserver com rootMargin generoso).
- O resto da página continua obedecendo a skill: o tour é UMA seção
  (geralmente hero ou vitrine central), não a página inteira.

## Padrão LP Imersiva (as seções da página DENTRO do ambiente)

O nível acima do tour com legendas: os próprios blocos de conteúdo da LP
(filosofia, serviços, prova social, CTA) aparecem conforme a câmera
chega em cada ambiente. O passeio deixa de ser uma seção da página e
vira a **espinha dorsal da narrativa**: cada cômodo é um capítulo.

Estrutura:

1. **Mapa de waypoints** — divida o progresso (0→1) em capítulos, um por
   ambiente, com folga entre eles (ex.: sala 0.10–0.34, quarto 0.42–0.66,
   cozinha 0.74–0.98). Os vãos entre capítulos são as "caminhadas" — sem
   texto, só o espaço falando.
2. **Cards de seção sobrepostos** — cada capítulo tem um card HTML
   (posição fixa dentro do sticky, ex.: canto inferior esquerdo) com o
   conteúdo real da seção: rótulo, título, texto e, no último, o CTA.
   Entram com fade+rise quando o progresso cruza o início do intervalo,
   saem quando cruza o fim. `pointer-events: none` no card, `auto`
   apenas nos botões/links.
3. **O último ambiente fecha a venda** — o capítulo final coincide com o
   destino emocional do passeio (a cozinha, o terraço) e carrega o CTA
   principal. Chegar lá É o argumento.
4. **Âncoras** — os links do menu podem rolar até o ponto de scroll do
   capítulo correspondente (progresso → posição de scroll da seção),
   fazendo a câmera "caminhar até" o assunto.
5. **Versões reduzidas continuam existindo** — as mesmas seções em HTML
   normal abaixo do tour (ou no fallback mobile/reduced-motion). O
   conteúdo NUNCA existe só dentro do 3D: acessibilidade e SEO primeiro.

Regra de ritmo: um capítulo por ambiente, 1 ideia por capítulo, texto
curto (o cenário é quem convence). Esconda navbar e distrações enquanto
o tour ocupa a tela; devolva-as ao sair.

## Checklist da camada Flow

- [ ] Seção de combustível 300–500vh + elemento sticky/pinned
- [ ] Lerp no progresso (nada de mapear scroll cru direto)
- [ ] Frames/vídeo dentro do orçamento de peso; preload com indicador
- [ ] Legendas narrativas por ambiente (intervalos de progresso)
- [ ] Fallback mobile leve + prefers-reduced-motion respeitado
- [ ] Testado em Chrome, Safari e um Android médio
- [ ] O scroll normal da página continua natural antes e depois do tour
