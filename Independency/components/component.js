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
    proto.attributeChangedCallback = function() {
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)
      for (const e of events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          e.method(root)
        })
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
    this.events.push( {'type': type, 'method': method, 'id': id} )
  }

  // setRoot (root) {
  //   console.log(root)
  //   this.root = root
  // }

  data (root) {
    // this will be problematic when being used for multiple elements...
    return JSON.parse(root.host.attributes.serve.nodeValue)
    // return JSON.parse(document.getElementsByTagName(this.component)[0].getAttribute('serve'))
  }

}
