export function ui2(container) {
  // --- State ---
  let mouseX = 0.5
  let mouseY = 0.5
  let targetMouseX = 0.5
  let targetMouseY = 0.5
  let animId = null
  let orbAnimId = null
  let scanLineOffset = 0
  const orbs = []
  const ORB_COUNT = 14

  // --- Font ---
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap'
  document.head.appendChild(fontLink)

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui2-scanLine {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }

    @keyframes ui2-orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -20px) scale(1.1); }
      50% { transform: translate(-10px, -40px) scale(0.95); }
      75% { transform: translate(-30px, 10px) scale(1.05); }
    }

    @keyframes ui2-shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes ui2-rainbowBorder {
      0% { --ui2-border-angle: 0deg; }
      100% { --ui2-border-angle: 360deg; }
    }

    @keyframes ui2-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    @keyframes ui2-textGlow {
      0%, 100% { text-shadow:
        0 0 20px rgba(255,255,255,0.3),
        0 0 40px rgba(200,180,255,0.2),
        0 2px 4px rgba(0,0,0,0.8);
      }
      50% { text-shadow:
        0 0 30px rgba(255,255,255,0.5),
        0 0 60px rgba(200,180,255,0.3),
        0 0 80px rgba(150,100,255,0.15),
        0 2px 4px rgba(0,0,0,0.8);
      }
    }

    @keyframes ui2-fadein {
      0% { opacity: 0; transform: perspective(1000px) rotateX(10deg) scale(0.9); }
      100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); }
    }

    @keyframes ui2-scanPulse {
      0% { opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }

    .ui2-root {
      position: absolute;
      inset: 0;
      background: #0b0b0f;
      overflow: hidden;
      cursor: crosshair;
      font-family: 'Playfair Display', serif;
    }

    .ui2-bg-prism {
      position: absolute;
      inset: -20%;
      background:
        conic-gradient(
          from calc(var(--ui2-mx, 0.5) * 360deg) at calc(var(--ui2-mx, 0.5) * 100%) calc(var(--ui2-my, 0.5) * 100%),
          hsla(0, 60%, 50%, 0.08),
          hsla(45, 60%, 50%, 0.08),
          hsla(90, 60%, 50%, 0.08),
          hsla(135, 60%, 50%, 0.08),
          hsla(180, 60%, 50%, 0.08),
          hsla(225, 60%, 50%, 0.08),
          hsla(270, 60%, 50%, 0.08),
          hsla(315, 60%, 50%, 0.08),
          hsla(360, 60%, 50%, 0.08)
        ),
        radial-gradient(
          ellipse at calc(var(--ui2-mx, 0.5) * 100%) calc(var(--ui2-my, 0.5) * 100%),
          hsla(260, 40%, 20%, 0.5) 0%,
          transparent 60%
        );
      mix-blend-mode: screen;
      transition: background 0.3s ease;
      pointer-events: none;
    }

    .ui2-card-wrapper {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
      animation: ui2-fadein 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ui2-card {
      position: relative;
      width: 80vw;
      height: 70vh;
      border-radius: 24px;
      transform-style: preserve-3d;
      transform: perspective(1000px)
        rotateX(calc((var(--ui2-my, 0.5) - 0.5) * -8deg))
        rotateY(calc((var(--ui2-mx, 0.5) - 0.5) * 8deg));
      transition: transform 0.15s ease-out;
      will-change: transform;
    }

    .ui2-card-surface {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      overflow: hidden;
      background: #111118;
      transform-style: preserve-3d;
    }

    /* Rainbow gradient border */
    .ui2-card-border {
      position: absolute;
      inset: -2px;
      border-radius: 26px;
      background: conic-gradient(
        from calc(var(--ui2-mx, 0.5) * 360deg),
        #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff00ff, #ff0000
      );
      z-index: -1;
      opacity: 0.6;
    }

    .ui2-card-border-inner {
      position: absolute;
      inset: 2px;
      border-radius: 24px;
      background: #111118;
    }

    /* Holographic gradient layers */
    .ui2-holo-layer {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      pointer-events: none;
    }

    .ui2-holo-1 {
      background:
        linear-gradient(
          calc(var(--ui2-mx, 0.5) * 360deg),
          hsla(280, 80%, 60%, 0.1) 0%,
          hsla(200, 80%, 60%, 0.05) 30%,
          transparent 60%
        );
      mix-blend-mode: screen;
    }

    .ui2-holo-2 {
      background:
        conic-gradient(
          from calc(var(--ui2-mx, 0.5) * 180deg + 90deg) at calc(var(--ui2-mx, 0.5) * 60% + 20%) calc(var(--ui2-my, 0.5) * 60% + 20%),
          hsla(0, 70%, 60%, 0.12),
          hsla(60, 70%, 60%, 0.12),
          hsla(120, 70%, 60%, 0.12),
          hsla(180, 70%, 60%, 0.12),
          hsla(240, 70%, 60%, 0.12),
          hsla(300, 70%, 60%, 0.12),
          hsla(360, 70%, 60%, 0.12)
        );
      mix-blend-mode: color-dodge;
      opacity: 0.7;
    }

    .ui2-holo-3 {
      background:
        radial-gradient(
          ellipse at calc(var(--ui2-mx, 0.5) * 100%) calc(var(--ui2-my, 0.5) * 100%),
          hsla(var(--ui2-hue, 260), 60%, 50%, 0.15) 0%,
          transparent 50%
        );
      mix-blend-mode: screen;
    }

    /* Chrome sheen */
    .ui2-sheen {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      background: linear-gradient(
        105deg,
        transparent calc(var(--ui2-sheen-pos, 40%) - 15%),
        rgba(255,255,255,0.03) calc(var(--ui2-sheen-pos, 40%) - 10%),
        rgba(255,255,255,0.08) calc(var(--ui2-sheen-pos, 40%) - 5%),
        rgba(255,255,255,0.18) var(--ui2-sheen-pos, 40%),
        rgba(255,255,255,0.08) calc(var(--ui2-sheen-pos, 40%) + 5%),
        rgba(255,255,255,0.03) calc(var(--ui2-sheen-pos, 40%) + 10%),
        transparent calc(var(--ui2-sheen-pos, 40%) + 15%)
      );
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    /* Diffraction pattern */
    .ui2-diffraction {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      background: repeating-linear-gradient(
        calc(var(--ui2-mx, 0.5) * 30deg + 75deg),
        transparent 0px,
        transparent 2px,
        hsla(calc(var(--ui2-mx, 0.5) * 360), 80%, 70%, 0.04) 2px,
        hsla(calc(var(--ui2-mx, 0.5) * 360 + 60), 80%, 70%, 0.04) 4px,
        transparent 4px,
        transparent 8px
      );
      mix-blend-mode: screen;
      pointer-events: none;
    }

    /* Scan lines */
    .ui2-scan-lines {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      overflow: hidden;
      pointer-events: none;
    }

    .ui2-scan-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        hsla(0, 100%, 70%, 0.3) 10%,
        hsla(60, 100%, 70%, 0.5) 25%,
        hsla(120, 100%, 70%, 0.5) 40%,
        hsla(180, 100%, 70%, 0.5) 55%,
        hsla(240, 100%, 70%, 0.5) 70%,
        hsla(300, 100%, 70%, 0.3) 90%,
        transparent 100%
      );
      animation: ui2-scanPulse 4s ease-in-out infinite;
      box-shadow: 0 0 8px hsla(180, 100%, 70%, 0.2);
    }

    /* Card content */
    .ui2-card-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
      pointer-events: none;
    }

    .ui2-title {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 700;
      font-size: clamp(4rem, 12vw, 10rem);
      letter-spacing: 0.05em;
      background: linear-gradient(
        135deg,
        #e8e8f0 0%,
        #ffffff 20%,
        #c0c0d0 40%,
        #ffffff 50%,
        #d0d0e0 60%,
        #ffffff 80%,
        #e0e0f0 100%
      );
      background-size: 200% 200%;
      background-position: calc(var(--ui2-mx, 0.5) * 100%) calc(var(--ui2-my, 0.5) * 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ui2-textGlow 4s ease-in-out infinite;
      position: relative;
      user-select: none;
      line-height: 1;
      transform: translateZ(40px);
    }

    .ui2-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 700;
      font-size: clamp(0.7rem, 1.5vw, 1.2rem);
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin-top: 1.5rem;
      transform: translateZ(30px);
    }

    /* Noise texture overlay */
    .ui2-noise {
      position: absolute;
      inset: 0;
      border-radius: 24px;
      opacity: 0.03;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 128px 128px;
      mix-blend-mode: overlay;
    }

    /* Reflection */
    .ui2-reflection-wrapper {
      position: absolute;
      top: calc(50% + 35vh + 10px);
      left: 50%;
      transform: translateX(-50%) scaleY(-1);
      width: 80vw;
      height: 70vh;
      pointer-events: none;
      opacity: 0.12;
      filter: blur(4px);
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%);
      mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%);
    }

    .ui2-reflection-card {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background:
        conic-gradient(
          from calc(var(--ui2-mx, 0.5) * 180deg) at 50% 50%,
          hsla(0, 60%, 50%, 0.15),
          hsla(60, 60%, 50%, 0.15),
          hsla(120, 60%, 50%, 0.15),
          hsla(180, 60%, 50%, 0.15),
          hsla(240, 60%, 50%, 0.15),
          hsla(300, 60%, 50%, 0.15),
          hsla(360, 60%, 50%, 0.15)
        );
    }

    .ui2-reflection-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 700;
      font-size: clamp(4rem, 12vw, 10rem);
      letter-spacing: 0.05em;
      color: rgba(255,255,255,0.4);
    }

    /* Orbs */
    .ui2-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      will-change: transform;
    }

    /* Corner accents */
    .ui2-corner {
      position: absolute;
      width: 60px;
      height: 60px;
      pointer-events: none;
      opacity: 0.25;
    }

    .ui2-corner::before,
    .ui2-corner::after {
      content: '';
      position: absolute;
      background: linear-gradient(90deg, #fff, transparent);
    }

    .ui2-corner--tl { top: 15px; left: 15px; }
    .ui2-corner--tl::before { top: 0; left: 0; width: 30px; height: 1px; }
    .ui2-corner--tl::after { top: 0; left: 0; width: 1px; height: 30px; background: linear-gradient(180deg, #fff, transparent); }

    .ui2-corner--tr { top: 15px; right: 15px; }
    .ui2-corner--tr::before { top: 0; right: 0; width: 30px; height: 1px; background: linear-gradient(270deg, #fff, transparent); }
    .ui2-corner--tr::after { top: 0; right: 0; width: 1px; height: 30px; background: linear-gradient(180deg, #fff, transparent); }

    .ui2-corner--bl { bottom: 15px; left: 15px; }
    .ui2-corner--bl::before { bottom: 0; left: 0; width: 30px; height: 1px; }
    .ui2-corner--bl::after { bottom: 0; left: 0; width: 1px; height: 30px; background: linear-gradient(0deg, #fff, transparent); }

    .ui2-corner--br { bottom: 15px; right: 15px; }
    .ui2-corner--br::before { bottom: 0; right: 0; width: 30px; height: 1px; background: linear-gradient(270deg, #fff, transparent); }
    .ui2-corner--br::after { bottom: 0; right: 0; width: 1px; height: 30px; background: linear-gradient(0deg, #fff, transparent); }

    /* Ambient particles */
    .ui2-particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
    }

    /* Vignette */
    .ui2-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
    }
  `
  container.appendChild(style)

  // --- DOM ---
  const root = document.createElement('div')
  root.className = 'ui2-root'

  // Background prismatic layer
  const bgPrism = document.createElement('div')
  bgPrism.className = 'ui2-bg-prism'
  root.appendChild(bgPrism)

  // Card wrapper
  const cardWrapper = document.createElement('div')
  cardWrapper.className = 'ui2-card-wrapper'

  const card = document.createElement('div')
  card.className = 'ui2-card'

  // Border
  const cardBorder = document.createElement('div')
  cardBorder.className = 'ui2-card-border'
  const cardBorderInner = document.createElement('div')
  cardBorderInner.className = 'ui2-card-border-inner'
  cardBorder.appendChild(cardBorderInner)
  card.appendChild(cardBorder)

  // Surface
  const cardSurface = document.createElement('div')
  cardSurface.className = 'ui2-card-surface'

  // Holo layers
  for (let i = 1; i <= 3; i++) {
    const holoLayer = document.createElement('div')
    holoLayer.className = `ui2-holo-layer ui2-holo-${i}`
    cardSurface.appendChild(holoLayer)
  }

  // Diffraction
  const diffraction = document.createElement('div')
  diffraction.className = 'ui2-diffraction'
  cardSurface.appendChild(diffraction)

  // Chrome sheen
  const sheen = document.createElement('div')
  sheen.className = 'ui2-sheen'
  cardSurface.appendChild(sheen)

  // Scan lines container
  const scanLines = document.createElement('div')
  scanLines.className = 'ui2-scan-lines'
  const SCAN_LINE_COUNT = 5
  const scanLineEls = []
  for (let i = 0; i < SCAN_LINE_COUNT; i++) {
    const line = document.createElement('div')
    line.className = 'ui2-scan-line'
    line.style.animationDelay = `${i * 0.8}s`
    scanLines.appendChild(line)
    scanLineEls.push(line)
  }
  cardSurface.appendChild(scanLines)

  // Noise texture
  const noise = document.createElement('div')
  noise.className = 'ui2-noise'
  cardSurface.appendChild(noise)

  // Content
  const content = document.createElement('div')
  content.className = 'ui2-card-content'

  const title = document.createElement('div')
  title.className = 'ui2-title'
  title.textContent = 'leblanc'
  content.appendChild(title)

  const subtitle = document.createElement('div')
  subtitle.className = 'ui2-subtitle'
  subtitle.textContent = 'holographic'
  content.appendChild(subtitle)

  cardSurface.appendChild(content)

  // Corner accents inside card surface
  const corners = ['tl', 'tr', 'bl', 'br']
  corners.forEach(pos => {
    const corner = document.createElement('div')
    corner.className = `ui2-corner ui2-corner--${pos}`
    cardSurface.appendChild(corner)
  })

  card.appendChild(cardSurface)
  cardWrapper.appendChild(card)
  root.appendChild(cardWrapper)

  // Reflection
  const reflectionWrapper = document.createElement('div')
  reflectionWrapper.className = 'ui2-reflection-wrapper'
  const reflectionCard = document.createElement('div')
  reflectionCard.className = 'ui2-reflection-card'
  reflectionWrapper.appendChild(reflectionCard)
  const reflectionText = document.createElement('div')
  reflectionText.className = 'ui2-reflection-text'
  reflectionText.textContent = 'leblanc'
  reflectionWrapper.appendChild(reflectionText)
  root.appendChild(reflectionWrapper)

  // Floating orbs
  for (let i = 0; i < ORB_COUNT; i++) {
    const orb = document.createElement('div')
    orb.className = 'ui2-orb'
    const size = 4 + Math.random() * 18
    const hue1 = Math.random() * 360
    const hue2 = hue1 + 60 + Math.random() * 120
    orb.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle at 30% 30%,
        hsla(${hue1}, 90%, 70%, 0.8),
        hsla(${hue2}, 90%, 50%, 0.4),
        transparent
      );
      box-shadow: 0 0 ${size * 2}px hsla(${hue1}, 80%, 60%, 0.3);
      filter: blur(${size < 8 ? 0 : 1}px);
    `
    const orbData = {
      el: orb,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.01,
      amplitude: 20 + Math.random() * 40
    }
    orbs.push(orbData)
    root.appendChild(orb)
  }

  // Ambient particles
  const particles = []
  const PARTICLE_COUNT = 30
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div')
    particle.className = 'ui2-particle'
    const px = Math.random() * 100
    const py = Math.random() * 100
    particle.style.left = `${px}%`
    particle.style.top = `${py}%`
    particles.push({
      el: particle,
      baseX: px,
      baseY: py,
      phase: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      maxOpacity: 0.1 + Math.random() * 0.4
    })
    root.appendChild(particle)
  }

  // Vignette
  const vignette = document.createElement('div')
  vignette.className = 'ui2-vignette'
  root.appendChild(vignette)

  container.appendChild(root)

  // --- Mouse handler ---
  function onMouseMove(e) {
    const rect = root.getBoundingClientRect()
    targetMouseX = (e.clientX - rect.left) / rect.width
    targetMouseY = (e.clientY - rect.top) / rect.height
  }

  root.addEventListener('mousemove', onMouseMove)

  // --- Animation loop ---
  let time = 0

  function animate() {
    time += 1

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08
    mouseY += (targetMouseY - mouseY) * 0.08

    // Update CSS custom properties
    const hue = (mouseX * 180 + time * 0.5) % 360
    root.style.setProperty('--ui2-mx', mouseX.toFixed(4))
    root.style.setProperty('--ui2-my', mouseY.toFixed(4))
    root.style.setProperty('--ui2-hue', hue.toFixed(1))
    root.style.setProperty('--ui2-sheen-pos', `${(mouseX * 80 + 10).toFixed(1)}%`)

    // Scan lines animation
    scanLineOffset = (scanLineOffset + 0.3) % 100
    for (let i = 0; i < scanLineEls.length; i++) {
      const offset = (scanLineOffset + i * (100 / SCAN_LINE_COUNT)) % 100
      scanLineEls[i].style.top = `${offset}%`
    }

    // Orbs
    for (const orb of orbs) {
      orb.phase += orb.speed
      const ox = orb.x + Math.sin(orb.phase) * orb.amplitude * 0.01
      const oy = orb.y + Math.cos(orb.phase * 0.7) * orb.amplitude * 0.01
      // Slight mouse attraction
      const dx = mouseX * 100 - ox
      const dy = mouseY * 100 - oy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const attract = Math.min(0.02, 2 / (dist + 1))
      orb.x += orb.vx + dx * attract * 0.01
      orb.y += orb.vy + dy * attract * 0.01

      // Bounds wrapping
      if (orb.x < -5) orb.x = 105
      if (orb.x > 105) orb.x = -5
      if (orb.y < -5) orb.y = 105
      if (orb.y > 105) orb.y = -5

      orb.el.style.left = `${ox}%`
      orb.el.style.top = `${oy}%`
      orb.el.style.opacity = 0.3 + Math.sin(orb.phase * 2) * 0.3
    }

    // Particles
    for (const p of particles) {
      p.phase += p.speed
      const popacity = Math.abs(Math.sin(p.phase)) * p.maxOpacity
      p.el.style.opacity = popacity.toFixed(3)
      const drift = Math.sin(p.phase * 0.5) * 3
      p.el.style.transform = `translate(${drift}px, ${Math.cos(p.phase * 0.3) * 5}px)`
    }

    animId = requestAnimationFrame(animate)
  }

  animId = requestAnimationFrame(animate)

  // --- Cleanup ---
  return function cleanup() {
    if (animId) cancelAnimationFrame(animId)
    if (orbAnimId) cancelAnimationFrame(orbAnimId)
    root.removeEventListener('mousemove', onMouseMove)
    if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink)
    if (style.parentNode) style.parentNode.removeChild(style)
    if (root.parentNode) root.parentNode.removeChild(root)
  }
}
