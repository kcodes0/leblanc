export function ui1(container) {
  // --- Inject Google Fonts ---
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@200;300;400&family=JetBrains+Mono:wght@300;400&display=swap'
  document.head.appendChild(fontLink)

  // --- CSS Custom Properties for mouse reactivity ---
  container.style.setProperty('--mouse-x', '0.5')
  container.style.setProperty('--mouse-y', '0.5')
  container.style.setProperty('--mouse-dx', '0')
  container.style.setProperty('--mouse-dy', '0')

  // --- Styles ---
  const styleEl = document.createElement('style')
  styleEl.textContent = `
    @keyframes blob1Morph {
      0%, 100% {
        border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
        transform: translate(
          calc(var(--mouse-dx) * 30px),
          calc(var(--mouse-dy) * 30px)
        ) scale(1) rotate(0deg);
      }
      25% {
        border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
        transform: translate(
          calc(var(--mouse-dx) * 30px + 40px),
          calc(var(--mouse-dy) * 30px - 20px)
        ) scale(1.08) rotate(45deg);
      }
      50% {
        border-radius: 30% 70% 40% 60% / 55% 30% 70% 45%;
        transform: translate(
          calc(var(--mouse-dx) * 30px - 30px),
          calc(var(--mouse-dy) * 30px + 30px)
        ) scale(0.95) rotate(90deg);
      }
      75% {
        border-radius: 55% 45% 60% 40% / 70% 50% 50% 30%;
        transform: translate(
          calc(var(--mouse-dx) * 30px + 20px),
          calc(var(--mouse-dy) * 30px + 10px)
        ) scale(1.05) rotate(135deg);
      }
    }

    @keyframes blob2Morph {
      0%, 100% {
        border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%;
        transform: translate(
          calc(var(--mouse-dx) * -25px),
          calc(var(--mouse-dy) * -25px)
        ) scale(1) rotate(0deg);
      }
      33% {
        border-radius: 35% 65% 55% 45% / 40% 70% 30% 60%;
        transform: translate(
          calc(var(--mouse-dx) * -25px - 50px),
          calc(var(--mouse-dy) * -25px + 40px)
        ) scale(1.12) rotate(60deg);
      }
      66% {
        border-radius: 65% 35% 45% 55% / 55% 35% 65% 45%;
        transform: translate(
          calc(var(--mouse-dx) * -25px + 35px),
          calc(var(--mouse-dy) * -25px - 25px)
        ) scale(0.92) rotate(120deg);
      }
    }

    @keyframes blob3Morph {
      0%, 100% {
        border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
        transform: translate(
          calc(var(--mouse-dx) * 20px),
          calc(var(--mouse-dy) * 20px)
        ) scale(1) rotate(0deg);
      }
      20% {
        border-radius: 40% 60% 35% 65% / 65% 40% 60% 35%;
        transform: translate(
          calc(var(--mouse-dx) * 20px + 30px),
          calc(var(--mouse-dy) * 20px + 50px)
        ) scale(1.06) rotate(36deg);
      }
      40% {
        border-radius: 55% 45% 65% 35% / 35% 55% 45% 65%;
        transform: translate(
          calc(var(--mouse-dx) * 20px - 45px),
          calc(var(--mouse-dy) * 20px - 15px)
        ) scale(0.97) rotate(72deg);
      }
      60% {
        border-radius: 45% 55% 40% 60% / 60% 35% 65% 40%;
        transform: translate(
          calc(var(--mouse-dx) * 20px + 15px),
          calc(var(--mouse-dy) * 20px - 40px)
        ) scale(1.1) rotate(108deg);
      }
      80% {
        border-radius: 35% 65% 50% 50% / 45% 65% 35% 55%;
        transform: translate(
          calc(var(--mouse-dx) * 20px - 20px),
          calc(var(--mouse-dy) * 20px + 25px)
        ) scale(0.94) rotate(144deg);
      }
    }

    @keyframes blob4Morph {
      0%, 100% {
        border-radius: 45% 55% 60% 40% / 55% 45% 55% 45%;
        transform: translate(
          calc(var(--mouse-dx) * -18px),
          calc(var(--mouse-dy) * 15px)
        ) scale(1) rotate(0deg);
      }
      50% {
        border-radius: 60% 40% 45% 55% / 40% 60% 40% 60%;
        transform: translate(
          calc(var(--mouse-dx) * -18px + 45px),
          calc(var(--mouse-dy) * 15px - 35px)
        ) scale(1.08) rotate(90deg);
      }
    }

    @keyframes blob5Morph {
      0%, 100% {
        border-radius: 55% 45% 50% 50% / 45% 55% 45% 55%;
        transform: translate(
          calc(var(--mouse-dx) * 22px),
          calc(var(--mouse-dy) * -20px)
        ) scale(1) rotate(0deg);
      }
      33% {
        border-radius: 40% 60% 65% 35% / 60% 40% 60% 40%;
        transform: translate(
          calc(var(--mouse-dx) * 22px - 35px),
          calc(var(--mouse-dy) * -20px + 45px)
        ) scale(1.1) rotate(60deg);
      }
      66% {
        border-radius: 65% 35% 40% 60% / 35% 65% 35% 65%;
        transform: translate(
          calc(var(--mouse-dx) * 22px + 25px),
          calc(var(--mouse-dy) * -20px - 20px)
        ) scale(0.93) rotate(120deg);
      }
    }

    @keyframes goldPulse {
      0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1.15);
      }
    }

    @keyframes particleFloat {
      0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(var(--drift-x, 20px));
        opacity: 0;
      }
    }

    @keyframes titleReveal {
      0% {
        opacity: 0;
        letter-spacing: 0.6em;
        filter: blur(20px);
      }
      100% {
        opacity: 1;
        letter-spacing: 0.25em;
        filter: blur(0px);
      }
    }

    @keyframes subtitleReveal {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 0.7;
        transform: translateY(0);
      }
    }

    @keyframes grainAnim {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-5%, -10%); }
      20% { transform: translate(-15%, 5%); }
      30% { transform: translate(7%, -25%); }
      40% { transform: translate(-5%, 25%); }
      50% { transform: translate(-15%, 10%); }
      60% { transform: translate(15%, 0%); }
      70% { transform: translate(0%, 15%); }
      80% { transform: translate(3%, 35%); }
      90% { transform: translate(-10%, 10%); }
    }

    @keyframes breathe {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.02);
      }
    }

    @keyframes lineExpand {
      0% {
        width: 0;
        opacity: 0;
      }
      100% {
        width: 120px;
        opacity: 0.3;
      }
    }

    @keyframes navDotPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(201, 169, 110, 0.4);
      }
      50% {
        box-shadow: 0 0 12px 4px rgba(201, 169, 110, 0.15);
      }
    }

    .ln-root {
      position: relative;
      width: 100%;
      height: 100vh;
      background: #0a0a0a;
      overflow: hidden;
      cursor: crosshair;
      font-family: 'Syne', sans-serif;
    }

    /* Deep layered background gradients */
    .ln-bg-layer {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 20% 80%, rgba(26, 16, 64, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 80% 20%, rgba(15, 26, 46, 0.35) 0%, transparent 55%),
        radial-gradient(ellipse 90% 50% at 50% 50%, rgba(45, 27, 105, 0.15) 0%, transparent 70%),
        radial-gradient(ellipse 40% 40% at 70% 70%, rgba(201, 169, 110, 0.05) 0%, transparent 50%);
      z-index: 1;
    }

    /* Liquid blobs */
    .ln-blob {
      position: absolute;
      filter: blur(80px);
      will-change: transform, border-radius;
      pointer-events: none;
    }

    .ln-blob-1 {
      width: 500px;
      height: 500px;
      top: -10%;
      left: -5%;
      background: radial-gradient(circle, #2d1b69 0%, #1a1040 40%, transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.7;
      animation: blob1Morph 18s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
    }

    .ln-blob-2 {
      width: 600px;
      height: 600px;
      top: 20%;
      right: -10%;
      background: radial-gradient(circle, #0f1a2e 0%, #1a1040 50%, transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.6;
      animation: blob2Morph 22s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 2;
    }

    .ln-blob-3 {
      width: 450px;
      height: 450px;
      bottom: -5%;
      left: 30%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.5) 0%, rgba(45, 27, 105, 0.3) 40%, transparent 70%);
      mix-blend-mode: overlay;
      opacity: 0.5;
      animation: blob3Morph 25s cubic-bezier(0.42, 0, 0.58, 1) infinite;
      z-index: 2;
    }

    .ln-blob-4 {
      width: 350px;
      height: 350px;
      top: 50%;
      left: -8%;
      background: radial-gradient(circle, #1a1040 0%, rgba(15, 26, 46, 0.6) 50%, transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.55;
      animation: blob4Morph 20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
    }

    .ln-blob-5 {
      width: 550px;
      height: 550px;
      top: -15%;
      right: 20%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.25) 0%, rgba(26, 16, 64, 0.4) 45%, transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.45;
      animation: blob5Morph 28s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 2;
    }

    /* Gold glow behind text */
    .ln-gold-glow {
      position: absolute;
      width: 600px;
      height: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba(201, 169, 110, 0.15) 0%, rgba(201, 169, 110, 0.05) 40%, transparent 70%);
      filter: blur(40px);
      animation: goldPulse 6s ease-in-out infinite;
      z-index: 3;
      pointer-events: none;
    }

    /* Frosted glass panel */
    .ln-glass-panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(90vw, 800px);
      padding: 80px 60px;
      background: rgba(10, 10, 10, 0.25);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(201, 169, 110, 0.08);
      border-radius: 2px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: breathe 8s ease-in-out infinite;
      box-shadow:
        0 0 80px rgba(0, 0, 0, 0.5),
        inset 0 0 80px rgba(0, 0, 0, 0.1);
    }

    .ln-title {
      font-family: 'Syne', sans-serif;
      font-weight: 200;
      font-size: clamp(4rem, 12vw, 10rem);
      color: #f0ece4;
      letter-spacing: 0.25em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
      text-shadow:
        0 0 60px rgba(201, 169, 110, 0.2),
        0 0 120px rgba(201, 169, 110, 0.08);
      animation: titleReveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      position: relative;
      z-index: 11;
    }

    .ln-divider {
      width: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), transparent);
      margin: 28px 0 24px;
      animation: lineExpand 2s 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ln-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: clamp(0.7rem, 1.5vw, 0.95rem);
      color: #f0ece4;
      letter-spacing: 0.5em;
      text-transform: lowercase;
      margin: 0;
      opacity: 0;
      animation: subtitleReveal 1.8s 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      cursor: pointer;
      padding: 12px 24px;
      border: 1px solid rgba(201, 169, 110, 0.1);
      border-radius: 1px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      z-index: 11;
    }

    .ln-subtitle:hover {
      border-color: rgba(201, 169, 110, 0.35);
      background: rgba(201, 169, 110, 0.04);
      text-shadow: 0 0 20px rgba(201, 169, 110, 0.3);
      letter-spacing: 0.6em;
    }

    /* Noise grain overlay */
    .ln-grain {
      position: absolute;
      inset: -200%;
      width: 500%;
      height: 500%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: 50;
      pointer-events: none;
      animation: grainAnim 8s steps(10) infinite;
    }

    /* Floating particles */
    .ln-particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(201, 169, 110, 0.6);
      pointer-events: none;
      z-index: 8;
      animation: particleFloat var(--duration) var(--delay) linear infinite;
      box-shadow: 0 0 6px rgba(201, 169, 110, 0.3);
    }

    /* Corner accents */
    .ln-corner {
      position: absolute;
      width: 40px;
      height: 40px;
      border-color: rgba(201, 169, 110, 0.12);
      border-style: solid;
      z-index: 12;
      pointer-events: none;
    }

    .ln-corner-tl {
      top: 30px;
      left: 30px;
      border-width: 1px 0 0 1px;
    }

    .ln-corner-tr {
      top: 30px;
      right: 30px;
      border-width: 1px 1px 0 0;
    }

    .ln-corner-bl {
      bottom: 30px;
      left: 30px;
      border-width: 0 0 1px 1px;
    }

    .ln-corner-br {
      bottom: 30px;
      right: 30px;
      border-width: 0 1px 1px 0;
    }

    /* Nav dots */
    .ln-nav-dots {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 16px;
      z-index: 15;
    }

    .ln-nav-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(201, 169, 110, 0.25);
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ln-nav-dot:hover {
      background: rgba(201, 169, 110, 0.7);
      transform: scale(1.6);
      animation: navDotPulse 2s ease-in-out infinite;
    }

    .ln-nav-dot.active {
      background: rgba(201, 169, 110, 0.8);
      transform: scale(1.4);
    }

    /* Scanlines subtle overlay */
    .ln-scanlines {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
      z-index: 45;
      pointer-events: none;
    }

    /* Vignette */
    .ln-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
      z-index: 40;
      pointer-events: none;
    }

    /* Side text labels */
    .ln-side-text {
      position: absolute;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 300;
      color: rgba(201, 169, 110, 0.15);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      z-index: 12;
      pointer-events: none;
    }

    .ln-side-text-left {
      left: 30px;
      top: 50%;
      transform: rotate(-90deg) translateX(-50%);
      transform-origin: left center;
    }

    .ln-side-text-right {
      right: 30px;
      top: 50%;
      transform: rotate(90deg) translateX(50%);
      transform-origin: right center;
    }
  `
  document.head.appendChild(styleEl)

  // --- Build DOM ---
  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ln-root'

  // Background gradient layer
  const bgLayer = document.createElement('div')
  bgLayer.className = 'ln-bg-layer'
  root.appendChild(bgLayer)

  // Liquid blobs
  for (let i = 1; i <= 5; i++) {
    const blob = document.createElement('div')
    blob.className = `ln-blob ln-blob-${i}`
    root.appendChild(blob)
  }

  // Gold glow
  const goldGlow = document.createElement('div')
  goldGlow.className = 'ln-gold-glow'
  root.appendChild(goldGlow)

  // Floating particles (25 total)
  const particleCount = 25
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'ln-particle'
    const size = Math.random() * 3 + 1
    const left = Math.random() * 100
    const bottom = -(Math.random() * 20)
    const duration = Math.random() * 12 + 10
    const delay = Math.random() * 15
    const driftX = (Math.random() - 0.5) * 80

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: ${bottom}%;
      --duration: ${duration}s;
      --delay: -${delay}s;
      --drift-x: ${driftX}px;
      opacity: ${Math.random() * 0.5 + 0.2};
    `
    root.appendChild(particle)
  }

  // Frosted glass panel with text
  const panel = document.createElement('div')
  panel.className = 'ln-glass-panel'

  const title = document.createElement('h1')
  title.className = 'ln-title'
  title.textContent = 'leblanc'

  const divider = document.createElement('div')
  divider.className = 'ln-divider'

  const subtitle = document.createElement('p')
  subtitle.className = 'ln-subtitle'
  subtitle.textContent = 'listen now'

  panel.appendChild(title)
  panel.appendChild(divider)
  panel.appendChild(subtitle)
  root.appendChild(panel)

  // Corner accents
  const corners = ['tl', 'tr', 'bl', 'br']
  corners.forEach(pos => {
    const corner = document.createElement('div')
    corner.className = `ln-corner ln-corner-${pos}`
    root.appendChild(corner)
  })

  // Side text
  const sideLeft = document.createElement('div')
  sideLeft.className = 'ln-side-text ln-side-text-left'
  sideLeft.textContent = 'liquid noir'
  root.appendChild(sideLeft)

  const sideRight = document.createElement('div')
  sideRight.className = 'ln-side-text ln-side-text-right'
  sideRight.textContent = 'vol. i'
  root.appendChild(sideRight)

  // Nav dots
  const navDots = document.createElement('div')
  navDots.className = 'ln-nav-dots'
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('button')
    dot.className = `ln-nav-dot${i === 0 ? ' active' : ''}`
    dot.setAttribute('aria-label', `Section ${i + 1}`)
    navDots.appendChild(dot)
  }
  root.appendChild(navDots)

  // Noise grain overlay
  const grain = document.createElement('div')
  grain.className = 'ln-grain'
  root.appendChild(grain)

  // Scanlines
  const scanlines = document.createElement('div')
  scanlines.className = 'ln-scanlines'
  root.appendChild(scanlines)

  // Vignette
  const vignette = document.createElement('div')
  vignette.className = 'ln-vignette'
  root.appendChild(vignette)

  container.appendChild(root)

  // --- Mouse reactivity ---
  let mouseX = 0.5
  let mouseY = 0.5
  let currentX = 0.5
  let currentY = 0.5
  let rafId = null

  function onMouseMove(e) {
    const rect = root.getBoundingClientRect()
    mouseX = (e.clientX - rect.left) / rect.width
    mouseY = (e.clientY - rect.top) / rect.height
  }

  function animate() {
    // Smooth lerp toward mouse position
    currentX += (mouseX - currentX) * 0.04
    currentY += (mouseY - currentY) * 0.04

    const dx = (currentX - 0.5) * 2
    const dy = (currentY - 0.5) * 2

    root.style.setProperty('--mouse-x', currentX.toFixed(4))
    root.style.setProperty('--mouse-y', currentY.toFixed(4))
    root.style.setProperty('--mouse-dx', dx.toFixed(4))
    root.style.setProperty('--mouse-dy', dy.toFixed(4))

    rafId = requestAnimationFrame(animate)
  }

  root.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(animate)

  // --- Cleanup ---
  return function cleanup() {
    cancelAnimationFrame(rafId)
    root.removeEventListener('mousemove', onMouseMove)
    if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl)
    if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink)
    container.innerHTML = ''
  }
}
