import { Tests } from './../tests/Tests.js'

const _SiteConfig = {
  site: "development",
  basePaths: ['development', 'arcademain_dev', 'production'],
  firebase: {
// Removed for google security
  }
}
_SiteConfig.tests = Tests

export { _SiteConfig }