// var pages = []
//
// var links = document.getElementsByTagName('link')
// // console.log('links: ', links)

class componentJS {

  newElm () {
    var importDoc = document.currentScript.ownerDocument
    var proto = Object.create(HTMLElement.prototype)
    proto.createdCallback = function() {
      var template = importDoc.querySelector('#landing-id')
      var clone = document.importNode(template.content, true)
      var root = this.createShadowRoot()
      root.appendChild(clone)
      var infoButton = template.content.getElementById('infoButton')
      infoButton.addEventListener('click', important.bind(this), false)
      this.appendChild(template.content)
    }
    document.registerElement('landing-tag', {prototype: proto})

  }



}
