import * as THREE from 'three'

export function ui2(container) {
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflowY = 'auto'
  container.style.overflowX = 'hidden'
  container.style.background = '#0a0806'
  container.style.height = '100%'

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui2FadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui2GradientShift {
      0% { background-position: 0% 50%; }
      25% { background-position: 100% 50%; }
      50% { background-position: 50% 100%; }
      75% { background-position: 0% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes ui2Pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    .ui2-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui2-scroll {
      position: relative;
      z-index: 2;
    }

    .ui2-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: crosshair;
    }

    .ui2-title {
      font-family: 'Unbounded', sans-serif;
      font-weight: 900;
      font-size: clamp(3.5rem, 10vw, 8rem);
      text-transform: lowercase;
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 0.95;
      background: linear-gradient(
        135deg,
        #e8a87c,
        #d4966a,
        #f0c27f,
        #cf8b72,
        #e8a87c,
        #d4966a,
        #f0c27f,
        #cf8b72
      );
      background-size: 400% 400%;
      animation: ui2FadeUp 2s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                 ui2GradientShift 8s ease infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 4px 40px rgba(200, 150, 100, 0.3));
      opacity: 0;
      perspective: 800px;
      transform-style: preserve-3d;
      will-change: transform;
      user-select: none;
    }

    .ui2-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: lowercase;
      color: rgba(255, 255, 255, 0.2);
      margin-top: 28px;
      opacity: 0;
      animation: ui2FadeUp 2s 1.2s ease forwards;
    }

    .ui2-scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: ui2FadeUp 2s 2s ease forwards;
    }

    .ui2-scroll-hint span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.15);
    }

    .ui2-scroll-line {
      width: 1px;
      height: 32px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
      animation: ui2Pulse 2s ease-in-out infinite;
    }

    /* --- Links section --- */
    .ui2-links-section {
      min-height: 100vh;
      padding: 80px 24px 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
      position: relative;
    }

    .ui2-links-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom,
        transparent 0%,
        rgba(10, 8, 6, 0.7) 8%,
        rgba(10, 8, 6, 0.92) 20%,
        rgba(10, 8, 6, 0.97) 40%,
        #0a0806 60%
      );
      pointer-events: none;
      z-index: 0;
    }

    .ui2-links-header {
      position: relative;
      z-index: 1;
      font-family: 'Unbounded', sans-serif;
      font-weight: 700;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
      letter-spacing: 0.05em;
    }

    .ui2-links-sub {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      color: rgba(255, 255, 255, 0.15);
      text-transform: uppercase;
      margin-bottom: 56px;
    }

    .ui2-links-grid {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 440px;
    }

    .ui2-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 24px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      text-decoration: none;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }

    .ui2-link::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(135deg,
        rgba(232, 168, 124, 0.08),
        rgba(212, 150, 106, 0.04),
        transparent
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .ui2-link:hover {
      border-color: rgba(232, 168, 124, 0.25);
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 8px 32px rgba(200, 150, 100, 0.08), 0 0 60px rgba(200, 150, 100, 0.04);
    }

    .ui2-link:hover::before {
      opacity: 1;
    }

    .ui2-link:hover .ui2-link-icon {
      color: #e8a87c;
      transform: scale(1.1);
    }

    .ui2-link:hover .ui2-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui2-link-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.4s ease;
    }

    .ui2-link-icon svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .ui2-link-text {
      flex: 1;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.02em;
    }

    .ui2-link-arrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: rgba(232, 168, 124, 0.6);
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.4s ease;
    }

    .ui2-divider {
      position: relative;
      z-index: 1;
      width: 40px;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 40px 0;
    }

    .ui2-footer {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 0.1);
      text-transform: uppercase;
    }
  `
  document.head.appendChild(style)

  // --- WebGL Canvas (fixed background) ---
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'ui2-canvas-wrap'
  container.appendChild(canvasWrap)

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x0a0806, 1)
  renderer.domElement.style.display = 'block'
  canvasWrap.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  // Perspective camera for depth + parallax
  const fov = 60
  const aspect = window.innerWidth / window.innerHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000)
  camera.position.z = 500

  // --- Mouse tracking ---
  let mouseNorm = { x: 0, y: 0 } // -1 to 1
  let mouseSmooth = { x: 0, y: 0 }
  let tiltX = 0, tiltY = 0, cTiltX = 0, cTiltY = 0

  function onMouseMove(e) {
    mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1
    mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1
    tiltX = (e.clientX / window.innerWidth - 0.5) * 18
    tiltY = (e.clientY / window.innerHeight - 0.5) * -10
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouseNorm.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
      mouseNorm.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
    }
  }

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('touchmove', onTouchMove, { passive: true })
  container.addEventListener('touchstart', onTouchMove, { passive: true })

  // --- Particle system from bloom.png ---
  const particleShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseRadius: { value: 120.0 },
      uMouseStrength: { value: 45.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aOriginal;
      attribute float aRandom;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseRadius;
      uniform float uMouseStrength;
      uniform float uPixelRatio;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec3 pos = aOriginal;

        // Gentle floating motion
        float drift = aRandom * 6.2831;
        pos.x += sin(uTime * 0.3 + drift) * 2.5;
        pos.y += cos(uTime * 0.25 + drift * 1.3) * 2.0;
        pos.z += sin(uTime * 0.2 + drift * 0.7) * 3.0;

        // Mouse force field - push particles away from cursor
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        vec4 projected = projectionMatrix * mvPos;
        vec2 screenPos = projected.xy / projected.w; // -1 to 1 NDC

        vec2 diff = screenPos - uMouse;
        float dist = length(diff);
        float normRadius = uMouseRadius / 500.0; // normalize to NDC space

        if (dist < normRadius) {
          float force = (1.0 - dist / normRadius);
          force = force * force * force; // cubic falloff
          vec2 pushDir = normalize(diff + 0.0001);

          // Convert push from screen space back to world space (approx)
          pos.x += pushDir.x * force * uMouseStrength;
          pos.y += pushDir.y * force * uMouseStrength;
          pos.z += force * uMouseStrength * 0.5 * (aRandom > 0.5 ? 1.0 : -1.0);
        }

        vec4 finalMV = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * finalMV;

        // Size attenuation with depth
        float size = 2.0 + aRandom * 1.5;
        gl_PointSize = size * uPixelRatio * (500.0 / -finalMV.z);
        gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);

        // Slight alpha variation
        vAlpha = 0.6 + aRandom * 0.4;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Soft circular point with glow
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);

        // Core circle
        float alpha = 1.0 - smoothstep(0.15, 0.5, dist);
        // Glow halo
        alpha += 0.3 * (1.0 - smoothstep(0.0, 0.5, dist));
        alpha *= vAlpha;

        if (alpha < 0.01) discard;

        // Slight bloom boost on brighter pixels
        vec3 col = vColor;
        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        col += col * lum * 0.3; // soft self-illumination

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  let particles = null

  // Load bloom.png and decompose into particles
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/images/bloom.png'
  img.onload = () => {
    // Draw to offscreen canvas to read pixels
    const sampleCanvas = document.createElement('canvas')
    const sampleW = Math.min(img.width, 800) // downsample for performance
    const sampleH = Math.round(sampleW * (img.height / img.width))
    sampleCanvas.width = sampleW
    sampleCanvas.height = sampleH
    const ctx = sampleCanvas.getContext('2d')
    ctx.drawImage(img, 0, 0, sampleW, sampleH)
    const imageData = ctx.getImageData(0, 0, sampleW, sampleH)
    const pixels = imageData.data

    // Sample particles from image
    const targetCount = 35000
    const positions = []
    const originals = []
    const colors = []
    const randoms = []

    // Calculate the world-space dimensions so the image is well-framed
    const imgAspect = sampleW / sampleH
    const worldHeight = 450
    const worldWidth = worldHeight * imgAspect

    let attempts = 0
    const maxAttempts = targetCount * 8

    while (positions.length / 3 < targetCount && attempts < maxAttempts) {
      attempts++
      const px = Math.floor(Math.random() * sampleW)
      const py = Math.floor(Math.random() * sampleH)
      const idx = (py * sampleW + px) * 4

      const r = pixels[idx] / 255
      const g = pixels[idx + 1] / 255
      const b = pixels[idx + 2] / 255
      const brightness = r * 0.299 + g * 0.587 + b * 0.114

      // Bias toward brighter pixels - reject dark pixels more often
      if (brightness < 0.05) continue
      if (Math.random() > brightness * 1.5 + 0.1) continue

      // Map pixel coordinates to world space, centered at origin
      const wx = (px / sampleW - 0.5) * worldWidth
      const wy = -(py / sampleH - 0.5) * worldHeight
      const wz = (Math.random() - 0.5) * 100 // z depth spread

      positions.push(wx, wy, wz)
      originals.push(wx, wy, wz)
      colors.push(r, g, b)
      randoms.push(Math.random())
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('aOriginal', new THREE.Float32BufferAttribute(originals, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 1))

    particles = new THREE.Points(geometry, particleShaderMaterial)
    scene.add(particles)
  }

  // --- Scrollable HTML content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui2-scroll'

  const icons = {
    spotify: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    apple: `<svg viewBox="0 0 361 361"><path d="M254.5 65c-18.6 1.3-40.3 12.7-53.2 27.4-11.6 13.1-21.8 33.4-19 52.8 20.3 1.6 41.2-11.1 53.7-25.6 11.7-13.6 20.6-33.5 18.5-54.6zM310.3 195.2c-.5 52.7 46.3 70.2 46.8 70.4-.4 1.2-7.3 25-24.1 49.6-14.5 21.2-29.6 42.3-53.3 42.7-23.3.5-30.8-13.8-57.5-13.8-26.6 0-35 13.4-57 14.2-22.9.8-40.3-22.9-54.9-44.1C80.8 268.6 56.3 189 86.6 134.2c15.1-27.3 42-44.6 71.2-45.1 22.5-.4 43.7 15.1 57.5 15.1 13.7 0 39.5-18.7 66.6-16 11.3.5 43.2 4.6 63.6 34.4-1.6 1-38 22.2-37.6 66.2l.4.4z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.1-.1m-.899.828c-.06 0-.091.038-.1.1l-.17 1.326.17 1.282c.009.06.04.097.1.097.058 0 .091-.038.1-.097l.195-1.282-.194-1.326c-.01-.062-.043-.1-.101-.1m1.8-.6c-.063 0-.108.05-.117.108l-.222 1.926.222 1.874c.009.058.054.107.117.107.062 0 .107-.05.117-.107l.247-1.874-.247-1.926c-.01-.058-.055-.108-.117-.108m.9-.264c-.073 0-.127.058-.136.12l-.213 2.19.213 2.117c.009.063.063.12.136.12.073 0 .126-.057.136-.12l.237-2.117-.237-2.19c-.01-.062-.063-.12-.136-.12m.903-.15c-.083 0-.143.063-.152.133l-.2 2.34.2 2.254c.01.069.069.132.152.132.082 0 .142-.063.152-.132l.224-2.254-.224-2.34c-.01-.07-.07-.133-.152-.133m.903-.1c-.093 0-.16.07-.168.148l-.19 2.44.19 2.352c.008.078.075.148.168.148.092 0 .159-.07.168-.148l.213-2.352-.213-2.44c-.009-.078-.076-.148-.168-.148m.955-.142c-.103 0-.178.08-.187.165l-.163 2.542.163 2.447c.009.084.084.163.187.163.103 0 .177-.08.187-.163l.182-2.447-.182-2.542c-.01-.085-.084-.165-.187-.165m.957-.058c-.113 0-.195.085-.204.18l-.154 2.6.154 2.496c.009.094.091.18.204.18.113 0 .194-.086.204-.18l.172-2.496-.172-2.6c-.01-.095-.091-.18-.204-.18m1.01-.057c-.122 0-.213.094-.222.198l-.145 2.657.145 2.546c.009.103.1.197.222.197.12 0 .212-.094.222-.197l.163-2.546-.163-2.657c-.01-.104-.102-.198-.222-.198m1.063-.048c-.132 0-.232.1-.24.21l-.126 2.705.126 2.594c.008.11.108.21.24.21.132 0 .232-.1.24-.21l.14-2.594-.14-2.705c-.008-.11-.108-.21-.24-.21m1.065.025c-.142 0-.248.108-.257.225l-.116 2.68.116 2.625c.009.117.115.225.257.225.14 0 .247-.108.256-.225l.13-2.625-.13-2.68c-.009-.117-.116-.225-.256-.225m1.06-.18c-.15 0-.266.117-.274.243l-.107 2.835.107 2.674c.008.123.124.24.274.24.15 0 .265-.117.274-.24l.12-2.674-.12-2.835c-.009-.126-.124-.244-.274-.244m1.063-.037c-.16 0-.282.124-.29.258l-.1 2.872.1 2.72c.008.133.13.256.29.256.16 0 .282-.123.29-.256l.112-2.72-.112-2.872c-.008-.134-.13-.258-.29-.258m4.046 1.187c-.16 0-.3.06-.41.156a4.425 4.425 0 0 0-4.395-3.983c-.543 0-1.073.1-1.564.29-.185.073-.234.148-.234.293v8.09c0 .15.118.278.267.294l6.336.003c1.33 0 2.408-1.09 2.408-2.433 0-1.34-1.078-2.41-2.408-2.41"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
  }

  const links = [
    { name: 'Spotify', icon: icons.spotify, url: '#' },
    { name: 'Apple Music', icon: icons.apple, url: '#' },
    { name: 'YouTube', icon: icons.youtube, url: '#' },
    { name: 'SoundCloud', icon: icons.soundcloud, url: '#' },
    { name: 'Instagram', icon: icons.instagram, url: '#' },
    { name: 'TikTok', icon: icons.tiktok, url: '#' },
  ]

  scroll.innerHTML = `
    <div class="ui2-hero">
      <h1 class="ui2-title">leblanc</h1>
      <p class="ui2-subtitle">particle</p>
      <div class="ui2-scroll-hint">
        <span>scroll</span>
        <div class="ui2-scroll-line"></div>
      </div>
    </div>
    <div class="ui2-links-section">
      <h2 class="ui2-links-header">listen everywhere</h2>
      <p class="ui2-links-sub">find me</p>
      <div class="ui2-links-grid">
        ${links.map(l => `
          <a class="ui2-link" href="${l.url}" target="_blank" rel="noopener">
            <div class="ui2-link-icon">${l.icon}</div>
            <span class="ui2-link-text">${l.name}</span>
            <span class="ui2-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
      <div class="ui2-divider"></div>
      <p class="ui2-footer">&copy; leblanc 2026</p>
    </div>
  `
  container.appendChild(scroll)

  // --- 3D tilt on title ---
  const titleEl = scroll.querySelector('.ui2-title')

  // --- Resize ---
  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    particleShaderMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
  }
  window.addEventListener('resize', onResize)

  // --- Render loop ---
  let time = 0
  let raf

  function animate() {
    raf = requestAnimationFrame(animate)
    time += 0.016

    // Smooth mouse
    mouseSmooth.x += (mouseNorm.x - mouseSmooth.x) * 0.08
    mouseSmooth.y += (mouseNorm.y - mouseSmooth.y) * 0.08

    // Smooth title tilt
    cTiltX += (tiltX - cTiltX) * 0.06
    cTiltY += (tiltY - cTiltY) * 0.06
    if (titleEl) {
      titleEl.style.transform = `perspective(800px) rotateY(${cTiltX}deg) rotateX(${cTiltY}deg)`
    }

    // Subtle camera parallax orbit
    camera.position.x += (mouseSmooth.x * 30 - camera.position.x) * 0.03
    camera.position.y += (mouseSmooth.y * 20 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)

    // Update particle uniforms
    particleShaderMaterial.uniforms.uTime.value = time
    particleShaderMaterial.uniforms.uMouse.value.set(mouseSmooth.x, mouseSmooth.y)

    renderer.render(scene, camera)
  }

  animate()

  return function cleanup() {
    cancelAnimationFrame(raf)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('touchmove', onTouchMove)
    container.removeEventListener('touchstart', onTouchMove)
    window.removeEventListener('resize', onResize)
    particleShaderMaterial.dispose()
    if (particles) {
      particles.geometry.dispose()
      scene.remove(particles)
    }
    renderer.dispose()
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
