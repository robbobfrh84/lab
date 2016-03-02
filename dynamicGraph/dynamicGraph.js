var svgElement = "http://www.w3.org/2000/svg";

// let's keep it square //remove...
var xlines = 40;
var ylines = 40;

var boldBreak1 = 5;//bold lines every...
var boldBreak2 = 10;//extra bold lines every...
var thin = 0.25;
var bold1 = 0.75;
var bold2 = 1.5;


var margin = 5;//in percent
var oL = 1; //percent of lines that overlap to create crossing at edges
var xgap = (100 - (margin*2)) / xlines;
var ygap = (100 - (margin*2)) / ylines;

for (var i = 0; i <= ylines; i++){
  if((i)%boldBreak1===0){ var lineW = bold1;} else { var lineW = thin;}
  if((i)%boldBreak2===0){ var lineW = bold2;} //else { var lineW = thin;}
  createEl("line",[["x1",margin-oL+"%"],["y1",i*ygap+margin+"%"]
    ,["x2",100-margin+oL+"%"],["y2",i*ygap+margin+"%"],["stroke-width",lineW]])
}

for (var i = 0; i <= xlines; i++){
  if((i)%boldBreak1===0){ var lineW = bold1;} else { var lineW = thin;}
  if((i)%boldBreak2===0){ var lineW = bold2;} //25else { var lineW = thin;}
  createEl("line",[["x1",i*xgap+margin+"%"],["y1",margin-oL+"%"]
    ,["x2",i*xgap+margin+"%"],["y2",100-margin+oL+"%"],["stroke-width",lineW]])
}

function createEl(type,att){
    var newObj = document.createElementNS(svgElement, type);
    for (var i=0; i<att.length; i++){
      newObj.setAttributeNS(null, att[i][0],att[i][1]);
    }
    document.getElementById("mainSVG").appendChild(newObj);
  }

/*
----------Workflow...-----------------------------------------------


----------Not important ideas...------------------------------------
-- gradient margins so they fad off the page....
*/
