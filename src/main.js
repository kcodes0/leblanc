import { ui1 } from './uis/ui1.js'
import { ui2 } from './uis/ui2.js'
import { ui3 } from './uis/ui3.js'
import { ui4 } from './uis/ui4.js'
import { ui5 } from './uis/ui5.js'
import { ui6 } from './uis/ui6.js'
import { ui7 } from './uis/ui7.js'

const uis = { 1: ui1, 2: ui2, 3: ui3, 4: ui4, 5: ui5, 6: ui6, 7: ui7 }

const uiLabels = {
  1: 'portrait',
  2: 'split',
  3: 'gallery',
  4: 'cinema',
  5: 'redacted',
  6: 'topography',
  7: 'after dark'
}

let currentUI = null
let cleanupFn = null

function createNav() {
  const nav = document.createElement('div')
  nav.className = 'ui-nav'
  nav.innerHTML = `
    <button class="ui-nav-btn home-btn ${!currentUI ? 'active' : ''}" data-route="home">lb</button>
    ${[1,2,3,4,5,6,7].map(i => `
      <button class="ui-nav-btn ${currentUI === i ? 'active' : ''}" data-route="${i}" title="${uiLabels[i]}">${i}</button>
    `).join('')}
  `
  document.body.appendChild(nav)

  nav.querySelectorAll('.ui-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route
      if (route === 'home') {
        navigateTo(null)
      } else {
        navigateTo(parseInt(route))
      }
    })
  })

  return nav
}

function navigateTo(uiNum) {
  if (currentUI === uiNum) return

  if (cleanupFn) {
    cleanupFn()
    cleanupFn = null
  }

  currentUI = uiNum
  const app = document.getElementById('app')

  if (uiNum === null) {
    history.pushState({}, '', '/')
    renderSelector(app)
  } else {
    history.pushState({}, '', `/${uiNum}`)
    renderUI(app, uiNum)
  }

  document.querySelectorAll('.ui-nav-btn').forEach(btn => {
    btn.classList.remove('active')
    if (btn.dataset.route === 'home' && uiNum === null) btn.classList.add('active')
    if (btn.dataset.route === String(uiNum)) btn.classList.add('active')
  })
}

function renderSelector(app) {
  app.innerHTML = `
    <div class="selector-page">
      <div class="selector-bg"></div>
      <h1 class="selector-title">leblanc</h1>
      <p class="selector-sub">select experience</p>
      <div class="selector-grid">
        ${[1,2,3,4,5,6,7].map(i => `
          <div class="selector-card" data-ui="${i}">
            <span class="selector-card-num">${i}</span>
            <span class="selector-card-label">${uiLabels[i]}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `

  app.querySelectorAll('.selector-card').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo(parseInt(card.dataset.ui))
    })
  })
}

function renderUI(app, num) {
  app.innerHTML = ''
  const container = document.createElement('div')
  container.className = 'ui-container active'
  container.id = `ui-${num}`
  app.appendChild(container)

  const uiFn = uis[num]
  if (uiFn) {
    cleanupFn = uiFn(container) || null
  }
}

// Initial route
function init() {
  const path = window.location.pathname
  const match = path.match(/^\/(\d)$/)

  if (match && uis[parseInt(match[1])]) {
    currentUI = parseInt(match[1])
    const app = document.getElementById('app')
    renderUI(app, currentUI)
  } else {
    currentUI = null
    const app = document.getElementById('app')
    renderSelector(app)
  }

  createNav()
}

window.addEventListener('popstate', () => {
  const path = window.location.pathname
  const match = path.match(/^\/(\d)$/)
  if (match && uis[parseInt(match[1])]) {
    currentUI = parseInt(match[1])
    if (cleanupFn) { cleanupFn(); cleanupFn = null }
    renderUI(document.getElementById('app'), currentUI)
  } else {
    currentUI = null
    if (cleanupFn) { cleanupFn(); cleanupFn = null }
    renderSelector(document.getElementById('app'))
  }
  document.querySelectorAll('.ui-nav-btn').forEach(btn => {
    btn.classList.remove('active')
    if (btn.dataset.route === 'home' && currentUI === null) btn.classList.add('active')
    if (btn.dataset.route === String(currentUI)) btn.classList.add('active')
  })
})

init()
