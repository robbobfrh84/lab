/*------------------------------------------------------------------------------
**********     block builder functions     **********
------------------------------------------------------------------------------*/
var rows = 8; var blkClass = 'ayte'; // for ayte
//var rows = 16; var blkClass = 'kayte'; // for Kayte

var paint = '#6495ed';
var mouseDown = false;
var ayte = true;

function build(rows, blkClass){
  for (var i = 0; i < rows*rows; i++){
    if (i % rows === 0){ ayteHouse.innerHTML += '<br>';}
    var blk = document.createElement('div');
    blk.className = blkClass; blk.id = 'blk'+i;
    blk.style.backgroundColor = '#E6E6E6';
    blk.setAttribute('onmousemove', 'draw(blk'+i+')');
    blk.setAttribute('onmousedown', 'mouseState(true, blk'+i+')');
    blk.setAttribute('onmouseup', 'mouseState(false)');
    ayteHouse.appendChild(blk);
  }
}
build(rows, blkClass);

function draw(bId){ if(mouseDown){ bId.style.backgroundColor = paint;}}
function mouseState(state, bId){ if (state){mouseDown = true;
  if(bId){bId.style.backgroundColor = paint;} } else {mouseDown = false;}
}

function changeBuild(){
  while (ayteHouse.hasChildNodes()){
    ayteHouse.removeChild(ayteHouse.lastChild);
  }
  if(ayte){ rows=16; build(16, 'kayte'); chgBtn.innerHTML = '8x8'; ayte = false;
  } else { rows=8; build(8, 'ayte'); chgBtn.innerHTML = '16x16'; ayte = true; }
}

/*------------------------------------------------------------------------------
**********     display Change functions     **********
------------------------------------------------------------------------------*/

function updateDrop(col, loc){ //colorRangeContolRain(r, g, b)
  hexR = Math.floor(Math.random()*150)+50; hexG = 20; hexB = 210;
  hex = '#'+hexR.toString(16)+hexG+hexB.toString(16);
  if(loc[0] >= 0 && loc[0] <= rows-1){
    document.getElementById('blk'+(col+(rows*loc[0]))).style.backgroundColor = hex;}
  hexRDrop = Math.ceil(hexR/3);
  hexR -= hexRDrop; hexB -= 70; if(hexR < 10){hexR = 10;}
  hex1 = '#'+hexR.toString(16)+hexG+hexB.toString(16);
  if(loc[1] >= 0 && loc[1] <= rows-1){
    document.getElementById('blk'+(col+(rows*loc[1]))).style.backgroundColor = hex1;}
  hexR -= hexRDrop; hexB -= 70; if(hexR < 10){hexR = 10;}
  hex2 = '#'+hexR.toString(16)+hexG+hexB.toString(16);
  if(loc[2] >= 0 && loc[2] <= rows-1){
    document.getElementById('blk'+(col+(rows*loc[2]))).style.backgroundColor = hex2;}
  if(loc[3] >= 0 && loc[3] <= rows-1){
    document.getElementById('blk'+(col+(rows*loc[3]))).style.backgroundColor = '#000';}
  loc[0] += 1; loc[1] += 1; loc[2] += 1; loc[3] += 1;
  return loc;
}
function newDrop(speed){
  var loc = [0,-1,-2,-3];
  var col = Math.floor(Math.random()*rows);
  var drop = setInterval(function(){
    loc = updateDrop(col, loc);
    if (loc[2] >= rows+1){ clearInterval(drop);}
  }, speed);
}
var purpleRainGo = false; var rain;
function purpleRain(){ allColor('#000');
  if (purpleRainGo) { purpleRainGo = false; clearInterval(rain);
    purpleRainId.innerHTML = 'Purple Rain'; purpleRainId.style.color = '#6495ed';
  } else { purpleRainGo = true; purpleRainId.innerHTML = 'STOP'; purpleRainId.style.color = '#daa520';
  rain = setInterval(function(){ loc1=0; loc2=-1;loc3=-2; newDrop(random(50,300)); }, 200);
  }
}

function allColor(newColor){
  for (var i = 0; i < rows*rows; i++){
    if(newColor==='random'){ color = randomColor(); } else { color = newColor; }
    document.getElementById('blk'+i).style.backgroundColor = color;
  }
}

function numberColorShuffle(number){
  for ( var i = 0; i < number; i += 1) {
    var bId = Math.floor(Math.random() * (rows*rows))
    var blk = document.getElementById('blk'+bId)
    blk.style.backgroundColor = randomColor();
  }
}

var pauseResume = false; var ayter1;
function stopColorShuffle() {
  if(pauseResume){ clearInterval(ayter1); pauseResume = false;
    dance.innerHTML = 'Dance'; dance.style.color = '#6495ed';
  } else { ayter1 = setInterval(function(){numberColorShuffle(10);}, 200);
    dance.innerHTML = 'STOP'; dance.style.color = '#daa520';
    pauseResume = true;
  }
}


/*------------------------------------------------------------------------------
**********     Buttons Keys and Individual transition functions     **********
------------------------------------------------------------------------------*/
function newEl(bId, color){
  console.log('new');
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(){ return '#'+Math.floor(Math.random()*16777215).toString(16);}

document.onkeydown = function(event) {
    event = event || window.event;
    var keyColor = event.code;
    console.log(keyColor);
    if(keyColor === 'KeyW'){ paint = '#FFF';} if(keyColor === 'KeyB'){ paint = '#000';}
    if(keyColor === 'KeyC'){ paint = '#6495ed';} if(keyColor === 'KeyG'){ paint = '#008000';}
    if(keyColor === 'KeyO'){ paint = '#ffa500';} if(keyColor === 'KeyN'){ paint = '#daa520';}
    if(keyColor === 'KeyL'){ paint = '#6b8e23';} if(keyColor === 'KeyR'){ paint = '#b22222';}
    if(keyColor === 'KeyP'){ paint = '#663399';} if(keyColor === 'KeyK'){ paint = '#ffc0cb';}
    if(keyColor === 'KeyY'){ paint = '#777';} if(keyColor === 'KeyE'){ paint = '#E6E6E6';}
};

var ayteArray = [];
function getAyte(){ ayteArray = [];
  for (var i = 0; i < rows*rows; i++){
    var x = document.getElementById('blk'+i); x = x.style.backgroundColor;
    var rgb = x.split('(').pop().split(')').shift().split(',');
    var hex = '#'+parseInt(rgb[0]).toString(16)+parseInt(rgb[1]).toString(16)+parseInt(rgb[2]).toString(16);
    ayteArray.push(hex);
  } console.log(ayteArray);
}

/*------------------------------------------------------------------------------
**********     NOTES     **********
------------------------------------------------------------------------------*/
