/* ═══════════════════════════════════════════════════════
   EXPERIENCE STATE — Global singleton for site state
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from './reduced-motion.js';

export const state = {
  currentSection: '',
  scrollProgress: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion,
  isMobile,
  avatarState: 'idle',
  animationTime: 0,
};
