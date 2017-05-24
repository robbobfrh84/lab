// var pages = []
//
// var links = document.getElementsByTagName('link')
// // console.log('links: ', links)

class componentJS {

  constructor () {
    this.events = []
    this.id = ''
  }

  newElm (component, id) {
    var importDoc = document.currentScript.ownerDocument
    var proto = Object.create(HTMLElement.prototype)
    const events = this.events
    //
    var fileName = document.currentScript.baseURI.split('/')
    fileName = fileName[fileName.length-1]
    console.log('filename: ', fileName)
    //
    proto.createdCallback = function() {
      var template = importDoc.querySelector(id)
      var clone = document.importNode(template.content, true)
      var root = this.createShadowRoot()
      root.appendChild(clone)
      for (const event of events) {
        let newEvent = template.content.getElementById(event.id)
        newEvent.id = newEvent.id + id
        console.log(newEvent.id)
        newEvent.addEventListener(event.type, event.method.bind(this), false)
      }
      this.appendChild(template.content)
    }
    document.registerElement(component, {prototype: proto})
  }

  addEvent (type, id, method, crossComponent) {
    // if (crossComponent) {
    //
    // } else {
    //
    // }
    this.events.push({'type': type, 'method': method, 'id': id, 'cC': crossComponent})
  }

}
