export const Toolkit = {

  rand: (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  formatTimestamp(timestamp) {
    if (!timestamp) return 'Not available'    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  getURLQueryParams: function() {
    const urlParams = new URLSearchParams(window.location.search)
    const params = {}
    for (const [key, value] of urlParams) {
      if (value.includes(',')) {
        params[key] = value.split(',').map(item => item.trim())
      } else {
        params[key] = value
      }
    }
    return params
  },

  cssClassExists: function(className) {
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('.' + className)) {
          return true
        }
      } 
    }
    return false
  },

  objValueReplace: function(updatesObj, mainObj) {
    Object.keys(updatesObj).forEach(key => {
      if (mainObj.hasOwnProperty(key)) {
        updatesObj[key] = mainObj[key]
      }
    })
  },
  
}