var svgElement = 'http://www.w3.org/2000/svg';

//////////CREATE SVG ELEMENTS///////////////////////////////////////////////////
function createLine(x1,y1,x2,y2,width,color,lnID){
  var newEl = createEl('mainSVG','line',[['id',lnID],['stroke-width',width],['stroke',color]
    ,['x1',x1+'%'],['y1',y1+'%'],['x2',x2+'%'],['y2',y2+'%']]); return newEl;}

function createPath(path, width, color, arcID){
  createEl('mainSVG','path',[['id', arcID],['stroke-width',width],['stroke',color]
  ,['d',path],['fill', 'none']])}

function createRect(x,y,width,height,fill,bordWidth,bordColor,opacity, recID){
  var newEl = createEl('mainSVG','rect',[['id',recID],['stroke-width',bordWidth+'%']
  ,['stroke',bordColor],['x',x+'%'],['y', y+'%'],['width',width+'%'],['height',height+'%']
  ,['opacity', opacity],['fill',fill]]); return newEl;}

function createEl(container,type,att){
  var newObj = document.createElementNS(svgElement, type);
  for (var i=0; i<att.length; i++){ newObj.setAttributeNS(null, att[i][0],att[i][1]); }
  document.getElementById(container).appendChild(newObj); return newObj; }

function drawGrid(numOfLines,thin,fifth,tenth,color){ lines = (100/numOfLines);
  for (var i = 0; i <= numOfLines; i++){ fat = thin;
    if(i%5===0){fat=fifth;} if(i%10===0||i===0){fat=tenth;}
    createLine(0,lines*i,100,lines*i,fat,color,'vert'+i);
    createLine(lines*i,0,lines*i,100,fat,color,'horiz'+i);}
}

//////////ANIMATION STATION///////////////////////////////////////////////////////
function fadeIn(varName, element, speed, start, end){
  function go(){
    if (element === 'box-shadow'){
      varName.style.boxShadow = '0px 0px 25px rgba(80,80,80,'+start+') inset';
    } else { varName.setAttributeNS(null, element, start);}
    start+=speed;
    if (start <= end){ requestAnimationFrame(go); } } go(); }

function lineGrow(startX,startY,endX,endY,width,color,lineID,speed,ramp){
  var lineID = createLine(startX,startY,startX,startY,width,color,lineID);
  var x = Math.abs(startX-endX); var y = Math.abs(startY-endY);
  var placeX = startX; var placeY = startY; var end = false;
  function goxxx(){ x -= speed; y -= speed; speed*=ramp;
    if (startX > endX && x > 0) { end = false; placeX = endX+x; }
    if (startX < endX && x > 0) { end = false; placeX = endX-x; }
    if (startY > endY && y > 0) { end = false; placeY = endY+y; }
    if (startY < endY && y > 0) { end = false; placeY = endY-y; }
    if (end === true) { lineID.setAttributeNS(null,'x2',endX+'%');
      lineID.setAttributeNS(null,'y2',endY+'%'); return; }
    lineID.setAttributeNS(null,'x2',placeX+'%');
    lineID.setAttributeNS(null,'y2',placeY+'%');
    end = true; requestAnimationFrame(goxxx);
  } goxxx();
}

////////////////////////////////////////////////////////////////////////////////
//////////          MAIN          //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  //draw background grid.
drawGrid(20,0.5,1,2,'rgb(120,120,120)');

  //Fade out lines in the Bob Main box
var nameBox = createRect(40,5,20,10,'rgb(220,220,220)',0,'none',0,'nameBox');
setTimeout(function(){fadeIn(nameBox, 'opacity', 0.02, 0, 1);},1000);

  //Fade in inset box-shadow.
var fullpage = document.getElementById('mainSVG');
setTimeout(function(){fadeIn(fullpage, 'box-shadow', 0.03, 0, 1);},1000);

lineGrow(50,5,5,5,3,'cornflowerblue','leftLine',0.9,1.03);
lineGrow(50,5,95,5,3,'cornflowerblue','rightLine',0.9,1.03);
lineGrow(50,15,40,15,3,'cornflowerblue','underBob',0.1,1.05);
lineGrow(50,15,60,15,3,'cornflowerblue','underMain',0.1,1.05);
lineGrow(40,15,40,5,3,'cornflowerblue','leftBob',0.1,1.05);
lineGrow(60,15,60,5,3,'cornflowerblue','rightBob',0.1,1.05);

////////////////////////////TEST ZONE///////////////////////////////////////////

lineGrow(5,5,5,25,3,'cornflowerblue','testLine',0.1,1.05);
lineGrow(5,25,25,25,3,'cornflowerblue','testLine',0.1,1.05);
lineGrow(25,25,25,5,3,'cornflowerblue','testLine',0.1,1.05);
lineGrow(5,45,25,25,3,'cornflowerblue','testLine',0.1,1.05);

//////////WAITING ROOM//////////////////////////////////////////////////////////
