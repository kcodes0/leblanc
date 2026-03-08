export function ui4(container) {
  // UI 4 — "Cinema"
  // Letterboxed like a widescreen film. Cinematic photograph. Film grain. Timecode. Fade from black.

  let timecodeInterval = null

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui4-fadeFromBlack {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui4-titleFade {
      0% { opacity: 0; }
      100% { opacity: 0.85; }
    }

    @keyframes ui4-grainShift {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -5%); }
      20% { transform: translate(-8%, 2%); }
      30% { transform: translate(4%, -12%); }
      40% { transform: translate(-3%, 10%); }
      50% { transform: translate(-7%, 5%); }
      60% { transform: translate(8%, -1%); }
      70% { transform: translate(1%, 8%); }
      80% { transform: translate(2%, 15%); }
      90% { transform: translate(-5%, 4%); }
    }

    .ui4-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
    }

    .ui4-letterbox-top,
    .ui4-letterbox-bottom {
      position: absolute;
      left: 0;
      right: 0;
      background: #000;
      z-index: 20;
    }

    .ui4-letterbox-top {
      top: 0;
      height: 12%;
    }

    .ui4-letterbox-bottom {
      bottom: 0;
      height: 12%;
    }

    .ui4-frame {
      position: absolute;
      top: 12%;
      bottom: 12%;
      left: 0;
      right: 0;
      overflow: hidden;
      opacity: 0;
      animation: ui4-fadeFromBlack 4s 0.5s ease-out forwards;
    }

    .ui4-image {
      position: absolute;
      inset: -3%;
      width: 106%;
      height: 106%;
      background-image: url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80');
      background-size: cover;
      background-position: center;
    }

    .ui4-image-tint {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.15);
      pointer-events: none;
    }

    .ui4-grain {
      position: absolute;
      inset: -100%;
      width: 300%;
      height: 300%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
      opacity: 0.5;
      z-index: 15;
      pointer-events: none;
      animation: ui4-grainShift 4s steps(6) infinite;
      mix-blend-mode: overlay;
    }

    .ui4-title {
      position: absolute;
      bottom: 32px;
      left: 48px;
      z-index: 10;
      opacity: 0;
      animation: ui4-titleFade 3s 3s ease-out forwards;
    }

    .ui4-title-text {
      font-family: 'Playfair Display', serif;
      font-weight: 400;
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.12em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
    }

    .ui4-timecode {
      position: absolute;
      bottom: 32px;
      right: 48px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 10px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 0.15em;
      z-index: 10;
      opacity: 0;
      animation: ui4-titleFade 2s 4s ease-out forwards;
    }

    .ui4-frame-line {
      position: absolute;
      top: 12%;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(255,255,255,0.06);
      z-index: 25;
    }

    .ui4-frame-line-bottom {
      top: auto;
      bottom: 12%;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui4-root'

  // Letterbox bars
  const barTop = document.createElement('div')
  barTop.className = 'ui4-letterbox-top'
  root.appendChild(barTop)

  const barBottom = document.createElement('div')
  barBottom.className = 'ui4-letterbox-bottom'
  root.appendChild(barBottom)

  // Frame lines at letterbox edges
  const frameLine = document.createElement('div')
  frameLine.className = 'ui4-frame-line'
  root.appendChild(frameLine)

  const frameLineBottom = document.createElement('div')
  frameLineBottom.className = 'ui4-frame-line ui4-frame-line-bottom'
  root.appendChild(frameLineBottom)

  // Cinematic frame
  const frame = document.createElement('div')
  frame.className = 'ui4-frame'

  const image = document.createElement('div')
  image.className = 'ui4-image'
  frame.appendChild(image)

  const imageTint = document.createElement('div')
  imageTint.className = 'ui4-image-tint'
  frame.appendChild(imageTint)

  // Film grain
  const grain = document.createElement('div')
  grain.className = 'ui4-grain'
  frame.appendChild(grain)

  // Title — like film opening credits
  const title = document.createElement('div')
  title.className = 'ui4-title'

  const titleText = document.createElement('p')
  titleText.className = 'ui4-title-text'
  titleText.textContent = 'leblanc'
  title.appendChild(titleText)

  frame.appendChild(title)

  // Timecode
  const timecode = document.createElement('div')
  timecode.className = 'ui4-timecode'
  timecode.textContent = '00:00:00'
  frame.appendChild(timecode)

  root.appendChild(frame)
  container.appendChild(root)

  // Timecode counter
  let seconds = 0
  timecodeInterval = setInterval(() => {
    seconds++
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    timecode.textContent = `${h}:${m}:${s}`
  }, 1000)

  return function cleanup() {
    if (timecodeInterval) clearInterval(timecodeInterval)
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
