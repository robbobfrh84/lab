// var pages = []
//
// var links = document.getElementsByTagName('link')
// // console.log('links: ', links)
var localID = '?'

class componentJS {

  // constructor () {
  //   this.localID = []
  // }

  newElm (component, id) {
    this.id = id
    //this.localID = [1]
    const importDoc = document.currentScript.ownerDocument
    let proto = Object.create(HTMLElement.prototype)
    const events = this.events
    // let componentDoc = this.componentDoc
    proto.createdCallback = function() {
      const template = importDoc.querySelector(id)
      const clone = document.importNode(template.content, true)
      const root = this.createShadowRoot()
      root.appendChild(clone)
      for (const event of events) {
        let newEvent = template.content.getElementById(event.id)
        // newEvent.id = id + newEvent.id
        newEvent.addEventListener(event.type,
          event.method.bind(this, this), false)
      }
      this.appendChild(template.content)
      // componentDoc(this)
    }
    document.registerElement(component, {prototype: proto})
  }

  componentDoc (content) {
    // console.log('componentDoc', content.getElementsByTagName('*'))
    let x = content.getElementsByTagName('*')
    console.log('----------', x)
    //if (!this.localID) this.localID = [1,2,3]

    console.log(localID)
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
