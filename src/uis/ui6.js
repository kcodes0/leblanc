import * as THREE from 'three'

export function ui6(container) {
  // UI 6 — "Vinyl"
  // 3D spinning vinyl record with bloom image as center label

  let rafId = null
  let renderer = null
  let scene = null
  let camera = null
  let mouse = { x: 0, y: 0 }
  let disposed = false

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui6-fadeIn {
      0% { opacity: 0; transform: translateY(18px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui6-fadeInSlow {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    .ui6-root {
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      background: #0a0806;
    }

    .ui6-canvas-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }

    .ui6-canvas-wrap canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .ui6-scroll-content {
      position: relative;
      z-index: 2;
    }

    .ui6-hero {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .ui6-title {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      font-style: italic;
      font-size: clamp(3.5rem, 10vw, 8rem);
      color: #f5e6d3;
      letter-spacing: 0.04em;
      margin: 0;
      line-height: 1;
      text-align: center;
      opacity: 0;
      animation: ui6-fadeIn 1.6s 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      position: relative;
      z-index: 3;
      margin-bottom: clamp(200px, 35vh, 380px);
      text-shadow: 0 2px 30px rgba(180, 140, 90, 0.15);
      pointer-events: auto;
    }

    .ui6-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 400;
      font-size: clamp(0.65rem, 1.2vw, 0.85rem);
      color: rgba(245, 230, 211, 0.35);
      letter-spacing: 0.35em;
      text-transform: uppercase;
      margin: 0;
      position: absolute;
      bottom: clamp(60px, 12vh, 100px);
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      animation: ui6-fadeIn 1.4s 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      pointer-events: auto;
    }

    .ui6-links-section {
      position: relative;
      min-height: 100vh;
      background: linear-gradient(180deg, transparent 0%, rgba(6, 5, 3, 0.95) 15%, #060503 30%);
      padding: 120px 0 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
    }

    .ui6-links-header {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-style: italic;
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      color: rgba(245, 230, 211, 0.4);
      letter-spacing: 0.15em;
      margin: 0 0 60px 0;
      text-transform: lowercase;
      opacity: 0;
      animation: ui6-fadeInSlow 1.5s 0.5s ease-out forwards;
    }

    .ui6-links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 90%;
      max-width: 480px;
    }

    .ui6-link-item {
      opacity: 0;
      animation: ui6-fadeIn 0.8s ease-out forwards;
    }

    .ui6-link {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 18px 0;
      border-bottom: 1px solid rgba(245, 230, 211, 0.06);
      text-decoration: none;
      color: rgba(245, 230, 211, 0.7);
      transition: color 0.3s ease, border-color 0.3s ease;
      cursor: pointer;
    }

    .ui6-link:hover {
      color: #f5e6d3;
      border-bottom-color: rgba(245, 230, 211, 0.15);
    }

    .ui6-link-num {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 400;
      font-size: 0.7rem;
      color: rgba(245, 230, 211, 0.25);
      min-width: 28px;
      transition: color 0.3s ease;
    }

    .ui6-link:hover .ui6-link-num {
      color: rgba(245, 230, 211, 0.5);
    }

    .ui6-link-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }

    .ui6-link:hover .ui6-link-icon {
      opacity: 0.85;
    }

    .ui6-link-icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .ui6-link-label {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 400;
      font-size: clamp(0.85rem, 1.4vw, 1rem);
      letter-spacing: 0.06em;
      flex: 1;
    }

    .ui6-link-side {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      color: rgba(245, 230, 211, 0.15);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .ui6-footer {
      margin-top: 80px;
      padding: 40px 0;
      text-align: center;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 0.65rem;
      color: rgba(245, 230, 211, 0.15);
      letter-spacing: 0.2em;
      opacity: 0;
      animation: ui6-fadeInSlow 1s 1.5s ease-out forwards;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui6-root'

  // Canvas wrapper
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'ui6-canvas-wrap'
  root.appendChild(canvasWrap)

  // Scroll content
  const scrollContent = document.createElement('div')
  scrollContent.className = 'ui6-scroll-content'

  // Hero
  const hero = document.createElement('div')
  hero.className = 'ui6-hero'

  const title = document.createElement('h1')
  title.className = 'ui6-title'
  title.textContent = 'leblanc'
  hero.appendChild(title)

  const subtitle = document.createElement('p')
  subtitle.className = 'ui6-subtitle'
  subtitle.textContent = 'vinyl'
  hero.appendChild(subtitle)

  scrollContent.appendChild(hero)

  // Links section
  const linksSection = document.createElement('div')
  linksSection.className = 'ui6-links-section'

  const linksHeader = document.createElement('h2')
  linksHeader.className = 'ui6-links-header'
  linksHeader.textContent = 'listen everywhere'
  linksSection.appendChild(linksHeader)

  const linksList = document.createElement('ul')
  linksList.className = 'ui6-links-list'

  const links = [
    { num: '01', label: 'Spotify', side: 'A1', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>` },
    { num: '02', label: 'Apple Music', side: 'A2', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.237a10.16 10.16 0 00-1.898-.122C17.337.09 16.87.07 16.4.07H7.6c-.47 0-.94.02-1.41.04A10.149 10.149 0 004.3.236a5.02 5.02 0 00-1.88.656C1.3 1.625.556 2.625.24 3.935a9.23 9.23 0 00-.24 2.19c-.03.47-.05.94-.05 1.41v8.93c0 .47.02.94.05 1.41.04.72.14 1.46.24 2.19.32 1.31 1.06 2.31 2.18 3.04a5.02 5.02 0 001.88.66c.63.09 1.26.14 1.89.17.47.02.94.04 1.41.04h8.8c.47 0 .94-.02 1.41-.04a10.16 10.16 0 001.89-.17 5.02 5.02 0 001.88-.66c1.12-.73 1.86-1.73 2.18-3.04.1-.73.2-1.47.24-2.19.03-.47.05-.94.05-1.41V7.534c0-.47-.02-.94-.05-1.41zM16.95 17.22h-.01c0 .94-.76 1.7-1.7 1.7-.14 0-.29-.02-.43-.06l-.06-.02c-1.18-.33-2.1-.56-3.21-.56-.3 0-.62.02-.94.07-.47.07-.82.46-.82.94v.01c0 .07-.01.14-.02.2-.1.5-.56.87-1.08.87-.08 0-.16-.01-.24-.03-.5-.12-.86-.57-.86-1.09V9.49c0-.47.32-.88.77-.99.59-.16 1.17-.3 1.83-.41a8.73 8.73 0 011.37-.11c1.62 0 3.07.39 4.26 1.1.36.21.58.6.58 1.02v7.12h.01z"/></svg>` },
    { num: '03', label: 'YouTube', side: 'A3', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` },
    { num: '04', label: 'SoundCloud', side: 'B1', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.035.104-.094l.205-1.282-.205-1.332c-.014-.057-.047-.094-.104-.094m1.8-.76c-.067 0-.12.05-.127.114l-.214 2.093.214 2.036c.007.064.06.114.127.114.066 0 .12-.05.127-.114l.241-2.036-.241-2.093c-.007-.064-.06-.114-.127-.114m.901-.244c-.073 0-.133.06-.14.132l-.198 2.093.198 2.028c.007.072.067.132.14.132.073 0 .133-.06.14-.132l.224-2.028-.224-2.093c-.007-.072-.067-.132-.14-.132m.899-.356c-.08 0-.145.067-.151.148l-.182 2.45.182 2.003c.006.08.071.148.151.148.08 0 .145-.068.152-.148l.207-2.003-.207-2.45c-.007-.08-.072-.148-.152-.148m.903-.279c-.088 0-.158.074-.163.163l-.167 2.729.167 1.974c.005.088.075.163.163.163s.158-.075.164-.163l.189-1.974-.189-2.729c-.006-.089-.076-.163-.164-.163m.899-.117c-.094 0-.17.08-.176.178l-.152 2.846.152 1.96c.006.096.082.178.176.178.095 0 .17-.082.177-.178l.172-1.96-.172-2.846c-.007-.098-.082-.178-.177-.178m.9-.122c-.102 0-.184.088-.19.194l-.136 2.968.136 1.945c.006.104.088.194.19.194.1 0 .183-.09.189-.194l.154-1.945-.154-2.968c-.006-.106-.089-.194-.19-.194m.9-.016c-.109 0-.197.094-.202.21l-.12 2.984.12 1.924c.005.114.093.21.202.21.109 0 .197-.096.203-.21l.136-1.924-.136-2.984c-.006-.116-.094-.21-.203-.21m.902.102c-.116 0-.21.102-.214.226l-.106 2.882.106 1.904c.004.122.098.226.214.226.115 0 .21-.104.215-.226l.12-1.904-.12-2.882c-.005-.124-.1-.226-.215-.226m.899.22c-.122 0-.222.108-.227.238l-.09 2.664.09 1.882c.005.128.105.238.227.238.121 0 .222-.11.227-.238l.103-1.882-.103-2.664c-.005-.13-.106-.238-.227-.238m2.705-1.46c-.173 0-.313.148-.317.33l-.076 3.894.076 1.848c.004.18.144.33.317.33.172 0 .312-.15.316-.33l.087-1.848-.087-3.894c-.004-.182-.144-.33-.316-.33m-.902.292c-.166 0-.301.14-.305.314l-.082 3.602.082 1.862c.004.172.139.314.305.314.165 0 .3-.142.306-.314l.094-1.862-.094-3.602c-.006-.174-.141-.314-.306-.314m-.903.085c-.16 0-.29.134-.295.3l-.088 3.518.088 1.872c.005.164.135.3.295.3.159 0 .29-.136.296-.3l.1-1.872-.1-3.518c-.006-.166-.137-.3-.296-.3m3.607-1.727c-.027-.004-.055-.006-.083-.006-.19 0-.345.16-.348.354l-.072 4.806.072 1.834c.003.192.158.354.348.354.027 0 .055-.003.083-.008a.35.35 0 00.264-.346l.08-1.834-.08-4.806a.35.35 0 00-.264-.348m3.76 1.052c-.3 0-.58.052-.842.15-.175-1.97-1.842-3.51-3.873-3.51-.548 0-1.079.12-1.556.334-.18.08-.228.162-.23.32v8.456c.002.164.136.3.3.316.015.002 5.2.002 6.2.002 1.492 0 2.702-1.21 2.702-2.702 0-1.49-1.21-2.702-2.702-2.702"/></svg>` },
    { num: '05', label: 'Instagram', side: 'B2', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>` },
    { num: '06', label: 'TikTok', side: 'B3', url: '#', icon: `<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` }
  ]

  links.forEach((link, i) => {
    const li = document.createElement('li')
    li.className = 'ui6-link-item'
    li.style.animationDelay = `${0.8 + i * 0.1}s`

    const a = document.createElement('a')
    a.className = 'ui6-link'
    a.href = link.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'

    a.innerHTML = `
      <span class="ui6-link-num">${link.num}</span>
      <span class="ui6-link-icon">${link.icon}</span>
      <span class="ui6-link-label">${link.label}</span>
      <span class="ui6-link-side">${link.side}</span>
    `

    li.appendChild(a)
    linksList.appendChild(li)
  })

  linksSection.appendChild(linksList)

  const footer = document.createElement('div')
  footer.className = 'ui6-footer'
  footer.textContent = '\u00A9 leblanc 2026'
  linksSection.appendChild(footer)

  scrollContent.appendChild(linksSection)
  root.appendChild(scrollContent)
  container.appendChild(root)

  // ——— Three.js Scene ———
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.8, 4.2)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  canvasWrap.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0x2a2018, 0.6)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffecd2, 2.5)
  keyLight.position.set(3, 5, 2)
  scene.add(keyLight)

  const rimLight = new THREE.PointLight(0xccbbaa, 1.5, 12)
  rimLight.position.set(-3, 2, -1)
  scene.add(rimLight)

  const edgeLight = new THREE.PointLight(0xffd4a0, 0.8, 8)
  edgeLight.position.set(2, -1, 3)
  scene.add(edgeLight)

  // Background floor/gradient spotlight
  const floorGeo = new THREE.PlaneGeometry(20, 20)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0806,
    roughness: 0.9,
    metalness: 0.1
  })
  const floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.2
  scene.add(floor)

  // Spotlight on floor for radial gradient effect
  const spotLight = new THREE.SpotLight(0x3d2b1a, 3, 15, Math.PI / 4, 0.8, 1.5)
  spotLight.position.set(0, 6, 2)
  spotLight.target.position.set(0, -1.2, 0)
  scene.add(spotLight)
  scene.add(spotLight.target)

  // Record group
  const recordGroup = new THREE.Group()
  recordGroup.rotation.x = -0.3
  recordGroup.rotation.z = 0.15
  scene.add(recordGroup)

  // Vinyl groove shader material
  const grooveVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const grooveFragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;

    void main() {
      // Center UV
      vec2 centered = vUv - 0.5;
      float dist = length(centered);
      float angle = atan(centered.y, centered.x);

      // Base vinyl color - very dark
      vec3 baseColor = vec3(0.02, 0.018, 0.015);

      // Concentric groove lines
      float grooveFreq = 220.0;
      float groove = sin(dist * grooveFreq) * 0.5 + 0.5;
      groove = smoothstep(0.3, 0.7, groove);
      float grooveBrightness = groove * 0.04;

      // Specular highlight that sweeps with rotation
      float sweepAngle = uTime * 0.785; // matches rotation speed
      float angleDiff = angle - sweepAngle;
      float sweep = cos(angleDiff) * 0.5 + 0.5;
      sweep = pow(sweep, 8.0);
      float specular = sweep * smoothstep(0.15, 0.3, dist) * 0.12;

      // Secondary highlight opposite side
      float sweep2 = cos(angleDiff + 3.14159) * 0.5 + 0.5;
      sweep2 = pow(sweep2, 12.0);
      float specular2 = sweep2 * smoothstep(0.15, 0.3, dist) * 0.05;

      // Rainbow iridescence in grooves (subtle)
      vec3 iridescence = vec3(
        sin(dist * 80.0 + sweepAngle) * 0.5 + 0.5,
        sin(dist * 80.0 + sweepAngle + 2.094) * 0.5 + 0.5,
        sin(dist * 80.0 + sweepAngle + 4.189) * 0.5 + 0.5
      );
      float iridMask = sweep * smoothstep(0.15, 0.25, dist) * 0.03;

      // Mouse-based needle scratch highlight
      vec2 mouseDir = normalize(uMouse - vec2(0.0));
      float mouseAngle = atan(uMouse.y, uMouse.x);
      float needleAngleDiff = abs(mod(angle - mouseAngle + 3.14159, 6.28318) - 3.14159);
      float needle = smoothstep(0.15, 0.0, needleAngleDiff);
      needle *= smoothstep(0.15, 0.25, dist) * smoothstep(0.5, 0.45, dist);
      float needleGlow = needle * 0.08 * (0.5 + 0.5 * sin(uTime * 2.0));

      // Combine
      vec3 color = baseColor;
      color += grooveBrightness * vec3(0.9, 0.85, 0.8);
      color += specular * vec3(1.0, 0.95, 0.88);
      color += specular2 * vec3(0.88, 0.92, 1.0);
      color += iridescence * iridMask;
      color += needleGlow * vec3(1.0, 0.9, 0.7);

      // Edge darkening
      float edgeFade = smoothstep(0.5, 0.48, dist);
      float innerFade = smoothstep(0.14, 0.17, dist);
      float alpha = edgeFade * innerFade;

      gl_FragColor = vec4(color, alpha);
    }
  `

  const grooveMaterial = new THREE.ShaderMaterial({
    vertexShader: grooveVertexShader,
    fragmentShader: grooveFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    },
    transparent: true,
    side: THREE.DoubleSide
  })

  // Vinyl disc - using a Circle so the shader can do everything
  const vinylGeo = new THREE.CircleGeometry(1.8, 128)
  const vinylDisc = new THREE.Mesh(vinylGeo, grooveMaterial)
  vinylDisc.rotation.x = -Math.PI / 2
  recordGroup.add(vinylDisc)

  // Vinyl edge (rim) - thin cylinder for the 3D edge
  const rimGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.04, 128, 1, true)
  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a0908,
    roughness: 0.3,
    metalness: 0.8,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3
  })
  const rim = new THREE.Mesh(rimGeo, rimMat)
  recordGroup.add(rim)

  // Bottom disc face
  const bottomGeo = new THREE.CircleGeometry(1.8, 128)
  const bottomMat = new THREE.MeshStandardMaterial({ color: 0x050403, roughness: 0.8, metalness: 0.2 })
  const bottomDisc = new THREE.Mesh(bottomGeo, bottomMat)
  bottomDisc.rotation.x = Math.PI / 2
  bottomDisc.position.y = -0.02
  recordGroup.add(bottomDisc)

  // Center label with bloom texture
  const textureLoader = new THREE.TextureLoader()
  const labelTexture = textureLoader.load('/images/bloom.png')
  labelTexture.colorSpace = THREE.SRGBColorSpace

  const labelGeo = new THREE.CircleGeometry(0.6, 64)
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.5,
    metalness: 0.1,
    emissive: 0x1a1008,
    emissiveIntensity: 0.2
  })
  const label = new THREE.Mesh(labelGeo, labelMat)
  label.rotation.x = -Math.PI / 2
  label.position.y = 0.005
  recordGroup.add(label)

  // Center spindle hole
  const spindleGeo = new THREE.CircleGeometry(0.04, 32)
  const spindleMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 })
  const spindle = new THREE.Mesh(spindleGeo, spindleMat)
  spindle.rotation.x = -Math.PI / 2
  spindle.position.y = 0.008
  recordGroup.add(spindle)

  // Shadow/reflection below record
  const shadowGeo = new THREE.CircleGeometry(2.0, 64)
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.35
  })
  const shadow = new THREE.Mesh(shadowGeo, shadowMat)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -1.18
  shadow.scale.set(1, 0.6, 1)
  scene.add(shadow)

  // Mouse tracking
  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

  // Resize
  function onResize() {
    if (disposed) return
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  // Intersection observer for links
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running'
      }
    })
  }, { threshold: 0.1 })

  linksList.querySelectorAll('.ui6-link-item').forEach(item => {
    item.style.animationPlayState = 'paused'
    observer.observe(item)
  })

  // Animation loop
  const clock = new THREE.Clock()

  function animate() {
    if (disposed) return
    rafId = requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()

    // Rotate record (Y-axis in local space, which is the disc's spin axis)
    recordGroup.rotation.y = elapsed * (2 * Math.PI / 8) // 8 sec per revolution

    // Mouse tilt (add to base tilt, max ~10 degrees = ~0.175 rad)
    const targetTiltX = -0.3 + mouse.y * 0.175
    const targetTiltZ = 0.15 + mouse.x * 0.175
    recordGroup.rotation.x += (targetTiltX - recordGroup.rotation.x) * 0.05
    recordGroup.rotation.z += (targetTiltZ - recordGroup.rotation.z) * 0.05

    // Update shader uniforms
    grooveMaterial.uniforms.uTime.value = elapsed
    grooveMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)

    // Scroll-based opacity/position for the record
    const scrollY = root.scrollTop || 0
    const viewH = window.innerHeight
    const scrollFade = Math.max(0, 1 - scrollY / (viewH * 0.8))
    recordGroup.position.y = -scrollY * 0.002
    canvasWrap.style.opacity = scrollFade

    renderer.render(scene, camera)
  }

  animate()

  // Cleanup
  return function cleanup() {
    disposed = true
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    observer.disconnect()

    // Dispose Three.js resources
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })

    if (labelTexture) labelTexture.dispose()
    if (renderer) {
      renderer.dispose()
      renderer.forceContextLoss()
    }

    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
