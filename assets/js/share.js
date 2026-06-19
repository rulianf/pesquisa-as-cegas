/* ═══════════════════════════════════════════ */
/* SHARE - Geração de imagem para Instagram   */
/* ═══════════════════════════════════════════ */

/**
 * Pega o <img> já carregado na página para um candidato.
 */
function getAvatarImgFromDOM(candidateId) {
  const avatarDiv = document.querySelector(`[data-candidate-id="${candidateId}"]`);
  if (!avatarDiv) return null;
  const img = avatarDiv.querySelector('img');
  if (!img || !img.complete || img.naturalWidth === 0) return null;
  return img;
}

/**
 * Ponto de entrada — tenta Web Share API,
 * cai no download automático se não for suportado.
 */
// Gera o texto da legenda
function gerarLegenda() {
  const igHandle = (c) => {
    if (!c.instagram) return c.displayName;
    const m = c.instagram.match(/instagram\.com\/([^/]+)/);
    return m ? '@' + m[1] : c.displayName;
  };
  return (
    `Será que o candidato que você apoia realmente pensa como você?\n\n` +
    `Meu resultado na Pesquisa Cega foi:\n` +
    `🇧🇷 ${igHandle(window._topPres)} — ${window._topPres.matchPercent}%\n` +
    `🗺️ ${igHandle(window._topGov)} — ${window._topGov.matchPercent}%\n\n` +
    `Sem nomes. Sem partidos. Sem precisar informar nenhum dado.\n` +
    `Leva menos de 3 minutos.\n\n` +
    `Faça a sua: https://www.pesquisacega.com.br`
  );
}

