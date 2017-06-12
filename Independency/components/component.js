class Component {

  constructor (component, id) {
    this.events = []
    this.component = component
    this.id = id
    this.content = {}
  }

  newElm (events = this.events, id = this.id) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    // this.content = template.content
    proto.attributeChangedCallback = function() {
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)

      this.content = clone
      console.log('-', clone.getElementById('title'))

      for (const e of events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type,
          e.method.bind(this, root), false)
          // e.method.bind(this), false)
          // e.method.bind(this, this), false)
      }
      root.appendChild(clone)
      // this.appendChild(clone)
      // this.appendChild(template.content)

      // root.appendChild(clone)
      // for (const e of events) {
      //   let newEvent = template.content.getElementById(e.id)
      //   newEvent.addEventListener(e.type,
      //     e.method.bind(this), false)
      //     //e.method.bind(this), this), false)
      // }
      // this.appendChild(template.content)

    }
    document.registerElement(this.component, {prototype: proto})
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
