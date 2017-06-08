/******************* TO ADD ***********************
- easy raw innerhtml
**************************************************/


/*******************************************************************************
     Dynamically create complete html Tags
*******************************************************************************/
onDOMContentLoaded = (()=>{ callSomeFunction() })()


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
