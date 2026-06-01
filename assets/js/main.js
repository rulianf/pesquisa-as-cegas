/* ═══════════════════════════════════════════ */
/* MAIN - Orquestração da aplicação            */
/* ═══════════════════════════════════════════ */

// Estado global
let currentQuestionIndex = 0;
let userAnswers = {};

/**
 * Inicializa a aplicação
 */
function init() {
  // Reset do estado global
  currentQuestionIndex = 0;
  userAnswers = {};

  // Inicia na tela de landing
  showScreen('screen-landing');

  // Setup modal close
  document.getElementById('modal-overlay').addEventListener('click', closeModal);
}

/**
 * Mostra uma tela específica
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
 * Cancela o quiz e volta ao landing
 */
function cancelQuiz() {
  currentQuestionIndex = 0;
  userAnswers = {};
  showScreen('screen-landing');
}

/**
 * Vai para próxima pergunta
 */
function nextQuestion() {
  const q = DATASET.questions[currentQuestionIndex];
  const ans = userAnswers[q.id];

  // Valida se respondeu
  if (!ans) return;
  
  const ansArr = Array.isArray(ans) ? ans : [ans];
  
  // Para multi-escolha, deve ter EXATAMENTE maxChoices
  if (q.type === 'multi' && ansArr.length !== q.maxChoices) return;
  
  // Avança
  if (currentQuestionIndex < DATASET.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex, userAnswers);
  } else {
    showResult();
  }
}

/**
 * Volta para pergunta anterior
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
 * Mostra tela de resultados
 */
function showResult() {
  // Salva respostas no sessionStorage
  sessionStorage.setItem('pesquisa_respostas', JSON.stringify(userAnswers));
  // Redireciona para página de resultados
  window.location.href = 'resultado.html';
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
