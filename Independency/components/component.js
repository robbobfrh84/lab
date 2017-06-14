class Component {

  constructor (component, id) {
    this.events = []
    this.component = component
    this.id = id
  }

  newElm (events = this.events, id = this.id, onLoaded = this.onLoaded) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    proto.attributeChangedCallback = function () {
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)
      const data = JSON.parse(this.getAttribute('serve'))
      for (const e of events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          e.method(root, data)
        })
      }
      if (onLoaded) {
        document.addEventListener("DOMContentLoaded", ()=>{ onLoaded(root, data) })
      }
      root.appendChild(clone)
    }
    document.registerElement(this.component, {prototype: proto})
  }

  addEvent (type, id, method) {
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

  getData (root) {
    return JSON.parse(root.host.attributes.serve.nodeValue)
  }

}
