class htmlFor {

  main (Obj, startTime = window.performance.now()) {
    var elements = document.querySelectorAll('[for]') // Grabs All tags with 'for' element
    for (let i = elements.length-1; i >= 0; i--) { // Loop through all tags with 'for' element. Needs to be in reverse cuz nested loops need to run first.
      let [ node, parent ] = elements[i].getAttribute('for').split(' ') // Grab 'for' elm string, split and declare node(ind/arr or key/obj), parent is html var
      this.checkTags(Obj, elements[i], node, parent)
    }
    console.log((window.performance.now() - startTime) + ' milliseconds')
  }

  checkTags (Obj, elm, node, parent, [ val, key, ind ] = node.split(',')) {
    const tags = elm.childNodes.length // Snatch this value as a seperate because length of childnodes will change dynamically, creating INFINATE LOOPS OF PERIL!
    for (const i in Obj[parent]) { // Loop through all indices/keys within the Object
      for (let j = 0; j < tags; j++) { // loop through all tags within element.
        if (elm.childNodes[j].contentEditable) {
          this.valueTypes(elm, i, elm.childNodes[j], val, key, ind, Obj[parent]) // there's extra DOM stuff we dont' need, This will only duplicate tags we created.
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
      this.newTag(elm, tag, textArr.join(' '))
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

  newTag (parent, tag, innerHTML) {
    let child = document.createElement(tag.localName)
    child.innerHTML = innerHTML
    parent.appendChild(child)
  }

}

(function (){
  var Obj = {
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
    }
  }
  let h1 = new htmlFor
  h1.main(Obj)
})()

/********** ToDo **********
- Objects
  - for="k,v of obj" || for="value,key,index of obj"
  - moving forward with dynamic vars ( js="x = arr" ), we'll wanna loop
- checkout the spaces function again see if it can be a switch.
- Prob should create attirutes for forIndex='i' & forKey='k'
- declare js vars with js="Obj.arr[0]" < will be same or js="poo=Obj.arr[0]",
- ah shit. need to handle dot nodation handing... _i_.name[0]
- I think it's important to control the html vars in the .html page. So add that functionality.
- Clean, Note, convert more and simpler examples.
- !CHECK FIST & ADD: Object.keys(obj).indexOf(key)
- !CHECK FIST & ADD: Array.isArray(obj) > returns false
- create var.js > var="htmlVar == jsVar" (don't use dot n)
**********/

/********** WHAT TO SAVE FOR LATER ? **********
- handing dynamic html tags within attributes like class or id, && || innerhtml {{ poop }}. Do I want to use this same {{ poop }} for HTML_for_?
- QUESTION: (closures)- remove global vars ... ? but why, i should understand why (closures)
**********/
