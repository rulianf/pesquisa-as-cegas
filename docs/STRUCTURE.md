# Estrutura do Projeto - Pesquisa Cega

## 📁 Arquitetura de Diretórios

```
pesquisa-as-cegas/
├── index.html                      # Arquivo HTML principal (limpo e semantic)
├── assets/                         # Todos os assets do projeto
│   ├── css/                        # Arquivos CSS organizados por responsabilidade
│   │   ├── variables.css           # Design tokens (cores, spacing, fontes, sombras)
│   │   ├── global.css              # Reset, body, typografia global
│   │   ├── screens.css             # Estilos das telas (landing, quiz, result)
│   │   └── components.css          # Componentes reutilizáveis (buttons, cards, modal)
│   ├── js/                         # Arquivos JavaScript modularizados
│   │   ├── data.js                 # Dataset estruturado (perguntas, candidatos, perfis)
│   │   ├── utils.js                # Utilitários (DOM manipulation, arrays, SVG icons)
│   │   ├── scoring.js              # Lógica de pontuação (algoritmo Jaccard)
│   │   ├── ui.js                   # Renderização de interfaces (templates HTML)
│   │   └── main.js                 # Orquestração e estado global da aplicação
│   └── svg/                        # Ícones SVG (para futura organização)
├── docs/
│   ├── STRUCTURE.md                # Este arquivo - documentação da estrutura
│   └── API.md                      # (Opcional) Documentação de funções
├── README.md                       # Guia de início rápido
└── .gitignore                      # (Se usar versionamento)
```

---

## 🎯 Responsabilidades de Cada Arquivo

### CSS

#### `variables.css`
Centraliza todos os design tokens da aplicação para manutenção fácil:
- **Cores**: navy, blue, teal, grays, status colors (green, red)
- **Espaçamento**: xs, sm, md, lg, xl, 2xl, 3xl
- **Border radius**: sm, base, lg, full
- **Sombras**: shadow, shadow-lg
- **Tipografia**: font-family, font-weights
- **Transições**: fast (0.15s), normal (0.25s)

**Benefício**: Mudança de brand colors em um único lugar.

#### `global.css`
- Reset CSS (`* { box-sizing, margin, padding }`)
- Google Fonts import
- Estilos de body, headings, links
- Scrollbar customizado
- Base normalization

#### `screens.css`
Estilos das 3 telas principais:
- **#screen-landing**: Hero com background gradientes, decorações circulares
- **#screen-quiz**: Layout com header sticky, body scrollável, footer fixa
- **#screen-result**: Header navy, body com resultado

Responsividade incluída.

#### `components.css`
Componentes reutilizáveis em toda a app:
- **Buttons**: `.btn-start`, `.btn-back`, `.btn-next`, `.btn-restart`, `.btn-ver-perfil`
- **Option buttons**: `.option-btn`, `.option-letter`, `.option-text`
- **Cards**: `.top1-card`, `.top23-card` com temas e badges
- **Modal**: `.modal-overlay`, `.modal-box`, `.modal-header`

---

### JavaScript

#### `data.js`
Estrutura de dados única (`DATASET`):
```javascript
{
  version, hash, updatedAt, locale,
  themes: [],          // 7 temas de políticas
  questions: [],       // 7 perguntas com opções
  candidates: [],      // 10 candidatos com info
  profiles: {}         // Respostas de cada candidato
}
```

**Vantagem**: Dados completamente separados da lógica - fácil atualizar dataset sem tocar código.

#### `utils.js`
Utilitários reutilizáveis:
- **DOM**: helper methods para show, hide, setText, setHTML, etc.
- **ArrayUtils**: toArray, toggle, hasValue
- **SVG_ICONS**: constantes com ícones inline reutilizáveis

#### `scoring.js`
Lógica de pontuação pura:
- `scoreQuestion()`: Calcula similaridade entre respostas
  - Para `single`: comparação direta (0 ou 1)
  - Para `multi`: Jaccard similarity (interseção / união)
