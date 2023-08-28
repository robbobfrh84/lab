////////////////////////////////////////////////////////////////////////////////
//////////          EASTER EGGS              ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

createBtn('egg', 'eggCir');
setTimeout(function(){blowUp(egg,eggCir,2,3,0,100);},200);

var wId = 0;
var wormHead = []; var wormTail=[]; var wormLink=[]; var dir = []; var back = [];
var sx = []; var sy = []; var ex = []; var ey = []; var tx = []; var ty = [];

function egg1(){
  for (var i = 0; i < 10; i++){
    var x = wId; wId++; back[x] = 1; dir[x] = 1;
    var startx = random(0,30)*2.5+12.5; var starty = random(0,30)*2.5+12.5;
    sx[x] = startx; sy[x] = starty; ex[x] = startx; ey[x] = starty;
    color = 'rgb('+rgbR()+')'
    wormHead[x] = createLine(startx,starty,startx,starty,3,color,'wormHead'+x,1);
    wormTail[x] = createLine(startx,starty,startx,starty,3,color,'wormTail'+x,1);
    wormLink[x] = createCir(startx,starty,0.15,color,5,'rgba(0,0,0,0)',1,'link'+x);
    wormButton(wormHead[x], wormLink[x], wormTail[x]);
    continueWorm(x);
  }
}

function continueWorm(x){ dir[x]=back[x]; tx[x] = sx[x]; ty[x] = sy[x];
  while (dir[x] === back[x]){ dir[x] = random(1,4);} sx[x]=ex[x]; sy[x]=ey[x];
  if (dir[x] === 1){ ex[x] += 2.5; back[x] = 2;} if (dir[x] === 2){ ex[x] -= 2.5; back[x] = 1;}
  if (dir[x] === 3){ ey[x] += 2.5; back[x] = 4;} if (dir[x] === 4){ ey[x] -= 2.5; back[x] = 3;}
  updateSVG(wormHead[x],[['x1',sx[x]+'%'],['y1',sy[x]+'%'],['x2',ex[x]+'%'],['y2',ey[x]+'%']]);
  updateSVG(wormTail[x],[['x1',sx[x]+'%'],['y1',sy[x]+'%'],['x2',tx[x]+'%'],['y2',ty[x]+'%'],['opacity',1]]);
  updateSVG(wormLink[x],[['cx',sx[x]+'%'],['cy',sy[x]+'%']]);
  linePulse(sx[x],sy[x],ex[x],ey[x],wormHead[x],true,0.05,1.04,pullTail,x);
}

function pullTail(x){
  linePulse(sx[x],sy[x],tx[x],ty[x],wormTail[x],false,0.05,1.02,continueWorm,x);
}

function wormButton(head, link, tail){
  link.onmousedown = function(){
    mainSVG.removeChild(head);
    mainSVG.removeChild(link);
    mainSVG.removeChild(tail);
  }
}
