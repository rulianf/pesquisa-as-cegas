/* ═══════════════════════════════════════════ */
/* RESULTADO - Página de resultados            */
/* ═══════════════════════════════════════════ */

/**
 * Inicializa a página de resultados
 */
function initResultPage() {
  // Tenta carregar respostas do sessionStorage
  const respostasJSON = sessionStorage.getItem('pesquisa_respostas');
  
  if (!respostasJSON) {
    // Se não encontrar, redireciona de volta
    window.location.href = 'index.html';
    return;
  }

  const userAnswers = JSON.parse(respostasJSON);
  
  // Renderiza os resultados lado a lado
  renderResultsComLayout(userAnswers);
  
  // Renderiza meta info
  renderMetaInfo();
  
  // Setup modal close
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
}

/**
 * Renderiza resultados com layout responsivo
 */
function renderResultsComLayout(userAnswers) {
  const pres = getRankings('presidencia', userAnswers);
  const gov  = getRankings('governador', userAnswers);

  // Guarda os top 1 para o botão de compartilhamento
  window._topPres = pres[0];
  window._topGov  = gov[0];

  const container = document.getElementById('result-container');

  container.innerHTML = `
    <div class="result-section">
      <div class="result-section-title">Presidente</div>
      ${renderTop1Card(pres[0])}
      <div class="top23-grid">
        ${renderTop23Card(pres[1], '2º lugar')}
        ${renderTop23Card(pres[2], '3º lugar')}
      </div>
    </div>
    <div class="result-section">
      <div class="result-section-title">Governador · Espírito Santo</div>
      ${renderTop1Card(gov[0])}
      <div class="top23-grid">
        ${renderTop23Card(gov[1], '2º lugar')}
        ${renderTop23Card(gov[2], '3º lugar')}
      </div>
    </div>
  `;
}

/**
 * Renderiza informações de meta
 */
function renderMetaInfo() {
  const metaDiv = document.getElementById('result-meta');
  metaDiv.innerHTML = `Versão do dataset: ${DATASET.version} · Hash: ${DATASET.hash} · Atualizado em ${DATASET.updatedAt}`;
}

/**
 * Volta ao quiz
 */
function voltarAoQuiz() {
  sessionStorage.removeItem('pesquisa_respostas');
  window.location.href = 'index.html';
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', initResultPage);  