import * as THREE from 'three'

export function ui4(container) {
  // UI 4 — "Terrain"
  // The bloom image sculpted into a living 3D landscape. Cinematic orbiting camera. Dramatic lighting.

  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'auto'
  container.style.overflowX = 'hidden'
  container.style.overflowY = 'auto'
  container.style.background = '#0a0806'
  container.style.height = '100%'

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui4FadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui4TitleIn {
      from { opacity: 0; transform: translateY(30px) scale(0.96); }
      to { opacity: 0.85; transform: translateY(0) scale(1); }
    }
    @keyframes ui4SubIn {
      from { opacity: 0; letter-spacing: 12px; }
      to { opacity: 0.2; letter-spacing: 5px; }
    }
    @keyframes ui4Pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes ui4LetterMorph {
      0% { font-variation-settings: 'YEAR' 1979; }
      50% { font-variation-settings: 'YEAR' 2000; }
      100% { font-variation-settings: 'YEAR' 1979; }
    }

    .ui4-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui4-scroll {
      position: relative;
      z-index: 2;
    }

    .ui4-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      pointer-events: auto;
    }

    .ui4-title {
      font-family: 'Climate Crisis', sans-serif;
      font-weight: 400;
      font-size: clamp(3rem, 9vw, 7rem);
      text-transform: lowercase;
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 1;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 4px 40px rgba(200, 150, 100, 0.2), 0 0 80px rgba(255, 212, 184, 0.08);
      opacity: 0;
      animation: ui4TitleIn 2.5s 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                 ui4LetterMorph 12s 3s ease-in-out infinite;
      perspective: 800px;
      transform-style: preserve-3d;
      user-select: none;
    }

    .ui4-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.2);
      margin-top: 28px;
      opacity: 0;
      animation: ui4SubIn 2s 2s ease forwards;
    }

    .ui4-scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: ui4FadeUp 2s 3s ease forwards;
    }

    .ui4-scroll-hint span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.15);
    }

    .ui4-scroll-line {
      width: 1px;
      height: 32px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
      animation: ui4Pulse 2s ease-in-out infinite;
    }

    /* --- Links section --- */
    .ui4-links-section {
      min-height: 100vh;
      padding: 80px 24px 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
      position: relative;
    }

    .ui4-links-section::before {
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

    .ui4-links-header {
      position: relative;
      z-index: 1;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
      letter-spacing: 0.05em;
    }

    .ui4-links-sub {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      color: rgba(255, 255, 255, 0.15);
      text-transform: uppercase;
      margin-bottom: 56px;
    }

    .ui4-links-grid {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 440px;
    }

    .ui4-link {
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

    .ui4-link::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(135deg,
        rgba(255, 212, 184, 0.08),
        rgba(210, 160, 120, 0.04),
        transparent
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .ui4-link:hover {
      border-color: rgba(255, 212, 184, 0.25);
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 8px 32px rgba(200, 150, 100, 0.1), 0 0 60px rgba(200, 150, 100, 0.04);
    }

    .ui4-link:hover::before {
      opacity: 1;
    }

    .ui4-link:hover .ui4-link-icon {
      color: #ffd4b8;
      transform: scale(1.1);
    }

    .ui4-link:hover .ui4-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui4-link-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.4s ease;
    }

    .ui4-link-icon svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .ui4-link-text {
      flex: 1;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.02em;
    }

    .ui4-link-arrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: rgba(255, 212, 184, 0.6);
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.4s ease;
    }

    .ui4-divider {
      position: relative;
      z-index: 1;
      width: 40px;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 40px 0;
    }

    .ui4-footer {
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
  canvasWrap.className = 'ui4-canvas-wrap'
  container.appendChild(canvasWrap)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  canvasWrap.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#0a0806')
  scene.fog = new THREE.FogExp2(0x0a0806, 0.35)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 2.2, 3.5)
  camera.lookAt(0, 0.3, 0)

  // --- Lighting ---
  // Warm directional from above-left (peach)
  const dirLight = new THREE.DirectionalLight(0xffd4b8, 2.0)
  dirLight.position.set(-3, 5, 2)
  scene.add(dirLight)

  // Cool ambient (deep purple-black)
  const ambientLight = new THREE.AmbientLight(0x1a1020, 0.6)
  scene.add(ambientLight)

  // Warm gold point light — will be positioned at terrain peak once loaded
  const peakLight = new THREE.PointLight(0xffc87c, 1.5, 6)
  peakLight.position.set(0, 1.5, 0)
  scene.add(peakLight)

  // Secondary rim light for drama
  const rimLight = new THREE.DirectionalLight(0x8060a0, 0.4)
  rimLight.position.set(3, 2, -3)
  scene.add(rimLight)

  // --- Terrain ---
  const segments = 256
  const planeGeo = new THREE.PlaneGeometry(4, 4, segments, segments)
  planeGeo.rotateX(-Math.PI / 2) // lay flat

  // Placeholder material — will be updated once texture loads
  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.7,
    metalness: 0.1,
    side: THREE.DoubleSide,
  })

  const terrain = new THREE.Mesh(planeGeo, terrainMat)
  scene.add(terrain)

  // --- Load bloom texture, displace vertices, apply as map ---
  const loader = new THREE.TextureLoader()
  let bloomTexture = null

  loader.load('/images/bloom.png', (tex) => {
    bloomTexture = tex
    tex.colorSpace = THREE.SRGBColorSpace

    // Apply texture as the terrain's color map
    terrainMat.map = tex
    terrainMat.needsUpdate = true

    // Read pixel data for displacement
    const img = tex.image
    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = img.width
    tmpCanvas.height = img.height
    const ctx = tmpCanvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const imgData = ctx.getImageData(0, 0, img.width, img.height)
    const pixels = imgData.data

    // Displace vertices
    const posAttr = planeGeo.getAttribute('position')
    const uvAttr = planeGeo.getAttribute('uv')
    let maxDisplacement = 0

    for (let i = 0; i < posAttr.count; i++) {
      const u = uvAttr.getX(i)
      const v = uvAttr.getY(i)

      // Sample pixel at this UV
      const px = Math.floor(u * (img.width - 1))
      const py = Math.floor((1.0 - v) * (img.height - 1)) // flip V
      const idx = (py * img.width + px) * 4

      const r = pixels[idx]
      const g = pixels[idx + 1]
      const b = pixels[idx + 2]
      // Perceived brightness
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0

      const displacement = brightness * 1.2 // max height
      posAttr.setY(i, displacement)

      if (displacement > maxDisplacement) {
        maxDisplacement = displacement
      }
    }

    planeGeo.computeVertexNormals()
    posAttr.needsUpdate = true

    // Position peak light at the highest point
    peakLight.position.y = maxDisplacement + 0.3

    // Adjust camera target to mid-height of terrain
    const midHeight = maxDisplacement * 0.4
    cameraTarget.set(0, midHeight, 0)
  })

  // --- Camera orbit state ---
  let mouseX = 0.5
  let mouseY = 0.5
  let smoothMouseX = 0.5
  let smoothMouseY = 0.5
  const cameraTarget = new THREE.Vector3(0, 0.3, 0)
  const orbitRadius = 3.8
  const baseAngle = Math.PI * 0.15 // slightly in front

  // --- Scrollable HTML content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui4-scroll'

  // SVG icons
  const icons = {
    spotify: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    apple: `<svg viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043C21.023.56 20.373.322 19.686.196 19.12.094 18.546.06 17.965.044 17.755.033 17.543.017 17.333 0H6.667c-.21.017-.42.033-.63.044-.58.016-1.155.05-1.72.152C3.63.322 2.978.56 2.427.89 1.31 1.624.564 2.624.247 3.934a9.08 9.08 0 0 0-.24 2.19C.003 6.313 0 6.503 0 6.693v10.614c0 .19.003.38.006.57.016.98.097 1.93.396 2.845.297 1.037.835 1.938 1.6 2.7.521.52 1.13.918 1.813 1.2.58.24 1.187.39 1.812.467.493.06.99.087 1.49.097.255.01.51.02.766.02h10.234c.256 0 .511-.01.766-.02.5-.01.997-.037 1.49-.098.625-.077 1.232-.226 1.812-.466.683-.282 1.292-.68 1.813-1.2.765-.762 1.303-1.663 1.6-2.7.3-.916.38-1.866.396-2.845.003-.19.006-.38.006-.57V6.693c0-.19-.003-.38-.006-.57zM12 18.624c-3.635 0-6.584-2.95-6.584-6.584S8.365 5.456 12 5.456s6.584 2.95 6.584 6.584-2.95 6.584-6.584 6.584zm6.848-11.899a1.549 1.549 0 1 1 0-3.098 1.549 1.549 0 0 1 0 3.098zM12 7.685a4.354 4.354 0 1 0 0 8.709 4.354 4.354 0 0 0 0-8.709z"/></svg>`,
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
    <div class="ui4-hero">
      <h1 class="ui4-title">leblanc</h1>
      <p class="ui4-subtitle">terrain</p>
      <div class="ui4-scroll-hint">
        <span>scroll</span>
        <div class="ui4-scroll-line"></div>
      </div>
    </div>
    <div class="ui4-links-section">
      <h2 class="ui4-links-header">listen everywhere</h2>
      <p class="ui4-links-sub">find me</p>
      <div class="ui4-links-grid">
        ${links.map(l => `
          <a class="ui4-link" href="${l.url}" target="_blank" rel="noopener">
            <div class="ui4-link-icon">${l.icon}</div>
            <span class="ui4-link-text">${l.name}</span>
            <span class="ui4-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
      <div class="ui4-divider"></div>
      <p class="ui4-footer">&copy; leblanc 2026</p>
    </div>
  `
  container.appendChild(scroll)

  // --- 3D tilt on title ---
  const titleEl = scroll.querySelector('.ui4-title')
  let tx = 0, ty = 0, cx = 0, cy = 0

  // --- Interaction ---
  function onMove(e) {
    mouseX = e.clientX / window.innerWidth
    mouseY = e.clientY / window.innerHeight

    // 3D title tilt
    tx = (mouseX - 0.5) * 18
    ty = (mouseY - 0.5) * -10
  }

  function onTouch(e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX / window.innerWidth
      mouseY = e.touches[0].clientY / window.innerHeight
    }
  }

  container.addEventListener('mousemove', onMove)
  container.addEventListener('touchmove', onTouch, { passive: true })
  container.addEventListener('touchstart', onTouch, { passive: true })

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  // --- Render loop ---
  let time = 0
  let raf

  function animate() {
    raf = requestAnimationFrame(animate)
    time += 0.016

    // Smooth title tilt
    cx += (tx - cx) * 0.06
    cy += (ty - cy) * 0.06
    if (titleEl) {
      titleEl.style.transform = `perspective(800px) rotateY(${cx}deg) rotateX(${cy}deg)`
    }

    // Smooth mouse interpolation
    smoothMouseX += (mouseX - smoothMouseX) * 0.03
    smoothMouseY += (mouseY - smoothMouseY) * 0.03

    // Slow turntable rotation + mouse orbit
    const turntableAngle = time * 0.08 // slow turntable
    const mouseOrbitAngle = (smoothMouseX - 0.5) * Math.PI * 0.8 // mouse horizontal orbit
    const totalAngle = baseAngle + turntableAngle + mouseOrbitAngle

    // Camera height from mouse Y
    const baseHeight = 2.0
    const heightRange = 1.2
    const cameraHeight = baseHeight + (0.5 - smoothMouseY) * heightRange

    camera.position.x = Math.sin(totalAngle) * orbitRadius
    camera.position.z = Math.cos(totalAngle) * orbitRadius
    camera.position.y = cameraHeight

    camera.lookAt(cameraTarget)

    // Subtle light animation — peak light pulses gently
    peakLight.intensity = 1.5 + Math.sin(time * 0.5) * 0.3

    renderer.render(scene, camera)
  }

  animate()

  // --- Cleanup ---
  return function cleanup() {
    cancelAnimationFrame(raf)
    container.removeEventListener('mousemove', onMove)
    container.removeEventListener('touchmove', onTouch)
    container.removeEventListener('touchstart', onTouch)
    window.removeEventListener('resize', onResize)

    // Dispose geometry
    planeGeo.dispose()

    // Dispose materials
    terrainMat.dispose()

    // Dispose textures
    if (bloomTexture) bloomTexture.dispose()

    // Dispose lights (remove from scene)
    scene.remove(dirLight)
    scene.remove(ambientLight)
    scene.remove(peakLight)
    scene.remove(rimLight)
    scene.remove(terrain)

    // Dispose renderer
    renderer.dispose()

    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