- `calcScore()`: Score geral + por tema de um candidato
- `getRankings()`: Ordena candidatos por similaridade

**Vantagem**: Algoritmo testável e isolado.

#### `ui.js`
Renderização de interfaces:
- `renderQuestion()`: Monta pergunta com opções
- `renderOptions()`: Cria botões de resposta dinamicamente
- `selectOption()`: Processa seleção (single vs multi)
- `renderResults()`: Gera HTML de resultados com cards
- `openModal()` / `closeModal()`: Gerencia modal de perfil

**Vantagem**: Separação entre dados/lógica e apresentação.

#### `main.js`
Orquestração da aplicação:
- Estado global: `currentQuestionIndex`, `userAnswers`
- `init()`: Setup inicial
- `showScreen()`: Navegação entre telas
- `startQuiz()`, `nextQuestion()`, `prevQuestion()`: Fluxo do quiz
- `showResult()`: Exibe resultados

**Vantagem**: Fácil seguir o fluxo da aplicação.

---

## 🔄 Fluxo de Dados

```
DATA.js
  ↓ (Dataset imutável)
main.js (state: currentQuestionIndex, userAnswers)
  ↓
ui.js (renderQuestion, selectOption)
  ↓
scoring.js (calcScore quando mostra results)
  ↓
ui.js (renderResults)
```

---

## 📝 Convenções de Nomenclatura

### IDs HTML (kebab-case)
```html
<section id="screen-landing">
<div id="quiz-body">
<button id="btn-next">
```

### Classes CSS (kebab-case)
```css
.screen { }
.landing-inner { }
.option-btn { }
.btn-start { }
```

### Variáveis CSS (kebab-case com --)
```css
--navy: #0b1e3d;
--spacing-xl: 24px;
```

### Funções JavaScript (camelCase)
```javascript
startQuiz()
renderQuestion()
calculateScore()
```

### Constantes JavaScript (SCREAMING_SNAKE_CASE)
```javascript
const DATASET = { ... }
const SVG_LOGO_EYE = `...`
```

---

## 🚀 Como Adicionar Novas Funcionalidades

### Adicionar nova pergunta
1. Adicione em `data.js` → `DATASET.questions[]`
2. Adicione tema em `DATASET.themes[]` se necessário
3. Adicione respostas em `DATASET.profiles[candidateId]`

### Adicionar novo candidato
1. Adicione em `DATASET.candidates[]`
2. Adicione perfil em `DATASET.profiles[]`

### Adicionar novo estilo
1. Se é token (cor, spacing): edite `variables.css`
2. Se é screen-specific: edite `screens.css`
3. Se é componente reutilizável: edite `components.css`

### Adicionar novo ícone
1. Defina constante em `utils.js` → `SVG_ICONS`
2. Use em `ui.js` como `${SVG_ICONS.novoIcone}`

---

## ✅ Vantagens da Nova Estrutura

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Manutenção** | Tudo em 1 arquivo (3000+ linhas) | Arquivos focados (150-400 linhas cada) |
| **CSS Reutilização** | Estilos espalhados | Variáveis centralizadas |
| **Testabilidade** | Difícil testar funções | `scoring.js` é pura e testável |
| **Escalabilidade** | Fica caótico rápido | Arquitetura modular |
| **Colaboração** | Conflitos merge | Arquivos independentes |
| **Performance** | CSS não minificado | Pronto para build tools |

---

## 🔧 Próximos Passos (Opcional)

1. **Build Tools**: Setup Webpack/Vite para minificação
2. **Testing**: Jest para testar `scoring.js`
3. **Temas**: Sistema de dark mode usando CSS variables
4. **Internacionalização**: Suporte a pt-BR/en/es
5. **API Integration**: Endpoint para atualizar DATASET

---

*Documentação gerada em 2026. Estrutura mantém simplicidade com profissionalismo.*
