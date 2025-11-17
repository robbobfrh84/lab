import { Data } from './Base.js'
import { HashPage } from './HashPage.js'
import { SiteConfig } from "./../../SiteConfig.js" // GitHub Pages testing

const componentCache = {}

export const Routing = {

  setPageRoutes: function() {
    const validPaths = SiteConfig.basePaths
    const pathSegments = window.location.pathname.split('/')
    const foundPath = validPaths.find(path => pathSegments.includes(path))
    Data.pageRoute = foundPath ? `/${foundPath}` : ''
    this.handle_page_routing()
  },

  handle_page_routing: async function() {
    HashPage.getHash()
    const pageNotFound = await this.setBasePage()
    if (pageNotFound) { 
      HashPage.setHash(Data.landingPage)
      this.handle_page_routing() // * We need to call handle_page_routing, because if a session starts and we go to a page that dosn't exist, it just clears the hash, but doesn't render the page, this is kinda an edge case, but smooths out hash / actual page inconsistancies.
    } 
  },

  setBasePage: async function() {
    const page = Data.pages.find(page => page.hash === Data.hash)  
    if (page) {
      if (!componentCache[page.hash]) {
        const module = await import(`${Data.pageRoute+page.path+page.base}.js`)
        componentCache[page.base] = module[page.base]
      }
      const PageComponent = componentCache[page.base]
      if (PageComponent) { PageComponent.Place(page.elmId) }
    } else { return true } // * Page not found
  }
  
}
