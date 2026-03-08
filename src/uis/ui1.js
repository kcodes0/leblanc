export function ui1(container) {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui1-breathe {
      0%, 100% { transform: scale(1.0); }
      50% { transform: scale(1.06); }
    }

    @keyframes ui1-fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes ui1-lineGrow {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    .ui1-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #0a0806;
      cursor: crosshair;
    }

    .ui1-image {
      position: absolute;
      inset: -5%;
      width: 110%;
      height: 110%;
      background-image: url('/images/bloom.png');
      background-size: cover;
      background-position: center;
      animation: ui1-breathe 25s ease-in-out infinite;
      will-change: transform;
    }

    .ui1-wash {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        160deg,
        rgba(10, 8, 6, 0.15) 0%,
        transparent 40%,
        transparent 60%,
        rgba(10, 8, 6, 0.3) 100%
      );
      pointer-events: none;
      z-index: 2;
    }

    .ui1-grain {
      position: absolute;
      inset: 0;
      opacity: 0.035;
      pointer-events: none;
      z-index: 3;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 256px 256px;
    }

    .ui1-signature {
      position: absolute;
      bottom: 52px;
      right: 56px;
      z-index: 10;
      text-align: right;
      opacity: 0;
      animation: ui1-fadeIn 2.5s 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ui1-name {
      font-family: 'Playfair Display', serif;
      font-weight: 400;
      font-style: italic;
      font-size: clamp(13px, 1.8vw, 18px);
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 0.25em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
    }

    .ui1-line {
      width: 40px;
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      margin-left: auto;
      margin-bottom: 16px;
      transform-origin: right center;
      transform: scaleX(0);
      animation: ui1-lineGrow 1.8s 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui1-root'

  root.innerHTML = `
    <div class="ui1-image"></div>
    <div class="ui1-wash"></div>
    <div class="ui1-grain"></div>
    <div class="ui1-signature">
      <div class="ui1-line"></div>
      <p class="ui1-name">leblanc</p>
    </div>
  `

  container.appendChild(root)

  // Subtle parallax on the image
  const image = root.querySelector('.ui1-image')
  let mx = 0, my = 0, cx = 0, cy = 0
  let raf

  function onMove(e) {
    mx = (e.clientX / window.innerWidth - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * 2
  }

  function tick() {
    cx += (mx - cx) * 0.03
    cy += (my - cy) * 0.03
    image.style.transform = `translate(${cx * -12}px, ${cy * -8}px) scale(1.03)`
    raf = requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', onMove)
  raf = requestAnimationFrame(tick)

  return function cleanup() {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
