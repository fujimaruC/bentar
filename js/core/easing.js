/* ═══════════════════════════════════════════════════════
   EASING — Shared curves, lerp, clamp, mapRange
   ═══════════════════════════════════════════════════════ */

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
