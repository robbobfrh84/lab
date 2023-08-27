var svgElement = "http://www.w3.org/2000/svg";
var outa=[]; var out = 58; //30-to-86(inside), middle = 58. Location inside/outside of track.
var hgt = 5; //represneds the 3D height of object.
var units = 36; // number of units and shaddows on upload.
var gapa=[]; var gap = (365/units); //creates even spaces between units.

for (var i=0; i<units; i++){
  outa[i] = random(30,86);
  gapa[i] = i*gap;
  createEl("circle",[["id","unitS"+i],["cx",250+hgt],["cy",outa[i]+hgt],["r",8],["opacity",0.5]
    ,["filter","url(#blur1)"],["transform","rotate("+gapa[i]+","+(250+hgt)+","+(220+hgt)+")"]]);
}
for (var i=0; i<units; i++){
  createEl("circle",[["id","unit"+i],["cx",250],["cy",outa[i]],["r",8]
    ,["fill","url(#grad"+(random(1,6))+")"],["transform","rotate("+gapa[i]+",250,220)"]]);
}
// this function cleans up and simplifies creating element attributes./////////
function createEl(type,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    document.getElementById("mainSVG").appendChild(newObj);
  }
//Time Control/////////////////////////////////////////////////////////////////
var deg=0;
var pause = false;
(function draw() {
  if (!pause){
    locUpdate("unitS",hgt,deg); locUpdate("unit",0,deg);
  }
  deg+=0.5;
  if(true){ setTimeout(draw, 50); }})(); // Redraw
//Updates all Unit Locations
function locUpdate(Id,hgt,deg) {
  for (var i=0; i<units; i++){
    document.getElementById(Id+i).setAttributeNS(null,"transform"
      ,"rotate("+(deg+gapa[i])+","+(250+hgt)+","+(220+hgt)+")");
} }
//Random generating functions...///////////////////////////////////////////////
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);}
function shuffle(o){
    for(var j,x,i = o.length; i; j=Math.floor(Math.random()*i), x=o[--i], o[i] = o[j], o[j] = x);
    return o;}

///////////////////////////////////////////////////////////////////////////////
// IN GAME ACTION /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var team = []; var goalkey; var g=[]; var gg=[];
function newGame(){
  if (pause === false) {
    key = goalGroup();
    var gcnt = 0; var cnt = 0; // pause = true;
    var reg = shuffle([0,72,144,216,288]);
    clearAllUnits("unit",units); clearAllUnits("unitS",units);
    for (var j=0; j<5; j++){
      team[j] = random(1,6);
      var g = getGroup(team[j],reg,j);
      for (var i=0; i<team[j]; i++) {
        gapa[i+gcnt] = g[cnt][0];
        updateEl("unitS"+(i+gcnt),[["cy",g[cnt][1]+hgt],["display","normal"]
          ,["transform","rotate("+(g[cnt][0]+deg)+","+(250+hgt)+","+(220+hgt)+")"]]);
        updateEl("unit"+(i+gcnt),[["fill","url(#grad"+(team[j])+")"],["display","normal"]
          ,["cy",g[cnt][1]],["transform","rotate("+(g[cnt][0]+deg)+",250,220)"]]);
        cnt+=1;
      }
    gcnt += cnt; cnt = 0;
    document.getElementById('gameNotes').innerHTML=team+"(Goal: "+key+")";
    }
  } else { pause = false; }
}
function updateEl(Id, att) { //function used to update any attributes with DOM.
  for (var i=0; i<att.length; i++){
    document.getElementById(Id).setAttributeNS(null, att[i][0],att[i][1]);
} }
function clearAllUnits(Id,numberOfUnits){ //clears all units and shaddows...
  for (var i=0; i<numberOfUnits; i++) {
    updateEl(Id+i,[["display","none"]]);
} }
function getGroup(groupSize,reg,x){ //location assignments for all groups 1-to-6.
  g[1] = [[0+reg[x],58]];
  g[2] = [[355.5+reg[x],58],[4.5+reg[x],58]];
  g[3] = [[0+reg[x],47],[355+reg[x],68],[5+reg[x],68]];
  g[4] = [[353+reg[x],46],[2+reg[x],47],[357.5+reg[x],68],[7.5+reg[x],68]];
  g[5] = [[355.5+reg[x],47],[4.5+reg[x],47],[350+reg[x],68],[0+reg[x],68],[10+reg[x],68]];
  g[6] = [[353+reg[x],47],[2+reg[x],47],[10.5+reg[x],46],[347.5+reg[x],68],[357.5+reg[x],68],[7.5+reg[x],68]];
  return g[groupSize];
}
//Crates all 9 goalGroups as hidden to start.
for (var i=0; i<9; i++) {
  createEl("circle",[["id","goal"+i],["cx",250],["cy",220],["r",10],["display","none"]
    ,["fill","url(#grad"+7+")"]]);
}

function goalGroup(){
  clearAllUnits("goal",9)
  key = random(1,9);
  gg[1] = [[250,220]];
  gg[2] = [[235,220],[265,220]];
  gg[3] = [[235,230],[265,230],[250,205]];
  gg[4] = [[242,230],[272,230],[257,205],[227,205]];
  gg[5] = gg[3];gg[5].push([220,205],[280,205]);
  gg[6] = gg[4];gg[6].push([287,205],[212,230]);
  gg[7] = [[235,245],[265,245],[250,220],[220,220],[280,220],[265,195],[235,195]];
  gg[8] = gg[6];gg[8].push([197,205],[302,230])
  gg[9] = gg[7];gg[9].push([205,195],[295,245])
  for (var i=0; i<key; i++) {
    updateEl("goal"+i, [["display","normal"],["cx", gg[key][i][0]],["cy",gg[key][i][1]]]);
  }
  return key;
}
