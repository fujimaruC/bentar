/* ═══════════════════════════════════════════════════════
   SECTION OBSERVER — IntersectionObserver for active section
   ═══════════════════════════════════════════════════════ */

import { state } from './experience-state.js';
import { onFrame } from './scroll-engine.js';

const sectionIds = ['hero', 'about', 'work', 'capabilities', 'contact'];

export function initSectionObserver() {
  const navLinks = document.querySelectorAll('nav .links a');
  const navEl = document.querySelector('nav');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && e.intersectionRatio > 0.15) {
        state.currentSection = e.target.id;
      }
    });
  }, { threshold: [0.15, 0.3], rootMargin: '-80px 0px -40% 0px' });

  sectionIds.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  onFrame(function () {
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + state.currentSection);
    });
    if (!navEl.classList.contains('nav-locked')) {
      navEl.classList.toggle('scrolled', state.scrollY > 60);
    }
  });
}
