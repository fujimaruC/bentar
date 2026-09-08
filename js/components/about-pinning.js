/* ═══════════════════════════════════════════════════════
   ABOUT PINNING — Manual scroll-pin for about section
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initAboutPinning() {
  if (isMobile || reducedMotion) return;

  const aboutEl = document.getElementById('about');
  if (!aboutEl) return;

  const rightCol = aboutEl.children[1];
  const focusCards = rightCol ? rightCol.querySelectorAll('.focus-card') : [];
  let pinned = false;
  let ticking = false;

  function resetCards() {
    focusCards.forEach(function (c) {
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    });
  }

  function update() {
    ticking = false;
    const sectionHeight = aboutEl.offsetHeight;
    if (sectionHeight <= window.innerHeight) {
      if (pinned) { pinned = false; aboutEl.classList.remove('pinned'); resetCards() }
      return;
    }
    const rect = aboutEl.getBoundingClientRect();
    const shouldPin = rect.top <= 0 && rect.bottom > window.innerHeight;

    if (shouldPin && !pinned) { pinned = true; aboutEl.classList.add('pinned') }
    else if (!shouldPin && pinned) {
      pinned = false;
      aboutEl.classList.remove('pinned');
      if (rect.bottom <= window.innerHeight) resetCards();
    }

    const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
    focusCards.forEach(function (card, i) {
      const cardThreshold = 0.2 + i * 0.25;
      const cardProgress = Math.max(0, Math.min(1, (progress - cardThreshold) / 0.2));
      card.style.opacity = cardProgress.toFixed(2);
      card.style.transform = 'translateY(' + ((1 - cardProgress) * 25).toFixed(1) + 'px)';
    });
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update) }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
