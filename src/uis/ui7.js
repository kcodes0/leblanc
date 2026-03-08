import * as THREE from 'three'

export function ui7(container) {
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'hidden'
  container.style.overflowY = 'auto'
  container.style.overflowX = 'hidden'
  container.style.background = '#000'
  container.style.height = '100%'

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui7FadeIn {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui7GlowPulse {
      0%, 100% { text-shadow: 0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05); }
      50% { text-shadow: 0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(255,255,255,0.1); }
    }
    @keyframes ui7LinkFadeIn {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ui7-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui7-scroll {
      position: relative;
      z-index: 2;
    }

    .ui7-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ui7-title {
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      font-size: clamp(3.5rem, 10vw, 8rem);
      color: rgba(255,255,255,0.9);
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 1;
      text-shadow: 0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05);
      animation: ui7FadeIn 2s 0.3s ease-out both, ui7GlowPulse 6s 2.3s ease-in-out infinite;
      will-change: transform;
      transition: transform 0.18s ease-out;
      pointer-events: auto;
      cursor: default;
      user-select: none;
    }

    .ui7-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.7rem, 1.5vw, 0.95rem);
      font-weight: 300;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.35em;
      text-transform: lowercase;
      margin: 20px 0 0 0;
      text-indent: 0.35em;
      animation: ui7FadeIn 2s 1s ease-out both;
    }

    /* --- Links Section --- */
    .ui7-links-section {
      min-height: 100vh;
      background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(8,8,12,0.97) 15%, rgba(8,8,12,0.99) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px 60px;
      gap: 48px;
    }

    .ui7-links-header {
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      font-size: clamp(1.3rem, 3vw, 2rem);
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.04em;
      margin: 0;
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.8s ease;
      transform: translateY(20px);
    }
    .ui7-links-header.ui7-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .ui7-links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
      width: 100%;
      max-width: 580px;
    }

    .ui7-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 22px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      text-decoration: none;
      color: rgba(255,255,255,0.75);
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 400;
      letter-spacing: 0.02em;
      transition: all 0.35s ease;
      opacity: 0;
      transform: translateY(14px);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .ui7-link.ui7-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .ui7-link:hover {
      background: rgba(255,255,255,0.07);
      border-color: rgba(255,255,255,0.14);
      box-shadow: 0 0 25px rgba(255,255,255,0.04), inset 0 0 20px rgba(255,255,255,0.01);
      color: rgba(255,255,255,0.95);
      transform: translateY(-1px);
    }
    .ui7-link svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      fill: currentColor;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }
    .ui7-link:hover svg {
      opacity: 1;
    }
    .ui7-link-arrow {
      margin-left: auto;
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      font-size: 1rem;
      color: rgba(255,255,255,0.4);
    }
    .ui7-link:hover .ui7-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui7-footer {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.08em;
      margin-top: 40px;
    }

    @media (max-width: 600px) {
      .ui7-links-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
      }
    }
  `
  document.head.appendChild(style)

  // --- Canvas Wrapper (fixed behind scroll content) ---
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'ui7-canvas-wrap'
  container.appendChild(canvasWrap)

  // --- Scroll Content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui7-scroll'

  // Hero Section
  const hero = document.createElement('div')
  hero.className = 'ui7-hero'

  const title = document.createElement('h1')
  title.className = 'ui7-title'
  title.textContent = 'leblanc'
  hero.appendChild(title)

  const subtitle = document.createElement('p')
  subtitle.className = 'ui7-subtitle'
  subtitle.textContent = 'infinite'
  hero.appendChild(subtitle)

  scroll.appendChild(hero)

  // Links Section
  const linksSection = document.createElement('div')
  linksSection.className = 'ui7-links-section'

  const linksHeader = document.createElement('h2')
  linksHeader.className = 'ui7-links-header'
  linksHeader.textContent = 'listen everywhere'
  linksSection.appendChild(linksHeader)

  const linksGrid = document.createElement('div')
  linksGrid.className = 'ui7-links-grid'

  const links = [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com',
      svg: '<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>'
    },
    {
      name: 'Apple Music',
      url: 'https://music.apple.com',
      svg: '<path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.154-1.07.172-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.238.274-.06.474-.222.56-.504a1.9 1.9 0 00.057-.393V9.34c0-.277-.07-.476-.344-.558a3.233 3.233 0 00-.544-.12c-.685-.116-1.37-.222-2.058-.33l-2.845-.458c-.19-.03-.38-.057-.57-.09-.252-.043-.42.06-.478.31a2.4 2.4 0 00-.04.46V16.87c0 .42-.044.836-.218 1.224-.287.64-.788 1.03-1.46 1.2-.35.087-.706.137-1.064.15-.94.03-1.74-.636-1.9-1.567a1.883 1.883 0 011.063-2.042c.326-.156.673-.247 1.023-.32.37-.078.742-.148 1.11-.228.3-.067.5-.24.583-.54a1.57 1.57 0 00.047-.378V7.354c0-.31.063-.596.3-.838.148-.15.334-.234.535-.276.244-.05.49-.086.737-.12l2.72-.44c.89-.142 1.78-.283 2.67-.423.31-.05.62-.098.93-.142.18-.025.267.058.283.24.005.057.008.113.008.17v4.59z"/>'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      svg: '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'
    },
    {
      name: 'SoundCloud',
      url: 'https://soundcloud.com',
      svg: '<path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.037.104-.093l.2-1.31-.2-1.326c-.014-.057-.047-.094-.104-.094m1.8-.622c-.064 0-.107.05-.112.109l-.218 2.048.218 2.033c.005.06.048.107.112.107.065 0 .107-.047.114-.107l.248-2.033-.248-2.048c-.007-.06-.05-.109-.114-.109m.899-.427c-.073 0-.12.055-.125.122l-.208 2.097.208 2.075c.005.067.052.12.125.12.072 0 .118-.053.126-.12l.232-2.075-.232-2.097c-.008-.067-.054-.122-.126-.122m.9-.184c-.082 0-.132.06-.138.135l-.193 2.146.193 2.118c.006.075.056.133.138.133.08 0 .131-.058.139-.133l.222-2.118-.222-2.146c-.008-.075-.06-.135-.14-.135m.898-.156c-.09 0-.14.065-.148.147l-.182 2.188.182 2.16c.008.082.058.146.148.146.088 0 .14-.064.15-.146l.208-2.16-.208-2.188c-.01-.082-.062-.147-.15-.147m.948-.206c-.1 0-.153.073-.16.162l-.17 2.394.17 2.195c.007.088.06.157.16.157.098 0 .152-.069.16-.157l.194-2.195-.194-2.394c-.008-.09-.062-.162-.16-.162m.946.044c-.11 0-.165.078-.172.175l-.156 2.175.156 2.225c.007.097.062.17.172.17.108 0 .163-.073.172-.17l.18-2.225-.18-2.175c-.01-.097-.064-.175-.172-.175m.962-.268c-.118 0-.175.083-.183.188l-.148 2.443.148 2.238c.008.104.065.182.183.182.117 0 .175-.078.185-.182l.167-2.238-.167-2.443c-.01-.105-.068-.188-.185-.188m.96.08c-.126 0-.187.09-.195.2l-.135 2.163.135 2.26c.008.11.069.196.195.196.125 0 .187-.086.197-.196l.153-2.26-.153-2.163c-.01-.11-.072-.2-.197-.2m1.014-.263c-.137 0-.2.095-.207.213l-.125 2.426.125 2.27c.007.118.07.207.207.207.135 0 .2-.09.208-.207l.14-2.27-.14-2.426c-.008-.118-.073-.213-.208-.213m1.073-.168c-.146 0-.212.1-.218.225l-.12 2.594.12 2.283c.006.125.072.22.218.22.145 0 .212-.095.22-.22l.134-2.283-.135-2.594c-.007-.125-.074-.225-.22-.225m1.046.092c-.153 0-.223.105-.23.237l-.108 2.265.108 2.296c.007.132.077.23.23.23.152 0 .222-.098.23-.23l.124-2.296-.124-2.265c-.008-.132-.078-.237-.23-.237m1.058-.368c-.163 0-.232.11-.238.25l-.1 2.633.1 2.305c.006.14.075.243.237.243.16 0 .232-.103.24-.243l.112-2.305-.112-2.633c-.008-.14-.08-.25-.24-.25m1.1.008c-.17 0-.243.118-.25.262l-.093 2.363.093 2.312c.007.145.08.252.25.252.168 0 .242-.107.252-.252l.103-2.312-.103-2.363c-.01-.144-.084-.262-.253-.262m1.074-.263c-.178 0-.254.123-.26.274l-.083 2.626.083 2.32c.006.15.082.26.26.26.176 0 .253-.11.262-.26l.093-2.32-.093-2.626c-.009-.15-.086-.274-.262-.274m1.078-.072c-.188 0-.263.128-.27.287l-.074 2.698.074 2.326c.007.16.082.27.27.27.187 0 .263-.11.272-.27l.084-2.326-.084-2.698c-.009-.16-.085-.287-.272-.287m1.095-.138c-.197 0-.275.135-.282.3l-.065 2.836.065 2.332c.007.165.085.278.282.278.195 0 .274-.113.283-.278l.073-2.332-.073-2.836c-.009-.165-.088-.3-.283-.3m1.155.094c-.205 0-.283.14-.29.31l-.058 2.432.058 2.34c.007.17.085.288.29.288.203 0 .282-.118.292-.288l.065-2.34-.065-2.432c-.01-.17-.09-.31-.292-.31m1.08-.363c-.214 0-.293.145-.3.325l-.048 2.795.048 2.343c.007.18.086.297.3.297.212 0 .293-.117.302-.297l.055-2.343-.055-2.795c-.009-.18-.09-.325-.302-.325m1.14.198c-.224 0-.302.15-.31.337l-.04 2.26.04 2.35c.008.187.086.306.31.306.22 0 .302-.12.312-.306l.045-2.35-.045-2.26c-.01-.188-.092-.337-.312-.337m1.123-.4c-.234 0-.313.155-.32.35l-.03 2.66.03 2.352c.007.194.086.313.32.313.232 0 .312-.12.323-.313l.035-2.352-.035-2.66c-.01-.195-.09-.35-.323-.35m1.14.247c-.242 0-.322.16-.33.362l-.02 2.413.02 2.358c.008.2.088.32.33.32.24 0 .322-.12.332-.32l.025-2.358-.025-2.413c-.01-.202-.092-.362-.332-.362m1.13-.402c-.25 0-.33.163-.338.375l-.015 2.815.015 2.36c.008.21.088.33.338.33.248 0 .33-.12.34-.33l.018-2.36-.018-2.815c-.01-.212-.092-.375-.34-.375m1.472 1.463c-.5-.007-1-.09-1.478-.253-.103-.035-.197.04-.197.152v4.968c0 .112.07.222.182.24 1.068.164 2.098-.238 2.768-1.002.67-.763.908-1.802.633-2.76a2.86 2.86 0 00-1.908-1.345z"/>'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com',
      svg: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
    }
  ]

  links.forEach(link => {
    const a = document.createElement('a')
    a.className = 'ui7-link'
    a.href = link.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${link.svg}</svg>
      <span>${link.name}</span>
      <span class="ui7-link-arrow">\u2192</span>
    `
    linksGrid.appendChild(a)
  })

  linksSection.appendChild(linksGrid)

  const footer = document.createElement('div')
  footer.className = 'ui7-footer'
  footer.textContent = '\u00A9 leblanc 2026'
  linksSection.appendChild(footer)

  scroll.appendChild(linksSection)
  container.appendChild(scroll)

  // ==========================================
  // THREE.JS — Infinite Bloom Tunnel
  // ==========================================

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.FogExp2(0x000000, 0.045)

  const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 0)
  camera.lookAt(0, 0, -1)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  canvasWrap.appendChild(renderer.domElement)

  // Point light at camera
  const cameraLight = new THREE.PointLight(0xffeedd, 0.6, 30)
  scene.add(cameraLight)

  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0x222222, 0.3)
  scene.add(ambientLight)

  // --- Load bloom texture ---
  const textureLoader = new THREE.TextureLoader()
  const bloomTexture = textureLoader.load('/images/bloom.png')
  bloomTexture.wrapS = THREE.RepeatWrapping
  bloomTexture.wrapT = THREE.RepeatWrapping
  bloomTexture.minFilter = THREE.LinearMipmapLinearFilter
  bloomTexture.magFilter = THREE.LinearFilter

  // --- Custom ShaderMaterial ---
  const tunnelShaderMaterial = {
    uniforms: {
      uTexture: { value: bloomTexture },
      uTime: { value: 0 },
      uDepthFactor: { value: 0 }, // 0=near, 1=far
      uOpacity: { value: 1 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uDepthFactor;
      uniform float uOpacity;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        // Subtle UV distortion / wave
        vec2 uv = vUv;
        uv.x += sin(uv.y * 4.0 + uTime * 0.3) * 0.008;
        uv.y += cos(uv.x * 4.0 + uTime * 0.25) * 0.008;

        vec4 texColor = texture2D(uTexture, uv);

        // Depth-based color shifting: warm near, cool far
        vec3 warmTint = vec3(1.08, 1.02, 0.95);
        vec3 coolTint = vec3(0.85, 0.88, 1.05);
        vec3 tint = mix(warmTint, coolTint, uDepthFactor);
        texColor.rgb *= tint;

        // Desaturate distant panels
        float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
        texColor.rgb = mix(texColor.rgb, vec3(gray), uDepthFactor * 0.4);

        // Edge glow: brighter at UV edges
        float edgeDist = 1.0 - min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
        edgeDist = smoothstep(0.35, 0.5, edgeDist);
        vec3 glowColor = mix(vec3(0.9, 0.85, 0.7), vec3(0.6, 0.7, 1.0), uDepthFactor);
        texColor.rgb += glowColor * edgeDist * 0.18;

        // Emissive boost
        texColor.rgb *= 1.15;

        texColor.a *= uOpacity;
        gl_FragColor = texColor;
      }
    `
  }

  // --- Build Tunnel Rings ---
  const PANELS_PER_RING = 10
  const RING_COUNT = 12
  const RING_SPACING = 4.5
  const TUNNEL_RADIUS = 5.5
  const PANEL_WIDTH = 3.8
  const PANEL_HEIGHT = 3.8

  const panelGeometry = new THREE.PlaneGeometry(PANEL_WIDTH, PANEL_HEIGHT)
  const rings = [] // Each ring: { group, z, panels[] }

  for (let r = 0; r < RING_COUNT; r++) {
    const ringZ = -r * RING_SPACING
    const ringGroup = new THREE.Group()
    ringGroup.position.z = ringZ
    const panels = []

    for (let p = 0; p < PANELS_PER_RING; p++) {
      const angle = (p / PANELS_PER_RING) * Math.PI * 2
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: bloomTexture },
          uTime: { value: 0 },
          uDepthFactor: { value: r / RING_COUNT },
          uOpacity: { value: 1 }
        },
        vertexShader: tunnelShaderMaterial.vertexShader,
        fragmentShader: tunnelShaderMaterial.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: true
      })

      const mesh = new THREE.Mesh(panelGeometry, material)
      const x = Math.cos(angle) * TUNNEL_RADIUS
      const y = Math.sin(angle) * TUNNEL_RADIUS
      mesh.position.set(x, y, 0)

      // Face inward toward the tunnel center
      mesh.lookAt(0, 0, mesh.position.z)
      // Slight random rotation for organic feel
      mesh.rotation.z += (Math.random() - 0.5) * 0.05

      ringGroup.add(mesh)
      panels.push(mesh)
    }

    scene.add(ringGroup)
    rings.push({ group: ringGroup, z: ringZ, panels })
  }

  // --- Mouse tracking ---
  let mouseX = 0
  let mouseY = 0
  let smoothMouseX = 0
  let smoothMouseY = 0
  let scrollSpeedBoost = 0

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener('mousemove', onMouseMove)

  const onWheel = (e) => {
    // Forward scroll = boost speed
    scrollSpeedBoost += Math.abs(e.deltaY) * 0.0003
    scrollSpeedBoost = Math.min(scrollSpeedBoost, 0.15)
  }
  container.addEventListener('wheel', onWheel, { passive: true })

  // --- Title 3D tilt ---
  const onTitleMouseMove = (e) => {
    const rect = title.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    title.style.transform = `perspective(600px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg)`
  }
  window.addEventListener('mousemove', onTitleMouseMove)

  // --- Resize ---
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // --- Intersection observer for links fade-in ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ui7-visible')
      }
    })
  }, { threshold: 0.15 })

  observer.observe(linksHeader)
  linksGrid.querySelectorAll('.ui7-link').forEach((link, i) => {
    link.style.transitionDelay = `${i * 0.08}s`
    link.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease`
    observer.observe(link)
  })

  // --- Animation Loop ---
  let animationId = null
  let travelZ = 0
  const BASE_SPEED = 0.018
  const totalTunnelLength = RING_COUNT * RING_SPACING
  let time = 0

  function animate() {
    animationId = requestAnimationFrame(animate)
    time += 0.016

    // Scroll speed decay
    scrollSpeedBoost *= 0.96

    // Travel forward
    const speed = BASE_SPEED + scrollSpeedBoost
    travelZ += speed

    // Smooth mouse look
    smoothMouseX += (mouseX - smoothMouseX) * 0.04
    smoothMouseY += (mouseY - smoothMouseY) * 0.04

    // Camera position: move forward and offset by mouse
    camera.position.x = smoothMouseX * 1.2
    camera.position.y = -smoothMouseY * 0.8
    camera.position.z = -travelZ

    // Camera look direction: forward + mouse offset
    const lookTarget = new THREE.Vector3(
      smoothMouseX * 2.5,
      -smoothMouseY * 1.8,
      camera.position.z - 10
    )
    camera.lookAt(lookTarget)

    // Point light follows camera
    cameraLight.position.copy(camera.position)

    // Update rings: recycle rings that camera has passed
    for (let r = 0; r < rings.length; r++) {
      const ring = rings[r]
      const ringWorldZ = ring.group.position.z

      // If the camera has passed this ring
      if (camera.position.z < ringWorldZ - RING_SPACING) {
        // Move ring to the far end
        const farthestZ = getFarthestRingZ()
        ring.group.position.z = farthestZ - RING_SPACING
      }

      // Update shader uniforms
      const dist = Math.abs(camera.position.z - ring.group.position.z)
      const normalizedDepth = Math.min(dist / (totalTunnelLength * 0.7), 1)

      for (const panel of ring.panels) {
        panel.material.uniforms.uTime.value = time
        panel.material.uniforms.uDepthFactor.value = normalizedDepth
        // Fade panels very close to camera
        const closeFade = dist < 2 ? dist / 2 : 1
        panel.material.uniforms.uOpacity.value = closeFade
      }
    }

    renderer.render(scene, camera)
  }

  function getFarthestRingZ() {
    let min = Infinity
    for (const ring of rings) {
      if (ring.group.position.z < min) min = ring.group.position.z
    }
    return min
  }

  animate()

  // ==========================================
  // Cleanup
  // ==========================================
  return function cleanup() {
    if (animationId) cancelAnimationFrame(animationId)

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mousemove', onTitleMouseMove)
    window.removeEventListener('resize', onResize)
    container.removeEventListener('wheel', onWheel)

    observer.disconnect()

    // Dispose Three.js
    panelGeometry.dispose()
    for (const ring of rings) {
      for (const panel of ring.panels) {
        panel.material.dispose()
      }
    }
    bloomTexture.dispose()
    renderer.dispose()
    renderer.forceContextLoss()

    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
