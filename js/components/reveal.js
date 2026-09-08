/* ═══════════════════════════════════════════════════════
   REVEAL — IntersectionObserver for .reveal-on-scroll
   ═══════════════════════════════════════════════════════ */

export function initReveal() {
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('revealed');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
    revealObs.observe(el);
  });
}
