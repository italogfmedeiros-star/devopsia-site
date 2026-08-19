# Three.js em Landing Pages Premium (camada 3D da skill Flow)

Three.js (atual: r185) coloca 3D real na página: a casa que gira, a
câmera que atravessa os ambientes de verdade, o produto que o usuário
orbita. É a artilharia pesada da skill — resultado máximo, custo máximo.
Esta referência define QUANDO usar e COMO usar sem destruir a
performance (pilar 8) nem o mobile (pilar 7).

## Quando usar 3D (teste honesto antes de começar)

Use Three.js quando pelo menos um for verdadeiro:

- O cliente TEM um modelo 3D do projeto (arquitetos quase sempre têm:
  SketchUp, Revit, Blender, Lumion) e o tour real pela geometria é o
  diferencial da página.
- O produto merece inspeção espacial (orbitar, aproximar).
- O brief pede explicitamente uma experiência 3D interativa.

NÃO use quando o efeito desejado é só "câmera passeando" — a sequência
de imagens em canvas (`flow-scroll-imersivo.md`, Técnica 1) entrega o
mesmo impacto visual com 20% do custo e zero risco de engasgo. Render
bonito scrubbed > 3D em tempo real mal otimizado, sempre.

## Setup sem build (compatível com a filosofia vanilla do curso)

Não precisa de React nem bundler — import map direto no HTML:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.185.0/examples/jsm/"
  }
}
</script>
<script type="module" src="./scene.js"></script>
```

## Boilerplate mínimo (scene.js)

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, alpha: false, powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // NUNCA acima de 2
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);

// modelo: glTF + Draco (reduz para ~10% do tamanho original)
const draco = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
const loader = new GLTFLoader().setDRACOLoader(draco);
loader.load('./assets/casa.glb', (gltf) => scene.add(gltf.scene));

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

renderer.setAnimationLoop(() => renderer.render(scene, camera));
```

## O tour pela casa: câmera em trilho dirigida pelo scroll

O mesmo princípio da camada Flow (seção 300–500vh + sticky + progresso
0→1 com lerp), mas o progresso move a câmera por uma curva:

```js
// trilho: pontos-chave da caminhada (sala → corredor → quarto → cozinha)
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.6, 8),    // entrada
  new THREE.Vector3(0, 1.6, 3),    // sala
  new THREE.Vector3(2.5, 1.6, 0),  // corredor
  new THREE.Vector3(5, 1.6, -3),   // quarto
  new THREE.Vector3(1, 1.6, -6),   // cozinha
]);
// pontos de "olhar" correspondentes (para onde a câmera aponta)
const lookPath = new THREE.CatmullRomCurve3([ /* alvos por trecho */ ]);

let target = 0, current = 0;
window.addEventListener('scroll', () => { target = sectionProgress(); }, { passive: true });

renderer.setAnimationLoop(() => {
  current += (target - current) * 0.08;           // lerp = câmera com peso
  camera.position.copy(path.getPointAt(current));
  camera.lookAt(lookPath.getPointAt(Math.min(current + 0.04, 1)));
  renderer.render(scene, camera);
});
```

Altura da câmera fixa em ~1.6 (olhos humanos) vende o realismo do
passeio. As legendas por ambiente funcionam igual à camada Flow
(intervalos de progresso). GSAP ScrollTrigger (gratuito) pode substituir
o listener manual quando houver várias cenas encadeadas.

## Pipeline de assets (onde os projetos morrem ou brilham)

1. **Exportar glTF/GLB** do software do arquiteto (Blender exporta
   direto; SketchUp/Revit via plugins ou passando pelo Blender).
2. **Comprimir**: Draco ou `gltfpack` — alvo **< 5MB** no .glb final.
3. **Luz bakeada**: NUNCA iluminar a casa com luzes dinâmicas em tempo
   real (SpotLight/PointLight são caras). Bake das sombras e da luz nas
   texturas (lightmap no Blender) + 1 AmbientLight/HemisphereLight barata.
4. **Texturas**: potência de 2 (512/1024/2048), o menor tamanho que
   aguente a cena; KTX2/basis para economia de memória GPU.
5. **Materiais**: menos materiais únicos = menos draw calls; mesclar
   malhas estáticas quando possível.

## Regras de performance (pilar 8 aplicado ao 3D)

- `setPixelRatio(Math.min(devicePixelRatio, 2))` — celulares chegam a
  DPR 5; acima de 2 é custo invisível.
- Sombras dinâmicas desligadas ou congeladas (`shadowMap.autoUpdate =
  false` após o primeiro frame).
- Pausar o loop quando a seção 3D sai da viewport (IntersectionObserver
  → `renderer.setAnimationLoop(null)`).
- `dispose()` de geometrias/materiais/texturas se a cena for removida.
- Loading elegante: barra/percentual discreto com `LoadingManager`;
  nunca tela branca congelada.
- Teste em um Android médio, não só no desktop do desenvolvedor.

## Pipeline de realismo (o que separa "maquete" de "quase foto")

Em ordem de impacto por esforço:

1. **Tone mapping ACES + exposição** — a mudança mais barata e mais
   visível: `renderer.toneMapping = THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure = 1.0–1.3`. Sem isso, tudo parece
   plástico saturado.
