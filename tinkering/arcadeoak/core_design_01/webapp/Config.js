import { SiteConfig } from '/../SiteConfig.js'

const serveFolder = "" // * "/lab/core_design"

export const Config = {
  title: "Arcade Main",
  site: SiteConfig.site,
  tests: SiteConfig.tests || false,
  landingPage: "home",
  theme: "dark",
  pages: [
    { hash: "home",          base: "Home",          path: serveFolder+"/webapp/pages/Home/",       elmId: "bodyDiv" },
    { hash: "profile",       base: "Profile",       path: serveFolder+"/webapp/pages/Profile/",    elmId: "bodyDiv" },
    { hash: "settings",      base: "Settings",      path: serveFolder+"/webapp/pages/Settings/",   elmId: "bodyDiv" },
    { hash: "styleguide",    base: "StyleGuide",    path: serveFolder+"/webapp/pages/StyleGuide/", elmId: "bodyDiv" },
  ],
}