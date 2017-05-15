/******** String/Arr Parsing *******/
arr.includes(value) // >Booloan. If the value is represented in the array.
str.substr(index+) // >string. custs string at the index. returns 2nd half, str dosn't change., oddly, it's not a 0th index, but first.
arr.splice(i, 1) // removes index at i. the second param tells how many additional beyond.
arr.indexOf(value) // >Integer. can even be entire object in array!
arr.join(' ') // >String. joins array with spaces between indices.
str.split('-') // >Arr. Splits str at -
str.split(/[.\[\]]/) // >Arr removes . [ ]
"Obj.str2[1].more".split(/[.\[\]]/).filter(Boolean) // >Arr removes . [ ] But! with this string it'll leave a dead "", the filter removes that.
JSON.parse(data) // > Object from string of data.

/******** DataTypes (changing / descovering)*******/
parseInt(stringLiteralAsNumber) // >Intiger. converts string num to intiger.
int.toString() // >String. converts int to String
Array.isArray(obj) // >Bool. wheather or not it's an array or Object. WHY NOT? typeOf, because Arr & Obj both return as Obj's

/******** Objects *******/
Object.keys(obj) // >array of keys
Object.keys(obj).indexOf('key') // >Intiger. find the index of a key within an object.

/******** DOM interactions *******/
document.querySelectorAll('[for]') // >Array of DOM objects with for attribute
tag.getAttribute('attribute') // >String Gets html's tag element DOM attributes.
tag.Some_Attribue = 'value' // many html attributes can be added dot.notation.style
tag.removeChild(tag.childNodes[0]) // removes first child within html's tag.
while (tag.hasChildNodes()) { tag.removeChild(tag.lastChild) } // remove ALL children
var newTag = document.createElement('html') // creats new tag
var textElm = document.createTextNode('Some text') // creates text elm
newTag.appendChild(textElm) // puts text elm inside new tag
parent.appendChild(newTag) // puts tag into DOM
onDOMContentLoaded = ( => { console.log("Dom is ready!") })() // odd i know. but will fire when dom is completely loaded.

/******** RegExp *******/
new RegExp(aBunchOfcharsArr.join('|')).test(toSearchThroughArr) // >Bool if ALL conditions are met. test() is NOT poop in this.

/******** quick functions *******/
(function (){ console.log('will auto fire') })() // self-invoking function
ES6 (()=>{ console.log('will auto fire') })() // self-invoking function

/******** events *******/
Event Listener Types = [ click, keyup, keydown, keypress ]
inputId.addEventListener("keypress", function (e) { if (e.keyCode == 13) { ?? }}
inputId.addEventListener("keypress", function (e) { if (e.keyCode == 13) { ?? }}) // ??=add stuff to do when "enter" is pressed while filling out input tag.

/******** loops *******/
array.forEach(function(value, i) { console.log(value, i) }) // value is object/array/var, whatever of ARRAY, i is index

/******** time *******/
const startTime = window.performance.now()
console.log((window.performance.now() - startTime) + ' milliseconds')
OR window.date.now()