2. **Iluminação por ambiente (IBL)** — materiais PBR reagem a um mapa de
   ambiente, não a luzes pontuais:
   - Sem asset externo: `RoomEnvironment` embutido no Three
     (`pmremGenerator.fromScene(new RoomEnvironment())` →
     `scene.environment`).
   - Com asset: HDRI real do Poly Haven (CC0) via `RGBELoader` +
     `EquirectangularReflectionMapping`. Interiores: HDRIs de estúdio ou
     "indoor" com 1–2k de resolução bastam.
3. **Materiais PBR de verdade** — `MeshStandardMaterial` com `roughness`
   pensado por material (parede 0.9–1.0, madeira 0.6–0.8, metal 0.2–0.4
   com `metalness` 1, tecido 1.0). `MeshLambertMaterial` é maquete.
4. **Luz que atravessa aberturas reais** — janela não é um plano
   brilhante: é um BURACO na parede (construa a parede em 4 segmentos ao
   redor do vão) com uma `DirectionalLight` atravessando e projetando o
   retângulo de luz no chão. `castShadow` na luz,
   `renderer.shadowMap.type = THREE.PCFSoftShadowMap`, `shadow.bias`
   ~-0.0005, mapSize 1024–2048.
5. **Texturas** — o salto de realismo mais barato em peso: texturas CC0
   do ambientCG/Poly Haven (baseColor + normal + roughness, 1k resolve)
   em piso, tecidos e madeira. Em protótipo sem rede, texturas
   procedurais via `CanvasTexture` (tábuas de madeira, ruído de tecido)
   já eliminam o aspecto "cor chapada".
6. **Detalhe arquitetônico mínimo** — rodapés, marcos de porta e
   janela, espessura nas paredes, pé-direito real (2.7–3.1), objetos de
   vida (livros, planta, louça). O olho perdoa geometria simples, não
   perdoa esterilidade.
7. **Lightmap bakeado (nível estúdio)** — para o realismo máximo, bake
   da iluminação global no Blender (Cycles → bake em UV2) e
   `lightMap` no material. É o que os sites premiados fazem.
8. **A fronteira: WebGPU + SSGI** — demos de ponta (ex.: Lumen Decor
   Studio, de Anderson Mancini) usam o `WebGPURenderer` do Three com TSL
   (Three Shading Language) e Screen-Space Global Illumination: a luz
   rebate e "sangra" cor entre superfícies em tempo real, com emissivos
   dinâmicos. Exige navegador com WebGPU e GPU decente — trate como
   camada progressiva sobre o pipeline acima (detecte `navigator.gpu`;
   caia para WebGL + lightmap bakeado no resto). Para 95% das LPs, os
   itens 1–7 entregam o "quase foto"; SSGI é o 5% de vanguarda.

## Onde encontrar assets open source (licenças livres)

| Fonte | O que tem | Licença |
|-------|-----------|---------|
| **Poly Haven** (polyhaven.com) | HDRIs, texturas PBR e modelos glTF de altíssima qualidade | CC0 |
| **ambientCG** (ambientcg.com) | Centenas de texturas PBR (madeira, concreto, tecido) | CC0 |
| **Sketchfab** (filtro "Downloadable" + CC0/CC-BY) | Milhões de modelos, incluindo móveis e interiores | varia — checar cada um |
| **Khronos glTF Sample Assets** (github.com/KhronosGroup) | Modelos de referência para testar pipeline | livre |
| **Quaternius** (quaternius.com) | Packs estilizados low-poly (móveis inclusos) | CC0 |
| **Kenney** (kenney.nl) | Packs enormes low-poly, inclusive furniture kit | CC0 |
| **awesome-cc0** (github.com/madjin/awesome-cc0) | Lista curada de tudo acima | — |

Fluxo recomendado: baixar → abrir no Blender → limpar/merge → exportar
glTF com Draco → conferir peso (< 5MB) → carregar. Citar autoria quando
a licença for CC-BY.

## Fallback obrigatório (mobile e máquinas fracas)

O 3D é progressive enhancement, nunca dependência:

- Detectar WebGL com `WebGLRenderingContext` disponível + heurística de
  hardware (ex.: `navigator.hardwareConcurrency <= 4` → versão leve).
- No mobile, oferecer a versão da camada Flow (sequência de imagens do
  MESMO tour, renderizada a partir do mesmo modelo) ou fotos estáticas
  por ambiente. O render do fallback sai do próprio Blender/Lumion —
  um asset, duas experiências.
- `prefers-reduced-motion: reduce` → câmera parada em cada ambiente,
  transições por fade.

## Checklist 3D

- [ ] O 3D se justifica (modelo existe + é o diferencial) — senão, camada Flow
- [ ] .glb com Draco < 5MB, luz bakeada, texturas potência de 2
- [ ] Pixel ratio limitado a 2; loop pausado fora da viewport
- [ ] Câmera a 1.6 de altura, movimento com lerp, nunca cru
- [ ] Loading com progresso; fallback mobile + reduced-motion prontos
- [ ] 60fps verificados em hardware médio (não só na sua máquina)
