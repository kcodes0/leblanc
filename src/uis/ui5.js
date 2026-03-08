export function ui5(container) {
  // UI 5 — "Redacted"
  // White background, massive text with redaction bars, classified document aesthetic.

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ui5-fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes ui5-slideIn {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes ui5-stampSlam {
      0% { opacity: 0; transform: rotate(-12deg) scale(2.5); }
      60% { opacity: 0.7; transform: rotate(-12deg) scale(0.95); }
      80% { opacity: 0.6; transform: rotate(-12deg) scale(1.02); }
      100% { opacity: 0.5; transform: rotate(-12deg) scale(1); }
    }

    .ui5-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #f8f6f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      box-sizing: border-box;
    }

    .ui5-main-text {
      position: relative;
      display: inline-block;
      opacity: 0;
      animation: ui5-fadeIn 1s 0.3s ease-out forwards;
    }

    .ui5-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(5rem, 14vw, 14rem);
      color: #0a0a0a;
      letter-spacing: -0.02em;
      text-transform: lowercase;
      margin: 0;
      line-height: 1;
      position: relative;
    }

    .ui5-redact-bar {
      position: absolute;
      background: #0a0a0a;
      z-index: 5;
    }

    /* Redaction bars over parts of the title */
    .ui5-redact-1 {
      top: 15%;
      left: 18%;
      width: 22%;
      height: 35%;
    }

    .ui5-redact-2 {
      top: 30%;
      left: 55%;
      width: 18%;
      height: 30%;
    }

    .ui5-redact-3 {
      top: 50%;
      left: 75%;
      width: 15%;
      height: 28%;
    }

    .ui5-body {
      margin-top: 48px;
      max-width: 500px;
      width: 100%;
      opacity: 0;
      animation: ui5-slideIn 1s 0.8s ease-out forwards;
    }

    .ui5-body-line {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      height: 16px;
    }

    .ui5-body-block {
      display: inline-block;
      height: 12px;
      background: #0a0a0a;
      border-radius: 1px;
    }

    .ui5-body-word {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 400;
      font-size: 12px;
      color: #333;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .ui5-stamp {
      position: absolute;
      top: 60px;
      right: 60px;
      border: 3px solid #c0392b;
      border-radius: 4px;
      padding: 8px 18px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 14px;
      color: #c0392b;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      opacity: 0;
      transform: rotate(-12deg) scale(2.5);
      animation: ui5-stampSlam 0.6s 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .ui5-footer {
      position: absolute;
      bottom: 40px;
      left: 48px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      font-size: 9px;
      color: rgba(0,0,0,0.2);
      letter-spacing: 0.2em;
      opacity: 0;
      animation: ui5-fadeIn 1s 2.5s ease-out forwards;
    }
  `
  document.head.appendChild(style)

  container.innerHTML = ''
  const root = document.createElement('div')
  root.className = 'ui5-root'

  // Main title with redaction bars
  const mainText = document.createElement('div')
  mainText.className = 'ui5-main-text'

  const title = document.createElement('h1')
  title.className = 'ui5-title'
  title.textContent = 'leblanc'
  mainText.appendChild(title)

  // Redaction bars over parts of the letters
  for (let i = 1; i <= 3; i++) {
    const bar = document.createElement('div')
    bar.className = `ui5-redact-bar ui5-redact-${i}`
    mainText.appendChild(bar)
  }

  root.appendChild(mainText)

  // Body lines — mostly redacted, a few visible words
  const body = document.createElement('div')
  body.className = 'ui5-body'

  const lines = [
    [{ type: 'block', width: 80 }, { type: 'word', text: 'music' }, { type: 'block', width: 120 }, { type: 'block', width: 60 }],
    [{ type: 'block', width: 150 }, { type: 'block', width: 90 }, { type: 'block', width: 40 }],
    [{ type: 'block', width: 60 }, { type: 'word', text: 'silence' }, { type: 'block', width: 100 }],
    [{ type: 'block', width: 110 }, { type: 'block', width: 70 }, { type: 'block', width: 50 }, { type: 'block', width: 30 }],
    [{ type: 'block', width: 40 }, { type: 'block', width: 130 }, { type: 'word', text: 'between' }, { type: 'block', width: 45 }],
    [{ type: 'block', width: 90 }, { type: 'block', width: 60 }, { type: 'block', width: 80 }],
  ]

  lines.forEach(lineData => {
    const line = document.createElement('div')
    line.className = 'ui5-body-line'

    lineData.forEach(item => {
      if (item.type === 'block') {
        const block = document.createElement('span')
        block.className = 'ui5-body-block'
        block.style.width = item.width + 'px'
        line.appendChild(block)
      } else {
        const word = document.createElement('span')
        word.className = 'ui5-body-word'
        word.textContent = item.text
        line.appendChild(word)
      }
    })

    body.appendChild(line)
  })

  root.appendChild(body)

  // Classified stamp
  const stamp = document.createElement('div')
  stamp.className = 'ui5-stamp'
  stamp.textContent = 'classified'
  root.appendChild(stamp)

  // Footer
  const footer = document.createElement('div')
  footer.className = 'ui5-footer'
  footer.textContent = 'document 001 — restricted'
  root.appendChild(footer)

  container.appendChild(root)

  return function cleanup() {
    if (style.parentNode) style.parentNode.removeChild(style)
    container.innerHTML = ''
  }
}
