/* ═══════════════════════════════════════════ */
/* SHARE - Geração de imagem para Instagram   */
/* ═══════════════════════════════════════════ */

/**
 * Ponto de entrada principal — tenta Web Share API,
 * cai no download automático se não for suportado.
 */
async function compartilharResultado() {
  const btn = document.getElementById('share-main-btn');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `<span>Gerando imagem…</span>`;
  btn.disabled = true;

  try {
    const blob = await generateShareBlob(window._topPres, window._topGov);
    const file = new File([blob], 'pesquisa-cega-resultado.png', { type: 'image/png' });

    // Tenta Web Share API (mobile)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Pesquisa Cega 2026',
        text: `Fiz a Pesquisa Cega e descobri com quem penso parecido! Presidente: ${window._topPres.displayName} (${window._topPres.matchPercent}%) · Gov ES: ${window._topGov.displayName} (${window._topGov.matchPercent}%). Faça o seu em pesquisacega.com.br`
      });
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    } else {
      // Fallback: download direto
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'pesquisa-cega-resultado.png';
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 3000);

      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Imagem baixada! Abra o Instagram</span>`;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }, 3000);
    }
  } catch (err) {
    // Usuário cancelou o share ou erro
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

/**
 * Gera o canvas e retorna um Blob PNG
 */
async function generateShareBlob(presCandidate, govCandidate) {
  const W = 1080;
  const H = 1920;

  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── 1. Fundo gradiente navy ──────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0,    '#0b1e3d');
  bgGrad.addColorStop(0.55, '#0d2348');
  bgGrad.addColorStop(1,    '#071528');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Grain overlay ────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.025;
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.restore();

  // ── 3. Glows de fundo ───────────────────────────
  fillGlow(ctx, W, H, 200,  400,  600, 'rgba(14,138,110,0.22)');
  fillGlow(ctx, W, H, 900, 1600,  700, 'rgba(26,79,160,0.30)');
  fillGlow(ctx, W, H, W/2, 1000,  500, 'rgba(92,232,197,0.06)');

  // ── 4. Linhas decorativas ───────────────────────
  drawHLine(ctx, W, 270, 'rgba(92,232,197,0.55)', 2);
  drawHLine(ctx, W, H - 200, 'rgba(92,232,197,0.25)', 1);

  // ── 5. Header ───────────────────────────────────
  // Pill badge "PESQUISA CEGA · 2026"
  const pillW = 380, pillH = 60, pillX = (W - pillW) / 2, pillY = 130;
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, pillX, pillY, pillW, pillH, 30);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '500 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PESQUISA CEGA · 2026', W / 2, pillY + 38);

  // Título
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 88px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Meu resultado', W / 2, 390);

  // Subtítulo
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '400 38px sans-serif';
  ctx.fillText('Similaridade de ideias com os candidatos', W / 2, 460);

  // ── 6. Cards dos candidatos ─────────────────────
  const CARD_H     = 580;
  const CARD_W     = 460;
  const CARD_GAP   = 40;
  const CARD_X_L   = (W - (CARD_W * 2 + CARD_GAP)) / 2;
  const CARD_X_R   = CARD_X_L + CARD_W + CARD_GAP;
  const CARD_Y     = 510;

  await drawCandidateCard(ctx, presCandidate, 'Presidente', CARD_X_L, CARD_Y, CARD_W, CARD_H);
  await drawCandidateCard(ctx, govCandidate,  'Gov. ES',    CARD_X_R, CARD_Y, CARD_W, CARD_H);

  // ── 7. CTA central ──────────────────────────────
  const ctaY = CARD_Y + CARD_H + 90;

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('E você, com quem combina?', W / 2, ctaY);

  // Pill com URL
  const urlPillW = 500, urlPillH = 68, urlPillX = (W - urlPillW) / 2, urlPillY = ctaY + 24;
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, urlPillX, urlPillY, urlPillW, urlPillH, 34);
  ctx.fillStyle = 'rgba(92,232,197,0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(92,232,197,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#5ce8c5';
  ctx.font = '600 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('pesquisacega.com.br', W / 2, urlPillY + 44);

  // ── 8. Rodapé disclaimer ────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.font = '400 26px sans-serif';
  ctx.textAlign = 'center';
  canvasWrapText(
    ctx,
    'Similaridade de ideias · não é endosso ou recomendação de voto',
    W / 2, H - 100, W - 180, 38
  );

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

/* ── Helpers de desenho ─────────────────────────── */

function fillGlow(ctx, W, H, cx, cy, radius, color) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawHLine(ctx, W, y, color, width) {
  const g = ctx.createLinearGradient(80, 0, W - 80, 0);
  g.addColorStop(0,   'rgba(0,0,0,0)');
  g.addColorStop(0.25, color);
  g.addColorStop(0.75, color);
  g.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.strokeStyle = g;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(80, y);
  ctx.lineTo(W - 80, y);
  ctx.stroke();
}

function canvasRoundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r, r, r, r];
  const [tl, tr, br, bl] = r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

function canvasWrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY  = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, curY);
      line = word + ' ';
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ── Card de candidato ──────────────────────────── */

async function drawCandidateCard(ctx, candidate, label, x, y, w, h) {
  const r = 32;

  // Sombra
  ctx.save();
  ctx.shadowColor   = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur    = 60;
  ctx.shadowOffsetY = 20;
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.restore();

  // Borda
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.strokeStyle = 'rgba(255,255,255,0.13)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  ctx.restore();

  // Accent bar topo (cor do candidato)
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, 8, [r, r, 0, 0]);
  ctx.fillStyle = candidate.color || '#0e8a6e';
  ctx.fill();
  ctx.restore();

  // Label cargo
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '600 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label.toUpperCase(), x + w / 2, y + 58);

  // Avatar
  const avatarR  = 80;
  const avatarCX = x + w / 2;
  const avatarCY = y + 58 + avatarR + 22;

  // Anel colorido
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCX, avatarCY, avatarR + 5, 0, Math.PI * 2);
  ctx.fillStyle = candidate.color || '#0e8a6e';
  ctx.fill();
  ctx.restore();

  // Foto ou inicial
  try {
    const img = await loadImage(candidate.avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, avatarCX - avatarR, avatarCY - avatarR, avatarR * 2, avatarR * 2);
    ctx.restore();
  } catch {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = candidate.color || '#0e8a6e';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `800 ${avatarR * 0.85}px sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((candidate.displayName || '?')[0], avatarCX, avatarCY);
    ctx.textBaseline = 'alphabetic';
    ctx.restore();
  }

  // Percentual
  const pctY = avatarCY + avatarR + 72;
  ctx.fillStyle = candidate.color || '#5ce8c5';
  ctx.font = '800 96px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${candidate.matchPercent}%`, x + w / 2, pctY);

  // Nome
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px sans-serif';
  ctx.textAlign = 'center';
  canvasWrapText(ctx, candidate.displayName || candidate.fullName || '', x + w / 2, pctY + 46, w - 40, 38);

  // Badge partido
  const badgeW = 120, badgeH = 38, badgeX = x + w / 2 - badgeW / 2, badgeY = pctY + 100;
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 19);
  ctx.fillStyle = (candidate.color || '#0e8a6e') + '33';
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = candidate.color || '#5ce8c5';
  ctx.font = '700 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(candidate.party, x + w / 2, badgeY + 26);
}