async function compartilharResultado() {
  const btn = document.getElementById('share-main-btn');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `<span>Gerando imagem…</span>`;
  btn.disabled = true;

  try {
    const blob = await generateShareBlob(window._topPres, window._topGov);
    const legenda = gerarLegenda();

    const file = new File([blob], 'pesquisa-cega-resultado.png', { type: 'image/png' });

    // Restaura botão
    btn.innerHTML = originalHTML;
    btn.disabled = false;

    // Mostra modal com legenda para copiar + botão compartilhar
    mostrarModalLegenda(blob, file, legenda);
  } catch (err) {
    if (err.name !== 'AbortError') {
      // Erro real — tenta pelo menos baixar
      console.warn('Share error:', err);
    }
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

function baixarBlob(blob) {
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'pesquisa-cega-resultado.png';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

/**
 * Mostra modal com legenda para copiar e botão para compartilhar
 */
function mostrarModalLegenda(blob, file, legenda) {
  // Remove modal anterior se existir
  const existing = document.getElementById('legenda-modal');
  if (existing) existing.remove();

  const podeCompartilharArquivo = navigator.share && navigator.canShare && navigator.canShare({ files: [file] });
  const podeCompartilhar = !!navigator.share;

  const modal = document.createElement('div');
  modal.id = 'legenda-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(11,30,61,0.85);
    backdrop-filter: blur(8px);
    display: flex; align-items: flex-end; justify-content: center;
    padding: 0;
  `;

  modal.innerHTML = `
    <div style="
      background: #fff;
      width: 100%; max-width: 540px;
      border-radius: 28px 28px 0 0;
      padding: 28px 24px 40px;
      box-shadow: 0 -16px 60px rgba(11,30,61,0.3);
      animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <style>@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }</style>

      <!-- Handle -->
      <div style="width:40px;height:4px;background:#e2e6ed;border-radius:2px;margin:0 auto 20px;"></div>

      <!-- Título -->
      <div style="font-family:var(--font-display,sans-serif);font-size:20px;font-weight:800;color:#0b1e3d;margin-bottom:6px;">
        Copie a legenda antes de compartilhar
      </div>
      <div style="font-size:13px;color:#9aa3b0;margin-bottom:16px;">
        O Instagram não aceita texto automático — copie agora e cole ao postar o Story.
      </div>

      <!-- Caixa da legenda -->
      <div id="legenda-box" style="
        background:#f2f4f7;
        border-radius:14px;
        padding:16px;
        font-size:14px;
        line-height:1.6;
        color:#1a2133;
        white-space:pre-wrap;
        margin-bottom:16px;
        cursor:pointer;
        border: 2px solid transparent;
        transition: border-color 0.15s;
      " onclick="copiarLegenda()">${legenda.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</div>

      <!-- Botão copiar -->
      <button onclick="copiarLegenda()" id="btn-copiar-legenda" style="
        width:100%; padding:14px;
        background:#0b1e3d; color:#fff;
        border:none; border-radius:100px;
        font-family:var(--font-display,sans-serif);
        font-size:15px; font-weight:700;
        cursor:pointer; margin-bottom:12px;
        display:flex; align-items:center; justify-content:center; gap:8px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copiar legenda
      </button>

      <!-- Botão compartilhar imagem -->
      <button onclick="doShare()" id="btn-do-share" style="
        width:100%; padding:14px;
        background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);
        color:#fff; border:none; border-radius:100px;
        font-family:var(--font-display,sans-serif);
        font-size:15px; font-weight:700;
        cursor:pointer; margin-bottom:12px;
        display:flex; align-items:center; justify-content:center; gap:8px;
        box-shadow: 0 6px 24px rgba(253,29,29,0.3);
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        Compartilhar imagem
      </button>

      <!-- Fechar -->
      <button onclick="document.getElementById('legenda-modal').remove()" style="
        width:100%; padding:12px;
        background:transparent; color:#9aa3b0;
        border:none; font-size:14px; cursor:pointer;
      ">Fechar</button>
    </div>
  `;

  // Guarda blob e file no modal para o doShare acessar
  modal._blob = blob;
  modal._file = file;
  modal._legenda = legenda;
  modal._podeArquivo = podeCompartilharArquivo;
  modal._podeShare = podeCompartilhar;

  document.body.appendChild(modal);

  // Fecha ao clicar no overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

/**
 * Copia a legenda para o clipboard
 */
async function copiarLegenda() {
  const modal = document.getElementById('legenda-modal');
  if (!modal) return;
  const legenda = modal._legenda;

  try {
    await navigator.clipboard.writeText(legenda);
    const btn = document.getElementById('btn-copiar-legenda');
    const box = document.getElementById('legenda-box');
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      Legenda copiada!`;
    btn.style.background = '#0e8a6e';
    box.style.borderColor = '#0e8a6e';
    setTimeout(() => {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copiar legenda`;
      btn.style.background = '#0b1e3d';
      box.style.borderColor = 'transparent';
    }, 2500);
  } catch (e) {
    // Fallback: seleciona o texto
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('legenda-box'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}

/**
 * Dispara o compartilhamento da imagem
 */
async function doShare() {
  const modal = document.getElementById('legenda-modal');
  if (!modal) return;

  const { _blob, _file, _legenda, _podeArquivo, _podeShare } = modal;
  const btn = document.getElementById('btn-do-share');
  btn.innerHTML = `<span>Abrindo…</span>`;
  btn.disabled = true;

  try {
    if (_podeArquivo) {
      await navigator.share({ files: [_file] });
    } else if (_podeShare) {
      await navigator.share({ title: 'Pesquisa Cega 2026', url: 'https://pesquisacega.com.br' });
      baixarBlob(_blob);
    } else {
      baixarBlob(_blob);
    }
    modal.remove();
  } catch (e) {
    if (e.name !== 'AbortError') console.warn('Share error:', e);
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      Compartilhar imagem`;
    btn.disabled = false;
  }
}

/* ════════════════════════════════════════════
   GERAÇÃO DA IMAGEM
   ════════════════════════════════════════════ */

async function generateShareBlob(presCandidate, govCandidate) {
  const W = 1080;
  const H = 1920;

  const canvas  = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /* ── 1. Fundo ─────────────────────────────── */
  const bg = ctx.createLinearGradient(0, 0, W * 0.4, H);
  bg.addColorStop(0,   '#060f24');
  bg.addColorStop(0.5, '#0a1a38');
  bg.addColorStop(1,   '#071230');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* ── 2. Partículas ───────────────────────── */
  ctx.save();
  for (let i = 0; i < 220; i++) {
    const x  = Math.random() * W;
    const y  = Math.random() * H;
    const r  = Math.random() * 2.2;
    const op = Math.random() * 0.35 + 0.05;
    ctx.globalAlpha = op;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.5 ? '#5ce8c5' : '#ffffff';
    ctx.fill();
  }
  ctx.restore();

  /* ── 3. Glows de fundo ───────────────────── */
  fillGlow(ctx, W, H, W * 0.15, H * 0.18, 520, 'rgba(14,138,110,0.18)');
  fillGlow(ctx, W, H, W * 0.85, H * 0.75, 480, 'rgba(26,79,160,0.22)');
  fillGlow(ctx, W, H, W * 0.5,  H * 0.5,  700, 'rgba(92,232,197,0.04)');

  /* ── 4. Linha decorativa topo ────────────── */
  drawHLine(ctx, W, 310, 'rgba(92,232,197,0.4)', 1.5);

  /* ── 5. Topo: marca + slogan ─────────────── */
  // "PESQUISA CEGA 2026"
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('PESQUISA CEGA 2026', W / 2, 190);
  ctx.letterSpacing = '0px';

  // Slogan
  ctx.fillStyle = 'rgba(92,232,197,0.85)';
  ctx.font = '400 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sem partidos. Sem nomes. Sem influência.', W / 2, 258);

  /* ── 6. Título DEU MATCH ─────────────────── */
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 112px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('💙 DEU MATCH!', W / 2, 430);

  // Subtítulo
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '400 32px sans-serif';
  ctx.textAlign = 'center';
  canvasWrapText(
    ctx,
    'Os candidatos que mais se alinharam às minhas respostas foram:',
    W / 2, 498, W - 160, 44
  );

  /* ── 7. Dois cards ───────────────────────── */
  const CARD_W   = 472;
  const CARD_H   = 620;
  const CARD_GAP = 36;
  const CARD_Y   = 570;
  const CARD_X_L = (W - (CARD_W * 2 + CARD_GAP)) / 2;
  const CARD_X_R = CARD_X_L + CARD_W + CARD_GAP;

  await drawMatchCard(ctx, presCandidate, 'PRESIDENTE', CARD_X_L, CARD_Y, CARD_W, CARD_H);
  await drawMatchCard(ctx, govCandidate,  'GOV. ES',    CARD_X_R, CARD_Y, CARD_W, CARD_H);

  /* ── 8. Texto abaixo dos cards ───────────── */
  const afterCards = CARD_Y + CARD_H + 52;
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '400 28px sans-serif';
  ctx.textAlign = 'center';
  canvasWrapText(
    ctx,
    'Esses foram os pré-candidatos com maior alinhamento às minhas respostas.',
    W / 2, afterCards, W - 160, 40
  );

  /* ── 9. Linha divisória ──────────────────── */
  drawHLine(ctx, W, afterCards + 88, 'rgba(255,255,255,0.1)', 1);

  /* ── 10. CTA inferior ────────────────────── */
  const ctaY = afterCards + 130;

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('E você?', W / 2, ctaY);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '400 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Com quem suas ideias dão match?', W / 2, ctaY + 56);

  // Botão visual "FAÇA O TESTE"
  const btnW = 540, btnH = 88;
  const btnX = (W - btnW) / 2, btnY = ctaY + 96;
  const btnGrad = ctx.createLinearGradient(btnX, 0, btnX + btnW, 0);
  btnGrad.addColorStop(0, '#0e8a6e');
  btnGrad.addColorStop(1, '#5ce8c5');
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, btnX, btnY, btnW, btnH, 44);
  ctx.fillStyle = btnGrad;
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText('FAÇA O TESTE', W / 2, btnY + 57);
  ctx.letterSpacing = '0px';

  // URL abaixo do botão
  ctx.fillStyle = 'rgba(92,232,197,0.9)';
  ctx.font = '500 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('pesquisacega.com.br', W / 2, btnY + btnH + 46);

  /* ── 11. QR Code ─────────────────────────── */
  const qrY = btnY + btnH + 80;
  drawQRCode(ctx, 'pesquisacega.com.br', W / 2 - 90, qrY, 180);

  /* ── 12. Rodapé ──────────────────────────── */
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '400 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Similaridade de ideias. Não constitui recomendação ou endosso eleitoral.', W / 2, H - 56);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

