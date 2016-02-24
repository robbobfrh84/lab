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

//-------------------------- SVG funtions --------------------------------/
// this function cleans up and simplifies creating element attributes./////
function createEl(type,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    document.getElementById("mainSVG").appendChild(newObj);
  }
