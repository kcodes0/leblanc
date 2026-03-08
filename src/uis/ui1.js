import * as THREE from 'three'

export function ui1(container) {
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'auto'
  container.style.overflowX = 'hidden'
  container.style.background = '#0a0806'
  container.style.height = '100%'

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui1FadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui1GradientShift {
      0% { background-position: 0% 50%; }
      25% { background-position: 100% 50%; }
      50% { background-position: 50% 100%; }
      75% { background-position: 0% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes ui1Pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    .ui1-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui1-scroll {
      position: relative;
      z-index: 2;
      cursor: crosshair;
    }

    .ui1-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ui1-title {
      font-family: 'Dela Gothic One', sans-serif;
      font-weight: 400;
      font-size: clamp(4rem, 13vw, 11rem);
      text-transform: lowercase;
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 0.9;
      background: linear-gradient(
        135deg,
        #e8a87c,
        #d4966a,
        #c98b6b,
        #f0c27f,
        #e8a87c,
        #cf8b72,
        #dba576,
        #f0c27f
      );
      background-size: 400% 400%;
      animation: ui1GradientShift 8s ease infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 4px 30px rgba(200, 150, 100, 0.25));
      opacity: 0;
      animation: ui1FadeUp 2s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                 ui1GradientShift 8s ease infinite;
      perspective: 800px;
      transform-style: preserve-3d;
    }

    .ui1-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.2);
      margin-top: 28px;
      opacity: 0;
      animation: ui1FadeUp 2s 1.2s ease forwards;
    }

    .ui1-scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: ui1FadeUp 2s 2s ease forwards;
    }

    .ui1-scroll-hint span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.15);
    }

    .ui1-scroll-line {
      width: 1px;
      height: 32px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
      animation: ui1Pulse 2s ease-in-out infinite;
    }

    /* --- Links section --- */
    .ui1-links-section {
      min-height: 100vh;
      padding: 80px 24px 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
      position: relative;
    }

    .ui1-links-section::before {
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

    .ui1-links-header {
      position: relative;
      z-index: 1;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
      letter-spacing: 0.05em;
    }

    .ui1-links-sub {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      color: rgba(255, 255, 255, 0.15);
      text-transform: uppercase;
      margin-bottom: 56px;
    }

    .ui1-links-grid {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 440px;
    }

    .ui1-link {
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

    .ui1-link::before {
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

    .ui1-link:hover {
      border-color: rgba(232, 168, 124, 0.25);
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 8px 32px rgba(200, 150, 100, 0.08), 0 0 60px rgba(200, 150, 100, 0.04);
    }

    .ui1-link:hover::before {
      opacity: 1;
    }

    .ui1-link:hover .ui1-link-icon {
      color: #e8a87c;
      transform: scale(1.1);
    }

    .ui1-link:hover .ui1-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui1-link-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.4s ease;
    }

    .ui1-link-icon svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .ui1-link-text {
      flex: 1;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.02em;
    }

    .ui1-link-arrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: rgba(232, 168, 124, 0.6);
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.4s ease;
    }

    .ui1-divider {
      position: relative;
      z-index: 1;
      width: 40px;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 40px 0;
    }

    .ui1-footer {
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
  canvasWrap.className = 'ui1-canvas-wrap'
  container.appendChild(canvasWrap)

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  canvasWrap.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Ripple simulation
  const simRes = 512
  const rtOpts = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType
  }
  let rtA = new THREE.WebGLRenderTarget(simRes, simRes, rtOpts)
  let rtB = new THREE.WebGLRenderTarget(simRes, simRes, rtOpts)

  const rippleMat = new THREE.ShaderMaterial({
    uniforms: {
      uPrev: { value: null },
      uTexelSize: { value: 1.0 / simRes },
      uMouse: { value: new THREE.Vector2(-10, -10) },
      uRadius: { value: 0.02 },
      uStrength: { value: 0.0 },
      uDamping: { value: 0.975 }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform sampler2D uPrev;
      uniform float uTexelSize;
      uniform vec2 uMouse;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uDamping;
      varying vec2 vUv;
      void main() {
        float h = texture2D(uPrev, vUv).r;
        float v = texture2D(uPrev, vUv).g;
        float l = texture2D(uPrev, vUv + vec2(-uTexelSize, 0.0)).r;
        float r = texture2D(uPrev, vUv + vec2( uTexelSize, 0.0)).r;
        float t = texture2D(uPrev, vUv + vec2(0.0,  uTexelSize)).r;
        float b = texture2D(uPrev, vUv + vec2(0.0, -uTexelSize)).r;
        v += (l + r + t + b) * 0.25 - h;
        v *= uDamping;
        h += v;
        float d = distance(vUv, uMouse);
        h += uStrength * smoothstep(uRadius, 0.0, d);
        gl_FragColor = vec4(h, v, 0.0, 1.0);
      }
    `
  })

  const simScene = new THREE.Scene()
  const simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), rippleMat))

  // Display shader
  const loader = new THREE.TextureLoader()
  const imageTex = loader.load('/images/bloom.png', (tex) => {
    displayMat.uniforms.uImageAspect.value = tex.image.width / tex.image.height
  })
  imageTex.minFilter = THREE.LinearFilter
  imageTex.magFilter = THREE.LinearFilter

  const displayMat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: imageTex },
      uRipple: { value: rtA.texture },
      uTime: { value: 0 },
      uScreenAspect: { value: window.innerWidth / window.innerHeight },
      uImageAspect: { value: 16 / 9 }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform sampler2D uTexture;
      uniform sampler2D uRipple;
      uniform float uTime;
      uniform float uScreenAspect;
      uniform float uImageAspect;
      varying vec2 vUv;

      vec2 coverUV(vec2 uv, float sa, float ia) {
        vec2 s = vec2(1.0);
        if (sa > ia) { s.y = sa / ia; } else { s.x = ia / sa; }
        return (uv - 0.5) / s + 0.5;
      }

      void main() {
        float tx = 1.0 / 512.0;
        float dx = texture2D(uRipple, vUv + vec2(tx, 0.0)).r - texture2D(uRipple, vUv - vec2(tx, 0.0)).r;
        float dy = texture2D(uRipple, vUv + vec2(0.0, tx)).r - texture2D(uRipple, vUv - vec2(0.0, tx)).r;
        vec2 rOff = vec2(dx, dy) * 0.18;

        float breathe = sin(uTime * 0.4) * 0.002;
        vec2 bOff = vec2(sin(vUv.y * 4.0 + uTime * 0.3) * breathe, cos(vUv.x * 3.0 + uTime * 0.2) * breathe);
        vec2 base = vUv + rOff + bOff;

        float ab = length(rOff) * 3.0;
        vec2 uvR = coverUV(base + ab * vec2(0.004, 0.001), uScreenAspect, uImageAspect);
        vec2 uvG = coverUV(base, uScreenAspect, uImageAspect);
        vec2 uvB = coverUV(base - ab * vec2(0.004, 0.001), uScreenAspect, uImageAspect);

        vec3 color = vec3(texture2D(uTexture, uvR).r, texture2D(uTexture, uvG).g, texture2D(uTexture, uvB).b);
        color = pow(color, vec3(0.95, 0.98, 1.05));

        float vig = smoothstep(1.6, 0.4, length((vUv - 0.5) * vec2(uScreenAspect, 1.0)));
        color *= mix(0.5, 1.0, vig);

        float grain = fract(sin(dot(vUv * uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `
  })

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMat))

  // --- Scrollable HTML content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui1-scroll'

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
    <div class="ui1-hero">
      <h1 class="ui1-title">leblanc</h1>
      <p class="ui1-subtitle">touch the surface</p>
      <div class="ui1-scroll-hint">
        <span>scroll</span>
        <div class="ui1-scroll-line"></div>
      </div>
    </div>
    <div class="ui1-links-section">
      <h2 class="ui1-links-header">listen everywhere</h2>
      <p class="ui1-links-sub">find me</p>
      <div class="ui1-links-grid">
        ${links.map(l => `
          <a class="ui1-link" href="${l.url}" target="_blank" rel="noopener">
            <div class="ui1-link-icon">${l.icon}</div>
            <span class="ui1-link-text">${l.name}</span>
            <span class="ui1-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
      <div class="ui1-divider"></div>
      <p class="ui1-footer">&copy; leblanc 2026</p>
    </div>
  `
  container.appendChild(scroll)

  // --- 3D tilt on title ---
  const titleEl = scroll.querySelector('.ui1-title')
  let tx = 0, ty = 0, cx = 0, cy = 0

  // --- Interaction ---
  let mouse = { x: -10, y: -10 }
  let mouseInside = false
  let clickPulse = 0

  function onMove(e) {
    mouse.x = e.clientX / window.innerWidth
    mouse.y = 1.0 - e.clientY / window.innerHeight
    mouseInside = true

    // 3D title tilt
    tx = (e.clientX / window.innerWidth - 0.5) * 20
    ty = (e.clientY / window.innerHeight - 0.5) * -12
  }
  function onLeave() { mouseInside = false }
  function onClick() { clickPulse = 0.4 }
  function onTouch(e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX / window.innerWidth
      mouse.y = 1.0 - e.touches[0].clientY / window.innerHeight
      mouseInside = true
      clickPulse = 0.15
    }
  }

  container.addEventListener('mousemove', onMove)
  container.addEventListener('mouseleave', onLeave)
  container.addEventListener('click', onClick)
  container.addEventListener('touchmove', onTouch, { passive: true })
  container.addEventListener('touchstart', onTouch, { passive: true })

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    displayMat.uniforms.uScreenAspect.value = window.innerWidth / window.innerHeight
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
    titleEl.style.transform = `perspective(800px) rotateY(${cx}deg) rotateX(${cy}deg)`

    // Ripple sim
    rippleMat.uniforms.uPrev.value = rtA.texture
    rippleMat.uniforms.uMouse.value.set(mouse.x, mouse.y)
    let str = mouseInside ? 0.025 : 0.0
    str += clickPulse
    clickPulse *= 0.88
    rippleMat.uniforms.uStrength.value = str

    renderer.setRenderTarget(rtB)
    renderer.render(simScene, simCam)
    renderer.setRenderTarget(null)
    const tmp = rtA; rtA = rtB; rtB = tmp

    displayMat.uniforms.uRipple.value = rtA.texture
    displayMat.uniforms.uTime.value = time
    renderer.render(scene, camera)
  }

  animate()

  return function cleanup() {
    cancelAnimationFrame(raf)
    container.removeEventListener('mousemove', onMove)
    container.removeEventListener('mouseleave', onLeave)
    container.removeEventListener('click', onClick)
    container.removeEventListener('touchmove', onTouch)
    container.removeEventListener('touchstart', onTouch)
    window.removeEventListener('resize', onResize)
    rtA.dispose(); rtB.dispose()
    rippleMat.dispose(); displayMat.dispose()
    imageTex.dispose(); renderer.dispose()
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
