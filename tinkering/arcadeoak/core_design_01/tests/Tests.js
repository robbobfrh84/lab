import { Data } from './../webapp/js/Base.js'
import { Toolkit } from './../webapp/js/Toolkit.js'
import { Users } from './Users.js'

export const Tests = {

  usersAndThemes: function() {
    Data.URLParams = Toolkit.getURLQueryParams()
    if (Data.URLParams.user) {
      this.setUser(Users[Data.URLParams.user])
    } 
    if (Toolkit.cssClassExists(Data.URLParams.theme + "-theme")) {
      Data.theme = Data.URLParams.theme
    }    
    if (Data.URLParams.acdelay) {
      this.acDelay(Data.URLParams.acdelay)
    }
  },

  setUser: function(user) {
    if (user) { 
      Data.user = user
      if (Toolkit.cssClassExists(user.theme + "-theme")) {
        Data.theme = user.theme
      }
    } else if (Data.URLParams.user === 'rand') {
      this.getRandomUser()
    } else { 
      alert("🧐 Unknown user: "+'"'+Data.URLParams.user+'"')  
    }
  },

  acDelay: function([low, high]) {
    const delay = Toolkit.rand(parseInt(low),parseInt(high))
    setTimeout(()=>{
      Data.authChecked = true
    }, delay)
  },

  getRandomUser: function() {
    const userArr = Object.keys(Users)
    const user = userArr[Toolkit.rand(0,userArr.length-1)]
    this.setUser(Users[user])
  },

}