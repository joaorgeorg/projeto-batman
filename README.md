# THE BATMAN — Gotham Archives

Portal interativo em português dedicado ao universo do Batman. Com uma interface inspirada no Batcomputador, o projeto reúne a origem de Bruce Wayne, aliados da Bat-Família, vilões de Gotham, trailers de cinema e equipamentos da Wayne Enterprises.

## Funcionalidades

- **Origem do Batman:** cartões interativos que atualizam um terminal com os principais acontecimentos da história de Bruce Wayne.
- **Bat-Família:** galeria de aliados com filtros e dossiês apresentados em uma janela modal.
- **Galeria de vilões:** personagens de Gotham com efeitos sonoros temáticos.
- **Cinema e trailers:** player do YouTube com uma playlist de filmes do Batman.
- **Bat-equipamentos:** fotografias do Batmóvel Tumbler, Bat-traje, Batpod e cinto de utilidades.
- **Bat-Sinal:** projeção animada acionada pelos botões da página.
- **Modo Detetive:** alternância visual para explorar a interface.
- **Enigma do Charada:** desafio com campo de resposta e feedback interativo.
- **Atmosfera de Gotham:** chuva em Canvas, névoa, cursor personalizado e efeito de inclinação no cartão principal.
- **Áudio interativo:** efeitos sintetizados com Web Audio API e controle para ativar ou desativar o som.
- **Layout responsivo:** adaptação para telas menores e menu de navegação móvel.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura e conteúdo da página |
| CSS3 | Tema visual, responsividade e animações |
| JavaScript | Interações, filtros, dossiês e controle dos trailers |
| Canvas API | Animação da chuva |
| Web Audio API | Síntese dos efeitos sonoros |
| SVG | Símbolos do Batman incorporados à página |
| Font Awesome | Ícones carregados por CDN |
| Google Fonts | Fontes Cinzel, Montserrat e Orbitron |
| YouTube | Reprodução dos trailers incorporados |


## Estrutura do projeto

```text
projeto-batman/
├── assets/
│   └── images/
│       ├── equipment/    # Fotografias dos equipamentos
│       └── ...           # Imagens dos personagens e símbolos
├── .gitignore
├── index.html            # Conteúdo e estrutura da página
├── README.md             # Documentação do projeto
├── script.js             # Comportamentos e efeitos interativos
└── style.css             # Estilos, animações e responsividade
```

## Personalização

- Edite `index.html` para alterar textos, personagens, imagens e trailers.
- Edite `style.css` para ajustar cores, tipografia, espaçamentos e animações.
- Edite `script.js` para modificar os dossiês, os efeitos sonoros e as regras das interações.
- Adicione imagens em `assets/images/` e atualize os caminhos correspondentes no código.

## Autoria e créditos

Desenvolvido por **João Georg** como uma homenagem ao Cavaleiro das Trevas.

Batman e os personagens relacionados pertencem à DC Comics / Warner Bros. Discovery, conforme os créditos apresentados no rodapé do site.
