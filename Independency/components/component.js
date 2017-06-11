class Component {

  constructor (component, id) {
    this.events = []
    this.component = component
    this.id = id
  }

  newElm (events = this.events, id = this.id) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    proto.createdCallback = function() {
      const root = this.createShadowRoot()
      let copy = document.importNode(template.content, true)
      // let clone = copy.cloneNode(true)
      // console.log(this, root, copy)

      root.appendChild(copy)

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
