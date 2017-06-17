class Component {

  constructor (componentData) {
    [ this.tag, this.id ] = componentData
    this.events = []
  }

  newElm (that = this) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(that.id)
    proto.createdCallback = function () {
      const root = this.attachShadow({ mode: 'open' })
      let clone = document.importNode(template.content, true)
      that.serveDir(this)
      for (const e of that.events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          [ that.root, that.data ] = [ root, JSON.parse(this.getAttribute('serve')) ]
          e.method()
          if (e.update) that.update()
        })
      }
      console.log('clone',clone)
      root.appendChild(clone)
    }

    proto.attributeChangedCallback = function () {
      [ that.root, that.data ]=[this.shadowRoot, JSON.parse(this.getAttribute('serve'))]
      if (typeof that.onLoad !== 'undefined') that.onLoad()
    }
    // document.registerElement(that.tag, {prototype: proto})

    if (!polyFillIncluded) {
      document.registerElement(that.tag, {prototype: proto})
    } else {
      window.addEventListener('WebComponentsReady', function(e) {
        document.registerElement(that.tag, {prototype: proto})
      })
    }

    return [ this.root, this.data ]
  }

  addEvent (type, id, method, update) {
    this.events.push( {'type': type, 'method': method, 'id': id, 'update': update} )
  }

  getDir (Obj, dir) {
    Obj = { 'data': Obj }
    for (const p of dir.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
    return Obj
  }

  update () {
    for (const component of componentsStoredGlobally) {
      const serve = component.getAttribute('servedir')
      component.setAttribute('serve', JSON.stringify(this.getDir(data, serve)))
    }
  }

  serveDir (that, servedir = document.createAttribute('servedir')) {
    const serve = that.getAttribute('serve')
    servedir.value = that.getAttribute('serve')
    that.setAttributeNode(servedir)
    that.setAttribute('serve', JSON.stringify(this.getDir(data, serve)))
    componentsStoredGlobally.push(that)
  }
}

var componentsStoredGlobally = []
var polyFillIncluded = false

;(()=>{
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {

    console.log('all good!!!')
  } else {
    polyFillIncluded = true
    console.log('not good!!!')
    var e = document.createElement('script');
    e.src = 'bower_components/webcomponentsjs/webcomponents-lite.js';
    // document.body.appendChild(e);
    document.getElementsByTagName('head')[0].appendChild(e);
    var e2 = document.createElement('script');
    e2.src = 'bower_components/document-register-element/build/document-register-element.js';
    // document.body.appendChild(e2);
    document.getElementsByTagName('head')[0].appendChild(e2);

  }
})()
