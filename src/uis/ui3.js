export function ui3(container) {
  // --- State ---
  let mouseX = 0.5
  let mouseY = 0.5
  let animFrameId = null
  let shimmerAngle = 0
  let driftTime = 0
  let shardsAssembled = true
  const shardElements = []
  const lightRayElements = []
  const crackLineElements = []

  // --- Fonts ---
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap'
  document.head.appendChild(fontLink)

  // --- Style injection ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui3-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes ui3-ray-pulse {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.55; }
    }

    @keyframes ui3-shard-glow-pulse {
      0%, 100% { box-shadow: inset 0 0 15px rgba(201,169,110,0.03), 0 0 1px rgba(255,255,255,0.1); }
      50% { box-shadow: inset 0 0 20px rgba(201,169,110,0.06), 0 0 2px rgba(255,255,255,0.15); }
    }

    .ui3-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #080810;
      font-family: 'Syne', sans-serif;
      cursor: default;
      perspective: 1200px;
    }

    .ui3-ghost-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(5rem, 15vw, 12rem);
      color: #f0ece4;
      opacity: 0.04;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      letter-spacing: -0.02em;
      z-index: 1;
    }

    .ui3-text-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
      pointer-events: none;
    }

    .ui3-text-layer h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(5rem, 15vw, 12rem);
      color: #f0ece4;
      margin: 0;
      white-space: nowrap;
      letter-spacing: -0.02em;
      line-height: 1;
      background: linear-gradient(135deg, #f0ece4 0%, #c9a96e 40%, #f0ece4 60%, #7b6cb7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ui3-text-layer .ui3-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: clamp(0.65rem, 1.2vw, 0.95rem);
      color: rgba(201,169,110,0.6);
      letter-spacing: 0.35em;
      margin-top: 1.2rem;
      text-transform: lowercase;
    }

    .ui3-gradient-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at 40% 45%, rgba(123,108,183,0.12) 0%, transparent 55%),
                  radial-gradient(ellipse at 65% 55%, rgba(201,169,110,0.08) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(240,236,228,0.03) 0%, transparent 40%);
      z-index: 2;
      pointer-events: none;
    }

    .ui3-shard-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      pointer-events: none;
    }

    .ui3-shard {
      position: absolute;
      pointer-events: auto;
      overflow: hidden;
      transition: transform 1.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease;
      will-change: transform;
      animation: ui3-shard-glow-pulse 6s ease-in-out infinite;
    }

    .ui3-shard::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.08) 0%,
        rgba(255,255,255,0.02) 40%,
        transparent 60%,
        rgba(255,255,255,0.04) 100%
      );
      z-index: 10;
      pointer-events: none;
    }

    .ui3-shard::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 300%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.06) 45%,
        rgba(255,255,255,0.12) 50%,
        rgba(255,255,255,0.06) 55%,
        transparent 100%
      );
      z-index: 11;
      pointer-events: none;
      animation: ui3-shimmer 8s linear infinite;
    }

    .ui3-shard-inner {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .ui3-shard-inner h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(5rem, 15vw, 12rem);
      color: #f0ece4;
      margin: 0;
      white-space: nowrap;
      letter-spacing: -0.02em;
      line-height: 1;
      background: linear-gradient(135deg, #f0ece4 0%, #c9a96e 40%, #f0ece4 60%, #7b6cb7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ui3-shard-inner .ui3-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: clamp(0.65rem, 1.2vw, 0.95rem);
      color: rgba(201,169,110,0.6);
      letter-spacing: 0.35em;
      margin-top: 1.2rem;
      text-transform: lowercase;
    }

    .ui3-shard-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .ui3-shard:hover {
      z-index: 20 !important;
    }

    .ui3-crack-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 6;
      pointer-events: none;
    }

    .ui3-ray-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
    }

    .ui3-light-ray {
      position: absolute;
      pointer-events: none;
      animation: ui3-ray-pulse 4s ease-in-out infinite;
    }

    .ui3-crack-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1.8s ease 0.6s;
    }

    .ui3-crack-line.visible {
      opacity: 1;
    }
  `
  document.head.appendChild(style)

  // --- Build DOM ---
  const root = document.createElement('div')
  root.className = 'ui3-root'

  // Ghost text behind everything
  const ghostText = document.createElement('div')
  ghostText.className = 'ui3-ghost-text'
  ghostText.textContent = 'leblanc'
  root.appendChild(ghostText)

  // Gradient background layer
  const gradientBg = document.createElement('div')
  gradientBg.className = 'ui3-gradient-bg'
  root.appendChild(gradientBg)

  // Text layer (visible through shards)
  const textLayer = document.createElement('div')
  textLayer.className = 'ui3-text-layer'
  textLayer.innerHTML = `<h1>leblanc</h1><div class="ui3-subtitle">music &bull; art &bull; vision</div>`
  root.appendChild(textLayer)

  // Light rays container
  const rayContainer = document.createElement('div')
  rayContainer.className = 'ui3-ray-container'
  root.appendChild(rayContainer)

  // Shard container
  const shardContainer = document.createElement('div')
  shardContainer.className = 'ui3-shard-container'
  root.appendChild(shardContainer)

  // Crack lines container
  const crackContainer = document.createElement('div')
  crackContainer.className = 'ui3-crack-container'
  root.appendChild(crackContainer)

  container.appendChild(root)

  // --- Generate shard polygons ---
  function generateShardData(count) {
    const shards = []
    // Generate a Voronoi-like set of points, then create polygons around them
    const centerX = 50
    const centerY = 50

    for (let i = 0; i < count; i++) {
      // Distribute shards across the viewport, clustered toward center
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.8
      const dist = 5 + Math.random() * 42
      const cx = centerX + Math.cos(angle) * dist * (0.6 + Math.random() * 0.8)
      const cy = centerY + Math.sin(angle) * dist * (0.5 + Math.random() * 0.7)

      // Generate polygon vertices (4-7 sided irregular polygon)
      const sides = 4 + Math.floor(Math.random() * 4)
      const vertices = []
      const size = 6 + Math.random() * 10

      for (let j = 0; j < sides; j++) {
        const a = (j / sides) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
        const r = size * (0.5 + Math.random() * 0.6)
        const vx = 50 + Math.cos(a) * r * (1 + Math.random() * 0.3)
        const vy = 50 + Math.sin(a) * r * (0.8 + Math.random() * 0.4)
        vertices.push({ x: Math.max(2, Math.min(98, vx)), y: Math.max(2, Math.min(98, vy)) })
      }

      // Sort vertices by angle for proper polygon
      const centroidX = vertices.reduce((s, v) => s + v.x, 0) / vertices.length
      const centroidY = vertices.reduce((s, v) => s + v.y, 0) / vertices.length
      vertices.sort((a, b) => {
        return Math.atan2(a.y - centroidY, a.x - centroidX) - Math.atan2(b.y - centroidY, b.x - centroidX)
      })

      const clipPath = `polygon(${vertices.map(v => `${v.x}% ${v.y}%`).join(', ')})`

      // Depth layer (0, 1, or 2) for parallax
      const depthLayer = Math.floor(Math.random() * 3)

      // Shatter offset — where the shard goes when shattered
      const shatterAngle = Math.atan2(cy - centerY, cx - centerX)
      const shatterDist = 1.5 + Math.random() * 4
      const shatterRotate = (Math.random() - 0.5) * 12

      shards.push({
        cx: cx,
        cy: cy,
        size: size,
        clipPath,
        depthLayer,
        opacity: 0.55 + Math.random() * 0.4,
        shatterX: Math.cos(shatterAngle) * shatterDist,
        shatterY: Math.sin(shatterAngle) * shatterDist,
        shatterRotate,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftAmpX: 0.15 + Math.random() * 0.35,
        driftAmpY: 0.1 + Math.random() * 0.3,
        driftSpeed: 0.3 + Math.random() * 0.4,
        shimmerDelay: Math.random() * 4,
        index: i
      })
    }
    return shards
  }

  const shardData = generateShardData(36)

  // --- Create shard DOM elements ---
  shardData.forEach((shard, idx) => {
    const el = document.createElement('div')
    el.className = 'ui3-shard'

    const w = shard.size * 2.2
    const h = shard.size * 2.2
    const left = shard.cx - w / 2
    const top = shard.cy - h / 2

    el.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${w}%;
      height: ${h}%;
      clip-path: ${shard.clipPath};
      opacity: 0;
      z-index: ${10 + shard.depthLayer};
      backdrop-filter: blur(${1 + shard.depthLayer}px);
      -webkit-backdrop-filter: blur(${1 + shard.depthLayer}px);
      transition-delay: ${idx * 0.04}s;
      animation-delay: ${shard.shimmerDelay}s;
    `

    // Inner content — reproduces the same text layout so each shard shows its portion
    const inner = document.createElement('div')
    inner.className = 'ui3-shard-inner'

    // Position inner so that the text aligns with the global text layer position
    // The inner must be sized to the viewport and positioned to counteract the shard's offset
    inner.style.cssText = `
      left: ${-left}%;
      top: ${-top}%;
      width: ${(100 / w) * 100}%;
      height: ${(100 / h) * 100}%;
    `

    inner.innerHTML = `
      <h1>leblanc</h1>
      <div class="ui3-subtitle">music &bull; art &bull; vision</div>
    `

    // Glass tint layer
    const glassTint = document.createElement('div')
    glassTint.className = 'ui3-shard-gradient'
    const hue = shard.depthLayer === 0 ? 'rgba(123,108,183,0.04)' :
                shard.depthLayer === 1 ? 'rgba(201,169,110,0.03)' : 'rgba(240,236,228,0.02)'
    glassTint.style.background = `linear-gradient(${45 + idx * 10}deg, ${hue}, transparent)`

    el.appendChild(inner)
    el.appendChild(glassTint)
    shardContainer.appendChild(el)

    // Hover effect — only box-shadow and z-index; transform is handled in animation loop
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = `inset 0 0 30px rgba(201,169,110,0.1), 0 0 15px rgba(123,108,183,0.15), 0 0 4px rgba(255,255,255,0.2)`
      el.style.zIndex = '25'
    })

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'box-shadow 0.8s ease'
      el.style.boxShadow = ''
      el.style.zIndex = String(10 + shard.depthLayer)
      // Reset transition after box-shadow finishes
      setTimeout(() => {
        el.style.transition = ''
      }, 800)
    })

    shardElements.push({ el, data: shard })
  })

  // --- Create light rays between shards ---
  function createLightRays(count) {
    for (let i = 0; i < count; i++) {
      const ray = document.createElement('div')
      ray.className = 'ui3-light-ray'

      const startX = 20 + Math.random() * 60
      const startY = 20 + Math.random() * 60
      const length = 15 + Math.random() * 35
      const angle = Math.random() * 360
      const thickness = 0.5 + Math.random() * 1.5

      ray.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: ${length}%;
        height: ${thickness}px;
        transform: rotate(${angle}deg);
        transform-origin: 0 50%;
        background: linear-gradient(90deg, transparent, rgba(201,169,110,${0.1 + Math.random() * 0.2}), rgba(255,255,255,${0.05 + Math.random() * 0.1}), transparent);
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${3 + Math.random() * 4}s;
        filter: blur(${0.3 + Math.random() * 0.5}px);
      `

      rayContainer.appendChild(ray)
      lightRayElements.push(ray)
    }
  }

  createLightRays(18)

  // --- Create crack lines using SVG ---
  function createCrackLines() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;'

    // Generate crack paths radiating from center
    const cx = 50
    const cy = 50
    const crackCount = 14

    for (let i = 0; i < crackCount; i++) {
      const angle = (i / crackCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
      const segments = 3 + Math.floor(Math.random() * 4)
      let pathD = `M ${cx} ${cy}`

      let curX = cx
      let curY = cy

      for (let s = 0; s < segments; s++) {
        const segLen = 5 + Math.random() * 12
        const deviation = (Math.random() - 0.5) * 1.2
        const segAngle = angle + deviation
        curX += Math.cos(segAngle) * segLen
        curY += Math.sin(segAngle) * segLen
        curX = Math.max(2, Math.min(98, curX))
        curY = Math.max(2, Math.min(98, curY))
        pathD += ` L ${curX} ${curY}`

        // Branch occasionally
        if (Math.random() > 0.6 && s < segments - 1) {
          const branchAngle = segAngle + (Math.random() - 0.5) * 1.5
          const branchLen = 3 + Math.random() * 8
          const bx = curX + Math.cos(branchAngle) * branchLen
          const by = curY + Math.sin(branchAngle) * branchLen

          const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          branch.setAttribute('d', `M ${curX} ${curY} L ${Math.max(2, Math.min(98, bx))} ${Math.max(2, Math.min(98, by))}`)
          branch.setAttribute('stroke', 'rgba(201,169,110,0.12)')
          branch.setAttribute('stroke-width', '0.3')
          branch.setAttribute('fill', 'none')
          branch.setAttribute('vector-effect', 'non-scaling-stroke')
          svg.appendChild(branch)

          // Glow version
          const branchGlow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          branchGlow.setAttribute('d', branch.getAttribute('d'))
          branchGlow.setAttribute('stroke', 'rgba(201,169,110,0.06)')
          branchGlow.setAttribute('stroke-width', '2')
          branchGlow.setAttribute('fill', 'none')
          branchGlow.setAttribute('filter', 'url(#ui3-crack-glow)')
          branchGlow.setAttribute('vector-effect', 'non-scaling-stroke')
          svg.appendChild(branchGlow)
        }
      }

      // Main crack line
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', pathD)
      path.setAttribute('stroke', 'rgba(255,255,255,0.1)')
      path.setAttribute('stroke-width', '0.4')
      path.setAttribute('fill', 'none')
      path.setAttribute('vector-effect', 'non-scaling-stroke')
      svg.appendChild(path)

      // Glow version of the crack
      const glowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      glowPath.setAttribute('d', pathD)
      glowPath.setAttribute('stroke', 'rgba(201,169,110,0.08)')
      glowPath.setAttribute('stroke-width', '2.5')
      glowPath.setAttribute('fill', 'none')
      glowPath.setAttribute('filter', 'url(#ui3-crack-glow)')
      glowPath.setAttribute('vector-effect', 'non-scaling-stroke')
      svg.appendChild(glowPath)
    }

    // SVG filter for glow
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    defs.innerHTML = `
      <filter id="ui3-crack-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    `
    svg.insertBefore(defs, svg.firstChild)

    // Use viewBox for percentage-based coordinates
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.setAttribute('preserveAspectRatio', 'none')

    const crackLine = document.createElement('div')
    crackLine.className = 'ui3-crack-line'
    crackLine.appendChild(svg)
    crackContainer.appendChild(crackLine)
    crackLineElements.push(crackLine)
  }

  createCrackLines()

  // --- Mouse tracking for parallax ---
  function onMouseMove(e) {
    const rect = root.getBoundingClientRect()
    mouseX = (e.clientX - rect.left) / rect.width
    mouseY = (e.clientY - rect.top) / rect.height
  }

  root.addEventListener('mousemove', onMouseMove)

  // --- Animation loop ---
  function animate(timestamp) {
    driftTime = timestamp * 0.001
    shimmerAngle += 0.002

    const parallaxX = (mouseX - 0.5) * 2
    const parallaxY = (mouseY - 0.5) * 2

    shardElements.forEach(({ el, data }) => {
      if (shardsAssembled) return

      // Parallax based on depth layer
      const depthFactor = (data.depthLayer + 1) * 3
      const px = parallaxX * depthFactor
      const py = parallaxY * depthFactor

      // Gentle drift
      const driftX = Math.sin(driftTime * data.driftSpeed + data.driftPhaseX) * data.driftAmpX
      const driftY = Math.cos(driftTime * data.driftSpeed * 0.7 + data.driftPhaseY) * data.driftAmpY

      // Combined transform: shatter offset + parallax + drift + hover lift
      const tx = data.shatterX + px + driftX
      const ty = data.shatterY + py + driftY
      const rz = data.shatterRotate + driftX * 0.5

      const isHovered = el.matches(':hover')
      const tz = isHovered ? 30 : 0

      el.style.transform = `translate3d(${tx}vw, ${ty}vh, ${tz}px) rotate(${rz}deg)`
    })

    animFrameId = requestAnimationFrame(animate)
  }

  // --- Trigger entrance animation ---
  function startEntrance() {
    // Phase 1: Fade in shards assembled at their positions (staggered)
    shardElements.forEach(({ el, data }, idx) => {
      el.style.transition = `opacity 0.6s ease ${idx * 0.02}s`
      el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)'
      el.style.opacity = String(data.opacity)
    })

    // Phase 2: After assembled and visible, shatter them outward
    setTimeout(() => {
      shardsAssembled = false

      shardElements.forEach(({ el, data }, idx) => {
        // Use CSS transition for the initial shatter, then the animation loop takes over
        el.style.transition = `transform 1.8s cubic-bezier(0.23, 1, 0.32, 1) ${idx * 0.03}s`

        const tx = data.shatterX
        const ty = data.shatterY
        const rz = data.shatterRotate

        el.style.transform = `translate3d(${tx}vw, ${ty}vh, 0px) rotate(${rz}deg)`
      })

      // After the CSS transitions finish, remove transition so animation loop has full control
      setTimeout(() => {
        shardElements.forEach(({ el }) => {
          el.style.transition = 'none'
        })
      }, 2600)

      // Show crack lines after shatter begins
      setTimeout(() => {
        crackLineElements.forEach(cl => cl.classList.add('visible'))
      }, 400)

    }, 800)
  }

  // Kick off entrance on next frame
  requestAnimationFrame(() => {
    startEntrance()
  })

  // Start animation loop
  animFrameId = requestAnimationFrame(animate)

  // --- Cleanup ---
  return function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    root.removeEventListener('mousemove', onMouseMove)
    if (style.parentNode) style.parentNode.removeChild(style)
    if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink)
    container.innerHTML = ''
  }
}
