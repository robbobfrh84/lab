class HtmlJS {

  constructor () {
    this.jsAtts = [ 'value', 'checked', 'val', 'key', 'placeholder' ],
    this.jsBoolAtts = [ 'checked' ]
  }

  update (updateData, root) {
    this.root = root
    this.clearIf()
    this.getTag(updateData, 'var')
    this.getTag(updateData, 'for')
    this.getTag(updateData, 'if')
  }

  clearIf () {
    const elms = this.root.querySelectorAll('[if-passed]')
    for (const elm of elms) {
      elm.removeAttribute('if-passed')
    }
  }

  getTag (Obj, tag) { // Grabs All tags with 'tag' element
    const elm = this.root.querySelectorAll('['+tag+']')
    for (let i = elm.length-1; i >= 0; i--) { // Loop through all tags with 'for' element. Needs to be in reverse cuz nested loops need to run first.
      const tags = elm[i].childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
      const txt = elm[i].getAttribute(tag)
      if (tag !== 'if') {
        if (!elm[i].hasAttribute('initial-innerhtml')) {
          const attr = document.createAttribute('initial-innerhtml')
          attr.value = elm[i].innerHTML
          elm[i].setAttributeNode(attr)
        } else {
          elm[i].innerHTML = elm[i].getAttribute('initial-innerhtml')
        }
      }
      switch (tag) {
        case 'var': this.varJS(Obj, elm[i], tags, txt.split(',')); break
        case 'for': this.forJS(Obj, elm[i], tags, txt.split(' ')); break
        case 'if': this.ifJS(Obj, elm[i], txt, true); break
      }
      for (const att of this.jsBoolAtts) {
        let atts = elm[i].querySelectorAll('['+att+']')
        for (let at of atts) {
          let aVal = at.getAttribute(att)
          if (aVal === ' false ') {
            at.removeAttribute(att)
          }
        }
      }
      for (const att of this.jsAtts) {
        let atts = elm[i].querySelectorAll('['+att+']')
        for (let at of atts) {
          let str = at.getAttribute(att)
          at.setAttribute(att, str.split(/[\n\ ]/).filter(Boolean).join(' '))
        }
      }
    }
  }

  ifJS (Obj, elm, ifVar, final) { // STILL Need ClearIf()?????
    let replace = []
    let hide = false
    for (let val of ifVar.split(' ')) {

      let nVal = val.replace('c.data', '')
      if (nVal !== 'false') {
        if (nVal[0] === '!') {
          hide = this.hasDir(Obj, nVal.split('!')[1])
          // console.log('hide, nVal: ',hide, nVal)
        } else { hide = !this.hasDir(Obj, nVal) }
      }

      if (final && hide) {
        elm.style.display = 'none'
        hide = true
        break
      }

      if (!final) {
        // console.log(hide, nVal)
        if (!hide) { nVal[0] === '!' ? replace.push(val) : replace.push('false') }
        if (hide) { nVal[0] !== '!' ? replace.push(val) : replace.push('true') }

      }
    }
    if (!final) {
      elm.setAttribute('if', replace.join(' '))
      // console.log('NOT final elm:', elm)
    }
    if (final && !hide) elm.style.display = ''


    // console.log('---end---', replace)
    // if (!elm.hasAttribute('if-passed')) {
    //   let hide = ((h)=>{
    //     for (let val of ifVar.split(' ')) {
    //       //
    //       //
    //       val = val.replace('c.data', '')
    //       if (val[0] === '!') { h = this.hasDir(Obj, val.split('!')[1])
    //       } else { h = !this.hasDir(Obj, val) }
    //       if (h) return h
    //       //
    //       //
    //     }
    //     // this is where you get a true or false based on list of ifs within
    //     // var expantion....
    //     return false
    //   })()
    //   if (!hide || (hide && ifVar.split('!')[1] && ifVar.split(' ').length === 1)) {
    //     const attr = document.createAttribute('if-passed')
    //     attr.value = 'true'
    //     elm.setAttributeNode(attr)
    //   }
    //   hide ? elm.style.display = 'none' : elm.style.display = ''
    // }
  }

  varJS (Obj, elm, tags, arrVar) {
    for (const vLen of arrVar) {
      let [ val, data ] = vLen.split(' ').filter(Boolean)
      data = data.replace('c.data', '')
      data = this.getDir(Obj, data)
      if (data) this.varJSNest(Obj, elm, tags, data, val)
    }
    elm.innerHTML = elm.innerHTML.replace(/&amp;/g, "&")
  }

  varJSNest (Obj, elm, tags, data, val) {
    for (let j = 0; j < tags; j++) { // loop through all tags within element.
      const tag = elm.childNodes[j]
      if (tag.children) {
        this.varJSNest(Obj, tag, tag.childNodes.length, data, val)
      }
      if (tag.wholeText && tag.wholeText.split(/[\n\ ]/).filter(Boolean).length) {
        tag.nodeValue = this.place(tag.textContent.split(/[\n\ ]/), val, data).join(' ') // here's where the InnerHTML text is swapped to match JS variables.
      } // ^^^ takes text wrettin between tags and includes it.
      if (tag.contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
        tag.innerHTML = this.place(tag.innerHTML.split(/[\n\ ]/), val, data).join(' ') // here's where the InnerHTML text is swapped to match JS variables.
      }
      for (const att of this.jsAtts) {
        if (tag.contentEditable && tag.hasAttribute(att)) {
          let arr = tag.getAttribute(att).split(/[\n\ ]/)
          const textArr = this.valueTypes(0, [ data ], arr, val) // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          tag.setAttribute(att, textArr.join(' '))
        }
      }
    }
  }

  textNodesUnder (node) {
    var all = [];
    for (node=node.firstChild;node;node=node.nextSibling){
      if (node.nodeType==3) all.push(node);
      else all = all.concat(this.textNodesUnder(node));
    }
    return all;
  }

  forJS (Obj, elm, tags, [ node, dir ], [ val, key, ind ] = node.split(',')) {
    const data = this.getDir(Obj, dir.replace('c.data', ''))
    // data = this.getDir(Obj, data)
    // for (const att of this.jsAtts) {
    //   let atts = elm.querySelectorAll('['+att+']')
    //   for (let at of atts) {
    //     let aVal = at.getAttribute(att)
    //     if (att === 'value') console.log(aVal, atts)
    //
    //     at.setAttribute(att, " "+aVal+" ")
    //   }
    // }
    // ! ! ! !
    // Do we still need to clone node????
    // ! ! ! !
    for (let child of elm.querySelectorAll(':scope > [is-clone]')) {
      elm.removeChild(child) // REMOVES all cloned elements from any previously loaded Doms.
    }
    tags = elm.childNodes.length

    let txtNodes = this.textNodesUnder(elm)
    let txtClone = this.textNodesUnder(elm.cloneNode(true))

    let clone = elm.cloneNode(true)

    for (const i in data) { // Loop through all indices/keys within the Object
      for (const t in txtClone) {
        const txt = txtClone[t].nodeValue.split(/[\n\ ]/)
        const newText = this.valueTypes(i, data, txt, val, key, ind)
        txtNodes[t].nodeValue = newText.join(' ')
      }
      // for (const att of this.jsAtts) {
      //   console.log(clone.querySelectorAll('['+att+']')) // ONLY VALUE!!!
      //   for (let att of )
      // }
      for (const att of this.jsAtts) {
        let atts = elm.querySelectorAll('['+att+']')
        let attsClone = clone.querySelectorAll('['+att+']')
        if (atts.length > 0) {
          for (let t in attsClone) {
            if (typeof atts[t] === 'object' ) {
              let arr = attsClone[t].getAttribute(att).split(/[\n\ ]/)
              const textArr = this.valueTypes(i, data, arr, val, key, ind).join(' ')
              // console.log('att: ', att, arr, textArr)
              atts[t].setAttribute(att, textArr)
            }
          }
        }
      }

      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        const tag = elm.childNodes[j]
        if (tag.contentEditable) {

          const textArr = tag.innerHTML.split(/[\n\ ]/)
          if (this.showAtIndices(tag, i, data)) { // returns bool, if in the HTML indices attribute declares we shouldn't show this..
            this.newTag(elm, tag, textArr.join(' '), i, data, val, key, ind)
            tag.style.display = 'none'
          }
        }
        else {
          let child = tag.cloneNode(true)
          elm.appendChild(child)
          tag.nodeValue = ''
        }
      }
    }
    elm.innerHTML = elm.innerHTML.replace(/&amp;/g, "&")
  }

  valueTypes (i, data, startArr, val, key, ind, arr) {
    if (val) arr = this.place(startArr, val, data[i]) // here's where the InnerHTML/attr text is swapped to match JS variables.
    if (key) arr = this.place(startArr, key, i)
    if (ind) arr = this.place(startArr, ind, Object.keys(data).indexOf(i))
    return arr
  }

  hasDir (Obj, jVar) {
    for (const p of jVar.split(/[.\[\]]/).filter(Boolean)) {
      if (Obj[p]) {
        Obj = Obj[p]
      } else {
        return false
      }
    }
    return Obj !== 'false' ? true : false
  }

  getDir (Obj, jVar) { // Grab 'var' elm string. html var name = JS var
    // change MAY be relevant to data.js (which was copy/pasted 4 use)
    if (jVar.split(/[\.\[\]\"]/)) {
      for (const p of jVar.split(/[\.\[\]\"]/).filter(Boolean)) {
        Obj = Obj[p]
      }
    }
    return Obj
  }

  place (arr, key, jVal) {
    for (const w in arr) {
      let pass = false
      if (typeof arr[w] === "object") arr[w] = JSON.stringify(arr[w]) // if var isn't a single value (meaning it's still an arr/obj) This will display the remaing data in JSON format.
      if (typeof arr[w] !== "string" || arr[w] === "") continue
      let r = arr[w][arr[w].length-1] === '-' ? '-' : '' // save if there's a hyphen at the bookends to shift later.
      let l = arr[w][0] === '-' ? '-' : ''
      const em = arr[w].split(/[\.\-\[\]]/).filter(Boolean)
      if ( em[0] && ((em[0] === key || em[0].slice(1) === key ) && em.length > 1)) {
        if (r) arr[w] = arr[w].slice(0, arr[w].length-1)
        if (l) arr[w] = arr[w].slice(1)
        arr[w] = this.getDir(jVal, '['+em.slice(1).join('][')+']') || arr[w]
        if ( l || r ) pass = true
      } // vvv this is where we used the left and right hyphens to shift if needed.
      if (arr[w] === l+key+r || pass) {
        const j = typeof jVal === 'object' ? arr[w] : jVal
        if (!l && !r)  arr[w] = jVal
        else if (l && r) arr.splice(w-1, 3, arr[w-1] + j + arr[parseInt(w)+1])
        else if (l && !r) arr.splice(w-1, 2, arr[w-1] + j)
        else if (!l && r) arr.splice(w, 2, j + arr[parseInt(w)+1])
      }
    }
    return arr
  }

  showAtIndices (tag, i, l, indices) {
    if (!Array.isArray(l)) i = Object.keys(l).indexOf(i).toString()
    if (tag.getAttribute('indices')) indices = tag.getAttribute('indices').split(' ') // If the tag has the custom indices attribute, catch it as array here.
    if (!indices) return true // if the tag doesn't have that attr, return 1 and make it.
    for (const j of indices) {
      if (j[0] === 's') if (!(i >= parseInt(j.substr(1)))) return false // start/don't show tags until
      if (j[0] === 'e') return (i <= parseInt(j.substr(1))) // end/stop showing tags at Nth
      if (j[0] === 'x') return ((i-1) % parseInt(j.substr(1))) // skip or show every Nth times
    }
    return (indices.includes(i) || indices.includes(':'+(l.length-i-1))) // return true if indices attribute contains index or reveerse index :N order
  }

  newTag (parent, tag, innerHTML, i, ldata, val, key, ind, nest = {}) {
    let child = tag.cloneNode(true)
    const attr = document.createAttribute('is-clone')
    attr.value = true
    child.setAttributeNode(attr)
    if (child.hasAttribute('serve')){
      const dir = this.getDir(_DATA, parent.getAttribute('for').split(' ')[1])
      child.setAttribute('served', JSON.stringify(dir[i]))
    }
    nest[val] = ldata[i]
    if (child.hasAttribute('if')) {
      this.ifJS(nest, child, child.getAttribute('if'), false)
    }
    let allIfs = child.querySelectorAll('[if]')
    for (const ifs of allIfs) {
      this.ifJS(nest, ifs, ifs.getAttribute('if'), false)
    }
    // for (const att of this.jsAtts) {
    //   if (child.hasAttribute(att)) {
    //     if (att === 'value') console.log(child, att)
    //     let arr = child.getAttribute(att).split(/[\n\ ]/)
    //     const textArr = this.valueTypes(i, ldata, arr, val, key, ind)
    //   }
    // }
    parent.appendChild(child)

    child.style.display = ''
  }
}
