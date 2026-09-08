/* ═══════════════════════════════════════════════════════
   SCROLL ENGINE — Progress tracking, rAF loop, frame system
   ═══════════════════════════════════════════════════════ */

import { state } from './experience-state.js';

const sectionMeta = {
  hero: { name: 'Home', idx: '00' },
  about: { name: 'About', idx: '01' },
  work: { name: 'Work', idx: '02' },
  capabilities: { name: 'Capabilities', idx: '03' },
  contact: { name: 'Contact', idx: '04' },
};

export function getSectionMeta() {
  return sectionMeta;
}

const frameSubscribers = [];

export function onFrame(fn) {
  frameSubscribers.push(fn);
}

export function initScrollEngine() {
  const progEl = document.getElementById('scroll-progress');

  function updateProgress() {
    const max = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;
    const pct = max > 0 ? (state.scrollY / max) * 100 : 0;
    state.scrollProgress = pct;
    if (progEl) progEl.style.width = pct + '%';

    // Update scroll-linked gradient
    if (!state.reducedMotion) {
      document.body.style.setProperty('--scroll-pct', (pct / 100).toFixed(3));
      document.body.style.setProperty('--gx', (50 + pct * 0.3).toFixed(1) + '%');
      document.body.style.setProperty('--gy', (pct * 0.8).toFixed(1) + '%');
    }
  }

  // Track scroll position
  state.scrollY = window.pageYOffset || 0;
  state.scrollTarget = state.scrollY;

  window.addEventListener('scroll', function () {
    state.scrollY = window.pageYOffset;
    state.scrollTarget = state.scrollY;
  }, { passive: true });

  window.addEventListener('resize', function () {
    state.scrollY = window.pageYOffset;
    state.scrollTarget = state.scrollY;
  });

  // Main loop
  (function main() {
    updateProgress();
    for (let i = 0; i < frameSubscribers.length; i++) {
      frameSubscribers[i]();
    }
    requestAnimationFrame(main);
  })();
}
