# 📄 CONTEÚDO COMPLETO DE TODOS OS ARQUIVOS

Este documento contém o conteúdo resumido de todos os arquivos principais do projeto reorganizado.

---

## 📁 index.html (180 linhas)

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pesquisa Cega — ...</title>
    
    <!-- CSS em 4 arquivos separados -->
    <link rel="stylesheet" href="assets/css/variables.css" />
    <link rel="stylesheet" href="assets/css/global.css" />
    <link rel="stylesheet" href="assets/css/screens.css" />
    <link rel="stylesheet" href="assets/css/components.css" />
  </head>
  <body>
    <!-- 4 Screens principais -->
    <section class="screen active" id="screen-landing">
      <!-- Landing: Hero + CTA -->
    </section>

    <section class="screen" id="screen-quiz">
      <!-- Quiz: Header + Progress + Body + Footer -->
    </section>

    <section class="screen" id="screen-result">
      <!-- Result: Header + Body com cards -->
    </section>

    <!-- Modal Overlay para perfis -->
    <div class="modal-overlay" id="modal-overlay">
      <!-- Perfil do candidato -->
    </div>

    <!-- 5 Scripts em arquivos separados -->
    <script src="assets/js/data.js"></script>
    <script src="assets/js/utils.js"></script>
    <script src="assets/js/scoring.js"></script>
    <script src="assets/js/ui.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

**Responsabilidade**: Apenas estrutura semântica HTML. Zero CSS ou JS inline.

---

## 🎨 assets/css/variables.css (120 linhas)

```css
:root {
  /* COLORS */
  --navy: #0b1e3d;              /* Cor principal */
  --blue: #1a4fa0;              /* Cor secundária */
  --teal: #0e8a6e;              /* Destaque 1 */
  --teal-accent: #5ce8c5;       /* Destaque 2 */
  --bg: #f2f4f7;                /* Background padrão */
  --white: #ffffff;
  --gray-100: #f0f2f5;
  --gray-200: #e2e6ed;
  --gray-400: #9aa3b0;
  --gray-600: #5a6478;
  --gray-900: #1a2133;
  --green: #0e8a6e;
  --green-light: #d4f5ec;
  --red: #c0392b;
  --red-light: #fde8e6;

  /* SPACING */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 40px;

  /* TYPOGRAPHY */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* SHADOWS */
  --shadow: 0 2px 16px rgba(11, 30, 61, 0.1);
  --shadow-lg: 0 8px 40px rgba(11, 30, 61, 0.15);

  /* TRANSITIONS */
  --transition-fast: 0.15s;
  --transition-normal: 0.25s;
}
```

**Benefício**: Mude cores em um lugar, toda app atualiza.

---

## 🎨 assets/css/global.css (110 linhas)

```css
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* TYPOGRAPHY */
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--gray-900);
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
}

/* BUTTONS RESET */
button {
  font-family: inherit;
  border: none;
  cursor: pointer;
}

/* SCROLLBAR */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 100px;
}
```

**Responsabilidade**: Foundation + normalização.

---

## 🎨 assets/css/screens.css (300 linhas)

```css
/* SCREENS */
.screen {
  display: none;
  min-height: 100vh;
  flex-direction: column;
}

.screen.active {
  display: flex;
}

/* LANDING SCREEN */
#screen-landing {
  background: var(--navy);
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  position: relative;
  overflow: hidden;
}

#screen-landing::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 138, 110, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.landing-inner {
  max-width: 480px;
  text-align: center;
  z-index: 1;
}

.landing-title {
  font-size: clamp(28px, 7vw, 48px);
  font-weight: var(--font-weight-extrabold);
  color: #fff;
  margin-bottom: var(--spacing-lg);
}

/* QUIZ SCREEN */
#screen-quiz {
  background: var(--bg);
  flex-direction: column;
}

.quiz-header {
  background: var(--white);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: 10;
}

.quiz-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
}

.quiz-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
  border-top: 1px solid var(--gray-200);
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
}

/* RESULT SCREEN */
#screen-result {
  background: var(--bg);
}

.result-header {
  background: var(--navy);
  padding: var(--spacing-2xl);
  text-align: center;
}

.result-body {
  padding: var(--spacing-xl);
  max-width: 520px;
  margin: 0 auto;
}
```

