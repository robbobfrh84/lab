class Component {

  constructor (component, id) {
    this.events = []
    this.component = component
    this.id = id
    // this.test = ((component)=>{ this.newElm(component) })()
  }

  newElm (events = this.events, id = this.id, onLoaded = this.onLoaded) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    proto.attributeChangedCallback = function () {
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)
      for (const e of events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          e.method(root)
        })
      }

      if (onLoaded) {
        document.addEventListener("DOMContentLoaded", ()=>{ onLoaded(root) })
      }

      root.appendChild(clone)
      // vvv !!!
      if(!document.root) document.root = []
      document.root.push(root)
      // ^^^ !!!
    }
    document.registerElement(this.component, {prototype: proto})
  }

  addEvent (type, id, method) {
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

  // onload () {
  //
  // }

  data (root) {
    return JSON.parse(root.host.attributes.serve.nodeValue)
  }

}
