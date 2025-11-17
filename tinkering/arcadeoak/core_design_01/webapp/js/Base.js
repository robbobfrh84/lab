class Base {

  Place(elmId, options = {}) {
    if (this.PreSet) { this.PreSet(options) }       /* 🚦 */
    if (this.Set) { this.IdSet(elmId, options) }    /* 🧩 */ 
    if (this.Events)  { this.Events(options) }      /* 🎪 */
    if (this.LastCall) { this.LastCall(options) }   /* 🔔 */ 
  }

  Embed(options = {}) {
    if (this.PreSet) { this.PreSet(options) }       /* 🚦 */
    setTimeout(() => { 
      if (this.Events)  { this.Events(options) }    /* 🎪 */
      if (this.LastCall) { this.LastCall(options) } /* 🔔 */ 
    }, 0)
    return this.Set(options)                        /* 🧩 */
  }

  IdSet(elmId, options = {}) { 
    window[elmId].innerHTML = this.Set(options)    
  }

}

const Data = {}

export { Base, Data }