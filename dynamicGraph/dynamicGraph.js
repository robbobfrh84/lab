var svgElement = 'http://www.w3.org/2000/svg';
//----------FIXED Global Variables----------------------------------------------------
var vertLines = 40;  var horizLines = 50; //# of horizontal and vertical lines.
var marginLR = 4;    var marginTB = 2; //percent. LR: Left&right, TB: top-bottom.
var vertOLap = 2;    var horizOLap = 1; //OverLap extents lines in percent
//breaks and pixel widths of lines at breaks...
var break1 = 5;      var break2 = 10; //number of lines every
var bold1 = 0.75;    var bold2 = 1.5; //line widiths
var thinLine = 0.25; // smallest line witdth.
//----------ACTIVE Global Variables----------------------------------------------------
var lineW; var vGap; var hGap; var pW; var blockSize; var windowHight;

function drawLines(){
  for (var i = 0; i <= Math.max(vertLines,horizLines); i++){ lineW = thinLine;
    if((i)%break1===0){ lineW = bold1;} if((i)%break2===0){ lineW = bold2;}
    if(i<=vertLines){createEl('mainSVG','line',[['stroke-width',lineW],['id','vert'+i]
      ,['x1',i*vGap+marginLR+'%'],['y1',marginTB-horizOLap+'%']
      ,['x2',i*vGap+marginLR+'%'],['y2',100-(marginTB-horizOLap)+'%']])}
    if(i<=horizLines){createEl('mainSVG','line',[['stroke-width',lineW],['id','horiz'+i]
      ,['x1',marginLR-vertOLap+'%'],['y1',i*hGap+marginTB+'%']
      ,['x2',100-(marginLR-vertOLap)+'%'],['y2',i*hGap+marginTB+'%']])}
  }
}

function createEl(container,type,att){
  var newObj = document.createElementNS(svgElement, type);
  for (var i=0; i<att.length; i++){
    newObj.setAttributeNS(null, att[i][0],att[i][1]);
  }
  document.getElementById(container).appendChild(newObj);
}

function updateLines(pW){
  vGap = (100-(marginLR*2)) / vertLines;//in %
  hGap = (100-(marginTB*2)) / horizLines;//in %
  blockSize = (pW*((100-(marginLR*2))/100)) / vertLines;//in pixels
  windowHeight = (blockSize*horizLines)+((100-(marginTB*2))/100)
  document.getElementById('mainSVG').style.height = windowHeight+'px';
}

function updateEl(Id, att) { //function used to update any attributes with DOM.
  for (var i=0; i<att.length; i++){
    document.getElementById(Id).setAttributeNS(null, att[i][0],att[i][1]);
} }

updateLines(window.innerWidth); drawLines();

window.onresize = function(event){
  while (mainSVG.hasChildNodes()){
    mainSVG.removeChild(mainSVG.lastChild);
  }
  updateLines(window.innerWidth); drawLines();
}
