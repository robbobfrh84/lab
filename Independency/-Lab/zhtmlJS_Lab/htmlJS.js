class htmlJS {

  htmlVar (Obj) {
    const elm = document.querySelectorAll('[var]') // Grabs All tags with 'var' element
    console.log(elm)
    for (let i = elm.length-1; i >= 0; i--) {
      let [ hVar, jVar ] = elm[i].getAttribute('var').split(' ') // Grab 'var' elm string. html var name = JS var
      const tags = elm[i].childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
      //
      const pVar = jVar.split(/[.\[\]]/).filter(Boolean)
      jVar = Obj
      for (const p of pVar) {
        jVar = jVar[p]
      } // ^^^ ES6 inline fuc here?
      // >>> MULIPLE vars here: we'll want to loop each
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        if (elm[i].childNodes[j].contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          const tag = elm[i].childNodes[j]
          const textArr = this.place(tag.innerHTML.split(' '), hVar, jVar) // here's where the InnerHTML text is swapped to match JS variables.
          // this.newTag(elm[i], tag, textArr.join(' '), false)
          tag.innerHTML = textArr.join(' ')
        }
      }
      // for (let ii = 0; ii < tags; ii++) elm[i].removeChild(elm[i].childNodes[0])
    }
  }

  htmlFor (Obj) {
    const elm = document.querySelectorAll('[for]') // Grabs All tags with 'for' element
    for (let i = elm.length-1; i >= 0; i--) { // Loop through all tags with 'for' element. Needs to be in reverse cuz nested loops need to run first.
      let [ node, parent ] = elm[i].getAttribute('for').split(' ') // Grab 'for' elm string, split and declare node(ind/arr or key/obj), parent is html var
      this.checkTags(Obj, elm[i], node, parent)
    }
  }

  checkTags (Obj, elm, node, parent, [ val, key, ind ] = node.split(',')) {
    const tags = elm.childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
    for (const i in Obj[parent]) { // Loop through all indices/keys within the Object
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        let tag = elm.childNodes[j]
        if (tag.contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          this.valueTypes(elm, i, tag, val, key, ind, Obj[parent])
        }
      }
    }
    for (let i = 0; i < tags; i++) elm.removeChild(elm.childNodes[0])
  }

  valueTypes(elm, i, tag, val, key, ind, jVal, textArr) {
    const startArr = tag.innerHTML.split(' ')
    if (val) textArr = this.place(startArr, val, jVal[i]) // here's where the InnerHTML text is swapped to match JS variables.
    if (key) textArr = this.place(startArr, key, i)
    if (ind) textArr = this.place(startArr, ind, Object.keys(jVal).indexOf(i))
    if (this.showAtIndices(tag, i, jVal)) { // returns bool, if in the HTML indices attribute declares we shouldn't show this..
      this.newTag(elm, tag, textArr.join(' '), true)
    }
  }

  place (arr, key, jVal) {
    for (const w in arr) {
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

  newTag (parent, tag, innerHTML, createTag) {
    // if (tag.childElementCount) {
    //   for (const childTag of tag.childNodes) {
    //     if (childTag.contentEditable) {
    //       console.log('-', tag, childTag, childTag.innerHTML)
    //       this.newTag(tag, childTag, childTag.innerHTML, createTag)
    //       tag.removeChild(tag.childNodes[0])
    //       // break
    //     }
    //   }
    // }
    // console.log(tag.childElementCount, tag, innerHTML)

    if (createTag) {
      let child = document.createElement(tag.localName)
      child.innerHTML = innerHTML
      parent.appendChild(child)
    } else {
      tag.innerHTML = innerHTML
    }
    // console.log('tag', tag)
    // parent.appendChild(tag)
    // console.log('af', tag)
    // WARNING!!!! you need to account for when there's a new ELM to create.
  }

}

(function (){
  startTime = window.performance.now()
  var html = {
    str: 'Hello Earthling!',
    str2: 'Hello Alien!',
    int: 49,
    arr: ['1st', '2nd', '3rd'],
    arr2: ['purple', 'green', 'blue', 'orange', 'black', 'blue', 'pink', 'white'],
    arr3: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
          'nine', 'ten', 'eleven', 'twelve', 'thirdteen', 'fourteen', 'fifteen',
          'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
    arr4: ['xXx', 'yYy'],
    arr5: ['nest1', 'nest2'],
    obj: {
      Name: 'Tom',
      Age: '32',
      Height: '5'+"' "+'11"'
    },
    obj2: {
      Name: 'Tom',
      Age: '32',
      Pets: {
        cats: 2,
        dogs: 1
      },
      arr: ['a', { more: 'ok'} , 'c']
    }
  }
  let h2 = new htmlJS
  h2.htmlVar(html)
  let h1 = new htmlJS
  h1.htmlFor(html)
  console.log((window.performance.now() - startTime) + ' milliseconds')
})()

/********** ToDo **********
// HOW I LEFT IT...working but pretty messy ...
// REVIEW & push to github as is!
// THEN, refactor...
// next step will be...
// adding multiple vars.
// -> then, notation INSIDE var= or for=?. Hypothetically, we could just add html to body and dot notate from there.
// ^^^ hopefully this will just be to build a function the notates through our object and call it for for=""
// -> combine functions ONLY if it make since... looks like there are a lot of redundances to include.
// reverse DOSN"T always work. We need to either go back to making it recursive, OR replicate the for/var elements.
- integrate with htmlFor
- add dot.notation handling && || bracket[notation] (_i_.name[0]) ELSE JSON print
-------
- Give attributes index="ind" key="key"
- I think it's important to control the html vars in the .html page. So add that functionality.
- Clean, Note, convert more and simpler examples.

********** WHAT TO SAVE FOR LATER ? **********
- handing dynamic html tags within attributes like class or id, && || innerhtml {{ poop }}. Do I want to use this same {{ poop }} for HTML_for_?
- QUESTION: (closures)- remove global vars ... ? but why, i should understand why (closures)
**********/
