// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
$(document).ready(function(){
  getIdeas();
});

function getIdeas(){
  $.get('/ideas', function(data){
    console.log('1) data:', data);
    renderData(data);
  });
}

function renderData(data){
  for (var i = 0; i < data.length; i++) {
    var body = document.getElementsByTagName('body')[0]
    // ^^^ move to func...
    newTag(body, 'li', '<span><input value="' + data[i].idea + '"/>'
      + '&nbsp <button> edit </button>'
      + '&nbsp <button class="delete"> delete </button>'
      + '</span>')
  }
}

function newTag (parent, tag, innerHTML) {
  // if text??? else  vvv
  let child = document.createElement(tag)
  child.innerHTML = innerHTML
  parent.appendChild(child)
}


/***** NOTE(s) *****
- convert all to vanella JS
- make input only input when you click 'edit', make edit turn to save.
- make dated actually changed on B.E.
- add removedata() & remove data on backend

- CREATE BASIC add/remove childed functions to myFuncs
- Create snippits file
  - Can i have 2x snippits
  - maybe just double up on having my own independencny snippits that I copy and paste into real snippits.
- bobf-...
- bobt-...

*****/
