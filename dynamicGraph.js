var svgElement = "http://www.w3.org/2000/svg";
var xlines = 25;
var ylines = 25;

var unitBreak = 5;//bold lines every...
var thin = 1;
var thick = 2;

var margin = 5;//in percent
var oL = 1; //percent of lines that overlap to create crossing at edges
var xgap = (100 - (margin*2)) / xlines;
var ygap = (100 - (margin*2)) / ylines;

for (var i = 0; i <= ylines; i++){
  if((i)%unitBreak===0){ var lineW = thick;} else { var lineW = thin;}
  createEl("line",[["x1",margin-oL+"%"],["y1",i*ygap+margin+"%"]
    ,["x2",100-margin+oL+"%"],["y2",i*ygap+margin+"%"],["stroke-width",lineW]])
}

for (var i = 0; i <= xlines; i++){
  if((i)%unitBreak===0){ var lineW = thick;} else { var lineW = thin;}
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
