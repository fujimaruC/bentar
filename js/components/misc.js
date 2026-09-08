/* ═══════════════════════════════════════════════════════
   MISC — Click ripple, copy clipboard, signal line,
   stat stagger, work rows reveal, scramble on titles,
   micro-glitch, local time
   ═══════════════════════════════════════════════════════ */

import { reducedMotion } from '../core/reduced-motion.js';
import { scrambleText } from './scramble-text.js';

/* ── CLICK RIPPLE ── */
export function initClickRipple() {
  document.querySelectorAll('.copy-btn,.magnetic-btn,.email-link').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (reducedMotion) return;
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(function () { ripple.remove() }, 700);
    });
  });
}

/* ── COPY TO CLIPBOARD ── */
export function initCopyClipboard() {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.dataset.copy).then(function () {
        const t = document.getElementById('copy-toast');
        t.classList.add('show');
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { t.classList.remove('show'); btn.textContent = orig }, 2000);
      });
    });
  });
}

/* ── SIGNAL LINE ── */
export function initSignalLine() {
  if (reducedMotion) return;

  const sigObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      const line = e.target.querySelector('.signal-line');
      if (line) line.classList.toggle('visible', e.isIntersecting);
    });
  }, { threshold: 0 });

  document.querySelectorAll('[data-signal-line]').forEach(function (el) {
    sigObs.observe(el.parentElement || el);
  });
  document.querySelectorAll('.signal-line').forEach(function (sl) {
    sigObs.observe(sl.parentElement);
  });
}

/* ── STAT STAGGER REVEAL ── */
export function initStatStagger() {
  const statObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const stats = e.target.querySelectorAll('.stat');
        stats.forEach(function (s, i) {
          setTimeout(function () {
            s.style.opacity = '1';
            s.style.transform = 'translateY(0)';
          }, i * 120);
        });
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    statsStrip.querySelectorAll('.stat').forEach(function (s, i) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(20px)';
      s.style.transition = 'opacity .6s var(--ease) ' + (i * 0.12) + 's,transform .6s var(--ease) ' + (i * 0.12) + 's,background .5s var(--ease),color .4s var(--ease)';
    });
    statObs.observe(statsStrip);
  }
}

/* ── WORK ROWS REVEAL ── */
export function initWorkRows() {
  const workRows = document.querySelectorAll('.work-row');
  const workObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        workObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  workRows.forEach(function (r, i) {
    r.style.transitionDelay = (i * 0.12) + 's';
    workObs.observe(r);
  });
}

/* ── SCRAMBLE ON TITLES ── */
export function initScrambleOnTitles() {
  if (reducedMotion) return;

  const scrambled = new Set();
  const titleObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !scrambled.has(e.target)) {
        scrambled.add(e.target);
        const ri = e.target;
        const finalText = ri.textContent;
        scrambleText(ri, finalText, 700);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title .ri').forEach(function (ri) {
    titleObs.observe(ri);
  });

  // Scramble hero name after reveal
  setTimeout(function () {
    if (reducedMotion) return;
    const lines = document.querySelectorAll('.hero-name .line>span');
    if (lines[0]) scrambleText(lines[0], 'Jericho', 900);
    setTimeout(function () {
      if (lines[1]) scrambleText(lines[1], 'Mikael', 900);
    }, 150);
  }, 2600);

  // Scramble nav links on hover
  document.querySelectorAll('nav .links a').forEach(function (a) {
    const origText = a.textContent;
    let hoverScrambled = false;
    a.addEventListener('mouseenter', function () {
      if (hoverScrambled) return;
      hoverScrambled = true;
      scrambleText(a, origText, 180, function () { a.textContent = origText });
    });
    a.addEventListener('mouseleave', function () { hoverScrambled = false });
  });
}

/* ── MICRO-GLITCH ── */
export function initMicroGlitch() {
  if (reducedMotion) return;

  const logo = document.querySelector('nav .logo');
  if (!logo) return;

  // Initial glitch after page load
  setTimeout(function () {
    if (reducedMotion) return;
    logo.classList.add('glitch-active');
    setTimeout(function () { logo.classList.remove('glitch-active') }, 200);
  }, 2200);

  // Random glitch every 20-40 seconds
  setInterval(function () {
    if (Math.random() > 0.4) return;
    logo.classList.add('glitch-active');
    setTimeout(function () { logo.classList.remove('glitch-active') }, 180);
  }, 20000 + Math.random() * 20000);
}

/* ── LOCAL TIME ── */
export function initLocalTime() {
  function time() {
    const now = new Date();
    const el = document.getElementById('local-time');
    if (el) {
      el.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true,
      });
    }
  }
  time();
  setInterval(time, 30000);
}
