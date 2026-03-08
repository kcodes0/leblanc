export function ui4(container) {
  // ── Inject Google Font ──
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // ── Style injection ──
  const style = document.createElement('style');
  style.textContent = `
    /* ── CSS Custom Properties for mouse reactivity ── */
    :root {
      --mouse-x: 0;
      --mouse-y: 0;
      --perspective-x: 0deg;
      --perspective-y: 0deg;
    }

    #ui-4 {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #050510;
      cursor: default;
      font-family: 'Syne', sans-serif;
    }

    /* ── Nebula background ── */
    .orbital-nebula {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 30% 40%, rgba(30, 20, 80, 0.4) 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 70% 60%, rgba(60, 30, 90, 0.3) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(20, 15, 60, 0.5) 0%, transparent 50%),
        radial-gradient(ellipse 90% 50% at 80% 30%, rgba(80, 40, 30, 0.08) 0%, transparent 60%),
        radial-gradient(ellipse 70% 70% at 20% 70%, rgba(40, 60, 120, 0.15) 0%, transparent 55%),
        radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10, 8, 30, 0.8) 0%, transparent 80%);
      z-index: 0;
    }

    /* ── Star field ── */
    .orbital-starfield {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .orbital-star {
      position: absolute;
      border-radius: 50%;
      background: #fff;
    }

    @keyframes orbital-twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }

    /* ── Shooting stars ── */
    .orbital-shooting-star {
      position: absolute;
      width: 80px;
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0));
      opacity: 0;
      z-index: 2;
      transform-origin: left center;
      pointer-events: none;
    }

    @keyframes orbital-shoot {
      0% {
        opacity: 0;
        transform: translateX(0) translateY(0) scaleX(0.3);
      }
      5% {
        opacity: 1;
        transform: translateX(0) translateY(0) scaleX(1);
      }
      30% {
        opacity: 0.6;
        transform: translateX(200px) translateY(80px) scaleX(1);
      }
      50% {
        opacity: 0;
        transform: translateX(400px) translateY(160px) scaleX(0.5);
      }
      100% {
        opacity: 0;
        transform: translateX(400px) translateY(160px) scaleX(0);
      }
    }

    /* ── Central glow orb ── */
    .orbital-core-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 400px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(201, 169, 110, 0.15) 0%,
        rgba(201, 169, 110, 0.08) 25%,
        rgba(123, 108, 183, 0.05) 45%,
        transparent 70%
      );
      filter: blur(40px);
      z-index: 3;
      animation: orbital-core-pulse 8s ease-in-out infinite;
    }

    .orbital-core-glow-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(240, 236, 228, 0.12) 0%,
        rgba(201, 169, 110, 0.08) 30%,
        transparent 70%
      );
      filter: blur(25px);
      z-index: 4;
      animation: orbital-core-pulse 6s ease-in-out infinite 2s;
    }

    @keyframes orbital-core-pulse {
      0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
    }

    /* ── Orbital system wrapper ── */
    .orbital-system {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform-style: preserve-3d;
      perspective: 1200px;
      z-index: 5;
      transform: translate(-50%, -50%)
        rotateX(var(--perspective-x))
        rotateY(var(--perspective-y));
      transition: transform 0.3s ease-out;
    }

    /* ── Orbital rings ── */
    .orbital-ring {
      position: absolute;
      border-radius: 50%;
      transform-style: preserve-3d;
      /* Gradient border via background + mask */
      border: none;
      pointer-events: none;
    }

    .orbital-ring::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      padding: 1px;
      background: var(--ring-gradient);
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
    }

    /* Ring 1 */
    .orbital-ring-1 {
      width: 220px;
      height: 220px;
      top: -110px;
      left: -110px;
      --ring-gradient: linear-gradient(135deg, rgba(201, 169, 110, 0.5), rgba(201, 169, 110, 0.05), rgba(123, 108, 183, 0.3));
      transform: rotateX(68deg) rotateY(15deg);
      animation: orbital-spin-cw 30s linear infinite;
      box-shadow:
        0 0 15px rgba(201, 169, 110, 0.08),
        inset 0 0 15px rgba(201, 169, 110, 0.04);
    }

    /* Ring 2 */
    .orbital-ring-2 {
      width: 320px;
      height: 320px;
      top: -160px;
      left: -160px;
      --ring-gradient: linear-gradient(200deg, rgba(123, 108, 183, 0.5), rgba(100, 180, 220, 0.15), rgba(123, 108, 183, 0.05));
      transform: rotateX(72deg) rotateY(-20deg);
      animation: orbital-spin-ccw 40s linear infinite;
      box-shadow:
        0 0 20px rgba(123, 108, 183, 0.06),
        inset 0 0 20px rgba(123, 108, 183, 0.03);
    }

    /* Ring 3 */
    .orbital-ring-3 {
      width: 440px;
      height: 440px;
      top: -220px;
      left: -220px;
      --ring-gradient: linear-gradient(45deg, rgba(100, 180, 220, 0.4), rgba(201, 169, 110, 0.1), rgba(100, 180, 220, 0.05));
      transform: rotateX(65deg) rotateY(30deg);
      animation: orbital-spin-cw 55s linear infinite;
      box-shadow:
        0 0 25px rgba(100, 180, 220, 0.05),
        inset 0 0 25px rgba(100, 180, 220, 0.02);
    }

    /* Ring 4 */
    .orbital-ring-4 {
      width: 560px;
      height: 560px;
      top: -280px;
      left: -280px;
      --ring-gradient: linear-gradient(160deg, rgba(201, 169, 110, 0.35), rgba(123, 108, 183, 0.2), rgba(201, 169, 110, 0.02));
      transform: rotateX(58deg) rotateY(-10deg) rotateZ(15deg);
      animation: orbital-spin-ccw 45s linear infinite;
      box-shadow:
        0 0 20px rgba(201, 169, 110, 0.04),
        inset 0 0 20px rgba(201, 169, 110, 0.02);
    }

    /* Ring 5 */
    .orbital-ring-5 {
      width: 680px;
      height: 680px;
      top: -340px;
      left: -340px;
      --ring-gradient: linear-gradient(280deg, rgba(123, 108, 183, 0.3), rgba(100, 180, 220, 0.1), rgba(123, 108, 183, 0.02));
      transform: rotateX(75deg) rotateY(25deg) rotateZ(-10deg);
      animation: orbital-spin-cw 60s linear infinite;
      box-shadow:
        0 0 30px rgba(123, 108, 183, 0.04),
        inset 0 0 30px rgba(123, 108, 183, 0.02);
    }

    /* Ring 6 — outermost, very faint */
    .orbital-ring-6 {
      width: 820px;
      height: 820px;
      top: -410px;
      left: -410px;
      --ring-gradient: linear-gradient(90deg, rgba(100, 180, 220, 0.15), rgba(201, 169, 110, 0.08), rgba(100, 180, 220, 0.01));
      transform: rotateX(62deg) rotateY(-30deg) rotateZ(5deg);
      animation: orbital-spin-ccw 50s linear infinite;
      box-shadow:
        0 0 35px rgba(100, 180, 220, 0.03),
        inset 0 0 35px rgba(100, 180, 220, 0.015);
    }

    @keyframes orbital-spin-cw {
      from { transform: rotateX(var(--rx, 68deg)) rotateY(var(--ry, 15deg)) rotateZ(var(--rz, 0deg)); }
      to   { transform: rotateX(var(--rx, 68deg)) rotateY(var(--ry, 15deg)) rotateZ(calc(var(--rz, 0deg) + 360deg)); }
    }

    @keyframes orbital-spin-ccw {
      from { transform: rotateX(var(--rx, 72deg)) rotateY(var(--ry, -20deg)) rotateZ(var(--rz, 0deg)); }
      to   { transform: rotateX(var(--rx, 72deg)) rotateY(var(--ry, -20deg)) rotateZ(calc(var(--rz, 0deg) - 360deg)); }
    }

    /* ── Per-ring rotation custom properties for keyframes ── */
    .orbital-ring-1 { --rx: 68deg; --ry: 15deg; --rz: 0deg; }
    .orbital-ring-2 { --rx: 72deg; --ry: -20deg; --rz: 0deg; }
    .orbital-ring-3 { --rx: 65deg; --ry: 30deg; --rz: 0deg; }
    .orbital-ring-4 { --rx: 58deg; --ry: -10deg; --rz: 15deg; }
    .orbital-ring-5 { --rx: 75deg; --ry: 25deg; --rz: -10deg; }
    .orbital-ring-6 { --rx: 62deg; --ry: -30deg; --rz: 5deg; }

    /* ── Orbital bodies (dots traveling along rings) ── */
    .orbital-body {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 6;
    }

    .orbital-body::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Body on Ring 1 — gold */
    .orbital-body-1 {
      width: 6px;
      height: 6px;
      background: #c9a96e;
      box-shadow:
        0 0 6px 2px rgba(201, 169, 110, 0.6),
        0 0 15px 4px rgba(201, 169, 110, 0.3),
        0 0 30px 8px rgba(201, 169, 110, 0.1);
      top: -3px;
      left: calc(50% - 3px);
      transform-origin: 3px 113px;
      animation: orbital-body-orbit-1 30s linear infinite;
    }

    .orbital-body-1::after {
      width: 14px;
      height: 14px;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.3), transparent 70%);
    }

    @keyframes orbital-body-orbit-1 {
      from { transform: rotate(0deg) translateY(0); }
      to { transform: rotate(360deg) translateY(0); }
    }

    /* Body on Ring 2 — purple */
    .orbital-body-2 {
      width: 5px;
      height: 5px;
      background: #7b6cb7;
      box-shadow:
        0 0 5px 2px rgba(123, 108, 183, 0.6),
        0 0 12px 4px rgba(123, 108, 183, 0.3),
        0 0 25px 6px rgba(123, 108, 183, 0.1);
      top: -2.5px;
      left: calc(50% - 2.5px);
      transform-origin: 2.5px 162.5px;
      animation: orbital-body-orbit-2 40s linear infinite reverse;
    }

    .orbital-body-2::after {
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, rgba(123, 108, 183, 0.3), transparent 70%);
    }

    @keyframes orbital-body-orbit-2 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Body on Ring 3 — white */
    .orbital-body-3 {
      width: 4px;
      height: 4px;
      background: #e8e4dc;
      box-shadow:
        0 0 4px 2px rgba(232, 228, 220, 0.5),
        0 0 10px 3px rgba(232, 228, 220, 0.2),
        0 0 20px 6px rgba(232, 228, 220, 0.08);
      top: -2px;
      left: calc(50% - 2px);
      transform-origin: 2px 222px;
      animation: orbital-body-orbit-3 55s linear infinite;
    }

    .orbital-body-3::after {
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, rgba(232, 228, 220, 0.25), transparent 70%);
    }

    @keyframes orbital-body-orbit-3 {
      from { transform: rotate(45deg); }
      to { transform: rotate(405deg); }
    }

    /* Body on Ring 4 — gold small */
    .orbital-body-4 {
      width: 4px;
      height: 4px;
      background: #c9a96e;
      box-shadow:
        0 0 5px 2px rgba(201, 169, 110, 0.5),
        0 0 12px 3px rgba(201, 169, 110, 0.2);
      top: -2px;
      left: calc(50% - 2px);
      transform-origin: 2px 282px;
      animation: orbital-body-orbit-4 45s linear infinite reverse;
    }

    .orbital-body-4::after {
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.2), transparent 70%);
    }

    @keyframes orbital-body-orbit-4 {
      from { transform: rotate(180deg); }
      to { transform: rotate(540deg); }
    }

    /* Body on Ring 5 — blue-white */
    .orbital-body-5 {
      width: 3px;
      height: 3px;
      background: #94c8dc;
      box-shadow:
        0 0 4px 2px rgba(100, 180, 220, 0.5),
        0 0 10px 3px rgba(100, 180, 220, 0.2);
      top: -1.5px;
      left: calc(50% - 1.5px);
      transform-origin: 1.5px 341.5px;
      animation: orbital-body-orbit-5 60s linear infinite;
    }

    .orbital-body-5::after {
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, rgba(100, 180, 220, 0.2), transparent 70%);
    }

    @keyframes orbital-body-orbit-5 {
      from { transform: rotate(90deg); }
      to { transform: rotate(450deg); }
    }

    /* ── Center text ── */
    .orbital-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      color: #f0ece4;
      letter-spacing: 0.15em;
      z-index: 10;
      user-select: none;
      text-shadow:
        0 0 30px rgba(201, 169, 110, 0.15),
        0 0 60px rgba(201, 169, 110, 0.08),
        0 0 100px rgba(123, 108, 183, 0.05);
      white-space: nowrap;
    }

    /* ── Dust particles (extra atmosphere) ── */
    .orbital-dust {
      position: absolute;
      border-radius: 50%;
      background: rgba(201, 169, 110, 0.15);
      pointer-events: none;
      z-index: 2;
      filter: blur(1px);
    }

    @keyframes orbital-drift {
      0% { transform: translate(0, 0) scale(1); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.3; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ── Build DOM ──

  // Nebula
  const nebula = document.createElement('div');
  nebula.className = 'orbital-nebula';
  container.appendChild(nebula);

  // Star field
  const starfield = document.createElement('div');
  starfield.className = 'orbital-starfield';
  container.appendChild(starfield);

  const starCount = 70;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'orbital-star';
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 4 + 3;
    const baseOpacity = Math.random() * 0.4 + 0.1;

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${baseOpacity};
      animation: orbital-twinkle ${duration}s ease-in-out ${delay}s infinite;
      box-shadow: 0 0 ${size * 2}px rgba(255,255,255,${baseOpacity * 0.5});
    `;
    starfield.appendChild(star);
  }

  // Shooting stars
  const shootingStarContainer = document.createElement('div');
  shootingStarContainer.style.cssText = 'position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;';
  container.appendChild(shootingStarContainer);

  function createShootingStar() {
    const ss = document.createElement('div');
    ss.className = 'orbital-shooting-star';
    const startX = Math.random() * 60 + 10;
    const startY = Math.random() * 40 + 5;
    const angle = Math.random() * 30 + 15;
    const length = Math.random() * 60 + 60;
    const duration = Math.random() * 1.5 + 1;

    ss.style.cssText += `
      left: ${startX}%;
      top: ${startY}%;
      width: ${length}px;
      transform: rotate(${angle}deg);
      animation: orbital-shoot ${duration}s ease-out forwards;
    `;
    shootingStarContainer.appendChild(ss);

    setTimeout(() => {
      if (ss.parentNode) ss.parentNode.removeChild(ss);
    }, duration * 1000 + 100);
  }

  // Schedule shooting stars at random intervals
  const shootingStarIntervals = [];
  function scheduleShootingStar() {
    const delay = Math.random() * 6000 + 3000;
    const timeoutId = setTimeout(() => {
      createShootingStar();
      scheduleShootingStar();
    }, delay);
    shootingStarIntervals.push(timeoutId);
  }
  scheduleShootingStar();
  scheduleShootingStar(); // Two independent schedulers for more variety

  // Core glow
  const coreGlow = document.createElement('div');
  coreGlow.className = 'orbital-core-glow';
  container.appendChild(coreGlow);

  const coreGlowInner = document.createElement('div');
  coreGlowInner.className = 'orbital-core-glow-inner';
  container.appendChild(coreGlowInner);

  // Orbital system
  const system = document.createElement('div');
  system.className = 'orbital-system';
  container.appendChild(system);

  // Create 6 rings
  const ringConfigs = [
    { cls: 'orbital-ring-1', bodies: ['orbital-body-1'] },
    { cls: 'orbital-ring-2', bodies: ['orbital-body-2'] },
    { cls: 'orbital-ring-3', bodies: ['orbital-body-3'] },
    { cls: 'orbital-ring-4', bodies: ['orbital-body-4'] },
    { cls: 'orbital-ring-5', bodies: ['orbital-body-5'] },
    { cls: 'orbital-ring-6', bodies: [] },
  ];

  ringConfigs.forEach(cfg => {
    const ring = document.createElement('div');
    ring.className = `orbital-ring ${cfg.cls}`;

    // Add orbital bodies
    cfg.bodies.forEach(bodyCls => {
      const body = document.createElement('div');
      body.className = `orbital-body ${bodyCls}`;
      ring.appendChild(body);
    });

    system.appendChild(ring);
  });

  // Title
  const title = document.createElement('div');
  title.className = 'orbital-title';
  title.textContent = 'leblanc';
  container.appendChild(title);

  // Floating dust particles
  const dustContainer = document.createElement('div');
  dustContainer.style.cssText = 'position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;';
  container.appendChild(dustContainer);

  const dustParticles = [];
  function createDust() {
    const dust = document.createElement('div');
    dust.className = 'orbital-dust';
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 15 + 10;

    dust.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation: orbital-drift ${duration}s ease-in-out forwards;
    `;

    const isGold = Math.random() > 0.5;
    if (!isGold) {
      dust.style.background = 'rgba(123, 108, 183, 0.12)';
    }

    dustContainer.appendChild(dust);

    setTimeout(() => {
      if (dust.parentNode) dust.parentNode.removeChild(dust);
    }, duration * 1000);
  }

  // Initial batch
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createDust(), Math.random() * 5000);
  }

  // Ongoing dust
  const dustInterval = setInterval(() => {
    createDust();
  }, 2000);

  // ── Mouse parallax ──
  let mouseRAF = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = y * 12; // rotateX responds to vertical mouse
    targetY = x * -12; // rotateY responds to horizontal mouse
  }

  function animateParallax() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    system.style.transform = `translate(-50%, -50%) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    mouseRAF = requestAnimationFrame(animateParallax);
  }

  container.addEventListener('mousemove', onMouseMove);
  mouseRAF = requestAnimationFrame(animateParallax);

  // ── Cleanup ──
  return function cleanup() {
    container.removeEventListener('mousemove', onMouseMove);
    if (mouseRAF) cancelAnimationFrame(mouseRAF);
    clearInterval(dustInterval);
    shootingStarIntervals.forEach(id => clearTimeout(id));
    if (style.parentNode) style.parentNode.removeChild(style);
    if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink);
    container.innerHTML = '';
  };
}
