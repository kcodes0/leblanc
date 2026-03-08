export function ui7(container) {
  // --- Inject Google Fonts ---
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap'
  document.head.appendChild(fontLink)

  // --- State ---
  let mouseX = 0.5
  let mouseY = 0.5
  let targetMouseX = 0.5
  let targetMouseY = 0.5
  let animFrameId = null
  let barAnimFrameId = null
  let letterAnimFrameId = null
  let ripples = []

  // --- CSS Custom Properties ---
  container.style.setProperty('--mouse-x', '0.5')
  container.style.setProperty('--mouse-y', '0.5')

  // --- Generate frequency bar keyframes ---
  const barKeyframes = []
  for (let i = 0; i < 8; i++) {
    const h1 = 15 + Math.random() * 35
    const h2 = 40 + Math.random() * 50
    const h3 = 10 + Math.random() * 25
    const h4 = 55 + Math.random() * 40
    const h5 = 20 + Math.random() * 30
    barKeyframes.push(`
      @keyframes freqBar${i} {
        0%, 100% { height: ${h1}%; }
        15% { height: ${h2}%; }
        35% { height: ${h3}%; }
        55% { height: ${h4}%; }
        75% { height: ${h5}%; }
        90% { height: ${h1 + 10}%; }
      }
    `)
  }

  // --- Styles ---
  const styleEl = document.createElement('style')
  styleEl.textContent = `
    ${barKeyframes.join('\n')}

    @keyframes vinylRotate {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    @keyframes pulsingDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.6); }
    }

    @keyframes nowPlayingFade {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }

    .ui7-root {
      position: relative;
      width: 100%;
      height: 100%;
      background: #0a0a0e;
      overflow: hidden;
      cursor: crosshair;
      font-family: 'Space Grotesk', sans-serif;
    }

    .ui7-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .ui7-vinyl {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      width: min(90vw, 90vh);
      height: min(90vw, 90vh);
      border-radius: 50%;
      animation: vinylRotate 60s linear infinite;
      z-index: 0;
      pointer-events: none;
    }

    .ui7-vinyl-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid rgba(201, 169, 110, 0.06);
      background: transparent;
    }

    .ui7-vinyl-ring:nth-child(odd) {
      border-color: rgba(123, 108, 183, 0.04);
    }

    .ui7-vinyl-ring:nth-child(3n) {
      border-color: rgba(100, 180, 220, 0.05);
    }

    .ui7-vinyl-ring:nth-child(4n) {
      border-width: 2px;
      border-color: rgba(201, 169, 110, 0.03);
    }

    .ui7-center-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      pointer-events: none;
      width: 100%;
    }

    .ui7-freq-bars {
      display: flex;
      align-items: center;
      gap: 3px;
      height: clamp(60px, 12vw, 120px);
      flex-shrink: 0;
    }

    .ui7-freq-bars.left {
      justify-content: flex-end;
      padding-right: clamp(16px, 3vw, 40px);
    }

    .ui7-freq-bars.right {
      justify-content: flex-start;
      padding-left: clamp(16px, 3vw, 40px);
    }

    .ui7-freq-bar {
      width: 2px;
      border-radius: 1px;
      height: 30%;
      will-change: height;
    }

    .ui7-artist-name {
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ui7-letter {
      display: inline-block;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 300;
      font-size: clamp(3rem, 8vw, 7rem);
      color: #f0ece4;
      letter-spacing: 0.3em;
      will-change: transform;
      transition: transform 0.05s linear;
      text-shadow: 0 0 40px rgba(201, 169, 110, 0.15),
                   0 0 80px rgba(123, 108, 183, 0.08);
    }

    .ui7-letter:last-child {
      letter-spacing: 0;
    }

    .ui7-now-playing {
      position: absolute;
      bottom: clamp(30px, 5vh, 60px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    .ui7-now-playing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #c9a96e;
      animation: pulsingDot 2s ease-in-out infinite;
      box-shadow: 0 0 8px rgba(201, 169, 110, 0.6);
    }

    .ui7-now-playing-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 300;
      color: rgba(240, 236, 228, 0.6);
      letter-spacing: 4px;
      text-transform: uppercase;
      animation: nowPlayingFade 4s ease-in-out infinite;
    }

    .ui7-vignette {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(10, 10, 14, 0.7) 100%);
    }
  `
  document.head.appendChild(styleEl)

  // --- Root ---
  const root = document.createElement('div')
  root.className = 'ui7-root'
  container.appendChild(root)

  // --- Vinyl record ---
  const vinyl = document.createElement('div')
  vinyl.className = 'ui7-vinyl'
  const ringCount = 35
  for (let i = 0; i < ringCount; i++) {
    const ring = document.createElement('div')
    ring.className = 'ui7-vinyl-ring'
    const size = 15 + (i / ringCount) * 85
    ring.style.width = size + '%'
    ring.style.height = size + '%'
    const opacity = 0.04 + Math.random() * 0.04
    ring.style.borderColor = i % 3 === 0
      ? `rgba(201, 169, 110, ${opacity})`
      : i % 3 === 1
      ? `rgba(123, 108, 183, ${opacity})`
      : `rgba(100, 180, 220, ${opacity})`
    ring.style.borderWidth = (i % 5 === 0) ? '2px' : '1px'
    vinyl.appendChild(ring)
  }
  // Center dot for vinyl
  const vinylCenter = document.createElement('div')
  vinylCenter.className = 'ui7-vinyl-ring'
  vinylCenter.style.width = '6%'
  vinylCenter.style.height = '6%'
  vinylCenter.style.background = 'rgba(201, 169, 110, 0.06)'
  vinylCenter.style.border = '2px solid rgba(201, 169, 110, 0.08)'
  vinyl.appendChild(vinylCenter)
  root.appendChild(vinyl)

  // --- Canvas for waveforms ---
  const canvas = document.createElement('canvas')
  canvas.className = 'ui7-canvas'
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  function resizeCanvas() {
    canvas.width = root.clientWidth * window.devicePixelRatio
    canvas.height = root.clientHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // --- Vignette overlay ---
  const vignette = document.createElement('div')
  vignette.className = 'ui7-vignette'
  root.appendChild(vignette)

  // --- Center content (bars + name) ---
  const centerContent = document.createElement('div')
  centerContent.className = 'ui7-center-content'

  // Frequency bars - left
  const leftBars = document.createElement('div')
  leftBars.className = 'ui7-freq-bars left'
  const leftBarEls = []
  const barColors = [
    'rgba(201, 169, 110, 0.6)',
    'rgba(123, 108, 183, 0.5)',
    'rgba(100, 180, 220, 0.4)',
    'rgba(240, 236, 228, 0.3)',
    'rgba(201, 169, 110, 0.5)',
    'rgba(123, 108, 183, 0.4)',
    'rgba(100, 180, 220, 0.5)',
    'rgba(240, 236, 228, 0.25)',
  ]

  for (let i = 0; i < 25; i++) {
    const bar = document.createElement('div')
    bar.className = 'ui7-freq-bar'
    const animIdx = i % 8
    const duration = 0.5 + Math.random() * 1.2
    const delay = Math.random() * -2
    bar.style.background = barColors[i % barColors.length]
    bar.style.animation = `freqBar${animIdx} ${duration}s ease-in-out ${delay}s infinite`
    leftBars.appendChild(bar)
    leftBarEls.push(bar)
  }

  // Artist name
  const artistName = document.createElement('div')
  artistName.className = 'ui7-artist-name'
  const letters = 'leblanc'.split('')
  const letterEls = []
  letters.forEach((char, i) => {
    const span = document.createElement('span')
    span.className = 'ui7-letter'
    span.textContent = char
    span.dataset.index = i
    artistName.appendChild(span)
    letterEls.push(span)
  })

  // Frequency bars - right
  const rightBars = document.createElement('div')
  rightBars.className = 'ui7-freq-bars right'
  const rightBarEls = []
  for (let i = 0; i < 25; i++) {
    const bar = document.createElement('div')
    bar.className = 'ui7-freq-bar'
    const animIdx = (i + 3) % 8
    const duration = 0.5 + Math.random() * 1.2
    const delay = Math.random() * -2
    bar.style.background = barColors[(i + 2) % barColors.length]
    bar.style.animation = `freqBar${animIdx} ${duration}s ease-in-out ${delay}s infinite`
    rightBars.appendChild(bar)
    rightBarEls.push(bar)
  }

  centerContent.appendChild(leftBars)
  centerContent.appendChild(artistName)
  centerContent.appendChild(rightBars)
  root.appendChild(centerContent)

  // --- Now Playing ---
  const nowPlaying = document.createElement('div')
  nowPlaying.className = 'ui7-now-playing'

  const npDot = document.createElement('div')
  npDot.className = 'ui7-now-playing-dot'

  const npText = document.createElement('div')
  npText.className = 'ui7-now-playing-text'
  npText.textContent = 'NOW PLAYING'

  nowPlaying.appendChild(npDot)
  nowPlaying.appendChild(npText)
  root.appendChild(nowPlaying)

  // --- Wave definitions ---
  const waves = [
    {
      amplitude: 50,
      frequency: 0.008,
      speed: 0.6,
      color: [201, 169, 110],
      opacity: 0.4,
      phase: 0,
      yOffset: 0,
    },
    {
      amplitude: 35,
      frequency: 0.012,
      speed: 0.8,
      color: [123, 108, 183],
      opacity: 0.3,
      phase: Math.PI * 0.5,
      yOffset: 5,
    },
    {
      amplitude: 25,
      frequency: 0.006,
      speed: 1.1,
      color: [100, 180, 220],
      opacity: 0.2,
      phase: Math.PI,
      yOffset: -8,
    },
    {
      amplitude: 40,
      frequency: 0.015,
      speed: 0.4,
      color: [240, 236, 228],
      opacity: 0.15,
      phase: Math.PI * 1.5,
      yOffset: 3,
    },
  ]

  // --- Mouse handling ---
  function onMouseMove(e) {
    const rect = root.getBoundingClientRect()
    targetMouseX = (e.clientX - rect.left) / rect.width
    targetMouseY = (e.clientY - rect.top) / rect.height
    container.style.setProperty('--mouse-x', targetMouseX.toFixed(3))
    container.style.setProperty('--mouse-y', targetMouseY.toFixed(3))

    // Add ripple
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: performance.now(),
      strength: 0.15 + Math.abs(targetMouseX - mouseX) * 3,
    })
    if (ripples.length > 8) ripples.shift()
  }
  root.addEventListener('mousemove', onMouseMove)

  // --- Wave rendering ---
  function drawWave(wave, time, w, h) {
    const centerY = h / 2 + wave.yOffset
    const mouseAmplitudeMod = 1 + (1 - mouseY) * 1.5
    const mouseFreqMod = 1 + (mouseX - 0.5) * 0.3
    const amp = wave.amplitude * mouseAmplitudeMod
    const freq = wave.frequency * mouseFreqMod

    ctx.beginPath()
    ctx.moveTo(0, h)

    for (let x = 0; x <= w; x += 2) {
      const normalX = x / w
      // Base sine wave
      let y = Math.sin(x * freq + time * wave.speed + wave.phase) * amp
      // Add harmonics for organic feel
      y += Math.sin(x * freq * 2.3 + time * wave.speed * 0.7 + wave.phase * 1.3) * amp * 0.3
      y += Math.sin(x * freq * 0.5 + time * wave.speed * 1.3 + wave.phase * 0.7) * amp * 0.15

      // Ripple effects from mouse
      for (const ripple of ripples) {
        const age = (performance.now() - ripple.time) / 1000
        if (age < 2) {
          const dist = Math.abs(x - ripple.x)
          const rippleWave = Math.sin(dist * 0.05 - age * 8) * ripple.strength * 20
          const falloff = Math.max(0, 1 - age) * Math.max(0, 1 - dist / 400)
          y += rippleWave * falloff
        }
      }

      // Envelope: fade wave at edges
      const edgeFade = Math.sin(normalX * Math.PI)
      y *= edgeFade

      ctx.lineTo(x, centerY + y)
    }

    ctx.lineTo(w, h)
    ctx.closePath()

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, centerY - amp, 0, centerY + amp)
    const [r, g, b] = wave.color
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
    gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${wave.opacity * 0.5})`)
    gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${wave.opacity})`)
    gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${wave.opacity * 0.5})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw the wave line on top for definition
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const normalX = x / w
      let y = Math.sin(x * freq + time * wave.speed + wave.phase) * amp
      y += Math.sin(x * freq * 2.3 + time * wave.speed * 0.7 + wave.phase * 1.3) * amp * 0.3
      y += Math.sin(x * freq * 0.5 + time * wave.speed * 1.3 + wave.phase * 0.7) * amp * 0.15

      for (const ripple of ripples) {
        const age = (performance.now() - ripple.time) / 1000
        if (age < 2) {
          const dist = Math.abs(x - ripple.x)
          const rippleWave = Math.sin(dist * 0.05 - age * 8) * ripple.strength * 20
          const falloff = Math.max(0, 1 - age) * Math.max(0, 1 - dist / 400)
          y += rippleWave * falloff
        }
      }

      const edgeFade = Math.sin(normalX * Math.PI)
      y *= edgeFade

      if (x === 0) ctx.moveTo(x, centerY + y)
      else ctx.lineTo(x, centerY + y)
    }
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${wave.opacity * 1.5})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  }

  // --- Main animation loop ---
  let startTime = performance.now()

  function animate() {
    const now = performance.now()
    const time = (now - startTime) / 1000

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08
    mouseY += (targetMouseY - mouseY) * 0.08

    const w = root.clientWidth
    const h = root.clientHeight

    // Reset canvas transform and clear
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    ctx.clearRect(0, 0, w, h)

    // Clean old ripples
    ripples = ripples.filter(r => (now - r.time) / 1000 < 2)

    // Draw waves back to front
    for (let i = waves.length - 1; i >= 0; i--) {
      drawWave(waves[i], time, w, h)
    }

    // Also draw mirrored waves above center for symmetry
    ctx.save()
    ctx.translate(0, h)
    ctx.scale(1, -1)
    ctx.globalAlpha = 0.3
    for (let i = waves.length - 1; i >= 0; i--) {
      drawWave(waves[i], time, w, h)
    }
    ctx.restore()

    animFrameId = requestAnimationFrame(animate)
  }

  // --- Letter oscillation animation ---
  function animateLetters() {
    const time = (performance.now() - startTime) / 1000
    const mouseAmplitudeMod = 1 + (1 - mouseY) * 1.5

    letterEls.forEach((el, i) => {
      const delay = i * 0.4
      const yOff = Math.sin(time * 0.8 + delay) * 4 * mouseAmplitudeMod
        + Math.sin(time * 1.3 + delay * 0.7) * 2 * mouseAmplitudeMod
      el.style.transform = `translateY(${yOff}px)`
    })

    letterAnimFrameId = requestAnimationFrame(animateLetters)
  }

  // --- Start animations ---
  animate()
  animateLetters()

  // --- Cleanup ---
  return function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    if (barAnimFrameId) cancelAnimationFrame(barAnimFrameId)
    if (letterAnimFrameId) cancelAnimationFrame(letterAnimFrameId)
    root.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resizeCanvas)
    if (styleEl.parentNode) styleEl.remove()
    if (fontLink.parentNode) fontLink.remove()
    container.innerHTML = ''
  }
}
