export function ui6(container) {
  // --- Inject Google Fonts ---
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=JetBrains+Mono:wght@300;400&display=swap'
  document.head.appendChild(fontLink)

  // --- CSS Custom Properties for mouse reactivity ---
  container.style.setProperty('--smoke-mx', '0.5')
  container.style.setProperty('--smoke-my', '0.5')
  container.style.setProperty('--smoke-dx', '0')
  container.style.setProperty('--smoke-dy', '0')

  // --- Styles ---
  const styleEl = document.createElement('style')
  styleEl.textContent = `
    /* ===== SMOKE KEYFRAMES ===== */

    @keyframes smokeDrift1 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * 40px),
          calc(var(--smoke-dy) * 40px)
        ) scale(1) rotate(0deg);
      }
      25% {
        transform: translate(
          calc(var(--smoke-dx) * 40px + 80px),
          calc(var(--smoke-dy) * 40px - 60px)
        ) scale(1.15) rotate(15deg);
      }
      50% {
        transform: translate(
          calc(var(--smoke-dx) * 40px - 50px),
          calc(var(--smoke-dy) * 40px + 70px)
        ) scale(0.9) rotate(-10deg);
      }
      75% {
        transform: translate(
          calc(var(--smoke-dx) * 40px + 30px),
          calc(var(--smoke-dy) * 40px + 20px)
        ) scale(1.08) rotate(8deg);
      }
    }

    @keyframes smokeDrift2 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * -35px),
          calc(var(--smoke-dy) * -30px)
        ) scale(1) rotate(0deg);
      }
      33% {
        transform: translate(
          calc(var(--smoke-dx) * -35px - 100px),
          calc(var(--smoke-dy) * -30px + 80px)
        ) scale(1.2) rotate(-20deg);
      }
      66% {
        transform: translate(
          calc(var(--smoke-dx) * -35px + 60px),
          calc(var(--smoke-dy) * -30px - 40px)
        ) scale(0.85) rotate(12deg);
      }
    }

    @keyframes smokeDrift3 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * 25px),
          calc(var(--smoke-dy) * 25px)
        ) scale(1) rotate(0deg);
      }
      20% {
        transform: translate(
          calc(var(--smoke-dx) * 25px + 50px),
          calc(var(--smoke-dy) * 25px + 90px)
        ) scale(1.1) rotate(10deg);
      }
      40% {
        transform: translate(
          calc(var(--smoke-dx) * 25px - 70px),
          calc(var(--smoke-dy) * 25px - 30px)
        ) scale(0.92) rotate(-15deg);
      }
      60% {
        transform: translate(
          calc(var(--smoke-dx) * 25px + 40px),
          calc(var(--smoke-dy) * 25px - 80px)
        ) scale(1.18) rotate(5deg);
      }
      80% {
        transform: translate(
          calc(var(--smoke-dx) * 25px - 20px),
          calc(var(--smoke-dy) * 25px + 40px)
        ) scale(0.95) rotate(-8deg);
      }
    }

    @keyframes smokeDrift4 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * -20px),
          calc(var(--smoke-dy) * 20px)
        ) scale(1) rotate(0deg);
      }
      50% {
        transform: translate(
          calc(var(--smoke-dx) * -20px + 90px),
          calc(var(--smoke-dy) * 20px - 70px)
        ) scale(1.12) rotate(18deg);
      }
    }

    @keyframes smokeDrift5 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * 30px),
          calc(var(--smoke-dy) * -25px)
        ) scale(1) rotate(0deg);
      }
      30% {
        transform: translate(
          calc(var(--smoke-dx) * 30px - 60px),
          calc(var(--smoke-dy) * -25px + 100px)
        ) scale(1.22) rotate(-12deg);
      }
      60% {
        transform: translate(
          calc(var(--smoke-dx) * 30px + 70px),
          calc(var(--smoke-dy) * -25px - 50px)
        ) scale(0.88) rotate(14deg);
      }
    }

    @keyframes smokeDrift6 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * -28px),
          calc(var(--smoke-dy) * -18px)
        ) scale(1) rotate(0deg);
      }
      40% {
        transform: translate(
          calc(var(--smoke-dx) * -28px + 45px),
          calc(var(--smoke-dy) * -18px + 65px)
        ) scale(1.14) rotate(20deg);
      }
      70% {
        transform: translate(
          calc(var(--smoke-dx) * -28px - 80px),
          calc(var(--smoke-dy) * -18px - 45px)
        ) scale(0.9) rotate(-16deg);
      }
    }

    @keyframes smokeDrift7 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * 18px),
          calc(var(--smoke-dy) * 32px)
        ) scale(1) rotate(0deg);
      }
      35% {
        transform: translate(
          calc(var(--smoke-dx) * 18px + 100px),
          calc(var(--smoke-dy) * 32px + 50px)
        ) scale(1.16) rotate(-22deg);
      }
      65% {
        transform: translate(
          calc(var(--smoke-dx) * 18px - 40px),
          calc(var(--smoke-dy) * 32px - 90px)
        ) scale(0.86) rotate(10deg);
      }
    }

    @keyframes smokeDrift8 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * -22px),
          calc(var(--smoke-dy) * 15px)
        ) scale(1) rotate(0deg);
      }
      25% {
        transform: translate(
          calc(var(--smoke-dx) * -22px - 55px),
          calc(var(--smoke-dy) * 15px - 80px)
        ) scale(1.1) rotate(14deg);
      }
      50% {
        transform: translate(
          calc(var(--smoke-dx) * -22px + 70px),
          calc(var(--smoke-dy) * 15px + 40px)
        ) scale(0.94) rotate(-18deg);
      }
      75% {
        transform: translate(
          calc(var(--smoke-dx) * -22px + 20px),
          calc(var(--smoke-dy) * 15px - 30px)
        ) scale(1.06) rotate(6deg);
      }
    }

    @keyframes smokeDrift9 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * 35px),
          calc(var(--smoke-dy) * -22px)
        ) scale(1) rotate(0deg);
      }
      50% {
        transform: translate(
          calc(var(--smoke-dx) * 35px - 85px),
          calc(var(--smoke-dy) * -22px + 75px)
        ) scale(1.18) rotate(-25deg);
      }
    }

    @keyframes smokeDrift10 {
      0%, 100% {
        transform: translate(
          calc(var(--smoke-dx) * -15px),
          calc(var(--smoke-dy) * -28px)
        ) scale(1) rotate(0deg);
      }
      33% {
        transform: translate(
          calc(var(--smoke-dx) * -15px + 60px),
          calc(var(--smoke-dy) * -28px + 90px)
        ) scale(1.08) rotate(16deg);
      }
      66% {
        transform: translate(
          calc(var(--smoke-dx) * -15px - 45px),
          calc(var(--smoke-dy) * -28px - 55px)
        ) scale(0.92) rotate(-12deg);
      }
    }

    @keyframes smokeTextReveal {
      0% {
        -webkit-mask-size: 0% 100%;
        mask-size: 0% 100%;
        opacity: 0.3;
      }
      30% {
        opacity: 1;
      }
      100% {
        -webkit-mask-size: 300% 100%;
        mask-size: 300% 100%;
        opacity: 1;
      }
    }

    @keyframes smokeLineExpand {
      0% {
        width: 0;
        opacity: 0;
      }
      100% {
        width: 60%;
        opacity: 1;
      }
    }

    @keyframes smokeSubtitleFade {
      0% {
        opacity: 0;
        transform: translateY(12px);
        filter: blur(4px);
      }
      100% {
        opacity: 0.6;
        transform: translateY(0);
        filter: blur(0px);
      }
    }

    @keyframes emberRise {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      8% {
        opacity: var(--ember-peak-opacity, 0.8);
      }
      50% {
        opacity: var(--ember-peak-opacity, 0.8);
      }
      85% {
        opacity: 0.15;
      }
      100% {
        transform: translateY(calc(-100vh - 40px)) translateX(var(--ember-drift-x, 30px));
        opacity: 0;
      }
    }

    @keyframes lightBeamSway1 {
      0%, 100% {
        transform: rotate(-2deg) translateX(0);
        opacity: 0.025;
      }
      50% {
        transform: rotate(3deg) translateX(20px);
        opacity: 0.04;
      }
    }

    @keyframes lightBeamSway2 {
      0%, 100% {
        transform: rotate(4deg) translateX(0);
        opacity: 0.02;
      }
      50% {
        transform: rotate(-3deg) translateX(-15px);
        opacity: 0.035;
      }
    }

    @keyframes lightBeamSway3 {
      0%, 100% {
        transform: rotate(-1deg) translateX(10px);
        opacity: 0.015;
      }
      50% {
        transform: rotate(2deg) translateX(-10px);
        opacity: 0.03;
      }
    }

    /* ===== ROOT ===== */

    .smoke-root {
      position: relative;
      width: 100%;
      height: 100vh;
      background: #060608;
      overflow: hidden;
      cursor: default;
      font-family: 'Playfair Display', serif;
    }

    /* ===== SMOKE LAYERS ===== */

    .smoke-layer {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      will-change: transform;
      mix-blend-mode: screen;
    }

    .smoke-layer-1 {
      width: 900px;
      height: 900px;
      top: -20%;
      left: -15%;
      background: radial-gradient(circle, rgba(60, 52, 58, 0.08) 0%, rgba(40, 35, 42, 0.04) 40%, transparent 70%);
      filter: blur(100px);
      opacity: 0.07;
      animation: smokeDrift1 45s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
    }

    .smoke-layer-2 {
      width: 1100px;
      height: 800px;
      top: 10%;
      right: -20%;
      background: radial-gradient(circle, rgba(80, 60, 90, 0.06) 0%, rgba(50, 40, 60, 0.03) 45%, transparent 70%);
      filter: blur(120px);
      opacity: 0.05;
      animation: smokeDrift2 65s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-3 {
      width: 700px;
      height: 700px;
      bottom: -10%;
      left: 20%;
      background: radial-gradient(circle, rgba(70, 55, 50, 0.07) 0%, rgba(45, 38, 35, 0.04) 40%, transparent 70%);
      filter: blur(80px);
      opacity: 0.06;
      animation: smokeDrift3 55s cubic-bezier(0.42, 0, 0.58, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-4 {
      width: 1000px;
      height: 600px;
      top: 30%;
      left: -10%;
      background: radial-gradient(circle, rgba(90, 75, 100, 0.05) 0%, rgba(60, 50, 70, 0.03) 45%, transparent 70%);
      filter: blur(110px);
      opacity: 0.04;
      animation: smokeDrift4 75s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
      mix-blend-mode: soft-light;
    }

    .smoke-layer-5 {
      width: 800px;
      height: 900px;
      top: -5%;
      right: 10%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.03) 0%, rgba(160, 130, 80, 0.015) 40%, transparent 65%);
      filter: blur(90px);
      opacity: 0.05;
      animation: smokeDrift5 50s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-6 {
      width: 650px;
      height: 650px;
      bottom: 5%;
      right: -5%;
      background: radial-gradient(circle, rgba(55, 48, 60, 0.08) 0%, rgba(40, 35, 45, 0.04) 40%, transparent 70%);
      filter: blur(100px);
      opacity: 0.06;
      animation: smokeDrift6 60s cubic-bezier(0.42, 0, 0.58, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-7 {
      width: 950px;
      height: 750px;
      top: 15%;
      left: 25%;
      background: radial-gradient(circle, rgba(75, 65, 55, 0.05) 0%, rgba(50, 42, 38, 0.025) 45%, transparent 70%);
      filter: blur(115px);
      opacity: 0.04;
      animation: smokeDrift7 85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
      mix-blend-mode: soft-light;
    }

    .smoke-layer-8 {
      width: 750px;
      height: 850px;
      top: -15%;
      left: 40%;
      background: radial-gradient(circle, rgba(100, 80, 110, 0.04) 0%, rgba(65, 55, 75, 0.02) 40%, transparent 65%);
      filter: blur(95px);
      opacity: 0.05;
      animation: smokeDrift8 70s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-9 {
      width: 600px;
      height: 600px;
      bottom: 15%;
      left: -8%;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.025) 0%, rgba(140, 115, 70, 0.01) 40%, transparent 60%);
      filter: blur(80px);
      opacity: 0.03;
      animation: smokeDrift9 90s cubic-bezier(0.42, 0, 0.58, 1) infinite;
      z-index: 2;
    }

    .smoke-layer-10 {
      width: 850px;
      height: 700px;
      top: 40%;
      right: -12%;
      background: radial-gradient(circle, rgba(65, 58, 70, 0.06) 0%, rgba(45, 40, 50, 0.03) 45%, transparent 70%);
      filter: blur(105px);
      opacity: 0.07;
      animation: smokeDrift10 40s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      z-index: 2;
    }

    /* ===== LIGHT BEAMS ===== */

    .smoke-light-beam {
      position: absolute;
      top: -10%;
      pointer-events: none;
      z-index: 3;
    }

    .smoke-light-beam-1 {
      left: 35%;
      width: 120px;
      height: 120vh;
      background: conic-gradient(from 180deg at 50% 0%, transparent 170deg, rgba(240, 236, 228, 0.03) 178deg, rgba(240, 236, 228, 0.04) 180deg, rgba(240, 236, 228, 0.03) 182deg, transparent 190deg);
      animation: lightBeamSway1 20s ease-in-out infinite;
      transform-origin: top center;
    }

    .smoke-light-beam-2 {
      left: 55%;
      width: 80px;
      height: 110vh;
      background: conic-gradient(from 180deg at 50% 0%, transparent 172deg, rgba(201, 169, 110, 0.02) 179deg, rgba(201, 169, 110, 0.025) 180deg, rgba(201, 169, 110, 0.02) 181deg, transparent 188deg);
      animation: lightBeamSway2 28s ease-in-out infinite;
      transform-origin: top center;
    }

    .smoke-light-beam-3 {
      left: 45%;
      width: 60px;
      height: 100vh;
      background: conic-gradient(from 180deg at 50% 0%, transparent 174deg, rgba(240, 236, 228, 0.02) 179deg, rgba(240, 236, 228, 0.03) 180deg, rgba(240, 236, 228, 0.02) 181deg, transparent 186deg);
      animation: lightBeamSway3 24s ease-in-out infinite;
      transform-origin: top center;
    }

    /* ===== CENTER CONTENT ===== */

    .smoke-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .smoke-title {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 700;
      font-size: clamp(4rem, 10vw, 9rem);
      color: #f0ece4;
      margin: 0;
      line-height: 1;
      text-shadow:
        0 0 40px rgba(240, 236, 228, 0.1),
        0 0 80px rgba(201, 169, 110, 0.06),
        0 0 120px rgba(201, 169, 110, 0.03);
      letter-spacing: 0.04em;
      -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 100%);
      mask-image: linear-gradient(90deg, #000 0%, #000 100%);
      -webkit-mask-size: 0% 100%;
      mask-size: 0% 100%;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      animation: smokeTextReveal 4s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0.3;
      position: relative;
      z-index: 11;
    }

    .smoke-divider {
      width: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.3), rgba(240, 236, 228, 0.15), rgba(201, 169, 110, 0.3), transparent);
      margin: 32px 0 28px;
      opacity: 0;
      animation: smokeLineExpand 2.5s 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .smoke-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 10px;
      color: rgba(240, 236, 228, 0.6);
      letter-spacing: 6px;
      text-transform: lowercase;
      margin: 0;
      opacity: 0;
      animation: smokeSubtitleFade 2s 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      pointer-events: auto;
      cursor: pointer;
      padding: 10px 20px;
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .smoke-subtitle:hover {
      color: rgba(201, 169, 110, 0.7);
      letter-spacing: 8px;
      text-shadow: 0 0 20px rgba(201, 169, 110, 0.2);
    }

    /* ===== EMBER PARTICLES ===== */

    .smoke-ember {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 8;
      animation: emberRise var(--ember-duration) var(--ember-delay) linear infinite;
      opacity: 0;
    }

    /* ===== VIGNETTE ===== */

    .smoke-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 65% 60% at 50% 50%, transparent 40%, rgba(6, 6, 8, 0.5) 70%, rgba(6, 6, 8, 0.9) 100%);
      z-index: 20;
      pointer-events: none;
    }

    /* ===== GRAIN OVERLAY ===== */

    .smoke-grain {
      position: absolute;
      inset: -100%;
      width: 300%;
      height: 300%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.4;
      z-index: 25;
      pointer-events: none;
      animation: smokeGrainShift 6s steps(8) infinite;
    }

    @keyframes smokeGrainShift {
      0%, 100% { transform: translate(0, 0); }
      12% { transform: translate(-3%, -8%); }
      25% { transform: translate(-10%, 4%); }
      37% { transform: translate(5%, -18%); }
      50% { transform: translate(-4%, 15%); }
      62% { transform: translate(-12%, 7%); }
      75% { transform: translate(10%, -2%); }
      87% { transform: translate(-2%, 20%); }
    }
  `
  document.head.appendChild(styleEl)

  // --- Build DOM ---
  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'smoke-root'

  // Smoke layers (10 total)
  for (let i = 1; i <= 10; i++) {
    const smoke = document.createElement('div')
    smoke.className = `smoke-layer smoke-layer-${i}`
    smoke.dataset.smokeIndex = i
    root.appendChild(smoke)
  }

  // Light beams (3 total)
  for (let i = 1; i <= 3; i++) {
    const beam = document.createElement('div')
    beam.className = `smoke-light-beam smoke-light-beam-${i}`
    root.appendChild(beam)
  }

  // Center content
  const content = document.createElement('div')
  content.className = 'smoke-content'

  const title = document.createElement('h1')
  title.className = 'smoke-title'
  title.textContent = 'leblanc'

  const divider = document.createElement('div')
  divider.className = 'smoke-divider'

  const subtitle = document.createElement('p')
  subtitle.className = 'smoke-subtitle'
  subtitle.textContent = 'enter the void'

  content.appendChild(title)
  content.appendChild(divider)
  content.appendChild(subtitle)
  root.appendChild(content)

  // Ember particles (18 total)
  const emberCount = 18
  const embers = []
  for (let i = 0; i < emberCount; i++) {
    const ember = document.createElement('div')
    ember.className = 'smoke-ember'
    const size = Math.random() * 2 + 2 // 2-4px
    const left = Math.random() * 100
    const bottom = -(Math.random() * 10)
    const duration = Math.random() * 12 + 14 // 14-26s
    const delay = Math.random() * 20
    const driftX = (Math.random() - 0.5) * 60
    const peakOpacity = Math.random() * 0.4 + 0.5 // 0.5-0.9
    const hue = Math.random() > 0.3 ? '#c9a96e' : '#d4a54a'

    ember.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: ${bottom}%;
      background: ${hue};
      box-shadow: 0 0 ${size * 3}px ${size}px rgba(201, 169, 110, 0.4), 0 0 ${size * 6}px ${size * 2}px rgba(201, 169, 110, 0.15);
      --ember-duration: ${duration}s;
      --ember-delay: -${delay}s;
      --ember-drift-x: ${driftX}px;
      --ember-peak-opacity: ${peakOpacity};
    `
    embers.push(ember)
    root.appendChild(ember)
  }

  // Vignette
  const vignette = document.createElement('div')
  vignette.className = 'smoke-vignette'
  root.appendChild(vignette)

  // Grain
  const grain = document.createElement('div')
  grain.className = 'smoke-grain'
  root.appendChild(grain)

  container.appendChild(root)

  // --- Mouse reactivity ---
  let mouseX = 0.5
  let mouseY = 0.5
  let currentX = 0.5
  let currentY = 0.5
  let rafId = null

  const smokeLayers = root.querySelectorAll('.smoke-layer')

  // Store base opacities from the CSS so we can modulate them without reflow
  const baseOpacities = [0.07, 0.05, 0.06, 0.04, 0.05, 0.06, 0.04, 0.05, 0.03, 0.07]
  // Store approximate initial center positions (percentage-based) for each smoke layer
  // These get combined with the animated transforms for a rough center estimate
  const smokePositions = [
    { cx: -15 + 450, cy: -20 + 450 },   // layer 1: left:-15%, 900px wide
    { cx: 80 + 550, cy: 10 + 400 },      // layer 2: right:-20% ~ left:80%, approximate
    { cx: 20 + 350, cy: 90 + 350 },      // layer 3: left:20%, bottom:-10%
    { cx: -10 + 500, cy: 30 + 300 },     // layer 4
    { cx: 10 + 400, cy: -5 + 450 },      // layer 5: right:10% ~ rough
    { cx: 95 + 325, cy: 95 + 325 },      // layer 6
    { cx: 25 + 475, cy: 15 + 375 },      // layer 7
    { cx: 40 + 375, cy: -15 + 425 },     // layer 8
    { cx: -8 + 300, cy: 85 + 300 },      // layer 9
    { cx: 88 + 425, cy: 40 + 350 },      // layer 10
  ]

  function onMouseMove(e) {
    const rect = root.getBoundingClientRect()
    mouseX = (e.clientX - rect.left) / rect.width
    mouseY = (e.clientY - rect.top) / rect.height
  }

  function animate() {
    // Smooth lerp toward mouse position
    currentX += (mouseX - currentX) * 0.03
    currentY += (mouseY - currentY) * 0.03

    const dx = (currentX - 0.5) * 2
    const dy = (currentY - 0.5) * 2

    root.style.setProperty('--smoke-mx', currentX.toFixed(4))
    root.style.setProperty('--smoke-my', currentY.toFixed(4))
    root.style.setProperty('--smoke-dx', dx.toFixed(4))
    root.style.setProperty('--smoke-dy', dy.toFixed(4))

    // Proximity-based smoke thinning: smoke elements near cursor become more transparent
    const rootW = root.offsetWidth
    const rootH = root.offsetHeight
    const cursorPxX = currentX * rootW
    const cursorPxY = currentY * rootH
    const viewportDiag = Math.sqrt(rootW * rootW + rootH * rootH)

    smokeLayers.forEach((layer, i) => {
      // Use approximate positions scaled to viewport — avoids expensive getBoundingClientRect
      const approxCenterX = (smokePositions[i].cx / 100) * rootW
      const approxCenterY = (smokePositions[i].cy / 100) * rootH

      const distX = cursorPxX - approxCenterX
      const distY = cursorPxY - approxCenterY
      const dist = Math.sqrt(distX * distX + distY * distY)
      const normalizedDist = dist / viewportDiag

      // Thin the smoke when cursor is within close proximity
      // At full distance, influence is 0 (no change). Very close: reduce opacity by up to 40%
      const proximity = Math.max(0, 1 - normalizedDist * 3)
      const opacityReduction = proximity * 0.4
      layer.style.opacity = (baseOpacities[i] * (1 - opacityReduction)).toFixed(4)
    })

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
