/* ═══════════════════════════════════════════════════════
   CURSOR — Dot + ring lerp, label on hover
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initCursor() {
  if (isMobile || reducedMotion) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!dot || !ring || !label) return;

  let mx = -100, my = -100, dx = -100, dy = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  (function anim() {
    dx += (mx - dx) * 0.15;
    dy += (my - dy) * 0.15;
    rx += (mx - rx) * 0.08;
    ry += (my - ry) * 0.08;
    dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    label.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    requestAnimationFrame(anim);
  })();

  // Expand on interactive elements
  document.querySelectorAll('a,button,.work-row,.focus-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('expanded') });
    el.addEventListener('mouseleave', function () {
      ring.classList.remove('expanded');
      label.classList.remove('visible');
    });
  });

  // Show label from data-cursor-label or data-cursor
  document.querySelectorAll('[data-cursor-label],[data-cursor]').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      const txt = el.getAttribute('data-cursor-label') || el.getAttribute('data-cursor');
      if (txt) { label.textContent = txt; label.classList.add('visible') }
    });
    el.addEventListener('mouseleave', function () { label.classList.remove('visible') });
  });
}
