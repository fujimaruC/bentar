/* ═══════════════════════════════════════════════════════
   TILT — 3D perspective tilt on cards
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initTilt() {
  if (isMobile || reducedMotion) return;

  document.querySelectorAll('.focus-card,.work-row').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 7).toFixed(2) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform .5s var(--ease)';
    });
    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform .1s ease-out';
    });
  });
}
