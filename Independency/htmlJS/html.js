
class htmlJS {

  getTag (Obj, tag, elm = document.querySelectorAll('['+tag+']')) { // Grabs All tags with 'for' element
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
          tag.innerHTML = this.place(tag.innerHTML.split(' '), hVar, jVar).join(' ') // here's where the InnerHTML text is swapped to match JS variables.
        }
      }
    }
  }

  forJS (Obj, elm, tags, [ node, parent ], [ val, key, ind ] = node.split(',')) {
    parent = this.getDir(Obj, parent)
    for (const i in parent) { // Loop through all indices/keys within the Object
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        const tag = elm.childNodes[j]
        if (tag.contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          this.valueTypes(elm, i, tag, val, key, ind, parent)
        }
      }
    }
    for (let i = 0; i < tags; i++) elm.removeChild(elm.childNodes[0])
  }

  ifJS (Obj, elm, ifVar) {
    if (ifVar[0] === '!') {
      ifVar = ifVar.split('!')[1]
      if (typeof Obj[ifVar] === 'boolean'){ if (Obj[ifVar] === true) elm.remove()}
      else if (Obj[ifVar] && Object.keys(Obj[ifVar]).length) elm.remove()
    } else {
      if (!Obj[ifVar]) elm.remove()
      else if (typeof Obj[ifVar] === 'boolean'){ if (Obj[ifVar] === false) elm.remove()}
      else if (Obj[ifVar] && !Object.keys(Obj[ifVar]).length) elm.remove()
    }
  }

  getDir (Obj, jVar) { // Grab 'var' elm string. html var name = JS var
    for (const p of jVar.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
    return Obj
  }

  valueTypes (elm, i, tag, val, key, ind, jVal, textArr) {
    const startArr = tag.innerHTML.split(' ')
    if (val) textArr = this.place(startArr, val, jVal[i]) // here's where the InnerHTML text is swapped to match JS variables.
    if (key) textArr = this.place(startArr, key, i)
    if (ind) textArr = this.place(startArr, ind, Object.keys(jVal).indexOf(i))
    if (this.showAtIndices(tag, i, jVal)) { // returns bool, if in the HTML indices attribute declares we shouldn't show this..
      this.newTag(elm, tag, textArr.join(' '))
    }
  }

  place (arr, key, jVal) {
    for (let w in arr) {
      if (typeof arr[w] === "object") arr[w] = JSON.stringify(arr[w]) // if var isn't a single value (meaning it's still an arr/obj) This will display the remaing data in JSON format.
      const em = arr[w].split(/[.\[\]]/).filter(Boolean)
      if (em[0] === key && em.length > 1) arr[w] = this.getDir(jVal, arr[w].slice(2))
      if (arr[w] === key) {
        arr[w] = jVal; continue
      } else if (arr[w] === '-' + key + '-') {
        arr.splice(w-1, 3, arr[w-1] + jVal + arr[parseInt(w)+1]); continue
      } else if (arr[w] === '-' + key ) {
        arr.splice(w-1, 2, arr[w-1] + jVal); continue
      } else if (arr[w] === key + '-') {
        arr.splice(w, 2, jVal + arr[parseInt(w)+1])
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
    let child = document.createElement(tag.localName)
    child.innerHTML = innerHTML
    parent.appendChild(child)
  }

  update(){
    console.log('update')
  }

}

(function () {
  const startTime = window.performance.now()
  // let scripts = document.getElementsByTagName('script')
  // for (const script of scripts) {
  //   const y = script.getAttribute('name')
  //   if (window[y]) {
  //     let hH = new htmlJS
  //     hH.getTag(window[y](), 'var')
  //     hH.getTag(window[y](), 'for')
  //     hH.getTag(window[y](), 'if')
  //   }
  // }
  console.log((window.performance.now() - startTime) + ' milliseconds')
})()

update = ()=>{
  let scripts = document.getElementsByTagName('script')
  for (const script of scripts) {
    const y = script.getAttribute('name')
    if (window[y]) {
      let hH = new htmlJS
      hH.getTag(window[y](), 'var')
      hH.getTag(window[y](), 'for')
      hH.getTag(window[y](), 'if')
    }
  }
}

/********** ToDo **********
- isolate like canvas.js and check canvas-bracket.js for additions/changes.
- change name to html.js
- NOTES: be thorough.
- break up example and copy/paste version
  - .js file should stand alone. ie. NO object. should just handle from index.html
  - INCLUDE index.html file that ONLY gives a simple BLANK exampleObect = { key: 'value'}, and one-line example. NOTHING else. the examples will be in the EXAMPLE file.
- Ok..... maybe we should wait to see how imports is handles before adding multi page functionality.
- ONE more look through.
- move to Review.

**********/
