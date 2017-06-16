var data = {
  newC: 'something',
  arr: [ 1, 2 ],
  landingPageTitle: 'Landing Page',
  navBarString: 'Clicked <Data> on navbar" ',
  navBarNumber: 1000000,
  important1 : { title: 'ID Card 1', name: 'Chainsaw', last: "O'plow", age: '49', height: "6"+"'"+'8'+'"' },
  important2 : { title: 'ID Card 2', name: 'Cork', last: 'McFry', age: '32', height: "6"+"'"+'1'+'"' },
  important3 : { title: 'ID Card 3', name: 'Swank', last: 'Dank', age: '24', height: "5"+"'"+'4'+'"' },
  important4 : { title: 'ID Card 4', name: 'Emily', last: 'Farty', age: '34', height: "5"+"'"+'4'+'"' }
}

class Component {

  constructor (tag, id) {
    this.events = []
    this.tag = tag
    this.id = id
    this.set = (root, data)=> { [ this.root, this.data ] = [ root, data ] }
  }

  newElm (events = this.events, id = this.id, onLoad = this.onLoad,
      set = this.set, update = this.update, that = this) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(id)
    //
    //
    proto.createdCallback = function () {
      console.log('created',that.id)
      const root = this.createShadowRoot()
      let clone = document.importNode(template.content, true)
      //
      //
      let serve = this.getAttribute('serve')
      let servedir = document.createAttribute('servedir')
      servedir.value = serve
      this.setAttributeNode(servedir)
      const newServe = update(serve)
      this.setAttribute('serve', JSON.stringify(newServe))
      console.log(serve, this.getAttribute('serve'))
      //
      //
      for (const e of events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          set(root, JSON.parse(this.getAttribute('serve')))
          e.method()
          if (e.update) updateh()
        })
      }
      root.appendChild(clone)
    }
    proto.attributeChangedCallback = function () {
      console.log('updated')
      const serve = this.getAttribute('serve')
      // update(serve)
      set(this.shadowRoot, JSON.parse(serve))
      if (typeof onLoad !== 'undefined') onLoad()
    }
    //
    //
    // proto.attributeChangedCallback = function () {
    //   if (!this.shadowRoot) {
    //     const root = this.createShadowRoot()
    //     let clone = document.importNode(template.content, true)
    //     for (const e of events) {
    //       let newEvent = clone.getElementById(e.id)
    //       newEvent.addEventListener(e.type, ()=>{
    //         set(root, JSON.parse(this.getAttribute('serve')))
    //         e.method()
    //         if (e.update) update()
    //       })
    //     }
    //     root.appendChild(clone)
    //   } else {
    //     set(this.shadowRoot, JSON.parse(this.getAttribute('serve')))
    //     if (typeof onLoad !== 'undefined') onLoad()
    //   }
    // }
    document.registerElement(this.tag, {prototype: proto})
    return [ this.root, this.data ]
  }

  addEvent (type, id, method, update) {
    this.events.push( {'type': type, 'method': method, 'id': id, 'update': update} )
  }

  update (serve) {
    let Obj = { 'data': data }
    let dir = serve
    let findServe = ()=>{
      for (const p of dir.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
      return Obj
    }
    // console.log('class update:', serve, Obj, findServe())
    return findServe()
  }

  // getDir (Obj, dir) {
  //   for (const p of dir.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
  //   return Obj
  // }

}
