/* ═══════════════════════════════════════════════════════
   REDUCED MOTION — Single source of truth
   ═══════════════════════════════════════════════════════ */

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isMobile = window.matchMedia('(max-width: 768px)').matches;
