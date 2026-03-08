export function ui7(container) {
  // UI 7 — "After Dark"
  // Pure black. Small centered night sky photo. Name above. Subtitle below. Slowly rotating image.
  // One pulsing warm dot of light in the darkness.

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui7-fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui7-imageRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes ui7-starPulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.4); }
    }

    .ui7-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
    }

    .ui7-name {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 300;
      font-size: clamp(1.2rem, 2.5vw, 1.8rem);
      color: rgba(255,255,255,0.75);
      letter-spacing: 0.5em;
      text-transform: lowercase;
      margin: 0 0 40px 0;
      text-indent: 0.5em;
      opacity: 0;
      animation: ui7-fadeIn 2.5s 0.5s ease-out forwards;
    }

    .ui7-image-wrapper {
      position: relative;
      width: min(38vw, 38vh);
      height: min(38vw, 38vh);
      opacity: 0;
      animation: ui7-fadeIn 3s 1s ease-out forwards;
    }

    .ui7-image {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80');
      background-size: cover;
      background-position: center;
      animation: ui7-imageRotate 120s linear infinite;
      border: 1px solid rgba(201, 169, 110, 0.12);
    }

    .ui7-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 400;
      font-size: 13px;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.15em;
      margin: 36px 0 0 0;
      opacity: 0;
      animation: ui7-fadeIn 2s 2s ease-out forwards;
    }

    .ui7-distant-star {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #c9a96e;
      box-shadow: 0 0 8px rgba(201, 169, 110, 0.5);
      animation: ui7-starPulse 4s ease-in-out infinite;
      z-index: 5;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui7-root'

  // Artist name — above the image
  const name = document.createElement('p')
  name.className = 'ui7-name'
  name.textContent = 'leblanc'
  root.appendChild(name)

  // Image wrapper — small, centered
  const imageWrapper = document.createElement('div')
  imageWrapper.className = 'ui7-image-wrapper'

  const image = document.createElement('div')
  image.className = 'ui7-image'
  imageWrapper.appendChild(image)

  root.appendChild(imageWrapper)

  // Subtitle below image
  const subtitle = document.createElement('p')
  subtitle.className = 'ui7-subtitle'
  subtitle.textContent = 'after dark'
  root.appendChild(subtitle)

  // Distant star — one warm pulsing dot
  const star = document.createElement('div')
  star.className = 'ui7-distant-star'
  star.style.top = '22%'
  star.style.right = '28%'
  root.appendChild(star)

  container.appendChild(root)

  return function cleanup() {
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
