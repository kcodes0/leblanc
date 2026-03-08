export function ui2(container) {
  // UI 2 — "Split"
  // Viewport split vertically. Left: atmospheric photograph. Right: pure black with typography.

  let animId = null

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui2-fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui2-lineReveal {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }

    @keyframes ui2-imageDrift {
      0% { background-position: 50% 50%; }
      50% { background-position: 50% 45%; }
      100% { background-position: 50% 50%; }
    }

    .ui2-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: flex;
      background: #000;
    }

    .ui2-left {
      position: relative;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ui2-root:hover .ui2-left {
      width: 53%;
    }

    .ui2-image {
      position: absolute;
      inset: -5%;
      width: 110%;
      height: 110%;
      background-image: url('https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=1920&q=80');
      background-size: cover;
      background-position: 50% 50%;
      animation: ui2-imageDrift 30s ease-in-out infinite;
    }

    .ui2-image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, transparent 60%, rgba(0,0,0,0.4) 100%);
      pointer-events: none;
    }

    .ui2-right {
      flex: 1;
      height: 100%;
      background: #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      padding-right: clamp(40px, 8vw, 100px);
      transition: flex 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ui2-name {
      font-family: 'Syne', sans-serif;
      font-weight: 300;
      font-size: clamp(3rem, 6vw, 6rem);
      color: #fff;
      letter-spacing: 0.08em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
      text-align: right;
      opacity: 0;
      animation: ui2-fadeIn 2s 0.5s ease-out forwards;
    }

    .ui2-divider {
      width: 40px;
      height: 1px;
      background: rgba(255,255,255,0.3);
      margin-top: 28px;
      margin-bottom: 16px;
      transform-origin: right center;
      transform: scaleX(0);
      animation: ui2-lineReveal 1.5s 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ui2-vol {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 10px;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.3em;
      text-transform: lowercase;
      opacity: 0;
      animation: ui2-fadeIn 1.5s 2.2s ease-out forwards;
    }

    .ui2-edge {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background: rgba(255,255,255,0.06);
      z-index: 10;
      pointer-events: none;
      transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ui2-root:hover .ui2-edge {
      left: 53%;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui2-root'

  // Left half — image
  const left = document.createElement('div')
  left.className = 'ui2-left'

  const image = document.createElement('div')
  image.className = 'ui2-image'
  left.appendChild(image)

  const imageOverlay = document.createElement('div')
  imageOverlay.className = 'ui2-image-overlay'
  left.appendChild(imageOverlay)

  root.appendChild(left)

  // Edge line
  const edge = document.createElement('div')
  edge.className = 'ui2-edge'
  root.appendChild(edge)

  // Right half — text
  const right = document.createElement('div')
  right.className = 'ui2-right'

  const name = document.createElement('h1')
  name.className = 'ui2-name'
  name.textContent = 'leblanc'
  right.appendChild(name)

  const divider = document.createElement('div')
  divider.className = 'ui2-divider'
  right.appendChild(divider)

  const vol = document.createElement('p')
  vol.className = 'ui2-vol'
  vol.textContent = 'vol. I'
  right.appendChild(vol)

  root.appendChild(right)
  container.appendChild(root)

  return function cleanup() {
    if (animId) cancelAnimationFrame(animId)
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
