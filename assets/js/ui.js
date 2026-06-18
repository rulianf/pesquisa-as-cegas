/* ═══════════════════════════════════════════ */
/* UI - Renderização de interfaces            */
/* ═══════════════════════════════════════════ */

/**
 * Renderiza HTML de uma pergunta
 */
function renderQuestion(questionIndex, userAnswers) {
  const q = DATASET.questions[questionIndex];
  const total = DATASET.questions.length;
  const pct = Math.round((questionIndex / total) * 100);
  const theme = DATASET.themes.find((t) => t.id === q.themeId);

  // Atualiza progresso
  DOM.setText('#progress-text', `${questionIndex + 1}/${total}`);
  DOM.setStyle('#progress-fill', 'width', `${pct + 14}%`);

  // Atualiza tema
  DOM.setText('#theme-name', theme ? theme.name : '');

  // Atualiza pergunta
  DOM.setText('#question-text', q.text);

  // Mostra/esconde dica de multi-escolha
  const hintEl = document.getElementById('multi-hint');
  if (q.type === 'multi') {
    hintEl.classList.add('show');
    DOM.setText('#max-choices-text', q.maxChoices);
  } else {
    hintEl.classList.remove('show');
  }

  // Atualiza texto do botão próximo
  const btnText = questionIndex === total - 1 ? 'Ver resultado' : 'Próxima';
  DOM.setText('#btn-next-text', btnText);

  // Mostra/esconde botão voltar
  const btnBack = document.getElementById('btn-back');
  btnBack.style.display = questionIndex === 0 ? 'none' : '';

  // Renderiza opções
  renderOptions(q, userAnswers);

  // Atualiza estado do botão próximo
  updateNextButtonState(q, userAnswers);

  // Scroll to top
  document.getElementById('quiz-body').scrollTop = 0;
}

/**
 * Renderiza opções de resposta
 */
