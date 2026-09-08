/* ═══════════════════════════════════════════════════════
   MAIN.JS — Entry point, imports all modules
   ═══════════════════════════════════════════════════════ */

import { initScrollEngine } from './core/scroll-engine.js';
import { initSectionObserver } from './core/section-observer.js';
import { initAnimation } from './core/animation.js';
import { initPreloader } from './components/preloader.js';
import { initCursor } from './components/cursor.js';
import { initSectionTransition } from './components/section-transition.js';
import { initSignalMeter } from './components/signal-meter.js';
import { initReveal } from './components/reveal.js';
import { initAccordion } from './components/accordion.js';
import { initMagnetic } from './components/magnetic.js';
import { initTilt } from './components/tilt.js';
import { initHeroMesh } from './components/hero-mesh.js';
import { initConnectLine } from './components/connect-line.js';
import {
  initClickRipple,
  initCopyClipboard,
  initSignalLine,
  initStatStagger,
  initWorkRows,
  initScrambleOnTitles,
  initMicroGlitch,
  initLocalTime,
} from './components/misc.js';
import { initAboutPinning } from './components/about-pinning.js';

document.addEventListener('DOMContentLoaded', function () {
  // Core systems
  initScrollEngine();
  initSectionObserver();
  initAnimation();

  // Components
  initPreloader();
  initCursor();
  initSectionTransition();
  initSignalMeter();
  initReveal();
  initAccordion();
  initMagnetic();
  initTilt();
  initHeroMesh();
  initConnectLine();
  initClickRipple();
  initCopyClipboard();
  initSignalLine();
  initStatStagger();
  initWorkRows();
  initScrambleOnTitles();
  initMicroGlitch();
  initLocalTime();
  initAboutPinning();
});
