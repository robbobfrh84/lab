class htmlFor {

  main (Obj, startTime = window.performance.now()) {
    var elements = document.querySelectorAll('[for]') // Grabs All tags with 'for' element
    for (let i = elements.length-1; i >= 0; i--) { // Loop through all tags with 'for' element. Needs to be in reverse cuz nested loops need to run first.
      const [ node, condition, parent ] = elements[i].getAttribute('for').split(' ') // Grab 'for' elm string, split and declare node(ind/arr or key/obj), parent is html var
      this.checkTags(Obj, elements[i], node, condition, parent)
    }
    console.log((window.performance.now() - startTime) + ' milliseconds')
  }

  checkTags (Obj, elm, node, condition, parent) {
    let tags = elm.childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
    for (const i in Obj[parent]) { // Loop through all indices/keys within the Object
      //---------
      console.log(elm, parent, i, Obj[parent][i])
      //----------
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        let tag = elm.childNodes[j]
        if (tag.contentEditable) { // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
          let textArr = this.spacing(tag.innerHTML.split(' '), node, Obj[parent][i])
          if (this.show(tag, i, Obj[parent])) { // returns bool, if we should show this tag, this.show also does the parsing for dynamic vars.
            this.newTag(elm, tag, textArr.join(' '))
          }
        }
      }
    }
    for (let i = 0; i < tags; i++) elm.removeChild(elm.childNodes[0])
  }

  newTag (parent, tag, innerHTML) {
    let child = document.createElement(tag.localName)
    child.innerHTML = innerHTML
    parent.appendChild(child)
  }

  show (tag, i, l, indices) {
    if (tag.getAttribute('indices')) indices = tag.getAttribute('indices').split(' ') // If the tag has the custom indices attribute, catch it as array here.
    if (!indices) return true // if the tag doesn't have that attr, return 1 and make it.
    for (const j of indices) {
      if (j[0] === 's') if (!(i >= parseInt(j.substr(1)))) return false // start/don't show tags until
      if (j[0] === 'e') return (i <= parseInt(j.substr(1))) // end/stop showing tags at Nth
      if (j[0] === 'x') return ((i-1) % parseInt(j.substr(1))) // skip or show every Nth times
    }
    return (indices.includes(i) || indices.includes(':'+(l.length-i-1))) // return true if indices attribute contains index or reveerse index :N order
  }

  spacing (arr, key, jVal) {
    for (const w in arr) {
      if (arr[w] === key) {
        arr[w] = jVal
        continue
      } else if (arr[w] === '-' + key + '-') {
        arr.splice(w-1, 3, arr[w-1] + jVal + arr[parseInt(w)+1])
        continue
      } else if (arr[w] === '-' + key ) {
        arr.splice(w-1, 2, arr[w-1] + jVal)
        continue
      } else if (arr[w] === key + '-') {
        arr.splice(w, 2, jVal + arr[parseInt(w)+1])
      }
    }
    return arr
  }
}

(function (){
  var Obj = {
    arr: ['1st', '2nd', '3rd'],
    arr2: ['purple', 'green', 'blue', 'orange', 'black', 'blue', 'pink', 'white'],
    arr3: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirdteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
    arr4: ['xXx', 'yYy'],
    arr5: ['nest1', 'nest2'],
    obj: {
      Country: 'Canada',
      Color: 'red',
      Language: 'English'
    }
  }
  let h1 = new htmlFor
  h1.main(Obj)
})()

/********** ToDo **********
- Objects
- double check is 'of' the correct condition, also you don't have 'in'(or whichever the other is. )
- remove global vars ... ? but why, i should understand why (closures)
- checkout the spaces function again see if it can be a switch.
- I think it's important to control the html vars in the .html page. So add that functionality.
- Clean, Note, convert more and simpler examples.
// ADD: arr.substr(index) It'll chop off first index,, not zeroth.
// ADD: string.parseInt(stringLiteralAsNumber)
**********/

/********** WHAT TO SAVE FOR LATER ? **********
- handing dynamic html tags within attributes like class or id.
**********/
