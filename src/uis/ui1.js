import * as THREE from 'three'

export function ui1(container) {
  // --- Three.js setup ---
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  container.innerHTML = ''
  container.style.position = 'relative'
  container.style.overflow = 'hidden'
  container.style.background = '#0a0806'
  container.style.cursor = 'crosshair'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // --- Ripple simulation (ping-pong FBOs) ---
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
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
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

        // Wave propagation
        v += (l + r + t + b) * 0.25 - h;
        v *= uDamping;
        h += v;

        // Mouse drop
        float d = distance(vUv, uMouse);
        h += uStrength * smoothstep(uRadius, 0.0, d);

        gl_FragColor = vec4(h, v, 0.0, 1.0);
      }
    `
  })

  const simScene = new THREE.Scene()
  const simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), rippleMat))

  // --- Main display shader ---
  const loader = new THREE.TextureLoader()
  const imageTex = loader.load('/images/bloom.png', (tex) => {
    // Update image aspect once loaded
    const img = tex.image
    displayMat.uniforms.uImageAspect.value = img.width / img.height
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
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform sampler2D uTexture;
      uniform sampler2D uRipple;
      uniform float uTime;
      uniform float uScreenAspect;
      uniform float uImageAspect;
      varying vec2 vUv;

      vec2 coverUV(vec2 uv, float screenAspect, float imageAspect) {
        vec2 s = vec2(1.0);
        if (screenAspect > imageAspect) {
          s.y = screenAspect / imageAspect;
        } else {
          s.x = imageAspect / screenAspect;
        }
        return (uv - 0.5) / s + 0.5;
      }

      void main() {
        // Ripple distortion from heightmap gradient
        float tx = 1.0 / 512.0;
        float dx = texture2D(uRipple, vUv + vec2(tx, 0.0)).r
                 - texture2D(uRipple, vUv - vec2(tx, 0.0)).r;
        float dy = texture2D(uRipple, vUv + vec2(0.0, tx)).r
                 - texture2D(uRipple, vUv - vec2(0.0, tx)).r;

        vec2 rippleOffset = vec2(dx, dy) * 0.18;

        // Organic breathing
        float breathe = sin(uTime * 0.4) * 0.002;
        vec2 breatheOff = vec2(
          sin(vUv.y * 4.0 + uTime * 0.3) * breathe,
          cos(vUv.x * 3.0 + uTime * 0.2) * breathe
        );

        vec2 baseUV = vUv + rippleOffset + breatheOff;

        // Cover-fit the image
        vec2 uvR = coverUV(baseUV + length(rippleOffset) * vec2( 0.004, 0.001), uScreenAspect, uImageAspect);
        vec2 uvG = coverUV(baseUV, uScreenAspect, uImageAspect);
        vec2 uvB = coverUV(baseUV + length(rippleOffset) * vec2(-0.004,-0.001), uScreenAspect, uImageAspect);

        float r = texture2D(uTexture, uvR).r;
        float g = texture2D(uTexture, uvG).g;
        float b = texture2D(uTexture, uvB).b;

        vec3 color = vec3(r, g, b);

        // Subtle warmth push
        color = pow(color, vec3(0.95, 0.98, 1.05));

        // Soft vignette
        float vig = smoothstep(1.6, 0.4, length((vUv - 0.5) * vec2(uScreenAspect, 1.0)));
        color *= mix(0.5, 1.0, vig);

        // Film grain
        float grain = fract(sin(dot(vUv * uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `
  })

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMat))

  // --- HTML overlay ---
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: absolute; inset: 0; z-index: 10; pointer-events: none;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  `

  const nameEl = document.createElement('h1')
  nameEl.textContent = 'leblanc'
  nameEl.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.2em;
    text-transform: lowercase;
    margin: 0;
    text-shadow: 0 2px 40px rgba(0,0,0,0.3);
    mix-blend-mode: soft-light;
    opacity: 0;
    transform: translateY(12px);
    animation: ui1FadeIn 3s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `

  const sub = document.createElement('p')
  sub.textContent = 'touch the surface'
  sub.style.cssText = `
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
    margin-top: 20px;
    opacity: 0;
    animation: ui1FadeIn 2s 2s ease forwards;
  `

  overlay.appendChild(nameEl)
  overlay.appendChild(sub)
  container.appendChild(overlay)

  // Inject keyframe
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui1FadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
  document.head.appendChild(style)

  // --- Interaction ---
  let mouse = { x: -10, y: -10 }
  let mouseInside = false
  let clickPulse = 0

  function onMove(e) {
    mouse.x = e.clientX / window.innerWidth
    mouse.y = 1.0 - e.clientY / window.innerHeight
    mouseInside = true
  }
  function onLeave() {
    mouseInside = false
  }
  function onClick() {
    clickPulse = 0.4
  }
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

    // Ripple sim step
    rippleMat.uniforms.uPrev.value = rtA.texture
    rippleMat.uniforms.uMouse.value.set(mouse.x, mouse.y)

    let str = mouseInside ? 0.025 : 0.0
    str += clickPulse
    clickPulse *= 0.88
    rippleMat.uniforms.uStrength.value = str

    renderer.setRenderTarget(rtB)
    renderer.render(simScene, simCam)
    renderer.setRenderTarget(null)

    // Swap buffers
    const tmp = rtA; rtA = rtB; rtB = tmp

    // Display
    displayMat.uniforms.uRipple.value = rtA.texture
    displayMat.uniforms.uTime.value = time
    renderer.render(scene, camera)
  }

  animate()

  // --- Cleanup ---
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
    imageTex.dispose()
    renderer.dispose()
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