**Responsabilidade**: Layout específico de cada tela.

---

## 🎨 assets/css/components.css (400 linhas)

```css
/* BUTTONS */
.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--teal-accent);
  color: var(--navy);
  font-family: var(--font-display);
  padding: 16px 32px;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: transform var(--transition-fast);
  box-shadow: 0 4px 24px rgba(92, 232, 197, 0.35);
}

.btn-start:hover {
  transform: translateY(-2px);
}

.btn-next {
  flex: 1;
  background: var(--navy);
  color: #fff;
  padding: 14px 24px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  opacity: 0.4;
  pointer-events: none;
}

.btn-next.enabled {
  opacity: 1;
  pointer-events: all;
}

/* OPTION BUTTONS */
.option-btn {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--white);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 16px 18px;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.option-btn.selected {
  border-color: var(--teal);
  background: #edfaf6;
  box-shadow: 0 0 0 3px rgba(14, 138, 110, 0.12);
}

/* CARDS */
.top1-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.top23-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* MODAL */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(11, 30, 61, 0.6);
  z-index: 100;
  align-items: flex-end;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.modal-overlay.open {
  display: flex;
}

.modal-box {
  background: var(--white);
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--spacing-xl);
  animation: slideUp var(--transition-normal) ease;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Responsabilidade**: Componentes reutilizáveis (buttons, cards, modal).

---

## 📊 assets/js/data.js (200 linhas)

```javascript
const DATASET = {
  version: '1.0',
  hash: '960e8395',
  updatedAt: '2026-06-01',
  locale: 'pt-BR',

  themes: [
    { id: 'privatizacao', name: 'Privatização' },
    { id: 'seguranca', name: 'Segurança pública' },
    // ... 7 temas total
  ],

  questions: [
    {
      id: 'Q1',
      themeId: 'privatizacao',
      type: 'single',
      text: 'O que o governo deve fazer com empresas estatais?',
      options: [
        { id: 'A', text: '...' },
        { id: 'B', text: '...' },
        { id: 'C', text: '...' }
      ]
    },
    // ... 7 perguntas total
  ],

  candidates: [
    {
      id: 'lula',
      displayName: 'Lula',
      fullName: 'Luiz Inácio Lula da Silva',
      party: 'PT',
      office: 'presidencia',
      color: '#CC0000',
      avatar: 'L',
      shortBio: '...'
    },
    // ... 10 candidatos total
  ],

  profiles: {
    lula: { Q1: 'B', Q2: ['B', 'C'], Q3: 'C', ... },
    // ... respostas de todos candidatos
  }
};
```

**Responsabilidade**: Dados puros, imutáveis, sem lógica.

---

## 🛠️ assets/js/utils.js (80 linhas)

```javascript
const DOM = {
  show: (selector) => {
    const el = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (el) el.classList.add('active');
  },

  hide: (selector) => {
    const el = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (el) el.classList.remove('active');
  },

  setText: (selector, text) => {
    const el = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (el) el.textContent = text;
  },

  setStyle: (selector, property, value) => {
    const el = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    if (el) el.style[property] = value;
  },

  scrollTop: () => window.scrollTo(0, 0)
};

const ArrayUtils = {
  toArray: (value) => Array.isArray(value) ? value : (value ? [value] : []),
  hasValue: (arr, value) => ArrayUtils.toArray(arr).includes(value),
  toggle: (arr, value, max = Infinity) => {
    const a = ArrayUtils.toArray(arr);
    const idx = a.indexOf(value);
    if (idx >= 0) {
      a.splice(idx, 1);
    } else {
      if (a.length < max) a.push(value);
    }
    return a;
  }
};

