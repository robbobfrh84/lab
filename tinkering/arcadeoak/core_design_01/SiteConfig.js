import { Tests } from './tests/Tests.js'

const SiteConfig = {
  site: "development",
  basePaths: ['development', 'arcademain_dev', 'production'],
  firebase: {
// Removed for google security
  }
}
SiteConfig.tests = Tests

export { SiteConfig }