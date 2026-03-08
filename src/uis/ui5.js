import * as THREE from 'three'

export function ui5(container) {
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
    @keyframes ui5FadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui5FadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes ui5SlideIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ui5-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui5-scroll {
      position: relative;
      z-index: 2;
      cursor: crosshair;
    }

    .ui5-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ui5-title-wrap {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: ui5FadeUp 2s 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      perspective: 800px;
    }

    .ui5-title-inner {
      transition: transform 0.15s ease-out;
      will-change: transform;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ui5-title {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
      font-size: clamp(4rem, 12vw, 9rem);
      color: #fff;
      margin: 0;
      line-height: 1;
      letter-spacing: 0.01em;
      position: relative;
      z-index: 2;
      padding: 12px 32px;
    }

    .ui5-title-glass {
      position: absolute;
      inset: 0;
      z-index: 1;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.04);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .ui5-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: clamp(0.7rem, 1.4vw, 1rem);
      color: rgba(232, 168, 124, 0.6);
      letter-spacing: 0.35em;
      text-transform: lowercase;
      margin-top: 16px;
    }

    .ui5-links-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 24px;
      box-sizing: border-box;
      background: linear-gradient(to bottom, rgba(10,8,6,0) 0%, rgba(10,8,6,0.95) 15%, rgba(10,8,6,1) 100%);
    }

    .ui5-links-header {
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
      font-size: clamp(1.2rem, 3vw, 2rem);
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.04em;
      margin-bottom: 48px;
      opacity: 0;
      text-align: center;
    }

    .ui5-links-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 100%;
      max-width: 440px;
    }

    .ui5-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 24px;
      border-radius: 12px;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.8);
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 400;
      font-size: 15px;
      letter-spacing: 0.02em;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      opacity: 0;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .ui5-link:hover {
      background: rgba(232, 168, 124, 0.08);
      color: #e8a87c;
      border-color: rgba(232, 168, 124, 0.15);
      transform: translateX(4px);
      box-shadow: 0 0 30px rgba(232, 168, 124, 0.08);
    }

    .ui5-link svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }

    .ui5-link:hover svg {
      opacity: 1;
    }

    .ui5-link-name {
      flex: 1;
    }

    .ui5-link-arrow {
      font-size: 16px;
      opacity: 0;
      transform: translateX(-6px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      color: #e8a87c;
    }

    .ui5-link:hover .ui5-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui5-footer {
      margin-top: 64px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 9px;
      color: rgba(255, 255, 255, 0.12);
      letter-spacing: 0.25em;
      text-transform: uppercase;
      opacity: 0;
    }

    .ui5-scroll-hint {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.2);
      letter-spacing: 0.2em;
      opacity: 0;
      animation: ui5FadeIn 1s 2.5s ease forwards;
    }

    @media (max-width: 600px) {
      .ui5-link {
        padding: 14px 18px;
        font-size: 14px;
        gap: 12px;
      }
      .ui5-links-grid {
        max-width: 100%;
      }
    }
  `
  document.head.appendChild(style)

  // --- Canvas wrap ---
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'ui5-canvas-wrap'
  container.appendChild(canvasWrap)

  // --- Scroll content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui5-scroll'

  // --- Hero ---
  const hero = document.createElement('div')
  hero.className = 'ui5-hero'

  const titleWrap = document.createElement('div')
  titleWrap.className = 'ui5-title-wrap'

  const titleInner = document.createElement('div')
  titleInner.className = 'ui5-title-inner'

  const titleEl = document.createElement('h1')
  titleEl.className = 'ui5-title'
  titleEl.textContent = 'leblanc'

  const titleGlass = document.createElement('div')
  titleGlass.className = 'ui5-title-glass'

  const subtitleEl = document.createElement('div')
  subtitleEl.className = 'ui5-subtitle'
  subtitleEl.textContent = 'noise'

  const titleContainer = document.createElement('div')
  titleContainer.style.position = 'relative'
  titleContainer.style.display = 'inline-block'
  titleContainer.appendChild(titleGlass)
  titleContainer.appendChild(titleEl)

  titleInner.appendChild(titleContainer)
  titleInner.appendChild(subtitleEl)
  titleWrap.appendChild(titleInner)
  hero.appendChild(titleWrap)

  const scrollHint = document.createElement('div')
  scrollHint.className = 'ui5-scroll-hint'
  scrollHint.textContent = 'scroll'
  hero.appendChild(scrollHint)

  scroll.appendChild(hero)

  // --- Links Section ---
  const linksSection = document.createElement('div')
  linksSection.className = 'ui5-links-section'

  const linksHeader = document.createElement('div')
  linksHeader.className = 'ui5-links-header'
  linksHeader.textContent = 'listen everywhere'
  linksSection.appendChild(linksHeader)

  const linksGrid = document.createElement('div')
  linksGrid.className = 'ui5-links-grid'

  const links = [
    {
      name: 'Spotify',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`
    },
    {
      name: 'Apple Music',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.32.28a10.49 10.49 0 0 0-1.745-.12C16.828.122 16.08.1 15.332.1H8.668c-.748 0-1.496.022-2.243.06a10.49 10.49 0 0 0-1.745.12 5.022 5.022 0 0 0-2.254.67C1.308 1.623.563 2.623.246 3.933a9.23 9.23 0 0 0-.24 2.19C-.006 6.872-.01 7.62-.01 8.368v7.264c0 .748.004 1.496.016 2.244a9.23 9.23 0 0 0 .24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 0 0 2.254.67c.58.068 1.162.1 1.745.12.747.038 1.495.06 2.243.06h6.664c.748 0 1.496-.022 2.243-.06a10.49 10.49 0 0 0 1.745-.12 5.022 5.022 0 0 0 2.254-.67c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 0 0 .24-2.19c.012-.748.016-1.496.016-2.244V8.368c0-.748-.004-1.496-.016-2.244zM16.95 17.088c0 .478-.113.89-.34 1.238a2.07 2.07 0 0 1-.908.81c-.378.19-.79.287-1.238.287a2.446 2.446 0 0 1-.595-.073 1.892 1.892 0 0 1-.558-.24 1.901 1.901 0 0 1-.67-.836 2.16 2.16 0 0 1-.162-.777v-.012c.004-.268.057-.517.162-.748.104-.231.256-.434.455-.607.2-.174.42-.304.66-.39.24-.087.505-.148.793-.183.287-.036.568-.05.84-.044v-3.78l-5.404 1.608v4.792c0 .478-.113.89-.34 1.238a2.07 2.07 0 0 1-.908.81c-.378.19-.79.287-1.238.287a2.446 2.446 0 0 1-.595-.073 1.892 1.892 0 0 1-.558-.24 1.901 1.901 0 0 1-.67-.836 2.16 2.16 0 0 1-.162-.777v-.012c.004-.268.057-.517.162-.748.104-.231.256-.434.455-.607.2-.174.42-.304.66-.39.24-.087.505-.148.793-.183.287-.036.568-.05.84-.044V8.864c0-.36.072-.67.216-.93.144-.26.348-.437.612-.534l5.94-1.776c.192-.06.396-.09.612-.09.264 0 .498.057.702.168.204.112.36.264.468.456.108.192.162.396.162.612v10.318z"/></svg>`
    },
    {
      name: 'YouTube',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    },
    {
      name: 'SoundCloud',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .094-.037.104-.094l.192-1.308-.192-1.332c-.01-.057-.047-.094-.104-.094m1.8-.6c-.067 0-.12.042-.12.114l-.217 2.117.217 2.078c0 .072.053.114.12.114.065 0 .118-.042.12-.114l.248-2.078-.249-2.117c-.002-.072-.055-.114-.12-.114m.898-.463c-.075 0-.135.048-.135.132l-.193 2.218.193 2.133c0 .084.06.132.135.132s.135-.048.135-.132l.218-2.133-.218-2.218c0-.084-.06-.132-.135-.132m.9-.398c-.083 0-.15.054-.15.15l-.176 2.33.176 2.15c0 .096.067.15.15.15.084 0 .15-.054.15-.15l.2-2.15-.2-2.33c0-.096-.066-.15-.15-.15m.898-.264c-.09 0-.163.06-.166.166l-.16 2.428.16 2.164c.003.108.076.166.166.166.09 0 .162-.058.166-.166l.18-2.164-.18-2.428c-.004-.106-.076-.166-.166-.166m.9-.174c-.098 0-.18.066-.18.18l-.143 2.441.143 2.174c0 .12.082.18.18.18.1 0 .18-.06.18-.18l.163-2.174-.163-2.441c0-.114-.08-.18-.18-.18m.9-.09c-.107 0-.193.072-.193.198l-.127 2.35.127 2.18c0 .132.086.198.193.198.108 0 .193-.066.197-.198l.142-2.18-.142-2.35c-.004-.126-.09-.198-.197-.198m.9.027c-.114 0-.207.078-.207.21l-.114 2.233.114 2.19c0 .144.093.21.207.21.115 0 .207-.066.21-.21l.13-2.19-.13-2.233c-.003-.132-.096-.21-.21-.21m.96-.36c-.005-.15-.108-.234-.225-.234s-.22.084-.224.234l-.1 2.566.1 2.198c.004.144.107.222.224.222s.22-.078.224-.222l.113-2.198-.113-2.566m.855-.177c-.12 0-.222.09-.228.246l-.09 2.506.09 2.202c.006.15.108.24.228.24.12 0 .222-.09.228-.24l.1-2.202-.1-2.506c-.006-.156-.108-.246-.228-.246m2.67 1.472c-.27 0-.522.054-.756.144-.15-1.734-1.608-3.087-3.39-3.087-.474 0-.93.09-1.343.258-.173.066-.217.138-.22.27v6.105c.004.14.114.254.254.262h5.455c1.11 0 2.01-.906 2.01-2.016s-.9-1.937-2.01-1.937"/></svg>`
    },
    {
      name: 'Instagram',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z"/></svg>`
    },
    {
      name: 'TikTok',
      url: '#',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
    }
  ]

  links.forEach(link => {
    const a = document.createElement('a')
    a.className = 'ui5-link'
    a.href = link.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.innerHTML = `
      ${link.svg}
      <span class="ui5-link-name">${link.name}</span>
      <span class="ui5-link-arrow">\u2192</span>
    `
    linksGrid.appendChild(a)
  })

  linksSection.appendChild(linksGrid)

  const footer = document.createElement('div')
  footer.className = 'ui5-footer'
  footer.textContent = '\u00a9 leblanc'
  linksSection.appendChild(footer)

  scroll.appendChild(linksSection)
  container.appendChild(scroll)

  // --- Three.js Noise Shader ---
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  canvasWrap.appendChild(renderer.domElement)

  // Shader uniforms
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: null },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uFrozen: { value: 0.0 },
    uFrozenTime: { value: 0.0 },
    uImageAspect: { value: 1.0 },
    uScrollY: { value: 0.0 }
  }

  // Load bloom texture
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('/images/bloom.png', (tex) => {
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    uniforms.uTexture.value = tex
    uniforms.uImageAspect.value = tex.image.width / tex.image.height
  })

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `

  // Fragment shader with Simplex 3D noise, displacement, color shift, barrel distortion
  const fragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uFrozen;
    uniform float uFrozenTime;
    uniform float uImageAspect;
    uniform float uScrollY;

    varying vec2 vUv;

    // ---- Simplex 3D Noise (Ashima Arts / Ian McEwan) ----
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Barrel distortion
    vec2 barrelDistortion(vec2 uv, float strength) {
      vec2 centered = uv - 0.5;
      float r2 = dot(centered, centered);
      vec2 distorted = centered * (1.0 + strength * r2);
      return distorted + 0.5;
    }

    void main() {
      // Choose time: frozen or live
      float t = mix(uTime, uFrozenTime, uFrozen);

      // Barrel distortion
      vec2 uv = barrelDistortion(vUv, 0.15);

      // Aspect ratio correction for the image
      float screenAspect = uResolution.x / uResolution.y;
      vec2 imageUv = uv;

      // Cover-fit the image
      float scale;
      if (screenAspect > uImageAspect) {
        scale = screenAspect / uImageAspect;
        imageUv.y = (imageUv.y - 0.5) * scale + 0.5;
      } else {
        scale = uImageAspect / screenAspect;
        imageUv.x = (imageUv.x - 0.5) * scale + 0.5;
      }

      // Mouse influence: distance from center
      vec2 mouseOffset = uMouse - 0.5;
      float mouseDist = length(mouseOffset);

      // Noise frequency driven by mouse X (1.5 at center -> 4.0 at edges)
      float noiseFreq = mix(1.5, 4.0, abs(mouseOffset.x) * 2.0);

      // Noise amplitude driven by mouse Y (0.02 at center -> 0.12 at edges)
      float noiseAmp = mix(0.02, 0.12, abs(mouseOffset.y) * 2.0);

      // Also add base breathing amplitude
      float breathe = sin(t * 0.4) * 0.01 + 0.015;
      noiseAmp += breathe;

      // Primary noise displacement
      float n1 = snoise(vec3(imageUv * noiseFreq, t * 0.3));
      float n2 = snoise(vec3(imageUv * noiseFreq * 1.5 + 100.0, t * 0.25 + 50.0));

      // Layer a slower, larger noise for macro-breathing
      float n3 = snoise(vec3(imageUv * 0.8, t * 0.15));

      vec2 displacement = vec2(n1, n2) * noiseAmp + vec2(n3) * 0.015;

      vec2 finalUv = imageUv + displacement;

      // Sample texture
      vec4 texColor = texture2D(uTexture, finalUv);

      // Color shift based on noise intensity — warm gold/peach tint in high displacement areas
      float noiseIntensity = abs(n1) * 0.5 + abs(n2) * 0.3 + abs(n3) * 0.2;
      vec3 warmTint = vec3(0.91, 0.66, 0.49); // #e8a87c as RGB
      vec3 peachTint = vec3(1.0, 0.85, 0.72);
      vec3 tintColor = mix(warmTint, peachTint, noiseIntensity);

      float tintStrength = smoothstep(0.2, 0.8, noiseIntensity) * 0.25;
      texColor.rgb = mix(texColor.rgb, texColor.rgb * tintColor * 1.4, tintStrength);

      // Subtle vignette
      float vignette = 1.0 - smoothstep(0.4, 1.4, length((vUv - 0.5) * 1.8));
      texColor.rgb *= mix(0.7, 1.0, vignette);

      // Fade with scroll
      float scrollFade = 1.0 - smoothstep(0.0, 1.0, uScrollY);
      texColor.a *= scrollFade;

      gl_FragColor = texColor;
    }
  `

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // --- State ---
  let mouse = { x: 0.5, y: 0.5 }
  let targetMouse = { x: 0.5, y: 0.5 }
  let frozen = false
  let frozenTimeout = null
  let animId = null
  let startTime = performance.now()

  // --- Mouse tracking ---
  const onMouseMove = (e) => {
    targetMouse.x = e.clientX / window.innerWidth
    targetMouse.y = 1.0 - e.clientY / window.innerHeight

    // 3D tilt on title
    const rx = (e.clientY / window.innerHeight - 0.5) * -12
    const ry = (e.clientX / window.innerWidth - 0.5) * 12
    if (titleInner) {
      titleInner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
  }
  window.addEventListener('mousemove', onMouseMove)

  // --- Click freeze ---
  const onClick = () => {
    if (frozen) return
    frozen = true
    uniforms.uFrozen.value = 1.0
    uniforms.uFrozenTime.value = uniforms.uTime.value

    frozenTimeout = setTimeout(() => {
      // Smooth resume: we'll lerp uFrozen back to 0 in the animation loop
      frozen = false
    }, 1000)
  }
  container.addEventListener('click', onClick)

  // --- Scroll tracking ---
  const onScroll = () => {
    const scrollTop = container.scrollTop
    const vh = window.innerHeight
    uniforms.uScrollY.value = Math.min(scrollTop / vh, 1.0)
  }
  container.addEventListener('scroll', onScroll)

  // --- Resize ---
  const onResize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h)
    uniforms.uResolution.value.set(w, h)
  }
  window.addEventListener('resize', onResize)

  // --- Intersection observer for fade-in animations ---
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        if (el.classList.contains('ui5-links-header')) {
          el.style.animation = 'ui5FadeUp 1s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        } else if (el.classList.contains('ui5-link')) {
          const i = Array.from(linksGrid.children).indexOf(el)
          el.style.animation = `ui5SlideIn 0.6s ${0.15 + i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1) forwards`
        } else if (el.classList.contains('ui5-footer')) {
          el.style.animation = `ui5FadeIn 1s 0.8s ease forwards`
        }
        observer.unobserve(el)
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, {
    root: container,
    threshold: 0.2
  })

  observer.observe(linksHeader)
  linksGrid.querySelectorAll('.ui5-link').forEach(l => observer.observe(l))
  observer.observe(footer)

  // --- Animation loop ---
  const animate = () => {
    animId = requestAnimationFrame(animate)

    const elapsed = (performance.now() - startTime) / 1000

    // Smooth mouse lerp
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    uniforms.uMouse.value.set(mouse.x, mouse.y)
    uniforms.uTime.value = elapsed

    // Smooth freeze/unfreeze
    if (!frozen && uniforms.uFrozen.value > 0.001) {
      uniforms.uFrozen.value *= 0.93 // smooth unfreeze
    }

    renderer.render(scene, camera)
  }

  animate()

  // --- Cleanup ---
  return function cleanup() {
    if (animId) cancelAnimationFrame(animId)
    if (frozenTimeout) clearTimeout(frozenTimeout)

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    container.removeEventListener('click', onClick)
    container.removeEventListener('scroll', onScroll)

    observer.disconnect()

    geometry.dispose()
    material.dispose()
    if (uniforms.uTexture.value) uniforms.uTexture.value.dispose()
    renderer.dispose()

    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
