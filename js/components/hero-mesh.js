/* ═══════════════════════════════════════════════════════
   HERO MESH — Three.js 3D particle-network sphere
   ═══════════════════════════════════════════════════════ */

import { reducedMotion, isMobile } from '../core/reduced-motion.js';

export function initHeroMesh() {
  if (isMobile || reducedMotion || !window.THREE) return;

  const canvas = document.getElementById('topology');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5.4;

  const group = new THREE.Group();
  scene.add(group);

  const N = 120;
  const radius = 2.15;
  const positions = [];

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    positions.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
    );
  }

  const ptGeo = new THREE.BufferGeometry().setFromPoints(positions);
  const ptMat = new THREE.PointsMaterial({
    color: 0xff7f3a, size: 0.05, transparent: true, opacity: 0.9, sizeAttenuation: true,
  });
  group.add(new THREE.Points(ptGeo, ptMat));

  const verts = [];
  const maxDist = 1.05;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (positions[i].distanceTo(positions[j]) < maxDist) {
        verts.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xe8e6e1, transparent: true, opacity: 0.05 });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.5, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xff6b1a, transparent: true, opacity: 0.035 })
  );
  group.add(glow);

  const pulseGeo = new THREE.SphereGeometry(0.028, 8, 8);
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.95 });
  const edgePairs = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (positions[i].distanceTo(positions[j]) < maxDist) {
        edgePairs.push([positions[i], positions[j]]);
      }
    }
  }
  const pulses = [];
  for (let i = 0; i < 9; i++) {
    const mesh = new THREE.Mesh(pulseGeo, pulseMat);
    group.add(mesh);
    pulses.push({
      mesh: mesh,
      pair: edgePairs[Math.floor(Math.random() * edgePairs.length)],
      t: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
    });
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    group.position.x = window.innerWidth > 1100 ? 1.75 : (window.innerWidth > 760 ? 0.9 : 0);
  }

  resize();
  window.addEventListener('resize', resize);

  let tmx = 0, tmy = 0, tmxr = 0, tmyr = 0;
  document.addEventListener('mousemove', function (e) {
    tmx = (e.clientX / window.innerWidth - 0.5);
    tmy = (e.clientY / window.innerHeight - 0.5);
  });

  function animate() {
    tmxr += (tmx - tmxr) * 0.035;
    tmyr += (tmy - tmyr) * 0.035;
    group.rotation.y += 0.0014 + tmxr * 0.0006;
    group.rotation.x = tmyr * 0.22 + Math.sin(Date.now() * 0.00018) * 0.025;

    pulses.forEach(function (p) {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.pair = edgePairs[Math.floor(Math.random() * edgePairs.length)];
      }
      const a = p.pair[0], b = p.pair[1];
      p.mesh.position.lerpVectors(a, b, p.t);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
