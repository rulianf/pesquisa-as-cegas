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
    <div class="top1-card" style="position:relative;overflow:hidden;">
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
    <div class="top23-card ${isTopCandidate}" style="position:relative;overflow:hidden;">
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
            <div class="top23-party" style="display:flex;align-items:center;gap:4px;">
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

  const avatarEl = document.getElementById('modal-avatar');

  // Se for URL, mostra imagem
  if (
    candidate.avatar &&
    (candidate.avatar.startsWith('http') ||
     candidate.avatar.startsWith('./') ||
     candidate.avatar.startsWith('/'))
  ) {
    avatarEl.style.background = `url('${candidate.avatar}') center/cover no-repeat`;
    avatarEl.textContent = '';
  } else {
    // Senão mostra as iniciais
    avatarEl.style.background = candidate.color;
    avatarEl.textContent = candidate.avatar;
  }

  DOM.setText('#modal-name', candidate.fullName || candidate.displayName);

  const office = candidate.office === 'presidencia'
    ? 'Presidência'
    : 'Governador ES';

  DOM.setText('#modal-party', `${candidate.party} · ${office}`);
  DOM.setText('#modal-bio', candidate.shortBio);

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