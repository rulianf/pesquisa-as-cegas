/* ═══════════════════════════════════════════ */
/* SCORING - Lógica de pontuação              */
/* ═══════════════════════════════════════════ */

/**
 * Calcula similaridade entre resposta do usuário e resposta do candidato
 * @param {string|string[]} userAns - Resposta do usuário
 * @param {string|string[]} candAns - Resposta do candidato
 * @param {string} qType - Tipo de pergunta ('single' ou 'multi')
 * @returns {number} Score de 0 a 1
 */
function scoreQuestion(userAns, candAns, qType) {
  if (qType === 'single') {
    const u = Array.isArray(userAns) ? userAns[0] : userAns;
    const c = Array.isArray(candAns) ? candAns[0] : candAns;
    return u === c ? 1 : 0;
  }

  // Multi: cada opção correta é 1 acerto
  // Score = acertos individuais / total de opções corretas
  const uSet = new Set(Array.isArray(userAns) ? userAns : [userAns]);
  const cSet = new Set(Array.isArray(candAns) ? candAns : [candAns]);
  const intersection = [...uSet].filter((x) => cSet.has(x)).length;
  
  // Score proporcional: quantas respostas corretas o usuário acertou
  return cSet.size === 0 ? 0 : intersection / cSet.size;
}

/**
 * Calcula score geral e por tema para um candidato
 * @param {string} candidateId - ID do candidato
 * @param {object} userAnswers - Respostas do usuário {Q1: 'A', Q2: ['A', 'B'], ...}
 * @returns {object} { total: number, perTheme: object }
 */
function calcScore(candidateId, userAnswers) {
  const profile = DATASET.profiles[candidateId];
  const themeScores = {};

  // Inicializa scores por tema
  for (const theme of DATASET.themes) {
    themeScores[theme.id] = { sum: 0, count: 0 };
  }

  // Calcula score de cada pergunta
  for (const q of DATASET.questions) {
    const uAns = userAnswers[q.id];
    const cAns = profile[q.id];

    if (!uAns || !cAns) continue;

    const score = scoreQuestion(uAns, cAns, q.type);
    themeScores[q.themeId].sum += score;
    themeScores[q.themeId].count += 1;
  }

  // Calcula média geral e por tema
  let total = 0;
  let n = 0;
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
 * Retorna ranking de candidatos para um cargo
 * @param {string} office - 'presidencia' ou 'governador'
 * @param {object} userAnswers - Respostas do usuário
 * @returns {array} Array de candidatos ordenado por similaridade (decrescente)
 */
function getRankings(office, userAnswers) {
  const cands = DATASET.candidates.filter((c) => c.office === office);

  return cands
    .map((c) => {
      const r = calcScore(c.id, userAnswers);
      return {
        ...c,
        matchPercent: Math.round(r.total * 100),
        perTheme: r.perTheme
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
}
