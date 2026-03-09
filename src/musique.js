import * as THREE from 'three'

// Platform SVG icons
const ICONS = {
  spotify: `<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  apple: `<svg viewBox="0 0 361 361"><path d="M255 3a60 60 0 0 0-39 20c-12 14-21 35-17 55 20 2 40-7 52-21s20-34 4-54zM311 190c1 50 44 67 45 67s-6 20-20 41c-12 18-24 36-44 36s-24-12-45-12-28 12-45 12-30-15-44-37c-28-43-50-122-21-175 15-26 40-43 68-43 18 0 35 12 47 12s33-15 56-13c10 0 37 4 54 29-1 1-32 19-32 56z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  soundcloud: `<svg viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.1-.1m-.899.828c-.06 0-.091.038-.1.1l-.17 1.326.17 1.282c.009.06.04.097.1.097.058 0 .091-.038.1-.097l.195-1.282-.194-1.326c-.01-.062-.043-.1-.101-.1m1.8-.6c-.063 0-.108.05-.117.108l-.222 1.926.222 1.874c.009.058.054.107.117.107.062 0 .107-.05.117-.107l.247-1.874-.247-1.926c-.01-.058-.055-.108-.117-.108m.9-.264c-.073 0-.127.058-.136.12l-.213 2.19.213 2.117c.009.063.063.12.136.12.073 0 .126-.057.136-.12l.237-2.117-.237-2.19c-.01-.062-.063-.12-.136-.12m4.862-.857c-.16 0-.3.06-.41.156a4.425 4.425 0 0 0-4.395-3.983c-.543 0-1.073.1-1.564.29-.185.073-.234.148-.234.293v8.09c0 .15.118.278.267.294l6.336.003c1.33 0 2.408-1.09 2.408-2.433 0-1.34-1.078-2.41-2.408-2.41"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
}

