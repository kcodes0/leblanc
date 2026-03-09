import { musique } from './musique.js'
import { ui1 } from './uis/ui1.js'
import { ui2 } from './uis/ui2.js'
import { ui3 } from './uis/ui3.js'
import { ui4 } from './uis/ui4.js'
import { ui5 } from './uis/ui5.js'
import { ui6 } from './uis/ui6.js'
import { ui7 } from './uis/ui7.js'

const uis = { 1: ui1, 2: ui2, 3: ui3, 4: ui4, 5: ui5, 6: ui6, 7: ui7 }

let currentRoute = null
let cleanupFn = null

function renderRoute(app, route) {
  if (cleanupFn) { cleanupFn(); cleanupFn = null }

  app.innerHTML = ''
  const container = document.createElement('div')
  container.className = 'ui-container active'
  app.appendChild(container)

  if (route === null) {
    cleanupFn = musique(container) || null
  } else if (uis[route]) {
    cleanupFn = uis[route](container) || null
  }
  currentRoute = route
}

function navigateTo(route) {
  if (currentRoute === route) return
  const app = document.getElementById('app')
  if (route === null) {
    history.pushState({}, '', '/')
  } else {
    history.pushState({}, '', `/${route}`)
  }
  renderRoute(app, route)
}

function init() {
  const path = window.location.pathname
  const match = path.match(/^\/(\d)$/)
  const app = document.getElementById('app')

  if (match && uis[parseInt(match[1])]) {
    renderRoute(app, parseInt(match[1]))
  } else {
    renderRoute(app, null)
  }
}

window.addEventListener('popstate', () => {
  const path = window.location.pathname
  const match = path.match(/^\/(\d)$/)
  const app = document.getElementById('app')
  if (match && uis[parseInt(match[1])]) {
    renderRoute(app, parseInt(match[1]))
  } else {
    renderRoute(app, null)
  }
})

init()
