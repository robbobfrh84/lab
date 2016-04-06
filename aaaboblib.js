// get random max min.
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
x = random(20,40)

//shuffle an array
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;
}
y = shuffle([2,3,4,5,6,7,8,9,"j","q","k","a"])

//!!! used with random(). Returns 3 0-to-255 random numbers to be used for random color.
function rgbR(){
  return [random(0,255), random(0,255), random(0,255)];
}

function ClearAllChildren(parentID){
  while (parentID.hasChildNodes()){
    parentID.removeChild(parentID.lastChild);
  }
}
//-------------------------- SVG funtions --------------------------------/
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
//----------------------------------------------------------------------------------------------------
//--------         NOTES & VALUABLE/OFTEN USED FUNCTIONS        --------------------------------------
//----------------------------------------------------------------------------------------------------

//Entrie window Key events! this example uses two keys at once us ASCII for most keys pressed!
document.onkeydown = function(event) {
    event = event || window.event;
    if (event.ctrlKey && event.keyCode === 77) {
        exampleFunction();
        alert('you pressed CNTL+m')
    }
};

//this function is used to do a manual click of another button with the neet to
//...write an onclick function in javascript. Created it after i wasnt able to get the normal
//... create funcon call onclick when it was referencing an outside lib. it was bootstrap
//... carosel. I wanted to make the carousel go to a specific side outside of their buttons
function javaManualMouseClick(elementID){
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var elementID = document.getElementById("elementID");
  allSkills.dispatchEvent(evt);
}

//----------------------------------------------------------------------------------------------------
//--------         HTML & CSS        -----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------

//swipping gradient effect I loved but didn't want to place into my portfolio....
<linearGradient id="polarGradL" x1=100% y1="0%" x2=0% y2=0%>
  <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
  <stop offset="20%" stop-color="rgba(0,0,0,0)"/>
  <stop offset="80%" stop-color="rgba(0,0,0,0)"/>
  <stop offset="100%" stop-color="rgba(255,255,255,0.5)"/>
</linearGradient>

<linearGradient id="polarGradR" x1=100% y1="0%" x2=0% y2=0%>
  <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
  <stop offset="20%" stop-color="rgba(255,255,255,0)"/>
  <stop offset="80%" stop-color="rgba(255,255,255,0)"/>
  <stop offset="100%" stop-color="rgba(255,255,255,0.5)"/>
</linearGradient>

<linearGradient id="linLR" x1=0% y1=0% x2="100%" y2=0%>
  <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
  <stop offset="100%" stop-color="rgba(0,0,0,1)"/>
</linearGradient>

<linearGradient id="linRL" x1=0% y1=0% x2="100%" y2=0%>
  <stop offset="0%" stop-color="rgba(0,0,0,1)"/>
  <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
</linearGradient>