/* ── Card de candidato (match style) ────────────── */

async function drawMatchCard(ctx, candidate, label, x, y, w, h) {
  const r = 28;

  // Sombra
  ctx.save();
  ctx.shadowColor   = `${candidate.color || '#0e8a6e'}66`;
  ctx.shadowBlur    = 48;
  ctx.shadowOffsetY = 16;
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = 'rgba(255,255,255,0.001)';
  ctx.fill();
  ctx.restore();

  // Fundo card com glassmorphism
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  const cardBg = ctx.createLinearGradient(x, y, x, y + h);
  cardBg.addColorStop(0, 'rgba(255,255,255,0.10)');
  cardBg.addColorStop(1, 'rgba(255,255,255,0.04)');
  ctx.fillStyle = cardBg;
  ctx.fill();
  ctx.restore();

  // Borda luminosa
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.strokeStyle = `${candidate.color || '#5ce8c5'}66`;
  ctx.lineWidth   = 2;
  ctx.stroke();
  ctx.restore();

  // Accent bar topo
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, 6, [r, r, 0, 0]);
  const accentGrad = ctx.createLinearGradient(x, 0, x + w, 0);
  accentGrad.addColorStop(0, candidate.color || '#0e8a6e');
  accentGrad.addColorStop(1, lightenHex(candidate.color || '#0e8a6e', 40));
  ctx.fillStyle = accentGrad;
  ctx.fill();
  ctx.restore();

  // Label cargo
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '700 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText(label, x + w / 2, y + 54);
  ctx.letterSpacing = '0px';

  // Avatar circular
  const avatarR  = 96;
  const avatarCX = x + w / 2;
  const avatarCY = y + 54 + avatarR + 48;

  // Anel exterior animado (glow)
  ctx.save();
  const ringGrad = ctx.createRadialGradient(avatarCX, avatarCY, avatarR, avatarCX, avatarCY, avatarR + 12);
  ringGrad.addColorStop(0, `${candidate.color || '#0e8a6e'}cc`);
  ringGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(avatarCX, avatarCY, avatarR + 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Anel sólido
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCX, avatarCY, avatarR + 4, 0, Math.PI * 2);
  ctx.fillStyle = candidate.color || '#0e8a6e';
  ctx.fill();
  ctx.restore();

  // Foto do DOM ou inicial
  const domImg = getAvatarImgFromDOM(candidate.id);
  if (domImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(domImg, avatarCX - avatarR, avatarCY - avatarR, avatarR * 2, avatarR * 2);
    ctx.restore();
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = candidate.color || '#0e8a6e';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `800 ${Math.round(avatarR * 0.85)}px sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((candidate.displayName || '?')[0], avatarCX, avatarCY);
    ctx.textBaseline = 'alphabetic';
    ctx.restore();
  }

  /* ── Percentual — elemento mais chamativo ── */
  const pctY = avatarCY + avatarR + 110;

  // Glow atrás do número
  ctx.save();
  ctx.shadowColor = '#5ce8c5';
  ctx.shadowBlur  = 40;
  ctx.fillStyle   = '#5ce8c5';
  ctx.font        = '800 108px sans-serif';
  ctx.textAlign   = 'center';
  ctx.fillText(`${candidate.matchPercent}%`, x + w / 2, pctY);
  ctx.restore();

  // Label "de alinhamento"
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font      = '400 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('de alinhamento', x + w / 2, pctY + 36);

  // Nome
  ctx.fillStyle = '#ffffff';
  ctx.font      = '700 30px sans-serif';
  ctx.textAlign = 'center';
  canvasWrapText(ctx, candidate.displayName || candidate.fullName || '', x + w / 2, pctY + 90, w - 40, 38);

  // Badge partido
  const badgeW = 130, badgeH = 38;
  const badgeX = x + w / 2 - badgeW / 2;
  const badgeY = pctY + 138;
  ctx.save();
  ctx.beginPath();
  canvasRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 19);
  ctx.fillStyle = (candidate.color || '#0e8a6e') + '2a';
  ctx.fill();
  ctx.strokeStyle = (candidate.color || '#0e8a6e') + '88';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = '#ffffff';
  ctx.font      = '700 21px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(candidate.party, x + w / 2, badgeY + 26);
}

/* ── QR Code simples (matriz visual) ─────────────── */

function drawQRCode(ctx, text, x, y, size) {
  // QR Code simplificado baseado em padrão fixo para URL curta
  // Para produção, use uma lib como qrcode.js — aqui é visual decorativo funcional
  const modules = 21;
  const cell    = size / modules;

  ctx.save();

  // Fundo branco
  ctx.fillStyle = '#ffffff';
  roundedFillRect(ctx, x - 8, y - 8, size + 16, size + 16, 12);

  // Padrão QR para "pesquisacega.com.br" (matriz 21x21 simplificada)
  // Olhos de posicionamento + módulos de dados baseados no hash da URL
  ctx.fillStyle = '#0b1e3d';

  // Função para pintar célula
  const cell_ = (col, row) => {
    ctx.fillRect(
      x + col * cell,
      y + row * cell,
      cell - 0.5,
      cell - 0.5
    );
  };

  // Olho superior-esquerdo (7x7)
  drawQREye(ctx, x, y, cell, 0, 0);
  // Olho superior-direito
  drawQREye(ctx, x, y, cell, 14, 0);
  // Olho inferior-esquerdo
  drawQREye(ctx, x, y, cell, 0, 14);

  // Linhas de timing (col/row 6)
  for (let i = 8; i < 13; i++) {
    if (i % 2 === 0) { cell_(6, i); cell_(i, 6); }
  }

  // Módulo de alinhamento (centro-direita)
  drawQRAlign(ctx, x, y, cell, 16, 16);

  // Módulos de dados — pseudo-aleatórios baseados no texto
  const hash = simpleHash(text);
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (isReserved(col, row)) continue;
      if ((hash ^ (col * 31 + row * 17) ^ (col + row)) % 3 === 0) {
        cell_(col, row);
      }
    }
  }

  ctx.restore();
}

function drawQREye(ctx, x, y, cell, offX, offY) {
  // Borda externa 7x7
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (r === 0 || r === 6 || c === 0 || c === 6) {
        ctx.fillRect(x + (offX + c) * cell, y + (offY + r) * cell, cell - 0.5, cell - 0.5);
      }
    }
  }
  // Centro 3x3
  for (let r = 2; r < 5; r++) {
    for (let c = 2; c < 5; c++) {
      ctx.fillRect(x + (offX + c) * cell, y + (offY + r) * cell, cell - 0.5, cell - 0.5);
    }
  }
}

function drawQRAlign(ctx, x, y, cell, offX, offY) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
        ctx.fillRect(x + (offX + c) * cell, y + (offY + r) * cell, cell - 0.5, cell - 0.5);
      }
    }
  }
}

function isReserved(col, row) {
  // Olhos
  if (col < 9 && row < 9) return true;
  if (col > 12 && row < 9) return true;
  if (col < 9 && row > 12) return true;
  // Timing
  if (col === 6 || row === 6) return true;
  // Alinhamento
  if (col >= 14 && col <= 18 && row >= 14 && row <= 18) return true;
  return false;
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function roundedFillRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  canvasRoundRect(ctx, x, y, w, h, r);
  ctx.fill();
}

/* ── Helpers gerais ─────────────────────────────── */

function fillGlow(ctx, W, H, cx, cy, radius, color) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawHLine(ctx, W, y, color, lineWidth) {
  const g = ctx.createLinearGradient(80, 0, W - 80, 0);
  g.addColorStop(0,    'rgba(0,0,0,0)');
  g.addColorStop(0.2,  color);
  g.addColorStop(0.8,  color);
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.strokeStyle = g;
  ctx.lineWidth   = lineWidth;
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
  let line = '', curY = y;
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

function lightenHex(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}