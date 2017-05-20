// MAKE NOTE OF RESERVED VAR NAMES
// DOM attributes
// - for
// - var
// - if
// - is-clone
// CSS
// .htmlJS-hide

class htmlJS {

  getTag (Obj, tag, elm = document.querySelectorAll('['+tag+']')) { // Grabs All tags with 'tag' element
    for (let i = elm.length-1; i >= 0; i--) { // Loop through all tags with 'for' element. Needs to be in reverse cuz nested loops need to run first.
      const tags = elm[i].childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
      const txt = elm[i].getAttribute(tag)
      switch (tag) {
        case 'var': this.varJS(Obj, elm[i], tags, txt.split(',')); break
        case 'for': this.forJS(Obj, elm[i], tags, txt.split(' ')); break
        case 'if': this.ifJS(Obj, elm[i], txt); break
      }
    }
  }

  varJS (Obj, elm, tags, arrVar) {
    for (const vLen of arrVar) {
      let [ hVar, jVar ] = vLen.split(' ').filter(Boolean)
      jVar = this.getDir(Obj, jVar)
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        const tag = elm.childNodes[j]
        if (elm.childNodes[j].contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          tag.innerHTML = this.place(tag.innerHTML.split(/[\n\ ]/), hVar, jVar).join(' ') // here's where the InnerHTML text is swapped to match JS variables.
        }
      }
    }
  }

  forJS (Obj, elm, tags, [ node, parent ], [ val, key, ind ] = node.split(',')) {
    parent = this.getDir(Obj, parent)
    for (let child of elm.querySelectorAll(':scope > [is-clone]')) {
      elm.removeChild(child) // REMOVES all cloned elements from any previously loaded Doms.
    }
    tags = elm.childNodes.length
    for (const i in parent) { // Loop through all indices/keys within the Object
      this.isInitial = true
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        const tag = elm.childNodes[j]
        if (tag.contentEditable) this.valueTypes(elm, i, tag, val, key, ind, parent) // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
      }
    }
  }

  ifJS (Obj, elm, ifVar) {
    let hide = false
    if (ifVar[0] === '!') {
      ifVar = ifVar.split('!')[1]
      if (typeof Obj[ifVar] === 'boolean'){ if (Obj[ifVar] === true) hide = true}
      else if (Obj[ifVar] && Object.keys(Obj[ifVar]).length) hide = true
    } else {
      if (!Obj[ifVar]) hide = true
      else if (typeof Obj[ifVar] === 'boolean'){ if (Obj[ifVar] === false) hide = true}
      else if (Obj[ifVar] && !Object.keys(Obj[ifVar]).length) hide = true
    }
    hide ? elm.className = 'htmlJS-hide' : elm.classList.remove('htmlJS-hide')
  }

  getDir (Obj, jVar) { // Grab 'var' elm string. html var name = JS var
    for (const p of jVar.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
    return Obj
  }

  valueTypes (elm, i, tag, val, key, ind, jVal, textArr) {
    const startArr = tag.innerHTML.split(/[\n\ ]/)
    if (val) textArr = this.place(startArr, val, jVal[i]) // here's where the InnerHTML text is swapped to match JS variables.
    if (key) textArr = this.place(startArr, key, i)
    if (ind) textArr = this.place(startArr, ind, Object.keys(jVal).indexOf(i))
    if (this.showAtIndices(tag, i, jVal)) { // returns bool, if in the HTML indices attribute declares we shouldn't show this..
      tag.className = 'htmlJS-hide'
      this.newTag(elm, tag, textArr.join(' '))
    }
  }

  place (arr, key, jVal) {
    for (const w in arr) {
      let pass = false
      if (typeof arr[w] === "object") arr[w] = JSON.stringify(arr[w]) // if var isn't a single value (meaning it's still an arr/obj) This will display the remaing data in JSON format.
      if (typeof arr[w] !== "string" || arr[w] === "") continue
      // save if there's a hyphen at the bookends to shift later.
      let r = arr[w][arr[w].length-1] === '-' ? '-' : ''
      let l = arr[w][0] === '-' ? '-' : ''
      const em = arr[w].split(/[\.\[\]]/).filter(Boolean)
      if ( em[0] && ((em[0] === key || em[0].slice(1) === key ) && em.length > 1)) {
        if (r) arr[w] = arr[w].slice(0, arr[w].length-1)
        if (l) arr[w] = arr[w].slice(1)
        arr[w] = this.getDir(jVal, arr[w].slice(2))
        if ( l || r ) pass = true
      }
      // this is where we used the left and right hyphens to shift if needed.
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

  newTag (parent, tag, innerHTML) {
    let child = tag.cloneNode(true)
    const attr = document.createAttribute('is-clone')
    attr.value = true
    child.setAttributeNode(attr)
    child.classList.remove('htmlJS-hide')
    child.innerHTML = innerHTML
    parent.appendChild(child)
  }

  update (className, data) {
    className.getTag(data, 'var')
    className.getTag(data, 'for')
    className.getTag(data, 'if')
  }

}

// create a cssStyleClass to hide and unHide elements.
(()=>{
  let style = document.createElement('style')
  style.innerHTML = '.htmlJS-hide { display: none; }'
  document.getElementsByTagName('head')[0].appendChild(style)
})()


// update = (obj)=>{
//   // console.log(obj)
//   let h = new htmlJS
//   h.updateAll(h, obj)
// }
//

// (()=>{
//   const startTime = window.performance.now()
//   let style = document.createElement('style') // create a cssStyleClass to hide and unHide elements.
//   style.innerHTML = '.htmlJS-hide { display: none; }'
//   document.getElementsByTagName('head')[0].appendChild(style)
//
//   let scripts = document.getElementsByTagName('script')
//   for (const script of scripts) {
//     const y = script.getAttribute('name')
//     if (window[y]) {
//       const data = window[y]()
//       let h = new htmlJS
//       h.updateAll(h, data)
//     }
//   }
//   console.log((window.performance.now() - startTime) + ' milliseconds')
// })()

/********** ToDo **********
- isolate like canvas.js and check canvas-bracket.js for additions/changes.
- attributes are not preserved.
- all () {
  // update all attribute cammands if/for/var ... etc...
}
- NOTES: be thorough.
- break up example and copy/paste version
  - .js file should stand alone. ie. NO object. should just handle from index.html
  - INCLUDE index.html file that ONLY gives a simple BLANK exampleObect = { key: 'value'}, and one-line example. NOTHING else. the examples will be in the EXAMPLE file.
- Ok..... maybe we should wait to see how imports is handles before adding multi page functionality.
- ONE more look through.
- move to Review.

**********/
