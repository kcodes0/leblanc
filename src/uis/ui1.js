export function ui1(container) {
  // UI 1 — "The Portrait"
  // A full-bleed B&W photograph, artist signature in lower-left, thin line, vignette.

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui1-kenburns {
      0% {
        transform: scale(1.0);
      }
      100% {
        transform: scale(1.12);
      }
    }

    @keyframes ui1-fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui1-lineReveal {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }

    .ui1-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
    }

    .ui1-photo {
      position: absolute;
      inset: 0;
      background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&q=80');
      background-size: cover;
      background-position: center 20%;
      filter: grayscale(1) contrast(1.1) brightness(0.85);
      animation: ui1-kenburns 35s ease-in-out forwards;
      will-change: transform;
    }

    .ui1-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 65% at 50% 45%, transparent 30%, rgba(0,0,0,0.7) 100%);
      pointer-events: none;
      z-index: 2;
    }

    .ui1-bottom-fade {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
      pointer-events: none;
      z-index: 2;
    }

    .ui1-signature {
      position: absolute;
      bottom: 48px;
      left: 48px;
      z-index: 10;
      opacity: 0;
      animation: ui1-fadeIn 2s 1s ease-out forwards;
    }

    .ui1-line {
      width: 60px;
      height: 1px;
      background: rgba(255,255,255,0.35);
      margin-bottom: 18px;
      transform-origin: left center;
      transform: scaleX(0);
      animation: ui1-lineReveal 1.5s 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ui1-name {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 300;
      font-size: 14px;
      color: rgba(255,255,255,0.75);
      letter-spacing: 0.35em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui1-root'

  const photo = document.createElement('div')
  photo.className = 'ui1-photo'
  root.appendChild(photo)

  const vignette = document.createElement('div')
  vignette.className = 'ui1-vignette'
  root.appendChild(vignette)

  const bottomFade = document.createElement('div')
  bottomFade.className = 'ui1-bottom-fade'
  root.appendChild(bottomFade)

  const signature = document.createElement('div')
  signature.className = 'ui1-signature'

  const line = document.createElement('div')
  line.className = 'ui1-line'
  signature.appendChild(line)

  const name = document.createElement('p')
  name.className = 'ui1-name'
  name.textContent = 'leblanc'
  signature.appendChild(name)

  root.appendChild(signature)
  container.appendChild(root)

  return function cleanup() {
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
