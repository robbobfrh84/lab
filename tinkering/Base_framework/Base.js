export class Base {

  AllGo(elmId) {
    if (elmId) { this.elmId = elmId }
    if (this.PreSet) { this.PreSet() }  
    if (this.Set && this.elmId) { window[this.elmId].innerHTML = this.Render() }  
  }

  Render() {
    const editedSet = this.Set()
    return editedSet.replace(/on([a-z]+)="this\.(\w+)\(\)"/gi, (match, eventName, methodName) => {
      const uniqueId = `btn_${methodName}_${Date.now()}_${Math.random().toString(36)}`
      setTimeout(() => {
        const element = document.getElementById(uniqueId)
        if (element && this[methodName]) {
          element.addEventListener(eventName.toLowerCase(), () => this[methodName]())
        }
      }, 0)
      return `id="${uniqueId}"`
    })
  }

  static Update() {
    document.querySelectorAll('data').forEach(elm=>{
      elm.innerHTML = this.GetNestedValue(Base, elm.getAttribute('name'))
    })
  }
  
  static GetNestedValue(obj, path) { // Helper method to get nested object values using string path
    const normalizedPath = path.replace(/\[([^\]]+)\]/g, '.$1').replace(/^\./, '')
    return normalizedPath.split('.').reduce((current, key) => current?.[key.replace(/^['"]|['"]$/g, '')], obj)
  }

}

