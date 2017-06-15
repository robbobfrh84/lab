class Component {

  constructor (tag, id) {
    this.events = []
    this.tag = tag
    this.id = id
    this.set = (root, data)=> { [ this.root, this.data ] = [ root, data] }
  }

  newElm (events = this.events, id = this.id, onLoad = this.onLoad, set = this.set) {
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
            set(root, JSON.parse(this.getAttribute('serve')))
            e.method()
            if (e.update) update()
          })
        }
        root.appendChild(clone)
      } else {
        set(this.shadowRoot, JSON.parse(this.getAttribute('serve')))
        if (typeof onLoad !== 'undefined') onLoad()
      }
    }
    document.registerElement(this.tag, {prototype: proto})
    return [ this.root, this.data ]
  }

  addEvent (type, id, method, update) {
    this.events.push( {'type': type, 'method': method, 'id': id, 'update': update} )
  }

}
