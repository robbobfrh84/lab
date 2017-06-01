class componentJS {

  constructor () {
    this.events = []
  }

  newElm (component, id) {
    const importDoc = document.currentScript.ownerDocument
    let proto = Object.create(HTMLElement.prototype)
    const events = this.events
    proto.createdCallback = function() {
      const template = importDoc.querySelector(id)
      const clone = document.importNode(template.content, true)
      const root = this.createShadowRoot()
      root.appendChild(clone)
      for (const e of events) {
        let newEvent = template.content.getElementById(e.id)
        newEvent.addEventListener(e.type,
          e.method.bind(this, this), false)
      }
      this.appendChild(template.content)
    }
    document.registerElement(component, {prototype: proto})
  }

  addEvent (type, id, method) {
    // if (!this.events) this.events = [] // in constr
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

  getData (tag) {
    // this will be problematic when being used for multiple elements...
    return JSON.parse(document.getElementsByTagName(tag)[0].getAttribute('serve'))
  }

}
