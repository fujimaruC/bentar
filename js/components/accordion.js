/* ═══════════════════════════════════════════════════════
   ACCORDION — Capabilities accordion + proficiency bars
   ═══════════════════════════════════════════════════════ */

export function initAccordion() {
  const capItems = document.querySelectorAll('[data-cap]');

  function resetBars(item) {
    item.querySelectorAll('.proficiency i').forEach(function (b) {
      b.style.width = '0%';
    });
  }

  function animateBars(item, bars) {
    bars.forEach(function (b, i) {
      setTimeout(function () {
        if (b.classList.contains('full')) b.style.width = '100%';
        else if (b.classList.contains('two')) b.style.width = '66%';
        else b.style.width = '44%';
      }, i * 100 + 80);
    });
  }

  capItems.forEach(function (item) {
    const toggle = item.querySelector('[data-cap-toggle]');
    const bars = item.querySelectorAll('.proficiency i');

    function open() {
      capItems.forEach(function (o) { if (o !== item) o.classList.remove('open') });
      item.classList.add('open');
      animateBars(item, bars);
    }

    toggle.addEventListener('click', function () {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        resetBars(item);
      } else {
        open();
      }
    });
  });

  // Fill bars of initially-open card once on screen
  const capInitObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const openCap = document.querySelector('.cap.open');
        if (openCap) animateBars(openCap, openCap.querySelectorAll('.proficiency i'));
        capInitObs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const firstOpen = document.querySelector('.cap.open');
  if (firstOpen) capInitObs.observe(firstOpen);

  // Capability lead stagger reveal
  const capObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-cap]').forEach(function (c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
    c.style.transition = 'opacity .7s var(--ease) ' + (i * 0.07) + 's,transform .7s var(--ease) ' + (i * 0.07) + 's';
    capObs.observe(c);
  });
}
