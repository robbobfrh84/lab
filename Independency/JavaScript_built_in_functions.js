/******** String Parsing *******/
arr.includes(value) // >Booloan. If the value is represented in the array.
arrStr.substr(index+) // >Arr/string. remove the index, oddly, it's not a 0th index, but first.
arr.join(' ') // >String. joins array with spaces between indices.

/******** DataTypes *******/
parseInt(stringLiteralAsNumber) // >Intiger. converts string num to intiger.
int.toString() // String. converts int to String


/******** DOM interactions *******/
document.querySelectorAll('[for]') // >Array of DOM objects with for attribute
tag.getAttribute('attribute') // >String Gets html's tag element DOM attributes.
tag.removeChild(tag.childNodes[0]) // removes first child within html's tag.
var newTag = document.createElement('html') // creats new tag
var textElm = document.createTextNode('Some text') // creates text elm
newTag.appendChild(textElm) // puts text elm inside new tag
parent.appendChild(newTag) // puts tag into DOM

/******** RegExp *******/
new RegExp(conditionArr.join('|')).test(toSearchThroughArr) // test is NOT poop in this.

/******** RegExp *******/
(function (){ console.log('will auto fire') })() // self-invoking function
