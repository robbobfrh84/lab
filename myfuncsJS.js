// get random max min.
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
x = random(20,40)

//!!! used with random(). Returns 3 0-to-255 random numbers to be used for random color.
function rgbR(){
  return 'rgb('+random(0,255)+', '+random(0,255)+', '+random(0,255)+')';
}

//Returns the base-16 equivalent 0-16777215 in base 10.
'#'+Math.floor(Math.random()*16777215).toString(16);

//shuffle an array
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;
}
y = shuffle([2,3,4,5,6,7,8,9,"j","q","k","a"]);

function ClearAllChildren(parentID){
  while (parentID.hasChildNodes()){
    parentID.removeChild(parentID.lastChild);
  }
}

//Entrie window Key events! this example uses two keys at once us ASCII for most keys pressed!
document.onkeydown = function(event) {
    event = event || window.event;
    if (event.ctrlKey && event.keyCode === 77) {
        exampleFunction();
        alert('you pressed CNTL+m')
    }
};

/*******************************************************************************
     Dynamically create complete html Tags
*******************************************************************************/
function newTag(par, tag, attr) {
  const parent = document.getElementById(par)
  const child = document.createElement(tag)
  for (const att in attr) {
    if (att === 'e') {
      child.addEventListener(attr.e[0], attr.e[1])
    } else {
      child[att] = attr[att]
    }
  }
  parent.appendChild(child)
}
/***** ^^^ EXAMPLE ^^^ *****/
// newTag(p, 'button', {
//   innerHTML: 'update/put',
//   className: 'all-right',
//   id: '2348u98fj',
//   e: ['click', (e)=>{put(v._id); console.log(Object.keys(quotes)) } ]
// })
// newTag(p, 'br') // will just add a <br>
// OR, for generic html...
// newTag(p, null, {innerHTML:'<br><p>Hello</p><hr>'})


/*******************************************************************************
    Bracket/Dot Notation return value
********************************************************************************/
getDir = (data, dir)=>{ // actual output @ (data.dot.noation).. ignor data.
  for (const p of jVar.split(/[.\[\]]/).filter(Boolean)) Obj = Obj[p]
  return Obj
}
/***** ^^^ EXAMPLE ^^^ *****/
// var data = { name: 'bob', nest: { n1: 101 } }
// getDir(data, 'name') // returns >>> bob
// getDir(data, 'nest') // return >>> { n1: 101 }
// getDir(data, 'nest.n1') //return >>> 101

/*******************************************************************************
    SVG Functions
********************************************************************************/// this function cleans up and simplifies creating element attributes./////
// this function cleans up and simplifies creating element attributes./////
function createEl(type,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    document.getElementById("mainSVG").appendChild(newObj);
  }

function updateEl(Id, att) { //function used to update any attributes with DOM.
    for (var i=0; i<att.length; i++){
      document.getElementById(Id).setAttributeNS(null, att[i][0],att[i][1]);
  }
}