const SVG_ICONS = {
  arrowRight: `<svg viewBox="0 0 24 24">...</svg>`,
  user: `<svg viewBox="0 0 24 24">...</svg>`
};
```

**Responsabilidade**: Helpers reutilizáveis.

---

## 🧮 assets/js/scoring.js (70 linhas)

```javascript
/**
 * Calcula similaridade entre respostas
 * Single: 0 ou 1
 * Multi: Jaccard (interseção / união)
 */
function scoreQuestion(userAns, candAns, qType) {
  if (qType === 'single') {
    const u = Array.isArray(userAns) ? userAns[0] : userAns;
    const c = Array.isArray(candAns) ? candAns[0] : candAns;
    return u === c ? 1 : 0;
  }

  // Multi: Jaccard Similarity
  const uSet = new Set(Array.isArray(userAns) ? userAns : [userAns]);
  const cSet = new Set(Array.isArray(candAns) ? candAns : [candAns]);
  const intersection = [...uSet].filter(x => cSet.has(x)).length;
  const union = new Set([...uSet, ...cSet]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Calcula score de um candidato
 */
function calcScore(candidateId, userAnswers) {
  const profile = DATASET.profiles[candidateId];
  const themeScores = {};

  for (const theme of DATASET.themes) {
    themeScores[theme.id] = { sum: 0, count: 0 };
  }

  for (const q of DATASET.questions) {
    const uAns = userAnswers[q.id];
    const cAns = profile[q.id];

    if (!uAns || !cAns) continue;

    const score = scoreQuestion(uAns, cAns, q.type);
    themeScores[q.themeId].sum += score;
    themeScores[q.themeId].count += 1;
  }

  // Média geral
  let total = 0, n = 0;
  const perTheme = {};

  for (const theme of DATASET.themes) {
    const ts = themeScores[theme.id];
    if (ts.count > 0) {
      const avg = ts.sum / ts.count;
      perTheme[theme.id] = avg;
      total += avg;
      n++;
    }
  }

  return {
    total: n > 0 ? total / n : 0,
    perTheme
  };
}

/**
 * Retorna ranking ordenado
 */
function getRankings(office, userAnswers) {
  const cands = DATASET.candidates.filter(c => c.office === office);
  return cands
    .map(c => {
      const r = calcScore(c.id, userAnswers);
      return {
        ...c,
        matchPercent: Math.round(r.total * 100),
        perTheme: r.perTheme
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
}
```

**Responsabilidade**: Lógica pura, sem side-effects, testável.

---

## 🎨 assets/js/ui.js (200 linhas)

```javascript
function renderQuestion(questionIndex, userAnswers) {
  const q = DATASET.questions[questionIndex];
  const total = DATASET.questions.length;
  
  // Atualiza progresso
  DOM.setText('#progress-text', `${questionIndex + 1}/${total}`);
  
  // Renderiza tema
  const theme = DATASET.themes.find(t => t.id === q.themeId);
  DOM.setText('#theme-name', theme ? theme.name : '');
  
  // Renderiza pergunta
  DOM.setText('#question-text', q.text);
  
  // Renderiza opções
  renderOptions(q, userAnswers);
}

function renderOptions(question, userAnswers) {
  const list = document.getElementById('options-list');
  list.innerHTML = '';

  const existing = userAnswers[question.id];
  const existingArr = ArrayUtils.toArray(existing);

  question.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (existingArr.includes(opt.id) ? ' selected' : '');
    btn.innerHTML = `
      <span class="option-letter">${opt.id}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.onclick = () => selectOption(opt.id, question, userAnswers);
    list.appendChild(btn);
  });
}

function selectOption(optId, question, userAnswers) {
  if (question.type === 'single') {
    userAnswers[question.id] = optId;
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
  } else {
    const arr = ArrayUtils.toggle(
      ArrayUtils.toArray(userAnswers[question.id]),
      optId,
      question.maxChoices
    );
    userAnswers[question.id] = arr;

    document.querySelectorAll('.option-btn').forEach(b => {
      const letter = b.querySelector('.option-letter').textContent;
      b.classList.toggle('selected', arr.includes(letter));
    });
  }
}

function renderResults(userAnswers) {
  const pres = getRankings('presidencia', userAnswers);
  const gov = getRankings('governador', userAnswers);
  const body = document.getElementById('result-body');

  body.innerHTML =
    renderSection('Presidente', pres) +
    '<div class="result-divider"></div>' +
    renderSection('Governador · Espírito Santo', gov) +
    renderFooter();
}

function openModal(candidateId) {
  const candidate = DATASET.candidates.find(x => x.id === candidateId);
  if (!candidate) return;

  const avatarEl = document.getElementById('modal-avatar');

  if (candidate.avatar.includes('/')) {
    avatarEl.innerHTML = `<img src="${candidate.avatar}" alt="${candidate.displayName}">`;
    avatarEl.style.background = 'transparent';
  } else {
    avatarEl.innerHTML = '';
    avatarEl.textContent = candidate.avatar;
    avatarEl.style.background = candidate.color;
  }

  DOM.setText('#modal-name', candidate.fullName);
  DOM.setText('#modal-bio', candidate.shortBio);

  document.getElementById('modal-overlay').classList.add('open');
}
```

**Responsabilidade**: Renderização HTML pura.

---

## 🚀 assets/js/main.js (50 linhas)

```javascript
// Estado global
let currentQuestionIndex = 0;
let userAnswers = {};

/**
 * Inicializa a aplicação
 */
function init() {
  showScreen('screen-landing');
  document.getElementById('modal-overlay').addEventListener('click', closeModal);
}

/**
 * Mostra uma tela
 */
function showScreen(screenId) {
  DOM.hideAll('.screen');
  DOM.show(`#${screenId}`);
  DOM.scrollTop();
}

/**
 * Inicia o quiz
 */
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = {};
  renderQuestion(currentQuestionIndex, userAnswers);
  showScreen('screen-quiz');
}

/**
 * Próxima pergunta
 */
function nextQuestion() {
  const q = DATASET.questions[currentQuestionIndex];
  const ans = userAnswers[q.id];

  if (!ans || (Array.isArray(ans) && ans.length === 0)) return;

  if (currentQuestionIndex < DATASET.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex, userAnswers);
  } else {
    showResult();
  }
}

/**
 * Pergunta anterior
 */
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex, userAnswers);
  } else {
    showScreen('screen-landing');
  }
}

/**
 * Mostra resultados
 */
function showResult() {
  renderResults(userAnswers);
  showScreen('screen-result');
}

// Inicializa quando DOM pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

**Responsabilidade**: Orquestração e estado global.

---

## 📝 Resumo de Responsabilidades

| Arquivo | Linhas | Responsabilidade | Dependências |
|---------|--------|------------------|--------------|
| data.js | 200 | Dataset puro | Nenhuma |
| utils.js | 80 | DOM + arrays | Nenhuma |
| scoring.js | 70 | Lógica de cálculo | data.js |
| ui.js | 200 | Renderização HTML | data.js, utils.js, scoring.js |
| main.js | 50 | Orquestração | Todas |

---

## ✅ Validação

Todos os arquivos foram criados com:
- ✅ Sintaxe válida (sem erros)
- ✅ Comentários explicativos
- ✅ Nomes de variáveis descritivos
- ✅ Funções puras e reutilizáveis
- ✅ Zero dependências externas (Vanilla JS)
- ✅ Responsividade mobile-first

---

*Conteúdo de referência - Use este documento para consultar a estrutura de cada arquivo.*
