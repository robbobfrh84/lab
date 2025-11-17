import { Config } from './Config.js'
import { Data } from './js/Base.js'
import { Routing } from './js/Routing.js'
import { Theme } from './js/Theme.js'

const start = function() {
  Object.assign(Data, Config) // * Must use Object.assign or you'll get a error. It's because import values are const values and can't be reassigned directly.
  Routing.setPageRoutes()
  if (Data.tests) { Data.tests.usersAndThemes() }

  // 🏗️ This will be removed when we merge with `/development`
  if (!Data.URLParams.acdelay) { FAKE_onAuthStateChanged() }

  Data.cssVars = Theme.getSetCSSVars()
}

// 🏗️ This will be removed, as it'll be handled with `/development` default auth callback
const FAKE_onAuthStateChanged = function() {
  Data.authChecked = true
}

window.onload = () => { start() }
window.onhashchange = () => { Routing.handle_page_routing() }