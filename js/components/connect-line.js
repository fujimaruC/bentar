/* ═══════════════════════════════════════════════════════
   CONNECT LINE — SVG bezier cursor-to-element connector
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initConnectLine() {
  if (isMobile || reducedMotion) return;

  const svg = document.getElementById('connect-svg');
  const path = document.getElementById('connect-path');
  const dot = document.getElementById('connect-dot');
  if (!svg || !path || !dot) return;

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let target = null;

  document.addEventListener('mousemove', function (e) {
    cx = e.clientX;
    cy = e.clientY;
  });

  function bezier(t, p0, p1, p2) {
    const mt = 1 - t;
    return {
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    };
  }

  function loop(time) {
    if (target) {
      const r = target.getBoundingClientRect();
      const tx = r.left + r.width / 2;
      const ty = r.top + r.height / 2;
      const cmx = (cx + tx) / 2 + (ty - cy) * 0.12;
      const cmy = (cy + ty) / 2 + (tx - cx) * -0.12;
      path.setAttribute('d', 'M' + cx + ',' + cy + ' Q' + cmx + ',' + cmy + ' ' + tx + ',' + ty);
      const t = (Math.sin(time / 450) + 1) / 2;
      const p = bezier(t, { x: cx, y: cy }, { x: cmx, y: cmy }, { x: tx, y: ty });
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // Connect to interactive targets
  document.querySelectorAll('.magnetic-btn,.cap-lead,.focus-card,.copy-btn,.work-row,.email-link').forEach(function (el) {
    el.addEventListener('mouseenter', function () { target = el; svg.classList.add('active') });
    el.addEventListener('mouseleave', function () { target = null; svg.classList.remove('active') });
  });
}
