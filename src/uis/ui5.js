export function ui5(container) {
  // --- State ---
  let mouseX = 0.5;
  let mouseY = 0.5;
  let animId = null;
  let pulseIntervalId = null;
  const gridCells = [];

  // --- Styles ---
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ui5-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes ui5-slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes ui5-lineExpand {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    @keyframes ui5-dotPulse {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.7; }
    }

    @keyframes ui5-gridCellPulse {
      0% { opacity: 0.03; }
      50% { opacity: 0.09; }
      100% { opacity: 0.03; }
    }

    .ui5-root {
      position: relative;
      width: 100%;
      height: 100%;
      background: #0a0a0a;
      overflow: hidden;
      cursor: crosshair;
      animation: ui5-fadeIn 0.8s ease-out;
    }

    /* Layer 1: Background text grid */
    .ui5-layer1 {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      grid-auto-rows: min-content;
      align-content: start;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    .ui5-grid-cell {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: clamp(4rem, 8vw, 9rem);
      color: rgba(240, 236, 228, 0.03);
      line-height: 1;
      padding: 0.1em 0;
      text-transform: lowercase;
      letter-spacing: -0.04em;
      user-select: none;
      transition: opacity 1.5s ease;
      white-space: nowrap;
      overflow: hidden;
    }

    .ui5-grid-cell.pulse {
      animation: ui5-gridCellPulse 2s ease-in-out;
    }

    /* Layer 2: Outlined text */
    .ui5-layer2 {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      pointer-events: none;
      mix-blend-mode: exclusion;
    }

    .ui5-outlined {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(8rem, 20vw, 20rem);
      color: transparent;
      -webkit-text-stroke: 1px rgba(240, 236, 228, 0.15);
      text-transform: lowercase;
      letter-spacing: -0.04em;
      user-select: none;
      will-change: transform;
      line-height: 1;
    }

    /* Layer 3: Gradient filled text with clip mask */
    .ui5-layer3 {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      pointer-events: none;
    }

    .ui5-gradient-text {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(8rem, 20vw, 20rem);
      text-transform: lowercase;
      letter-spacing: -0.04em;
      user-select: none;
      will-change: transform;
      line-height: 1;
      background: linear-gradient(135deg, #c9a96e 0%, #d4b87a 25%, #7b6cb7 50%, #9585d0 75%, #c9a96e 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      clip-path: polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%);
    }

    /* Layer 4: Scattered details */
    .ui5-layer4 {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
    }

    .ui5-label-music {
      position: absolute;
      left: 28px;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 8px;
      text-transform: uppercase;
      color: rgba(240, 236, 228, 0.25);
      transform-origin: center center;
      animation: ui5-slideUp 1s ease-out 0.3s both;
    }

    .ui5-label-year {
      position: absolute;
      top: 40px;
      right: 40px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 4px;
      color: rgba(240, 236, 228, 0.2);
      animation: ui5-slideUp 1s ease-out 0.5s both;
    }

    .ui5-hr-container {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 20px;
      width: min(600px, 70vw);
      animation: ui5-slideUp 1s ease-out 0.7s both;
    }

    .ui5-hr-line {
      flex: 1;
      height: 1px;
      background: rgba(240, 236, 228, 0.08);
      transform-origin: left center;
      animation: ui5-lineExpand 1.2s ease-out 0.9s both;
    }

    .ui5-hr-line.right {
      transform-origin: right center;
    }

    .ui5-hr-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(240, 236, 228, 0.2);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ui5-dot-pattern {
      position: absolute;
      top: 40px;
      left: 40px;
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      width: 90px;
      animation: ui5-slideUp 1s ease-out 0.6s both;
    }

    .ui5-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgba(240, 236, 228, 0.12);
    }

    .ui5-dash-pattern {
      position: absolute;
      bottom: 160px;
      right: 40px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      animation: ui5-slideUp 1s ease-out 0.8s both;
    }

    .ui5-dash {
      height: 1px;
      background: rgba(201, 169, 110, 0.15);
    }

    /* Corner accents */
    .ui5-corner {
      position: absolute;
      width: 30px;
      height: 30px;
      border-color: rgba(240, 236, 228, 0.06);
      border-style: solid;
      border-width: 0;
    }

    .ui5-corner.tl { top: 25px; left: 25px; border-top-width: 1px; border-left-width: 1px; }
    .ui5-corner.tr { top: 25px; right: 25px; border-top-width: 1px; border-right-width: 1px; }
    .ui5-corner.bl { bottom: 25px; left: 25px; border-bottom-width: 1px; border-left-width: 1px; }
    .ui5-corner.br { bottom: 25px; right: 25px; border-bottom-width: 1px; border-right-width: 1px; }

    /* Cross marker */
    .ui5-cross {
      position: absolute;
      bottom: 55px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      animation: ui5-slideUp 1s ease-out 1s both;
    }

    .ui5-cross::before,
    .ui5-cross::after {
      content: '';
      position: absolute;
      background: rgba(240, 236, 228, 0.12);
    }

    .ui5-cross::before {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 1px;
      height: 100%;
    }

    .ui5-cross::after {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 1px;
    }

    /* Vertical text on right */
    .ui5-vert-text {
      position: absolute;
      right: 30px;
      bottom: 50%;
      transform: translateY(50%) rotate(90deg);
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: rgba(240, 236, 228, 0.1);
      transform-origin: center center;
      animation: ui5-slideUp 1s ease-out 0.4s both;
    }

    /* Coordinates display */
    .ui5-coords {
      position: absolute;
      bottom: 40px;
      left: 40px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: rgba(240, 236, 228, 0.12);
      letter-spacing: 1px;
      animation: ui5-slideUp 1s ease-out 1.1s both;
    }
  `;
  document.head.appendChild(style);

  // --- Build DOM ---
  const root = document.createElement('div');
  root.className = 'ui5-root';

  // Layer 1: Background grid
  const layer1 = document.createElement('div');
  layer1.className = 'ui5-layer1';

  const cellCount = 60;
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div');
    cell.className = 'ui5-grid-cell';
    cell.textContent = 'leblanc';
    layer1.appendChild(cell);
    gridCells.push(cell);
  }

  // Layer 2: Outlined text
  const layer2 = document.createElement('div');
  layer2.className = 'ui5-layer2';
  const outlined = document.createElement('div');
  outlined.className = 'ui5-outlined';
  outlined.textContent = 'leblanc';
  layer2.appendChild(outlined);

  // Layer 3: Gradient fill with clip
  const layer3 = document.createElement('div');
  layer3.className = 'ui5-layer3';
  const gradientText = document.createElement('div');
  gradientText.className = 'ui5-gradient-text';
  gradientText.textContent = 'leblanc';
  layer3.appendChild(gradientText);

  // Layer 4: Details
  const layer4 = document.createElement('div');
  layer4.className = 'ui5-layer4';

  // Music label
  const musicLabel = document.createElement('div');
  musicLabel.className = 'ui5-label-music';
  musicLabel.textContent = 'music';
  layer4.appendChild(musicLabel);

  // Year label
  const yearLabel = document.createElement('div');
  yearLabel.className = 'ui5-label-year';
  yearLabel.textContent = '2024';
  layer4.appendChild(yearLabel);

  // Horizontal rule with vol. 1
  const hrContainer = document.createElement('div');
  hrContainer.className = 'ui5-hr-container';
  hrContainer.innerHTML = `
    <div class="ui5-hr-line"></div>
    <span class="ui5-hr-label">vol. 1</span>
    <div class="ui5-hr-line right"></div>
  `;
  layer4.appendChild(hrContainer);

  // Dot pattern (top left)
  const dotPattern = document.createElement('div');
  dotPattern.className = 'ui5-dot-pattern';
  for (let i = 0; i < 24; i++) {
    const dot = document.createElement('div');
    dot.className = 'ui5-dot';
    if (i % 3 === 0) {
      dot.style.width = '8px';
      dot.style.height = '1px';
      dot.style.borderRadius = '0';
    }
    dotPattern.appendChild(dot);
  }
  layer4.appendChild(dotPattern);

  // Dash pattern (bottom right)
  const dashPattern = document.createElement('div');
  dashPattern.className = 'ui5-dash-pattern';
  const dashWidths = [24, 16, 32, 8, 20, 12, 28, 6, 18, 14];
  dashWidths.forEach(w => {
    const dash = document.createElement('div');
    dash.className = 'ui5-dash';
    dash.style.width = w + 'px';
    dash.style.alignSelf = 'flex-end';
    dashPattern.appendChild(dash);
  });
  layer4.appendChild(dashPattern);

  // Corner accents
  ['tl', 'tr', 'bl', 'br'].forEach(pos => {
    const corner = document.createElement('div');
    corner.className = `ui5-corner ${pos}`;
    layer4.appendChild(corner);
  });

  // Cross marker
  const cross = document.createElement('div');
  cross.className = 'ui5-cross';
  layer4.appendChild(cross);

  // Vertical text
  const vertText = document.createElement('div');
  vertText.className = 'ui5-vert-text';
  vertText.textContent = 'artist';
  layer4.appendChild(vertText);

  // Coordinates display
  const coords = document.createElement('div');
  coords.className = 'ui5-coords';
  coords.textContent = '0.500 / 0.500';
  layer4.appendChild(coords);

  // Assemble
  root.appendChild(layer1);
  root.appendChild(layer2);
  root.appendChild(layer3);
  root.appendChild(layer4);
  container.appendChild(root);

  // --- Interactions ---
  function onMouseMove(e) {
    const rect = root.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  }

  root.addEventListener('mousemove', onMouseMove);

  // Animation loop
  let currentL2X = 0, currentL2Y = 0;
  let currentL3X = 0, currentL3Y = 0;
  let currentGradX = 50, currentGradY = 50;
  let currentClipOffset = 45;

  function animate() {
    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;

    // Layer 2: offset opposite to mouse
    const targetL2X = -centerX * 12;
    const targetL2Y = -centerY * 8;
    currentL2X += (targetL2X - currentL2X) * 0.06;
    currentL2Y += (targetL2Y - currentL2Y) * 0.06;
    outlined.style.transform = `translate(${currentL2X}px, ${currentL2Y}px)`;

    // Layer 3: offset toward mouse, creating divergence with Layer 2
    const targetL3X = centerX * 18 + 8;
    const targetL3Y = centerY * 12 + 5;
    currentL3X += (targetL3X - currentL3X) * 0.06;
    currentL3Y += (targetL3Y - currentL3Y) * 0.06;
    gradientText.style.transform = `translate(${currentL3X}px, ${currentL3Y}px)`;

    // Gradient position follows mouse
    const targetGradX = mouseX * 100;
    const targetGradY = mouseY * 100;
    currentGradX += (targetGradX - currentGradX) * 0.04;
    currentGradY += (targetGradY - currentGradY) * 0.04;
    gradientText.style.backgroundPosition = `${currentGradX}% ${currentGradY}%`;

    // Clip path adjusts with mouse
    const targetClipOffset = 35 + mouseX * 20;
    currentClipOffset += (targetClipOffset - currentClipOffset) * 0.05;
    gradientText.style.clipPath = `polygon(${currentClipOffset}% 0%, 100% 0%, 100% 100%, ${currentClipOffset + 10}% 100%)`;

    // Update coordinates display
    coords.textContent = `${mouseX.toFixed(3)} / ${mouseY.toFixed(3)}`;

    animId = requestAnimationFrame(animate);
  }

  animId = requestAnimationFrame(animate);

  // Grid cell random pulse
  function startPulse() {
    pulseIntervalId = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * gridCells.length);
        const cell = gridCells[idx];
        cell.classList.add('pulse');
        setTimeout(() => {
          cell.classList.remove('pulse');
        }, 2000);
      }
    }, 600);
  }

  startPulse();

  // --- Cleanup ---
  return function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    if (pulseIntervalId) clearInterval(pulseIntervalId);
    root.removeEventListener('mousemove', onMouseMove);
    style.remove();
    container.innerHTML = '';
  };
}
