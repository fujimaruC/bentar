/* ═══════════════════════════════════════════════════════
   PRELOADER — Letter-by-letter name reveal, counter
   ═══════════════════════════════════════════════════════ */

import { reducedMotion } from '../core/reduced-motion.js';

export function initPreloader() {
  const preloaderEl = document.getElementById('preloader');
  const nameEl = document.getElementById('preloader-name');
  const countEl = document.getElementById('preloader-counter');
  const topologyEl = document.getElementById('topology');

  if (reducedMotion) {
    preloaderEl.style.display = 'none';
    return;
  }

  const letters = 'JERICHO MIKAEL'.split('');
  letters.forEach(function (l) {
    const s = document.createElement('span');
    s.textContent = l === ' ' ? '\u00a0' : l;
    nameEl.appendChild(s);
  });

  const spans = nameEl.querySelectorAll('span');
  let prog = 0;

  function tick() {
    prog += 1;
    countEl.textContent = String(Math.floor(prog * (100 / letters.length))).padStart(3, '0');
    const howMany = Math.floor(prog);
    spans.forEach(function (s, i) {
      if (i < howMany && s.textContent !== '\u00a0') s.style.opacity = '1';
    });
    if (prog < letters.length) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(function () {
        preloaderEl.classList.add('done');
        if (topologyEl) topologyEl.classList.add('visible');
      }, 400);
    }
  }

  requestAnimationFrame(tick);
}
