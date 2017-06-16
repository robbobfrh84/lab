var data = {
  newC: 'something',
  arr: [ 1, 2 ],
  landingPageTitle: 'Landing Page',
  navBarString: 'Clicked <Data> on navbar" ',
  navBarNumber: 1000000,
  important1 : { title: 'ID Card 1', name: 'Chainsaw', last: "O'plow", age: '49', height: "6"+"'"+'8'+'"' },
  important2 : { title: 'ID Card 2', name: 'Cork', last: 'McFry', age: '32', height: "6"+"'"+'1'+'"' },
  important3 : { title: 'ID Card 3', name: 'Swank', last: 'Dank', age: '24', height: "5"+"'"+'4'+'"' }
}

var components_stored_globally = []

class Component {

  constructor (tag, id) {
    this.events = []
    this.tag = tag
    this.id = id
    this.set = (root, data)=>{ [ this.root, this.data ] = [ root, data ] }
  }

  newElm (that = this) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(that.id)
    proto.createdCallback = function () {
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)
      //
      //
      // ... lets put this in a function ...
      let serve = this.getAttribute('serve')
      let servedir = document.createAttribute('servedir')
      servedir.value = serve
      this.setAttributeNode(servedir)
      const newServe = that.getDir(data, serve)
      this.setAttribute('serve', JSON.stringify(newServe))
      components_stored_globally.push(this)
      // 
      //
      // ...vvv ... func?
      for (const e of that.events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          that.set(root, JSON.parse(this.getAttribute('serve')))
          e.method()
          if (e.update) that.update()
        })
      }
      // ...^^^... func?
      root.appendChild(clone)
    }
    proto.attributeChangedCallback = function () {
      const serve = this.getAttribute('serve')
      that.set(this.shadowRoot, JSON.parse(serve))
      if (typeof that.onLoad !== 'undefined') that.onLoad()
    }

    document.registerElement(this.tag, {prototype: proto})
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
    for (const component of components_stored_globally) {
      console.log(component)
      const serve = component.getAttribute('servedir')
      component.setAttribute('serve', JSON.stringify(this.getDir(data, serve)))
    }
  }
}
