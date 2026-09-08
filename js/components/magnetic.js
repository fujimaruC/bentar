/* ═══════════════════════════════════════════════════════
   MAGNETIC — Follow-cursor button transform
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initMagnetic() {
  if (isMobile || reducedMotion) return;

  document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.25 + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0,0)';
    });
  });
}
