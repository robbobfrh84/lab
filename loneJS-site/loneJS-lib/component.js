var _COMPONENTS_STORED_GLOBALLY = []

class Component {

  constructor (name) {
    this.tag = name
    this.id = '#' + name.split('-').splice(0,name.split('-').length-1).join('-')
    this.events = []
  }

  _NEW_ELM (that = this) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(that.id)
    that.htmlJS = new HtmlJS
    proto.createdCallback = function () {
      that.root = this.attachShadow({ mode: 'open' })
      const clone = document.importNode(template.content, true)
      that.serveDir(this)
      for (const e of that.events) {
        let newEvent = clone.getElementById(e.id)
        newEvent.addEventListener(e.type, ()=>{
          const cdata = this.hasAttribute('serve') ? this.getAttribute('served') : null
          if (cdata) that.data = JSON.parse(cdata)
          that.root = this.shadowRoot
          e.method()
          if (e.update) that.update()
        })
      }
      that.root.appendChild(clone)
    }
    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
      that.root = this.shadowRoot
      if (attrName === 'served' && this.getAttribute('served') !== 'undefined') {
        that.data = JSON.parse(this.getAttribute('served'))
        if (that._ON_SET) that._ON_SET(attrName) // THERE IS A REASON WHY THIS IS SANDWICHED!!!!
        that.htmlJS.update(that.data, that.root)
        if (that._ON_SET) that._ON_SET(attrName) // THERE IS A REASON WHY THIS IS SANDWICHED!!!!
      } else if (attrName === 'directory' && that._ON_SET && this.getAttribute('served') !== 'undefined') {
        that.directory = this.getAttribute('directory')
        that.data = JSON.parse(this.getAttribute('served'))
        that._ON_SET(attrName)
      }

    }
    if (!_POLYFILL_INCLUDED) {
      document.registerElement(that.tag, {prototype: proto})
    } else {
      window.addEventListener('WebComponentsReady', (e)=>{
        document.registerElement(that.tag, {prototype: proto})
      })
    }
  }

  _ADD_EVENT (type, id, method, update) {
    this.events.push( {'type': type, 'method': method, 'id': id, 'update': update} )
  }

  getDir (obj, dir, mDir = dir.split(' '), oObj = { '_DATA': obj }, mObj = []) {
    if (mDir.length > 1) {
      for (const i in mDir) {
        for (const p of mDir[i].split(/[.\[\]]/).filter(Boolean)) oObj = oObj[p]
        mObj.push(oObj)
        oObj = { '_DATA': obj }
      }
      oObj = mObj
    } else {
      if (dir) for (const p of dir.split(/[.\[\]]/).filter(Boolean)) oObj = oObj[p]
    }
    return oObj
  }

  update () {
    for (const component of _COMPONENTS_STORED_GLOBALLY) {
      if (component.hasAttribute('serve')) {
        const serve = component.getAttribute('serve')
        component.setAttribute('served', JSON.stringify(this.getDir(_DATA, serve)))
      }
    }
  }

  serveDir (that) {
    if (that.hasAttribute('serve')) {
      let served = document.createAttribute('served')
      served.value = JSON.stringify(this.getDir(_DATA, that.getAttribute('serve')))
      that.setAttributeNode(served)
    }
    let pageStatus = document.createAttribute('directory')
    pageStatus.value = window.location.hash.split('#')[1]
    that.setAttributeNode(pageStatus)
    _COMPONENTS_STORED_GLOBALLY.push(that)

  }

  I (id) { return this.root.getElementById(id) }

  KV (e) { return [ e.path[0].getAttribute('key'), e.path[0].getAttribute('val') ] }

}
