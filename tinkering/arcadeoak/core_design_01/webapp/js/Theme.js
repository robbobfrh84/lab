import { Data } from './Base.js'

export const Theme = {

  getSetCSSVars: function() {
    const cssVars = {}
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ':root') {
          const styles = rule.style
          for (let i = 0; i < styles.length; i++) {
            const propName = styles[i]
            if (propName.startsWith('--')) {
              const propValue = styles.getPropertyValue(propName).trim()              
              cssVars[propName] = propValue
            }
          }
        }
      }
    }
    this.setTheme()
    return cssVars
  },

  setTheme: function() {
    document.body.classList.add(Data.theme+"-theme") 
    document.body.style.opacity = 1
  },

}