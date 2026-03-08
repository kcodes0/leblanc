export function ui3(container) {
  // UI 3 — "The Gallery"
  // Minimal art gallery wall. Three photographs arranged asymmetrically. Warm, tactile, physical.

  let animId = null
  let time = 0

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui3-fadeIn {
      0% { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .ui3-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #f5f2ed;
    }

    .ui3-wall-texture {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 30% 40%, rgba(0,0,0,0.02) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(0,0,0,0.015) 0%, transparent 40%);
      pointer-events: none;
      z-index: 1;
    }

    .ui3-photo {
      position: absolute;
      background-size: cover;
      background-position: center;
      box-shadow:
        0 2px 8px rgba(0,0,0,0.08),
        0 8px 24px rgba(0,0,0,0.06),
        0 20px 60px rgba(0,0,0,0.04);
      z-index: 5;
      will-change: transform;
      transition: box-shadow 0.6s ease;
    }

    .ui3-photo:hover {
      box-shadow:
        0 4px 12px rgba(0,0,0,0.1),
        0 12px 36px rgba(0,0,0,0.08),
        0 28px 80px rgba(0,0,0,0.06);
    }

    .ui3-photo-1 {
      width: min(55vw, 55vh);
      height: min(70vh, 55vw);
      top: 8%;
      left: 5%;
      background-image: url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80');
      z-index: 5;
    }

    .ui3-photo-2 {
      width: min(28vw, 30vh);
      height: min(35vh, 28vw);
      top: 12%;
      right: 8%;
      background-image: url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&q=80');
      z-index: 6;
    }

    .ui3-photo-3 {
      width: min(18vw, 20vh);
      height: min(22vh, 18vw);
      bottom: 10%;
      right: 22%;
      background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80');
      z-index: 7;
    }

    .ui3-placard {
      position: absolute;
      bottom: 40px;
      left: 48px;
      z-index: 10;
      opacity: 0;
      animation: ui3-fadeIn 1.5s 0.8s ease-out forwards;
    }

    .ui3-placard-name {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 300;
      font-size: 13px;
      color: #1a1a1a;
      letter-spacing: 0.35em;
      text-transform: lowercase;
      margin: 0 0 8px 0;
    }

    .ui3-placard-line {
      width: 30px;
      height: 1px;
      background: rgba(0,0,0,0.2);
      margin-bottom: 8px;
    }

    .ui3-placard-sub {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 9px;
      color: rgba(0,0,0,0.35);
      letter-spacing: 0.2em;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui3-root'

  const wallTexture = document.createElement('div')
  wallTexture.className = 'ui3-wall-texture'
  root.appendChild(wallTexture)

  // Three photos — different Unsplash images
  const photos = []
  for (let i = 1; i <= 3; i++) {
    const photo = document.createElement('div')
    photo.className = `ui3-photo ui3-photo-${i}`
    root.appendChild(photo)
    photos.push(photo)
  }

  // Gallery placard
  const placard = document.createElement('div')
  placard.className = 'ui3-placard'

  const placardName = document.createElement('p')
  placardName.className = 'ui3-placard-name'
  placardName.textContent = 'leblanc'
  placard.appendChild(placardName)

  const placardLine = document.createElement('div')
  placardLine.className = 'ui3-placard-line'
  placard.appendChild(placardLine)

  const placardSub = document.createElement('p')
  placardSub.className = 'ui3-placard-sub'
  placardSub.textContent = 'selected works, 2024'
  placard.appendChild(placardSub)

  root.appendChild(placard)
  container.appendChild(root)

  // Gentle independent floating for each photo
  const driftData = [
    { xAmp: 3, yAmp: 4, xSpeed: 0.0004, ySpeed: 0.0003, xPhase: 0, yPhase: 1.2 },
    { xAmp: 4, yAmp: 3, xSpeed: 0.0005, ySpeed: 0.0004, xPhase: 2.1, yPhase: 0.5 },
    { xAmp: 2, yAmp: 3, xSpeed: 0.0003, ySpeed: 0.0005, xPhase: 0.8, yPhase: 3.0 },
  ]

  function animate(timestamp) {
    time = timestamp || 0

    photos.forEach((photo, i) => {
      const d = driftData[i]
      const x = Math.sin(time * d.xSpeed + d.xPhase) * d.xAmp
      const y = Math.sin(time * d.ySpeed + d.yPhase) * d.yAmp
      photo.style.transform = `translate(${x}px, ${y}px)`
    })

    animId = requestAnimationFrame(animate)
  }

  animId = requestAnimationFrame(animate)

  return function cleanup() {
    if (animId) cancelAnimationFrame(animId)
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
