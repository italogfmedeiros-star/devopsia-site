# Prompts originais do curso Flow (para consulta e reuso verbatim)

Estes são os prompts ensinados no curso, na forma original. Dentro desta
skill, Claude executa essas ações diretamente — mas os textos servem de
referência exata do comportamento esperado e podem ser reaproveitados.

## Prompt Magnético (encerramento de briefing)

Todo prompt inicial de projeto termina com a frase mágica:

```
"Faça-me perguntas para esclarecer."
```

Efeito: inverte o papel — o usuário vira o cliente sendo consultado, e a
IA levanta as ~7 perguntas do briefing antes de escrever qualquer código.

## Prompt Mágico de Síntese (mood board de 5 referências)

Usado após colar 5 screenshots, um elemento admirado por site:

```
"Extraia a essência de cada uma dessas referências:
Tipografia do Site A,
Cores do Site B,
Estrutura de Grid do Site C,
Movimento/Animações do Site D,
Tom de Voz e Conteúdo do Site E.

Combine-as em uma única visão coesa para o design do meu site."
```

## Comando de continuação (após as 3 direções visuais)

```
"Escolhi a Opção X. Comece a programar."
```

## Prompts de auditoria/microcirurgia

```
"Troque a fonte Inter por Geist (ou Lora) em todo o site."
"Reduza a paleta de cores para 4 cores: [preto, creme, dourado, vermelho-sangue]"
"Aumente o padding vertical de todas as seções em 40%."
"Aumente o padding do botão .cta-button para 16px vertical e 32px
horizontal, e mude a cor de fundo para o tom de latão da paleta."
"Mude o background-position da imagem do herói para 'center top' ou
ajuste o object-fit para 'contain'."
"Transforme a seção do menu em um grid de 2 colunas no desktop, mas
mantenha 1 coluna no mobile."
```

Anatomia do prompt de ajuste: **elemento com classe CSS identificada
(via F12) + propriedade + valor específico (px/rem/%) + referência à
paleta existente**. Nunca "deixa mais bonito" ou "aumente um pouco".

## Prompt Reverso (assets de imagem com IA)

Pedido ao Claude:

```
"Com base no estilo visual do site (tons de latão e fogo), escreva um
prompt detalhado para o Midjourney/DALL-E de uma foto de um bife grelhado
na brasa, com iluminação dramática, estilo fotografia de produto de luxo,
lente 85mm, profundidade de campo rasa."
```

Exemplo de prompt gerado (padrão de qualidade a imitar):

```
"A close-up shot of a perfectly grilled ribeye steak on a cast iron
skillet, with visible char marks and glistening juices. Warm golden hour
lighting with dramatic shadows, emphasizing the rich marbling and
caramelized crust. Background features glowing embers and subtle smoke.
Luxury food photography style, shallow depth of field (f/1.8), 85mm prime
lens, cinematic color grading with warm amber and deep crimson tones. The
composition is tight and intimate, focusing on the texture of the meat."
```

Ferramentas: Midjourney (artístico), DALL-E (fotorrealista), Stable
Diffusion (grátis/open-source); imagem → vídeo de movimento sutil em
ferramenta agregadora. Regra: movimento sutil > animação exagerada.

## Prompts de responsivo/mobile

```
"Transforme o menu de navegação em um menu hambúrguer no mobile.
Em telas menores que 768px, o menu deve ser colapsado com um ícone de
hambúrguer. Ao clicar, o menu expande verticalmente."

"No mobile (telas menores que 768px), reduza o tamanho do título (H1)
do herói de 80px para 36px."

"No mobile (telas menores que 768px), substitua o vídeo de fundo do
herói por uma imagem estática (JPG) para economizar dados."
```

## O Prompt de Revisão Mobile (auditoria de usabilidade)

```
"Claude, ative o modo de visualização mobile
e audite a usabilidade.

Verifique se os alvos de toque (botões)
têm pelo menos 44px de altura.
Se não, ajuste.

Esconda elementos decorativos desnecessários
em telas pequenas.

Garanta que o texto flua sem cortes."
```

## Prompts de debugging (sintoma + comportamento esperado)

```
"Claude, o vídeo não está carregando. O erro no console diz '404'.
Verifique o caminho do arquivo src no HTML e corrija para
./assets/meuvideo.mp4"

"Claude, o efeito de scroll está quebrado.
Envolva o código JavaScript em um evento 'DOMContentLoaded'
para garantir que a página esteja totalmente carregada antes de executar."

"Claude, o estilo do botão está bagunçado.
Isole a classe .btn-primary e garanta que ela não herde estilos
indesejados de .button."
```

## Prompt de adaptação de componente (21st.dev → vanilla)

```
"Vi este componente no 21st.dev: [URL ou código do componente].
Quero o mesmo efeito visual de rolagem suave, mas sem usar React.
Reescreva isso em JavaScript vanilla e CSS puro, mantendo a estética."
```

## Gestão de contexto (conversas longas)

Após grandes revisões: fazer backup do código fora do chat, ou pedir

```
"Resuma o projeto até aqui para mim"
```

para comprimir a memória da conversa sem perder o briefing original.