function renderOptions(question, userAnswers) {
  const list = document.getElementById('options-list');
  list.innerHTML = '';

  const existing = userAnswers[question.id];
  const existingArr = ArrayUtils.toArray(existing);

  question.options.forEach((opt) => {
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

/**
 * Processa clique em opção
 */
function selectOption(optId, question, userAnswers) {
  if (question.type === 'single') {
    userAnswers[question.id] = optId;
    document.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
  } else {
    // Multi-escolha
    const arr = ArrayUtils.toggle(
      ArrayUtils.toArray(userAnswers[question.id]),
      optId,
      question.maxChoices
    );
    userAnswers[question.id] = arr;

    // Atualiza visual
    document.querySelectorAll('.option-btn').forEach((b) => {
      const letter = b.querySelector('.option-letter').textContent;
      b.classList.toggle('selected', arr.includes(letter));
    });
  }

  updateNextButtonState(question, userAnswers);
}

/**
 * Atualiza estado do botão próximo
 */
function updateNextButtonState(question, userAnswers) {
  const ans = userAnswers[question.id];
  let hasAnswer = false;

  if (question.type === 'single') {
    // Single: qualquer resposta é válida
    hasAnswer = Array.isArray(ans) ? ans.length > 0 : !!ans;
  } else {
    // Multi: EXATAMENTE maxChoices respostas
    const ansArr = Array.isArray(ans) ? ans : (ans ? [ans] : []);
    hasAnswer = ansArr.length === question.maxChoices;
  }

  const btn = document.getElementById('btn-next');
  btn.classList.toggle('enabled', hasAnswer);
}

/**
 * Renderiza tela de resultados
 */
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

/**
 * Renderiza uma seção de resultados (Presidente ou Governador)
 */
function renderSection(label, ranked) {
  const top1 = ranked[0];
  const top2 = ranked[1];
  const top3 = ranked[2];

  return `
    <div class="result-section-label">${label}</div>
    ${renderTop1Card(top1)}
    <div class="top23-grid">
      ${renderTop23Card(top2, '2º lugar')}
      ${renderTop23Card(top3, '3º lugar')}
    </div>
  `;
}

/**
 * Helper: dado um candidato e um themeId, retorna o texto das opções que ele defende
 */
function getCandidateProposal(candidateId, themeId) {
  const profile = DATASET.profiles[candidateId];
  const question = DATASET.questions.find((q) => q.themeId === themeId);
  if (!profile || !question) return null;

  const candAns = profile[question.id];
  if (!candAns) return null;

  const ansIds = Array.isArray(candAns) ? candAns : [candAns];
  const texts = ansIds
    .map((id) => {
      const opt = question.options.find((o) => o.id === id);
      return opt ? opt.text : null;
    })
    .filter(Boolean);

  return texts.length > 0 ? texts.join(' + ') : null;
}

/**
 * Renderiza card do 1º colocado
 */
function renderTop1Card(candidate) {
  const party = DATASET.parties ? DATASET.parties.find((p) => p.id === candidate.party) : null;

  const themes = DATASET.themes
    .map((t) => {
      const score = candidate.perTheme[t.id] !== undefined ? candidate.perTheme[t.id] : null;
      const sim = score !== null && score >= 0.5;
      const proposal = getCandidateProposal(candidate.id, t.id);
      return `
        <div class="theme-row theme-row--with-proposal">
          <div class="theme-row-top">
            <span class="theme-row-name">${t.name}</span>
            <span class="theme-badge ${sim ? 'sim' : 'nao'}"></span>
          </div>
          ${proposal ? `<p class="theme-row-proposal">${proposal}</p>` : ''}
        </div>
      `;
    })
    .join('');

  const watermarkHtml = party && party.logoBig
    ? `<div class="top1-watermark" style="background-image:url('${party.logoBig}')"></div>`
    : '';

  const partyLogoHtml = party && party.logo
    ? `<img class="party-logo-small" src="${party.logo}" alt="${party.id}" onerror="this.style.display='none'">`
    : '';

  return `
    <div class="top1-card">
      ${watermarkHtml}
      <div class="top1-accent" style="background:${candidate.color}"></div>
      <div class="top1-body">
        <div class="top1-main">
          <div class="top1-percent-block">
            <div class="top1-percent" style="color:${candidate.color}">${candidate.matchPercent}%</div>
            <div class="top1-name">${candidate.fullName || candidate.displayName}</div>
            <span class="top1-party-badge" style="background:${candidate.color}18;color:${candidate.color}">
              ${partyLogoHtml}
              ${candidate.party}
            </span>
          </div>
          <div class="top1-avatar" style="background:${candidate.color}">
            ${
                candidate.avatar.includes('/')
                ? `<img src="${candidate.avatar}" alt="${candidate.displayName}">`
                : candidate.avatar
            }
          </div>
        </div>
        <div class="themes-list">${themes}</div>
        <button class="btn-ver-perfil" onclick="openModal('${candidate.id}')">
          ${SVG_ICONS.user}
          Ver perfil
        </button>
      </div>
    </div>
  `;
}

/**
 * Renderiza card do 2º e 3º colocados
 */
function renderTop23Card(candidate, label) {
  const isTopCandidate = label.includes('2º') || label.includes('3º') ? 'top-podium-card' : '';
  const party = DATASET.parties ? DATASET.parties.find((p) => p.id === candidate.party) : null;

  const watermarkHtml = party && party.logoBig
    ? `<div class="top23-watermark" style="background-image:url('${party.logoBig}')"></div>`
    : '';

  const partyLogoHtml = party && party.logo
    ? `<img class="party-logo-small" src="${party.logo}" alt="${party.id}" onerror="this.style.display='none'">`
    : '';

  return `
    <div class="top23-card ${isTopCandidate}">
        ${watermarkHtml}
        <div class="top23-rank">${label}</div>
        <div class="top23-avatar" style="background:${candidate.color}">
        ${
            candidate.avatar.includes('/')
            ? `<img src="${candidate.avatar}" alt="${candidate.displayName}">`
            : candidate.avatar
        }
        </div>
        <div class="top1-percent-block">
            <div class="top23-percent" style="color:${candidate.color}">${candidate.matchPercent}%</div>
            <div class="top23-name">${candidate.displayName}</div>
            <div class="top23-party">
              ${partyLogoHtml}
              ${candidate.party}
            </div>
        </div>
    </div>
  `;
}

/**
 * Renderiza rodapé com info de dataset
 */
function renderFooter() {
  return `
    <div class="result-meta">
      Versão do dataset: ${DATASET.version} · Hash: ${DATASET.hash} · Atualizado em ${DATASET.updatedAt}
    </div>
    <button class="btn-restart" onclick="startQuiz()">Refazer o questionário</button>
  `;
}

/**
 * Abre modal com perfil do candidato
 */
function openModal(candidateId) {
  const candidate = DATASET.candidates.find((x) => x.id === candidateId);
  if (!candidate) return;

  const party = DATASET.parties ? DATASET.parties.find((p) => p.id === candidate.party) : null;
  const office = candidate.office === 'presidencia' ? 'Pré-candidato à Presidência da República' : 'Pré-candidato ao Governo · ES';

  const avatarHtml = candidate.avatar && candidate.avatar.includes('/')
    ? `<img src="${candidate.avatar}" alt="${candidate.displayName}" class="avatar-img">`
    : `<span class="avatar-initials">${candidate.avatar}</span>`;

  const partyLogoHtml = party && party.logo
    ? `<img src="${party.logo}" alt="${party.id}" class="party-logo-small" onerror="this.style.display='none'">`
    : '';

  const igSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;

  const closeSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  const box = document.getElementById('modal-box');
  box.innerHTML = `
    <div class="modal-banner" style="background:${candidate.color};">
      ${party && party.logoBig ? `<img class="modal-watermark" src="${party.logoBig}" alt="" aria-hidden="true">` : ''}
      <div class="modal-banner-actions">
        ${candidate.instagram ? `<a href="${candidate.instagram}" target="_blank" rel="noopener" class="modal-btn-ig" title="Ver no Instagram">${igSvg}</a>` : ''}
        <button class="modal-btn-x" onclick="document.getElementById('modal-overlay').classList.remove('open')" title="Fechar">${closeSvg}</button>
      </div>
      <div class="modal-banner-inner">
        <div class="modal-avatar-large" style="background:${candidate.color};">
          ${avatarHtml}
        </div>
      </div>
    </div>
    <div class="modal-content">
      <div class="modal-identity">
        <div>
          <div class="modal-name">${candidate.fullName || candidate.displayName}</div>
          <div class="modal-office">${office}</div>
        </div>
        <div class="modal-party-chip" style="--chip-color:${candidate.color};">
          ${partyLogoHtml}
        </div>
      </div>
      <p class="modal-bio">${candidate.shortBio}</p>
      <div class="modal-disclaimer">
        A similaridade reflete as respostas do questionário; não é endosso ou recomendação de voto.
      </div>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
}
/**
 * Fecha modal
 */
function closeModal(event) {
  if (event.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').classList.remove('open');
  }
}