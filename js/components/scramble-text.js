/* ═══════════════════════════════════════════════════════
   SCRAMBLE TEXT — Text decryption/decoder-ring effect
   ═══════════════════════════════════════════════════════ */

import { reducedMotion } from '../core/reduced-motion.js';

const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#________';

export function scrambleText(el, finalText, duration, callback) {
  if (reducedMotion || !el) {
    if (el) el.textContent = finalText;
    if (callback) callback();
    return;
  }
  const len = finalText.length;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    let result = '';
    for (let i = 0; i < len; i++) {
      const charProgress = Math.max(0, (progress * len - i * 0.3) / (len * 0.3));
      if (charProgress >= 1) result += finalText[i];
      else if (finalText[i] === ' ') result += ' ';
      else result += pool[Math.floor(Math.random() * pool.length)];
    }
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(tick);
    else {
      el.textContent = finalText;
      if (callback) callback();
    }
  }

  requestAnimationFrame(tick);
}
