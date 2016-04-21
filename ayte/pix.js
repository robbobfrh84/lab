/*------------------------------------------------------------------------------
**********     block builder     **********
------------------------------------------------------------------------------*/
var rows = 8; var blkClass = 'ayte'; // for ayte
//var rows = 16; var blkClass = 'kayte'; // for Kayte

var paint = 'cornflowerblue';
var mouseDown = false;
for (var i = 0; i < rows*rows; i++){
  if (i % rows === 0){ ayteHouse.innerHTML += '<br>';}
  var blk = document.createElement('div');
  blk.className = blkClass; blk.id = 'blk'+i;
  blk.setAttribute('onmousemove', 'draw(blk'+i+')');
  blk.setAttribute('onmousedown', 'mouseState(true, blk'+i+')');
  blk.setAttribute('onmouseup', 'mouseState(false)');
  ayteHouse.appendChild(blk);
}

function draw(bId){ if(mouseDown){ bId.style.backgroundColor = paint;}}
function mouseState(state, bId){ if (state){mouseDown = true;
  if(bId){bId.style.backgroundColor = paint;} } else {mouseDown = false;}
}

/*------------------------------------------------------------------------------
**********     display functions     **********
------------------------------------------------------------------------------*/

document.onkeydown = function(event) {
    event = event || window.event;
    var keyColor = event.code;
    console.log(keyColor);
    if(keyColor === 'KeyW'){ paint = 'white';}
    if(keyColor === 'KeyB'){ paint = 'Black';}
    if(keyColor === 'KeyC'){ paint = 'cornflowerblue';}
    if(keyColor === 'KeyG'){ paint = 'green';}
    if(keyColor === 'KeyO'){ paint = 'orange';}
    if(keyColor === 'KeyN'){ paint = 'goldenRod';}
    if(keyColor === 'KeyL'){ paint = 'olivedrab';}
    if(keyColor === 'KeyR'){ paint = 'firebrick';}

};

function allColor(newColor){ var ayteArray = [];
  for (var i = 0; i < rows*rows; i++){
    if(newColor==='random'){
      color = randomColor();
      ayteArray.push(color);
      console.log(color);
    } else { color = newColor; }
    document.getElementById('blk'+i).style.backgroundColor = color;
  }
  if(color==='random'){
    console.log(ayteArray);
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
      dance.innerHTML = 'Dance'; dance.style.color = 'cornflowerblue';
    } else { ayter1 = setInterval(function(){numberColorShuffle(10);}, 200);
      dance.innerHTML = 'STOP'; dance.style.color = 'darkred';
      pauseResume = true;
    }
}
function randomColor(){ return '#'+Math.floor(Math.random()*16777215).toString(16);}

document.onkeydown = function(event) {
    event = event || window.event;
    var keyColor = event.code;
    console.log(keyColor);
    if(keyColor === 'KeyW'){ paint = 'white';}
    if(keyColor === 'KeyB'){ paint = 'Black';}
    if(keyColor === 'KeyC'){ paint = 'cornflowerblue';}
    if(keyColor === 'KeyG'){ paint = 'green';}
    if(keyColor === 'KeyO'){ paint = 'orange';}
    if(keyColor === 'KeyN'){ paint = 'goldenRod';}
    if(keyColor === 'KeyL'){ paint = 'olivedrab';}
    if(keyColor === 'KeyR'){ paint = 'firebrick';}
    if(keyColor === 'KeyP'){ paint = 'purple';}
    if(keyColor === 'KeyK'){ paint = 'pink';}
    if(keyColor === 'KeyY'){ paint = 'grey';}
    if(keyColor === 'KeyE'){ paint = 'rgb(230,230,230)';}





};

/*------------------------------------------------------------------------------
**********     NOTES     **********
------------------------------------------------------------------------------*/
