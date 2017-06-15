class Component {

  constructor (tag, id) {
    this.events = []
    this.tag = tag
    this.id = id
    this.set = (root, data)=> { [ this.root, this.data ] = [ root, data] }
  }

  newElm (events = this.events, id = this.id, onLoaded = this.onLoaded, set = this.set) {
    console.log('---', this)
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    proto.attributeChangedCallback = function () {
      if (!this.shadowRoot) {
        const root = this.createShadowRoot()
        let clone = document.importNode(template.content, true)
        for (const e of events) {
          let newEvent = clone.getElementById(e.id)
          newEvent.addEventListener(e.type, ()=>{
            // e.method(root, JSON.parse(this.getAttribute('serve')))
            //this.data = JSON.parse(this.getAttribute('serve'))
            set(root, JSON.parse(this.getAttribute('serve')))
            e.method()
          })
        }
        // document.addEventListener("DOMContentLoaded", ()=>{
        //   const data = JSON.parse(this.getAttribute('serve'))
        //   onLoaded([ root, data ])
        // })
        root.appendChild(clone)
      } else {
        set(this.shadowRoot, JSON.parse(this.getAttribute('serve')))
        onLoaded()
      }
    }
    document.registerElement(this.tag, {prototype: proto})
    return [ this.root, this.data ]
  }

  addEvent (type, id, method) {
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

}
