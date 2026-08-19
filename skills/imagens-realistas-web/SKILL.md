---
name: imagens-realistas-web
description: >-
  Direção de arte e engenharia de prompt para gerar imagens FOTORREALISTAS
  para sites e landing pages, consistentes com a paleta e a narrativa do
  projeto. Use esta skill SEMPRE que um site/LP precisar de imagens — hero,
  cases, retratos de equipe, fotos de produto, backgrounds — mesmo que o
  usuário só diga "coloca uma imagem aí". Funciona em conjunto com a skill
  flow-landing-pages: ela define a direção visual, esta skill transforma a
  direção em prompts prontos para Midjourney/DALL-E/Flux/Ideogram e no
  pipeline de otimização (WebP/AVIF, srcset, abaixo de 200KB). Também acionar
  quando o usuário pedir "prompt de imagem", "foto realista", "asset
  visual" ou reclamar que as imagens do site parecem banco de imagem.
---

# Imagens Realistas para Web

Imagem genérica de banco é detectada pelo olho em 0,5s e mata a confiança
percebida (pilar 5 da flow-landing-pages). Esta skill produz o contrário:
imagens sob medida, com a MESMA luz, paleta e narrativa do site — geradas
por IA a partir de prompts com direção de arte profissional.

**Divisão de trabalho:** Claude faz a direção de arte, escreve os prompts,
define specs e otimiza os arquivos. O usuário cola os prompts na
ferramenta de geração e traz os resultados. Nenhum conector é necessário.

## Etapa 1 — Direção de arte primeiro (nunca prompt solto)

Antes de escrever qualquer prompt, fixe o **Style Core**: um bloco de 3–5
linhas derivado da direção visual do site, que será colado IDÊNTICO no
fim de TODOS os prompts do projeto. É ele que faz 10 imagens parecerem
uma única sessão fotográfica.

```
STYLE CORE (exemplo para direção "Cidade Viva"):
soft natural morning light, warm golden undertones, muted sage green and
warm concrete palette (#6B7A62, #F5F4EF accents), shallow depth of field,
shot on 85mm f/1.8, cinematic color grading, editorial architecture
photography style, no people looking at camera, real textures, subtle film grain
```

Regras do Style Core:
- Luz definida (golden hour / soft overcast / dramatic low-key) — a MESMA
  em todas as imagens.
- Paleta em palavras E em hex (modelos atuais entendem hex).
- Lente e abertura (85mm f/1.8 retrato; 35mm f/4 ambiente; 100mm macro
  detalhe) — coerência de perspectiva.
- 2–3 palavras de "anti-IA": real textures, subtle film grain,
  imperfections — matam o aspecto plástico.

## Etapa 2 — Prompts por slot da página

Cada slot tem especificação própria. Estrutura universal do prompt:

```
[SUJEITO específico e sensorial] + [AÇÃO/ESTADO] + [AMBIENTE] +
[COMPOSIÇÃO/enquadramento] + [STYLE CORE] + [--ar proporção]
```

| Slot | Proporção | Composição |
|------|-----------|------------|
| Hero fullscreen | 16:9 (desktop) + 4:5 (mobile) | ponto focal fora do centro, área "calma" para o texto (negative space no lado do headline) |
| Card de case/projeto | 4:3 | sujeito centrado, fundo limpo |
| Retrato de equipe | 3:4 | 85mm, olhar fora da câmera, fundo do ambiente da marca |
| Banner de seção | 21:9 | horizonte baixo, muito céu/teto (respiro) |
| Detalhe/textura | 1:1 | macro 100mm, uma textura só |

**Sempre gere o par desktop+mobile do hero** — a versão mobile é uma
RECOMPOSIÇÃO (sujeito maior, vertical), não um corte.

Exemplo completo (hero de software house, direção "fria/técnica"):

```
A dimly lit modern engineering office at night, one senior developer
reviewing code on a large monitor, cold blue monitor glow against deep
navy shadows, rain on the window behind, wide 16:9 composition with clean
negative space on the left third for headline text, shot on 35mm f/2.8,
cold cinematic color grading with ice-blue accents (#8FD0E8) on near-black
(#071020), editorial tech photography, real textures, subtle film grain --ar 16:9
```

## Etapa 3 — Escolha da ferramenta (estado atual)

- **Midjourney** — melhor estética out-of-the-box; ótimo para hero e
  mood. Use `--ar`, `--style raw` para menos "cara de MJ".
- **GPT-Image / DALL-E** — melhor obediência a instruções e texto em
  imagem; bom para composições exatas.
- **Flux (via Krea, Freepik, Replicate)** — fotorrealismo forte, boa
  licença comercial nos planos pagos.
- **Ideogram** — o melhor quando a imagem precisa conter TEXTO legível.
- **Stable Diffusion (local/ComfyUI)** — grátis, controle total (LoRA,
  ControlNet) para consistência extrema de produto/personagem.

Consistência entre imagens: mesma ferramenta + mesmo Style Core + (se
disponível) mesma seed / referência de estilo (--sref no Midjourney,
imagem de referência no Flux).

## Etapa 4 — Pipeline de arquivo (inegociável, pilar 8)

1. Receber a imagem em máxima resolução; salvar original em
   `assets/src/` (nunca vai pro site).
2. Exportar para o site: **AVIF ou WebP**, qualidade 75–82.
3. Alvos de peso: hero ≤ 350KB desktop / ≤ 180KB mobile; cards ≤ 120KB;
   fundos mobile ≤ 200KB.
4. `srcset` com 2–3 larguras + `sizes`; `loading="lazy"` em tudo que não
   é o hero; o hero leva `fetchpriority="high"`.
5. `alt` descritivo real (SEO + acessibilidade), nunca "imagem1".
6. Nome de arquivo semântico: `hero-escritorio-noite.avif`.

Comandos úteis (Claude executa):
```bash
# converter e comprimir
ffmpeg -i src.png -vf scale=1920:-2 -quality 80 hero-1920.webp
# ou com sharp/squoosh-cli quando disponível
npx @squoosh/cli --webp '{"quality":78}' --resize '{"width":1920}' src.png
```

## Checklist de qualidade

- [ ] Style Core único aplicado em TODOS os prompts do projeto
- [ ] Luz e paleta batem com a direção visual da LP (mesmos hex)
- [ ] Hero tem par desktop (16:9) + mobile (4:5) recomposto
- [ ] Área de respiro para o texto prevista NA COMPOSIÇÃO
- [ ] Palavras anti-plástico presentes (real textures, film grain)
- [ ] Arquivos em AVIF/WebP dentro dos alvos de peso, com srcset e alt
- [ ] Nenhuma imagem parece banco de imagem (teste dos 0,5 segundos)
