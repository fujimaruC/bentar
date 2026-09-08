/* ═══════════════════════════════════════════════════════
   ANIMATION — GSAP registration, shared defaults
   Available for future phases (Part 2/3 features).
   Existing vanilla animations remain untouched.
   ═══════════════════════════════════════════════════════ */

import { reducedMotion } from './reduced-motion.js';

export function initAnimation() {
  if (reducedMotion) return;
  if (!window.gsap) return;

  // Register ScrollTrigger plugin
  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  // Shared defaults for future GSAP animations
  window.gsap.defaults({
    duration: 0.8,
    ease: 'power3.out',
  });

  // ScrollTrigger global config
  if (window.ScrollTrigger) {
    window.ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });
  }
}