export function musique(container) {
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'auto'
  container.style.overflowX = 'hidden'
  container.style.height = '100%'
  container.style.background = '#000'

  // ─── STYLES ────────────────────────────────────────
  const style = document.createElement('style')
  style.textContent = `
    @keyframes mq-fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes mq-glitchFlicker { 0%,92%,94%,96%,100% { opacity:1; } 93%,95% { opacity:0.7; transform:translate(-2px,1px); } }
    @keyframes mq-scanMove { from { background-position:0 0; } to { background-position:0 100%; } }

    .mq-canvas-wrap { position:fixed; inset:0; z-index:1; pointer-events:none; }

    .mq-scroll { position:relative; z-index:2; }
    .mq-spacer { height:7000px; pointer-events:none; }

    /* Overlay sections */
    .mq-section {
      position:fixed; inset:0; z-index:10;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      opacity:0; pointer-events:none;
      transition: opacity 0.15s ease;
    }
    .mq-section.visible { opacity:1; }
    .mq-section.visible .mq-link,
    .mq-section.visible .mq-links-wrap { pointer-events:auto; }

    .mq-section--musique .mq-brand {
      font-family: 'Climate Crisis', sans-serif;
      font-size: clamp(3rem, 14vw, 10rem);
      color: #fff;
      letter-spacing: -0.02em;
      line-height: 0.9;
      animation: mq-glitchFlicker 4s infinite;
      text-shadow:
        3px 0 #00e5cc, -3px 0 #0aff6a,
        0 0 40px rgba(0,229,204,0.3),
        0 0 80px rgba(10,255,106,0.15);
      position: relative;
    }
    .mq-section--musique .mq-brand::after {
      content: 'musique.';
      position: absolute; inset: 0;
      color: transparent;
      text-shadow: -4px 2px #0aff6a44, 5px -1px #00e5cc44;
      clip-path: polygon(0 45%, 100% 42%, 100% 55%, 0 58%);
      animation: mq-glitchFlicker 2.3s 0.1s infinite reverse;
    }
    .mq-section--musique .mq-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 6px; text-transform: uppercase;
      color: rgba(0,229,204,0.35); margin-top: 24px;
    }

    /* Card sections */
    .mq-card-section {
      position:fixed; inset:0; z-index:10;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      opacity:0; pointer-events:none;
      transition: opacity 0.2s ease;
    }
    .mq-card-section.visible { opacity:1; }
    .mq-card-section.visible .mq-link,
    .mq-card-section.visible .mq-links-wrap { pointer-events:auto; }

    .mq-logo { max-width: 55vw; max-height: 35vh; object-fit: contain; filter: drop-shadow(0 0 30px var(--glow)); }
    .mq-logo-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
      margin-top: 20px;
    }

    /* Links */
    .mq-links-wrap {
      display:flex; flex-direction:column; gap:10px;
      width: 100%; max-width: 380px; padding: 0 24px;
    }
    .mq-link {
      display:flex; align-items:center; gap:14px;
      padding: 14px 20px; border-radius: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      text-decoration:none; color:rgba(255,255,255,0.8);
      cursor:pointer;
      transition: all 0.3s ease;
    }
    .mq-link:hover {
      border-color: var(--accent);
      transform: translateY(-2px) skewX(-1deg);
      box-shadow: 0 4px 24px var(--glow-shadow);
      background: var(--glow-bg);
    }
    .mq-link:hover .mq-link-icon { color: var(--accent); transform: scale(1.15) rotate(-3deg); }
    .mq-link:hover .mq-link-arrow { opacity:1; transform:translateX(0) skewX(-5deg); }
    .mq-link-icon { width:20px; height:20px; flex-shrink:0; color:rgba(255,255,255,0.35); transition:all 0.3s; }
    .mq-link-icon svg { width:18px; height:18px; fill:currentColor; display:block; }
    .mq-link-text { flex:1; font-family:'Space Grotesk',sans-serif; font-weight:500; font-size:14px; }
    .mq-link-arrow {
      font-family:'JetBrains Mono',monospace; font-size:13px;
      color: var(--accent); opacity:0; transform:translateX(-8px);
      transition: all 0.3s;
    }

    .mq-section-title {
      font-family: 'Climate Crisis', sans-serif;
      font-size: clamp(1rem, 2.5vw, 1.4rem);
      color: rgba(255,255,255,0.6);
      margin-bottom: 8px; letter-spacing: 0.05em;
    }
    .mq-section-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 4px; color: rgba(255,255,255,0.15);
      text-transform: uppercase; margin-bottom: 32px;
    }

    /* Socials closing */
    .mq-closing {
      font-family: 'Climate Crisis', sans-serif;
      font-size: clamp(1.5rem, 5vw, 3rem);
      color: #fff;
      text-shadow: 2px 0 #8b5cf6, -2px 0 #00e5cc;
      margin-bottom: 32px;
    }
    .mq-footer {
      font-family:'JetBrains Mono',monospace;
      font-size:9px; letter-spacing:3px; color:rgba(255,255,255,0.1);
      text-transform:uppercase; margin-top:40px;
    }

    /* Scroll prompt */
    .mq-scroll-prompt {
      position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
      z-index:20; font-family:'JetBrains Mono',monospace;
      font-size:9px; letter-spacing:4px; text-transform:uppercase;
      color:rgba(255,255,255,0.15);
      transition: opacity 0.5s;
    }
    .mq-scroll-prompt.hidden { opacity:0; }
  `
  document.head.appendChild(style)

  // ─── THREE.JS SETUP ────────────────────────────────
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'mq-canvas-wrap'
  container.appendChild(canvasWrap)

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  canvasWrap.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.FogExp2(0x000000, 0.012)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300)

  // Render target for post-processing
  const rt = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)

  // ─── SPLINE PATH ───────────────────────────────────
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(6, 2, -18),
    new THREE.Vector3(-5, -1, -36),
    new THREE.Vector3(9, 4, -58),
    new THREE.Vector3(-7, 0, -78),
    new THREE.Vector3(4, -3, -100),
    new THREE.Vector3(-9, 3, -122),
    new THREE.Vector3(2, -1, -144),
    new THREE.Vector3(-6, 2, -168),
    new THREE.Vector3(5, -2, -190),
    new THREE.Vector3(0, 0, -215),
  ])

  // Card definitions: t position, swivel range, color zone
  const cardDefs = [
    { t: 0.07, id: 'musique',         swivelRange: 0.06 },
    { t: 0.22, id: 'northstar',       swivelRange: 0.06 },
    { t: 0.37, id: 'northstar-links', swivelRange: 0.06 },
    { t: 0.55, id: 'leblanc',         swivelRange: 0.06 },
    { t: 0.70, id: 'leblanc-links',   swivelRange: 0.06 },
    { t: 0.87, id: 'socials',         swivelRange: 0.06 },
  ]

  // ─── FLOATING DEBRIS ──────────────────────────────
  const debrisGeo = new THREE.BufferGeometry()
  const debrisCount = 300
  const debrisPos = new Float32Array(debrisCount * 3)
  const debrisSizes = new Float32Array(debrisCount)
  for (let i = 0; i < debrisCount; i++) {
    const t = Math.random()
    const p = curve.getPointAt(t)
    debrisPos[i * 3] = p.x + (Math.random() - 0.5) * 20
    debrisPos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 14
    debrisPos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 10
    debrisSizes[i] = Math.random() * 3 + 0.5
  }
  debrisGeo.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3))
  debrisGeo.setAttribute('aSize', new THREE.BufferAttribute(debrisSizes, 1))

  const debrisMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x00e5cc) },
      uColor2: { value: new THREE.Color(0x0aff6a) },
    },
    vertexShader: /* glsl */`
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 pos = position;
        pos.x += sin(uTime * 0.3 + position.z * 0.1) * 0.5;
        pos.y += cos(uTime * 0.2 + position.x * 0.15) * 0.4;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (80.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
        vAlpha = smoothstep(200.0, 20.0, -mv.z) * 0.4;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
        vec3 col = mix(uColor1, uColor2, sin(uTime * 0.5 + gl_PointCoord.x * 3.0) * 0.5 + 0.5);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  scene.add(new THREE.Points(debrisGeo, debrisMat))

  // ─── POST-PROCESSING SHADER ───────────────────────
  const postScene = new THREE.Scene()
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const postMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: rt.texture },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position,1.0); }
    `,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform vec2 uRes;
      varying vec2 vUv;

      float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }

      void main() {
        vec2 uv = vUv;

        // Glitch: random horizontal scanline shifts
        float glitchSeed = floor(uTime * 4.0);
        float lineRand = rand(vec2(floor(uv.y * 80.0), glitchSeed));
        float glitchLine = step(0.985, lineRand);
        uv.x += glitchLine * (rand(vec2(glitchSeed, uv.y * 100.0)) - 0.5) * 0.06;

        // Occasional big glitch block
        float bigGlitch = step(0.93, sin(uTime * 0.6 + 1.7)) * step(0.4, rand(vec2(glitchSeed)));
        float blockY = step(0.6, rand(vec2(floor(uv.y * 12.0), glitchSeed * 3.0)));
        uv.x += bigGlitch * blockY * (rand(vec2(glitchSeed * 7.0, uv.y)) - 0.5) * 0.12;

        // Chromatic aberration
        float abr = 0.0025 + bigGlitch * 0.008;
        float r = texture2D(tDiffuse, uv + vec2(abr, 0.0)).r;
        float g = texture2D(tDiffuse, uv).g;
        float b = texture2D(tDiffuse, uv - vec2(abr, abr * 0.5)).b;
        vec3 color = vec3(r, g, b);

        // Deepfried: oversaturate
        float gray = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(gray), color, 1.45);

        // Crush contrast
        color = smoothstep(0.04, 0.94, color);

        // Heavy grain
        float grain = rand(uv * 500.0 + fract(uTime * 17.0));
        color += (grain - 0.5) * 0.1;

        // Subtle posterize
        color = floor(color * 18.0) / 18.0;

        // Scanlines
        float scan = sin(uv.y * uRes.y * 1.2 + uTime * 2.0) * 0.03;
        color -= scan;

        // Vignette
        float vig = smoothstep(1.5, 0.4, length((uv - 0.5) * vec2(uRes.x/uRes.y, 1.0)));
        color *= mix(0.15, 1.0, vig);

        gl_FragColor = vec4(color, 1.0);
      }
    `
  })
  postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat))

  // ─── SCROLL CONTAINER + HTML OVERLAYS ─────────────
  const scrollWrap = document.createElement('div')
  scrollWrap.className = 'mq-scroll'

  const spacer = document.createElement('div')
  spacer.className = 'mq-spacer'
  scrollWrap.appendChild(spacer)
  container.appendChild(scrollWrap)

  // Scroll prompt
  const prompt = document.createElement('div')
  prompt.className = 'mq-scroll-prompt'
  prompt.textContent = 'scroll to enter'
  container.appendChild(prompt)

  // Create overlay sections
  function makeSection(id, html, cssVars = '') {
    const el = document.createElement('div')
    el.className = id.includes('link') || id === 'socials' ? 'mq-card-section' : 'mq-section'
    if (id === 'musique') el.classList.add('mq-section--musique')
    el.dataset.id = id
    el.style.cssText = cssVars
    el.innerHTML = html
    container.appendChild(el)
    return el
  }

  const sections = {
    musique: makeSection('musique', `
      <div class="mq-brand">musique.</div>
      <div class="mq-sub">genreless</div>
    `),
    northstar: makeSection('northstar', `
      <img class="mq-logo" src="/images/northstar.png" alt="northstar" style="--glow:rgba(0,229,204,0.4);">
      <div class="mq-logo-label" style="color:rgba(0,229,204,0.5);">the band</div>
    `),
    'northstar-links': makeSection('northstar-links', `
      <div class="mq-section-title" style="color:rgba(0,229,204,0.7);">northstar</div>
      <div class="mq-section-sub">listen now</div>
      <div class="mq-links-wrap" style="--accent:#00e5cc;--glow-shadow:rgba(0,229,204,0.15);--glow-bg:rgba(0,229,204,0.05);">
        ${['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map(name => `
          <a class="mq-link" href="#" target="_blank">
            <div class="mq-link-icon">${ICONS[name.toLowerCase().replace(' ','')]}</div>
            <span class="mq-link-text">${name}</span>
            <span class="mq-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
    `),
    leblanc: makeSection('leblanc', `
      <img class="mq-logo" src="/images/leblanc.png" alt="leblanc" style="--glow:rgba(139,92,246,0.4);">
      <div class="mq-logo-label" style="color:rgba(139,92,246,0.5);">solo</div>
    `),
    'leblanc-links': makeSection('leblanc-links', `
      <div class="mq-section-title" style="color:rgba(139,92,246,0.7);">leblanc</div>
      <div class="mq-section-sub">listen now</div>
      <div class="mq-links-wrap" style="--accent:#8b5cf6;--glow-shadow:rgba(139,92,246,0.15);--glow-bg:rgba(139,92,246,0.05);">
        ${['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map(name => `
          <a class="mq-link" href="#" target="_blank">
            <div class="mq-link-icon">${ICONS[name.toLowerCase().replace(' ','')]}</div>
            <span class="mq-link-text">${name}</span>
            <span class="mq-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
    `),
    socials: makeSection('socials', `
      <div class="mq-closing">find us.</div>
      <div class="mq-links-wrap" style="--accent:#a78bfa;--glow-shadow:rgba(167,139,250,0.15);--glow-bg:rgba(167,139,250,0.05);">
        ${[
          { name: 'Instagram', icon: ICONS.instagram },
          { name: 'TikTok', icon: ICONS.tiktok },
        ].map(l => `
          <a class="mq-link" href="#" target="_blank">
            <div class="mq-link-icon">${l.icon}</div>
            <span class="mq-link-text">${l.name}</span>
            <span class="mq-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
      <div class="mq-footer">&copy; musique. 2026</div>
    `),
  }

  // ─── SCROLL → CAMERA MAPPING ──────────────────────
  let currentT = 0
  let targetT = 0

  // Color zones: northstar (teal/green) → leblanc (purple)
  const colNorthstar1 = new THREE.Color(0x00e5cc)
  const colNorthstar2 = new THREE.Color(0x0aff6a)
  const colLeblanc1 = new THREE.Color(0x8b5cf6)
  const colLeblanc2 = new THREE.Color(0x6d28d9)
  const fogColorTemp = new THREE.Color()

  function onScroll() {
    const maxScroll = container.scrollHeight - container.clientHeight
    if (maxScroll > 0) {
      targetT = container.scrollTop / maxScroll
    }
    prompt.classList.toggle('hidden', container.scrollTop > 50)
  }
  container.addEventListener('scroll', onScroll, { passive: true })

  // ─── RESIZE ───────────────────────────────────────
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight
    renderer.setSize(w, h)
    rt.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    postMat.uniforms.uRes.value.set(w, h)
  }
  window.addEventListener('resize', onResize)

  // ─── ANIMATION LOOP ───────────────────────────────
  let time = 0
  let raf
  const lookTarget = new THREE.Vector3()
  const tempTangent = new THREE.Vector3()
  const tempCardPos = new THREE.Vector3()

  function animate() {
    raf = requestAnimationFrame(animate)
    time += 0.016

    // Smooth scroll interpolation
    currentT += (targetT - currentT) * 0.04
    const t = Math.max(0.001, Math.min(0.999, currentT))

    // Camera position along curve
    const pos = curve.getPointAt(t)
    camera.position.copy(pos)

    // Default look direction: along tangent
    const tangent = curve.getTangentAt(t)
    lookTarget.copy(pos).add(tangent.multiplyScalar(5))

    // Check card proximity → swivel
    let activeSection = null
    for (const card of cardDefs) {
      const dist = Math.abs(t - card.t)
      if (dist < card.swivelRange) {
        // Blend toward card position (offset perpendicular to path)
        const cardPoint = curve.getPointAt(card.t)
        const cardTangent = curve.getTangentAt(card.t)
        const up = new THREE.Vector3(0, 1, 0)
        const right = new THREE.Vector3().crossVectors(cardTangent, up).normalize()

        tempCardPos.copy(cardPoint).add(right.multiplyScalar(6))

        const blend = 1.0 - (dist / card.swivelRange)
        const smoothBlend = blend * blend * (3 - 2 * blend) // smoothstep

        lookTarget.lerp(tempCardPos, smoothBlend * 0.8)
        activeSection = card.id
      }
    }

    camera.lookAt(lookTarget)

    // Update debris colors based on zone
    const zoneBlend = Math.min(1, Math.max(0, (t - 0.35) / 0.3))
    const c1 = colNorthstar1.clone().lerp(colLeblanc1, zoneBlend)
    const c2 = colNorthstar2.clone().lerp(colLeblanc2, zoneBlend)
    debrisMat.uniforms.uColor1.value.copy(c1)
    debrisMat.uniforms.uColor2.value.copy(c2)
    debrisMat.uniforms.uTime.value = time

    // Fog subtle tint
    fogColorTemp.setRGB(
      0.01 + zoneBlend * 0.02,
      0.01 - zoneBlend * 0.005,
      0.015 + zoneBlend * 0.02
    )
    scene.fog.color.copy(fogColorTemp)
    scene.background.copy(fogColorTemp)

    // Show/hide HTML overlay sections
    for (const key in sections) {
      sections[key].classList.toggle('visible', key === activeSection)
    }

    // Render scene to RT
    postMat.uniforms.uTime.value = time
    renderer.setRenderTarget(rt)
    renderer.render(scene, camera)
    renderer.setRenderTarget(null)

    // Render post-processing
    renderer.render(postScene, postCam)
  }

  animate()

  // ─── CLEANUP ──────────────────────────────────────
  return function cleanup() {
    cancelAnimationFrame(raf)
    container.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    rt.dispose()
    debrisGeo.dispose()
    debrisMat.dispose()
    postMat.dispose()
    renderer.dispose()
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
