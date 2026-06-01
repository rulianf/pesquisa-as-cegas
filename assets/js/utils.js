/* ═══════════════════════════════════════════ */
/* UTILS - Utilidade gerais                   */
/* ═══════════════════════════════════════════ */

/**
 * Util para manipulação do DOM
 */
const DOM = {
  show: (selector) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.classList.add('active');
  },

  hide: (selector) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.classList.remove('active');
  },

  hideAll: (selector) => {
    document.querySelectorAll(selector).forEach((el) => el.classList.remove('active'));
  },

  addClass: (selector, className) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.classList.add(className);
  },

  removeClass: (selector, className) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.classList.remove(className);
  },

  setText: (selector, text) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.textContent = text;
  },

  setHTML: (selector, html) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.innerHTML = html;
  },

  setAttribute: (selector, attr, value) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.setAttribute(attr, value);
  },

  setStyle: (selector, property, value) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) el.style[property] = value;
  },

  scrollTop: () => window.scrollTo(0, 0)
};

/**
 * Util para arrays
 */
const ArrayUtils = {
  toArray: (value) => (Array.isArray(value) ? value : value ? [value] : []),
  hasValue: (arr, value) => {
    const a = ArrayUtils.toArray(arr);
    return a.includes(value);
  },
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

/**
 * SVG inline - Logo Eye
 */
const SVG_LOGO_EYE = `<svg class="logo-eye" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="24" cy="24" rx="20" ry="13" stroke="#5ce8c5" stroke-width="2.5"/>
  <rect x="8" y="21.5" width="32" height="5" rx="2.5" fill="#0b1e3d"/>
  <circle cx="24" cy="24" r="7" stroke="#5ce8c5" stroke-width="2.5"/>
  <path d="M21 24 A3 3 0 0 1 24 21" stroke="#0e8a6e" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M24 21 A3 3 0 0 1 27 24" stroke="#1a4fa0" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

/**
 * Ícones SVG reutilizáveis
 */
const SVG_ICONS = {
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`
};
