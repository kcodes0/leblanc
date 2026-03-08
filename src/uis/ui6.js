export function ui6(container) {
  // UI 6 — "Topography"
  // Dark background with topographic contour lines. Name at the peak. Coordinates at bottom.

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui6-fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui6-contourDraw {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }

    .ui6-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #0c0c0f;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ui6-topo-container {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .ui6-contour {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.04);
      opacity: 0;
      animation: ui6-contourDraw 2s ease-out forwards;
    }

    .ui6-contour-accent {
      border-color: rgba(196, 93, 62, 0.2);
    }

    .ui6-peak-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      margin: -3px 0 0 -3px;
      border-radius: 50%;
      background: #c45d3e;
      z-index: 15;
      opacity: 0;
      animation: ui6-fadeIn 1s 2s ease-out forwards;
      box-shadow: 0 0 12px rgba(196, 93, 62, 0.4);
    }

    .ui6-name-container {
      position: relative;
      z-index: 10;
      text-align: center;
      opacity: 0;
      animation: ui6-fadeIn 2s 1.2s ease-out forwards;
    }

    .ui6-name {
      font-family: 'Syne', sans-serif;
      font-weight: 300;
      font-size: clamp(2rem, 5vw, 4.5rem);
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.3em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
    }

    .ui6-elevation {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 9px;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.2em;
      margin-top: 16px;
    }

    .ui6-coords {
      position: absolute;
      bottom: 36px;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 10px;
      color: rgba(255,255,255,0.15);
      letter-spacing: 0.15em;
      z-index: 10;
      opacity: 0;
      animation: ui6-fadeIn 1.5s 2.5s ease-out forwards;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui6-root'

  // Topographic contour lines
  const topoContainer = document.createElement('div')
  topoContainer.className = 'ui6-topo-container'

  const contourCount = 20
  for (let i = 0; i < contourCount; i++) {
    const contour = document.createElement('div')
    contour.className = 'ui6-contour'

    // Each contour is an irregular ellipse
    const baseSize = 60 + i * 40
    const widthVar = 0.85 + Math.sin(i * 1.3) * 0.3
    const heightVar = 0.85 + Math.cos(i * 1.7) * 0.25
    const w = baseSize * widthVar
    const h = baseSize * heightVar

    // Slight offset from center to make it feel organic
    const offsetX = Math.sin(i * 0.8) * (i * 1.5)
    const offsetY = Math.cos(i * 1.1) * (i * 1.2)

    // Irregular border-radius
    const r1 = 35 + Math.sin(i * 2.1) * 15
    const r2 = 40 + Math.cos(i * 1.7) * 18
    const r3 = 38 + Math.sin(i * 0.9) * 12
    const r4 = 42 + Math.cos(i * 2.5) * 16
    const r5 = 36 + Math.sin(i * 1.4) * 14
    const r6 = 44 + Math.cos(i * 0.6) * 13
    const r7 = 40 + Math.sin(i * 1.9) * 11
    const r8 = 38 + Math.cos(i * 2.2) * 17

    contour.style.cssText = `
      width: ${w}px;
      height: ${h}px;
      top: calc(50% - ${h / 2 - offsetY}px);
      left: calc(50% - ${w / 2 - offsetX}px);
      border-radius: ${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%;
      animation-delay: ${i * 0.08}s;
    `

    // Make one contour the accent color
    if (i === 7) {
      contour.classList.add('ui6-contour-accent')
    }

    // Vary opacity subtly
    const opacity = 0.03 + (1 - i / contourCount) * 0.05
    contour.style.borderColor = i === 7
      ? `rgba(196, 93, 62, ${opacity * 3})`
      : `rgba(255,255,255,${opacity})`

    topoContainer.appendChild(contour)
  }

  // Peak dot
  const peakDot = document.createElement('div')
  peakDot.className = 'ui6-peak-dot'
  topoContainer.appendChild(peakDot)

  root.appendChild(topoContainer)

  // Center name
  const nameContainer = document.createElement('div')
  nameContainer.className = 'ui6-name-container'

  const name = document.createElement('h1')
  name.className = 'ui6-name'
  name.textContent = 'leblanc'
  nameContainer.appendChild(name)

  const elevation = document.createElement('p')
  elevation.className = 'ui6-elevation'
  elevation.textContent = '4,810 m'
  nameContainer.appendChild(elevation)

  root.appendChild(nameContainer)

  // Coordinates
  const coords = document.createElement('div')
  coords.className = 'ui6-coords'
  coords.textContent = '47.3769° N, 8.5417° E'
  root.appendChild(coords)

  container.appendChild(root)

  return function cleanup() {
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
