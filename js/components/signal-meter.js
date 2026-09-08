/* ═══════════════════════════════════════════════════════
   SIGNAL METER — Nav bars animate on mouse/scroll velocity
   ═══════════════════════════════════════════════════════ */

import { reducedMotion } from '../core/reduced-motion.js';

export function initSignalMeter() {
  if (reducedMotion) return;

  const el = document.getElementById('signal');
  if (!el) return;

  const bars = el.querySelectorAll('i');
  let lastX = 0, lastY = 0, lastT = performance.now(), vel = 0;

  document.addEventListener('mousemove', function (e) {
    const now = performance.now();
    const dt = Math.max(now - lastT, 1);
    vel = Math.min(1, (Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt) * 2);
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
  });

  let lastScroll = window.pageYOffset;
  let lastScrollT = performance.now();
  let scrollVel = 0;

  window.addEventListener('scroll', function () {
    const now = performance.now();
    const dt = Math.max(now - lastScrollT, 1);
    scrollVel = Math.min(1, (Math.abs(window.pageYOffset - lastScroll) / dt) * 3);
    lastScroll = window.pageYOffset;
    lastScrollT = now;
  }, { passive: true });

  let level = 0;

  function loop() {
    const target = Math.max(vel, scrollVel);
    level += (target - level) * 0.08;
    vel *= 0.9;
    scrollVel *= 0.9;
    const activeCount = Math.round(level * 4);
    bars.forEach(function (b, i) { b.style.opacity = i < activeCount ? '1' : '.35' });
    el.classList.toggle('live', level > 0.12);
    requestAnimationFrame(loop);
  }

  loop();
}
