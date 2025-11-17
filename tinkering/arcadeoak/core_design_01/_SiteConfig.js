import { Tests } from './../tests/Tests.js'

const _SiteConfig = {
  site: "development",
  basePaths: ['development', 'arcademain_dev', 'production'],
  firebase: {
    apiKey: "AIzaSyAi7RJN5i3bEHQ5tbIG24LB1MRgV3DNieM",
    authDomain: "dev-arcade-main.firebaseapp.com",
    projectId: "dev-arcade-main",
    storageBucket: "dev-arcade-main.firebasestorage.app",
    messagingSenderId: "607521377270",
    appId: "1:607521377270:web:8470c591cb0ca5f4ef95d7",
    measurementId: "G-LY0JVFG5FT"
  }
}
_SiteConfig.tests = Tests

export { _SiteConfig }