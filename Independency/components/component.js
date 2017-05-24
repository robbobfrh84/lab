// var pages = []
//
// var links = document.getElementsByTagName('link')
// // console.log('links: ', links)


class componentJS {

  newElm (component, id) {
    this.id = id
    const importDoc = document.currentScript.ownerDocument
    let proto = Object.create(HTMLElement.prototype)
    const events = this.events
    proto.createdCallback = function() {
      const template = importDoc.querySelector(id)
      const clone = document.importNode(template.content, true)
      const root = this.createShadowRoot()
      root.appendChild(clone)
      for (const event of events) {
        let newEvent = template.content.getElementById(event.id)
        newEvent.id = id + newEvent.id
        newEvent.addEventListener(event.type, event.method.bind(this), false)
      }
      this.appendChild(template.content)
    }
    document.registerElement(component, {prototype: proto})
  }

  addEvent (type, id, method) {
    if (!this.events) this.events = []
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

  getData (tag) {
    // this will be problematic when being used for multiple elements...
    return JSON.parse(document.getElementsByTagName(tag)[0].getAttribute('serve'))
  }

}
