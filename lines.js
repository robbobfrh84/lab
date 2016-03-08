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

//////////ANIMATE STATION///////////////////////////////////////////////////////
function fadeIn(varName, element, speed, start, end){
  function go(){
    if (element === 'box-shadow'){
      varName.style.boxShadow = '0px 0px 25px rgba(80,80,80,'+start+') inset';
    } else { varName.setAttributeNS(null, element, start);}
    start+=speed;
    if (start <= end){ requestAnimationFrame(go); } } go(); }

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
setTimeout(function(){fadeIn(fullpage, 'box-shadow', 0.01, 0, 1);},2000);

////////////////////////////TEST ZONE///////////////////////////////////////////

function lineGrow(startx,starty,endx,endy,width,color,lineID,speed,ramp){
  var lineID = createLine(startx,starty,startx,starty,width,color,lineID);
  function goxxx(){
    lineID.setAttributeNS(null, 'x2', startx+'%');
    if (endx > startx){ startx-=speed;
    } else if (startx > endx) { startx+=speed;
    } else {console.log('')}

    if (endy > starty){ starty-=speed; }
    if (starty > endy){ starty+=speed; }
    requestAnimationFrame(goxxx);
  } goxxx();
}

lineGrow(50,5,5,5,3,'cornflowerblue','leftLine',0.5,1.05);
lineGrow(50,5,95,5,3,'cornflowerblue','leftLine',0.5,1.05);


//////////WAITING ROOM/////////////////////T////////////////////////////////////
