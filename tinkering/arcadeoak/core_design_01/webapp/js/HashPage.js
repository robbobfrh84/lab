import { Data } from './Base.js'

export const HashPage = { 
  
  getHash: () => {
    Data.hash = window.location.hash.slice(1).toLowerCase()
    HashPage.setHash(Data.hash)
    if (Data.hash === "") { Data.hash = Data.landingPage.toLowerCase() }
  },

  setHash: (hash) => {
    if (hash === Data.landingPage) {
      const urlWithoutHash = window.location.href.split('#')[0]
      Data.hash = Data.landingPage
      history.replaceState(null, '', urlWithoutHash)
    } else {
      window.location.hash = hash.toLowerCase()
    }
  }

}