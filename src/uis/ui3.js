import * as THREE from 'three'

export function ui3(container) {
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'auto'
  container.style.overflowX = 'hidden'
  container.style.overflowY = 'auto'
  container.style.background = '#050505'
  container.style.height = '100%'

  // --- Styles ---
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui3FadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ui3Pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
    @keyframes ui3PrismShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .ui3-canvas-wrap {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .ui3-scroll {
      position: relative;
      z-index: 2;
      cursor: crosshair;
    }

    .ui3-hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ui3-title {
      font-family: 'Archivo Black', sans-serif;
      font-weight: 400;
      font-size: clamp(4rem, 11vw, 9rem);
      text-transform: lowercase;
      letter-spacing: 0.02em;
      margin: 0;
      line-height: 0.95;
      color: #ffffff;
      mix-blend-mode: difference;
      opacity: 0;
      animation: ui3FadeUp 2s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      perspective: 800px;
      transform-style: preserve-3d;
      user-select: none;
      z-index: 10;
    }

    .ui3-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 6px;
      text-transform: lowercase;
      color: rgba(255, 255, 255, 0.18);
      margin-top: 24px;
      opacity: 0;
      animation: ui3FadeUp 2s 1.2s ease forwards;
    }

    .ui3-scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: ui3FadeUp 2s 2s ease forwards;
    }

    .ui3-scroll-hint span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.12);
    }

    .ui3-scroll-line {
      width: 1px;
      height: 32px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
      animation: ui3Pulse 2.5s ease-in-out infinite;
    }

    /* --- Links section --- */
    .ui3-links-section {
      min-height: 100vh;
      padding: 80px 24px 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
      position: relative;
    }

    .ui3-links-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom,
        transparent 0%,
        rgba(5, 5, 5, 0.6) 6%,
        rgba(5, 5, 5, 0.88) 15%,
        rgba(5, 5, 5, 0.96) 30%,
        #050505 50%
      );
      pointer-events: none;
      z-index: 0;
    }

    .ui3-links-header {
      position: relative;
      z-index: 1;
      font-family: 'Archivo Black', sans-serif;
      font-weight: 400;
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
      letter-spacing: 0.05em;
      text-transform: lowercase;
    }

    .ui3-links-sub {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      color: rgba(255, 255, 255, 0.12);
      text-transform: uppercase;
      margin-bottom: 56px;
    }

    .ui3-links-grid {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 440px;
    }

    .ui3-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 24px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.05);
      text-decoration: none;
      color: rgba(255, 255, 255, 0.75);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }

    .ui3-link::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(135deg,
        rgba(255, 50, 50, 0.06),
        rgba(50, 255, 50, 0.04),
        rgba(50, 50, 255, 0.06)
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .ui3-link:hover {
      border-color: transparent;
      border-image: linear-gradient(135deg, #ff3333, #33ff33, #3333ff, #ff3333) 1;
      border-image: none;
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px) scale(1.01);
      box-shadow:
        0 0 20px rgba(255, 50, 50, 0.06),
        0 0 40px rgba(50, 50, 255, 0.06),
        0 8px 32px rgba(0, 0, 0, 0.3);
      background: linear-gradient(135deg,
        rgba(255, 50, 50, 0.04),
        rgba(50, 255, 50, 0.03),
        rgba(50, 100, 255, 0.04)
      );
    }

    .ui3-link:hover::before {
      opacity: 1;
    }

    .ui3-link:hover .ui3-link-icon {
      color: #ffffff;
      transform: scale(1.1);
      filter: drop-shadow(0 0 6px rgba(255, 120, 120, 0.4));
    }

    .ui3-link:hover .ui3-link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .ui3-link-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.35);
      transition: all 0.4s ease;
    }

    .ui3-link-icon svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .ui3-link-text {
      flex: 1;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.02em;
    }

    .ui3-link-arrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.4s ease;
    }

    .ui3-divider {
      position: relative;
      z-index: 1;
      width: 40px;
      height: 1px;
      background: linear-gradient(90deg, #ff3333, #33ff33, #3333ff);
      opacity: 0.15;
      margin: 40px 0;
    }

    .ui3-footer {
      position: relative;
      z-index: 1;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 0.08);
      text-transform: uppercase;
    }
  `
  document.head.appendChild(style)

  // --- WebGL Canvas (fixed background) ---
  const canvasWrap = document.createElement('div')
  canvasWrap.className = 'ui3-canvas-wrap'
  container.appendChild(canvasWrap)

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  canvasWrap.appendChild(renderer.domElement)

  // Scene with PerspectiveCamera for depth
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050505)
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 2.8

  // Load the bloom image texture
  const loader = new THREE.TextureLoader()
  const bloomTex = loader.load('/images/bloom.png')
  bloomTex.minFilter = THREE.LinearFilter
  bloomTex.magFilter = THREE.LinearFilter

  // Vertex shader shared by all three channel planes
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Fragment shader for isolating a single color channel with scanline effect
  function makeChannelShader(channel) {
    // channel: 0 = red, 1 = green, 2 = blue
    return /* glsl */ `
      precision highp float;
      uniform sampler2D uTexture;
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
        vec2 cuv = coverUV(vUv, uScreenAspect, uImageAspect);
        vec4 tex = texture2D(uTexture, cuv);

        // Scanline effect - thin horizontal lines slowly scrolling
        float scanline = sin((vUv.y * 800.0) + uTime * 1.5) * 0.5 + 0.5;
        scanline = smoothstep(0.4, 0.6, scanline) * 0.02;

        ${channel === 0 ? `
          float val = tex.r;
          gl_FragColor = vec4(val - scanline, 0.0, 0.0, val);
        ` : channel === 1 ? `
          float val = tex.g;
          gl_FragColor = vec4(0.0, val - scanline, 0.0, val);
        ` : `
          float val = tex.b;
          gl_FragColor = vec4(0.0, 0.0, val - scanline, val);
        `}
      }
    `
  }

  // Plane geometry sized to fill view
  const planeGeo = new THREE.PlaneGeometry(3.6, 3.6)

  // Create materials for each channel
  const screenAspect = window.innerWidth / window.innerHeight
  const imageAspect = { value: 16 / 9 }

  // Update image aspect when texture loads
  bloomTex.image && (imageAspect.value = bloomTex.image.width / bloomTex.image.height)
  loader.load('/images/bloom.png', (tex) => {
    imageAspect.value = tex.image.width / tex.image.height
    redMat.uniforms.uImageAspect.value = imageAspect.value
    greenMat.uniforms.uImageAspect.value = imageAspect.value
    blueMat.uniforms.uImageAspect.value = imageAspect.value
  })

  const redMat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: bloomTex },
      uTime: { value: 0 },
      uScreenAspect: { value: screenAspect },
      uImageAspect: { value: imageAspect.value }
    },
    vertexShader,
    fragmentShader: makeChannelShader(0),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  })

  const greenMat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: bloomTex },
      uTime: { value: 0 },
      uScreenAspect: { value: screenAspect },
      uImageAspect: { value: imageAspect.value }
    },
    vertexShader,
    fragmentShader: makeChannelShader(1),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  })

  const blueMat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: bloomTex },
      uTime: { value: 0 },
      uScreenAspect: { value: screenAspect },
      uImageAspect: { value: imageAspect.value }
    },
    vertexShader,
    fragmentShader: makeChannelShader(2),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  })

  // Create the three planes at slight z-offsets
  const redPlane = new THREE.Mesh(planeGeo, redMat)
  redPlane.position.z = 0.06
  scene.add(redPlane)

  const greenPlane = new THREE.Mesh(planeGeo, greenMat)
  greenPlane.position.z = 0.0
  scene.add(greenPlane)

  const bluePlane = new THREE.Mesh(planeGeo, blueMat)
  bluePlane.position.z = -0.06
  scene.add(bluePlane)

  // --- Scrollable HTML content ---
  const scroll = document.createElement('div')
  scroll.className = 'ui3-scroll'

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
    <div class="ui3-hero">
      <h1 class="ui3-title">leblanc</h1>
      <p class="ui3-subtitle">prism</p>
      <div class="ui3-scroll-hint">
        <span>scroll</span>
        <div class="ui3-scroll-line"></div>
      </div>
    </div>
    <div class="ui3-links-section">
      <h2 class="ui3-links-header">listen everywhere</h2>
      <p class="ui3-links-sub">find me</p>
      <div class="ui3-links-grid">
        ${links.map(l => `
          <a class="ui3-link" href="${l.url}" target="_blank" rel="noopener">
            <div class="ui3-link-icon">${l.icon}</div>
            <span class="ui3-link-text">${l.name}</span>
            <span class="ui3-link-arrow">&rarr;</span>
          </a>
        `).join('')}
      </div>
      <div class="ui3-divider"></div>
      <p class="ui3-footer">&copy; leblanc 2026</p>
    </div>
  `
  container.appendChild(scroll)

  // --- Mouse tracking ---
  let mouseX = 0, mouseY = 0       // normalized -1 to 1
  let smoothX = 0, smoothY = 0     // smoothed values
  let titleTiltX = 0, titleTiltY = 0
  let smoothTiltX = 0, smoothTiltY = 0
  const titleEl = scroll.querySelector('.ui3-title')

  function onMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2   // -1 to 1
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2  // -1 to 1
    titleTiltX = mouseX * 12
    titleTiltY = mouseY * -8
  }

  function onTouch(e) {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
    }
  }

  function onLeave() {
    mouseX = 0
    mouseY = 0
    titleTiltX = 0
    titleTiltY = 0
  }

  container.addEventListener('mousemove', onMove)
  container.addEventListener('mouseleave', onLeave)
  container.addEventListener('touchmove', onTouch, { passive: true })
  container.addEventListener('touchstart', onTouch, { passive: true })

  function onResize() {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const sa = w / h
    redMat.uniforms.uScreenAspect.value = sa
    greenMat.uniforms.uScreenAspect.value = sa
    blueMat.uniforms.uScreenAspect.value = sa
  }
  window.addEventListener('resize', onResize)

  // --- Render loop ---
  let time = 0
  let raf

  // Separation intensity — how far channels spread
  const maxSeparation = 0.35
  // Rotation intensity per plane
  const maxRotation = 0.06

  function animate() {
    raf = requestAnimationFrame(animate)
    time += 0.016

    // Smooth the mouse values for fluid motion
    smoothX += (mouseX - smoothX) * 0.06
    smoothY += (mouseY - smoothY) * 0.06

    // Calculate separation based on mouse distance from center
    const dist = Math.sqrt(smoothX * smoothX + smoothY * smoothY)
    const separation = dist * maxSeparation

    // Red plane: shifts opposite to mouse direction (left/up when mouse is right/down)
    redPlane.position.x = -smoothX * separation
    redPlane.position.y = -smoothY * separation
    redPlane.rotation.y = smoothX * maxRotation
    redPlane.rotation.x = -smoothY * maxRotation * 0.5

    // Green plane: stays near center with very subtle drift
    greenPlane.position.x = smoothX * separation * 0.05
    greenPlane.position.y = smoothY * separation * 0.05
    greenPlane.rotation.z = smoothX * maxRotation * 0.3

    // Blue plane: shifts with mouse direction (right/down when mouse is right/down)
    bluePlane.position.x = smoothX * separation
    bluePlane.position.y = smoothY * separation
    bluePlane.rotation.y = -smoothX * maxRotation
    bluePlane.rotation.x = smoothY * maxRotation * 0.5

    // Add subtle idle oscillation so the planes breathe even without mouse
    const idleX = Math.sin(time * 0.3) * 0.015
    const idleY = Math.cos(time * 0.25) * 0.01
    redPlane.position.x += -idleX
    redPlane.position.y += -idleY
    bluePlane.position.x += idleX
    bluePlane.position.y += idleY

    // Update shader time
    redMat.uniforms.uTime.value = time
    greenMat.uniforms.uTime.value = time
    blueMat.uniforms.uTime.value = time

    // Smooth title 3D tilt
    smoothTiltX += (titleTiltX - smoothTiltX) * 0.06
    smoothTiltY += (titleTiltY - smoothTiltY) * 0.06
    titleEl.style.transform = `perspective(800px) rotateY(${smoothTiltX}deg) rotateX(${smoothTiltY}deg)`

    renderer.render(scene, camera)
  }

  animate()

  return function cleanup() {
    cancelAnimationFrame(raf)
    container.removeEventListener('mousemove', onMove)
    container.removeEventListener('mouseleave', onLeave)
    container.removeEventListener('touchmove', onTouch)
    container.removeEventListener('touchstart', onTouch)
    window.removeEventListener('resize', onResize)
    redMat.dispose()
    greenMat.dispose()
    blueMat.dispose()
    planeGeo.dispose()
    bloomTex.dispose()
    renderer.dispose()
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
