/* ═══════════════════════════════════════════════════════
   SECTION TRANSITION — Nav click → wipe/warp overlay
   ═══════════════════════════════════════════════════════ */

import { state } from '../core/experience-state.js';
import { getSectionMeta } from '../core/scroll-engine.js';
import { scrambleText } from './scramble-text.js';

export function initSectionTransition() {
  const transitionEl = document.getElementById('section-transition');
  const stLabel = document.getElementById('st-label');
  const stIndex = document.getElementById('st-index');
  const sectionMeta = getSectionMeta();
  let transitioning = false;

  function playSectionTransition(id, jumpFn) {
    const key = id.replace('#', '');
    const meta = sectionMeta[key] || { name: key, idx: '' };

    if (state.reducedMotion) {
      jumpFn();
      return;
    }
    if (transitioning) return;
    transitioning = true;

    stIndex.textContent = meta.idx + ' /// ' + sectionMeta.contact.idx;
    stLabel.textContent = meta.name.toUpperCase();
    transitionEl.classList.remove('revealing');
    void transitionEl.offsetWidth;
    transitionEl.classList.add('covering');
    scrambleText(stLabel, meta.name.toUpperCase(), 380);

    setTimeout(function () {
      jumpFn();
      transitionEl.classList.remove('covering');
      transitionEl.classList.add('revealing');
      setTimeout(function () {
        transitionEl.classList.remove('revealing');
        transitioning = false;
      }, 640);
    }, 520);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = a.getAttribute('href');
      const t = document.querySelector(id);
      if (!t) return;
      let targetY;
      if (id === '#hero') {
        targetY = 0;
      } else {
        targetY = t.getBoundingClientRect().top + state.scrollY;
      }

      playSectionTransition(id, function () {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        state.scrollY = targetY;
        state.scrollTarget = targetY;
      });
    });
  });
}
