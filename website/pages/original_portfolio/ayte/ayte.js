var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var user = 'earth'; //MAY NEED TO BE ALL LOWER-CASED OR WILL MESS UP ARD PARSE
var ayteRGB = {
  user : user,
  ayte : [['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],  ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'], ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],  ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],  ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],  ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],  ['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()'],['rgb()']]
  };

var ayteByte = {
  user: user,
  ayte: [['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A'],['A']]
  };

var ash = ['rgb(68, 68, 68)', 'A'];//darkgrey
var egg = ['rgb(240,234,214)', 'B'];//eggshell
var cfb = ['rgb(102, 155, 235)','C'];//cornflowerblue
var gdr = ['rgb(214, 163, 48)','D'];//goldenrod
var grn = ['rgb(0, 128, 0)','E'];//green

var gry = ['rgb(180, 180, 180)','F'];//grey
var fbc = ['rgb(169, 53, 47)','G'];//firebrick
var slb = ['rgb(106, 90, 205)','H'];//lightgrey
var ogr = ['rgb(255, 69, 0)','I'];//orangered
var org = ['rgb(235, 120, 0)','J'];//orange

var sgn = ['rgb(32, 178, 170)','K'];//lightseagreen
var pru = ['rgb(160, 82, 45)','L'];//sienna
var pnk = ['rgb(245, 182, 193)','M'];//pink
var ind = ['rgb(96, 58, 134)','N'];//indigo
var ygr = ['rgb(154, 205, 50)','O'];//lightseagreen

var clr = ['rgb(221, 221, 221)','P'];//lightseagreen

var brush = cfb;
var swatch = [ash,egg,cfb,gdr,grn
             ,gry,fbc,slb,ogr,org
             ,sgn,pru,pnk,ind,ygr,clr];

for (var i = 0; i < 64; i++){
  if (i % 8 === 0){ ayteFrame.innerHTML += '<br>';}
  var blk = document.createElement('div');
  blk.className = 'ayte'; blk.id = 'blk'+i;
  blk.setAttribute('onmousedown', 'mouseState(true, blk'+i+','+i+')');
  blk.setAttribute('onmousemove', 'draw(blk'+i+','+i+')');
  blk.setAttribute('ontouchstart','draw(blk'+i+','+i+')');
  ayteFrame.appendChild(blk);
}
var mouseDown = false;
var waitForMsg = false;
document.body.setAttribute('onmousedown', 'mouseState(true)');
document.body.setAttribute('onmouseup', 'mouseState(false)');

function mouseState(state, bId, x){
  if (state){ mouseDown = true;
    if(bId){
      draw(bId, x)
    }
  } else { mouseDown = false; }
}

//----------------------------------------------------------------------------//
//----------          PAINT ACTION!!!          -------------------------------//
//----------------------------------------------------------------------------//
var ayteByteHistory = [];
function draw(bId, x){
  if(mouseDown){
    if (!live) {
      bId.style.backgroundColor = brush[0];
      ayteByteHistory[x] = brush[1];
    }
    if (live && !waitForMsg) {
      ayteRGB.ayte[x] = brush[0];
      ayteByte.ayte[x] = brush[1];
      publish([['1b',ayteByte],['1a',ayteRGB]]);
    }
  }
}

function updateAyte() {
    for (var i = 0; i < 64; i++){
      var bId = document.getElementById('blk'+i);
      bId.style.backgroundColor = ayteRGB.ayte[i];
  }
}

ayteFrame.addEventListener('touchmove', touchMove);
function touchMove(e){ mouseDown = true;
  var x = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
  if( x.id[0]+x.id[1]+x.id[2] === 'blk') {
    var i = 3; var n = ''; while(x.id[i]){n+=x.id[i]; i++; }
    mouseState = true; draw(x, n);
  }
}

ayteFrame.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

for (var i = 0; i < 15; i++){
  if (i % 5 === 0){ swatchContainer.innerHTML += '<br>';}
  var swt = document.createElement('div');
  swt.className = 'swatch'; swt.id = 'swt'+i;
  swt.style.backgroundColor = swatch[i][0];
  swt.setAttribute('onmouseup', 'brushSwap('+i+')');
  swt.setAttribute('ontouchstart','brushSwap('+i+')');
  swatchContainer.appendChild(swt);
}

//---------------------Fill Button Section-------------------------------------
function brushSwap(newCol){
  brush = swatch[newCol];
  paletteFrame.style.backgroundColor = brush[0];
}

function fill(col){
  for (var i = 0; i < 64; i++){
    document.getElementById('blk'+i).style.backgroundColor = col[0];
    ayteByteHistory[i] = col[1];
  }
  if (live && !waitForMsg) {
    for (var i = 0; i < 64; i++){
        ayteRGB.ayte[i] = brush[0];
        ayteByte.ayte[i] = brush[1];
    }
    publish([['1b',ayteByte],['1a',ayteRGB]]);
  }
}

//-----------------------------------------------------------------------------
//---------------------PUBNUB MESSAGE CENTER-----------------------------------
//-----------------------------------------------------------------------------
var live = false; var ayteChecked = false;
function liveStatus(){
  if (!live) { fill(clr); live = true;
    if(stateGal){ swapToGal();}
    liveBtn.innerHTML = 'Go Off Air';
    titleLive.style.display = 'block';
    fillBtn.innerHTML = '*Live!';
    fillBtn.style.color = 'firebrick';
    fillBtn.setAttribute('onmousedown', 'false');
    history(1, ['1b','1a']);
  } else { live = false;
    liveBtn.innerHTML = '*Pixel Chat*';
    titleLive.style.display = 'none';
    fillBtn.innerHTML = 'fill';
    fillBtn.style.color = 'Black';
    fillBtn.setAttribute('onmousedown', 'fill(brush)');
    fill(clr);
  }
}

var settings = {
  publish_key: 'pub-c-926e03e9-2cbb-4a3d-b17a-2ee47ca078a5',
  subscribe_key: 'sub-c-b3fbc6fa-0bf5-11e6-a8fd-02ee2ddab7fe'
};

var pubnub = PUBNUB(settings);
function history(amount, chl) {
  for (var i = 0; i < chl.length; i++){
    pubnub.history({
      channel : chl[i],
      callback: function(m) {
        if(!ayteChecked){ ayteChecked = true;
          ayteByte = m[0][0];
          console.log('Last published ___ayte___', ayteByte);
        } else { ayteRGB = m[0][0];
          console.log('Last published ***RGB***', ayteRGB);
          updateAyte();
        }
      },
      count : amount,
      reverse : false
    });
  }
}

pubnub.subscribe({
  channel: '1a',
  callback: function(m) {
    ayteRGB = m;
    console.log('Saw new *RGB*');
    if(live){updateAyte();}
    waitForMsg = false;
  },
  error: function(err) {console.log(err);}
});

pubnub.subscribe({
  channel: '1b',
  callback: function(m) {
    ayteByte = m;
    console.log('Saw new _ayte_');
  },
  error: function(err) {console.log(err);}
});

//publish([['1a',ayteRGB],['1b',ayteByte]]);
function publish(data) {
  waitForMsg = true;
  for (var i = 0; i < data.length; i++){
    pubnub.publish({
      channel: data[i][0],
      message: data[i][1]
    });
    console.log("channel: ",data[i][0],"data: ",data[i][1]);
  }
}
//---------------------Save Aytes----------------------------------------------
var settingsGal = {
  publish_key: 'pub-c-a3bac365-84b3-4a6b-a8a1-67d0e2aaad3d',
  subscribe_key: 'sub-c-f0907bae-1ab6-11e6-9f24-02ee2ddab7fe'
};
var pubnubGal = PUBNUB(settingsGal);

var loggedUser = 'robbobfrh84'
var savedAyte;

function saveAyte() {
  var ayteGal = [];
  var ardGal = [];
  for (var i = 0; i < 64; i++){
    var bId = document.getElementById('blk'+i);
    var rgb = bId.style.backgroundColor;
    ayteGal[i] = rgb;
    if(!live){
      if(ayteByteHistory[i]){ ardGal[i] = ayteByteHistory[i]; } else { ardGal[i] = 'P';}
    }
    if(live) {
      if(ayteByte.ayte[i][0]){ ardGal[i] = ayteByte.ayte[i][0]; } else { ardGal[i] = 'P';}
    }
  }
  var date = new Date();
  var ayteReferenceIdNum = 'ayte'+date.getTime();
  savedAyte = {
    display : ardGal,
    user : loggedUser,
    arin : ayteReferenceIdNum,
    posted : date,
    ayte : ayteGal
  };
  publishGal(savedAyte);
}

function publishGal(data) {
  pubnubGal.publish({
    channel: 'mainGal1',
    message: data
  });
  console.log('Saved Ayte to Gallery1: ',savedAyte);
  swapToGal();
  setTimeout(function() { historyGal.flex_history(getAll, flex_history_callback); }, 1500);
}

//--------------- Generate SVG file & download ---------------------------------
// var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="528" height="528" viewBox="0 0 528 528" ><defs><filter id="f1" height="130%" width="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/> <feOffset dx="5" dy="5" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#f1)" ><path fill-rule="evenodd" fill="green" d="M64 0v64h-64v-64h64z"/><path fill-rule="evenodd" fill="green" d="M64 448v64h-64v-64h64z"/><path fill-rule="evenodd" fill="blue" d="M512 448v64h-64v-64h64z"/><path fill-rule="evenodd" fill="green" d="M512 0v64h-64v-64h64z"/><path fill-rule="evenodd" fill="blue" d="M256 0v64h-64v-64h64z"/><path fill-rule="evenodd" fill="blue" d="M128 64v64h-64v-64h64z"/><path fill-rule="evenodd" fill="blue" d="M128 128v64h-64v-64h64z"/><path fill-rule="evenodd" fill="blue" d="M512 256v64h-64v-64h64z"/><path fill-rule="evenodd" fill="red" d="M512 192v64h-64v-64h64z"/><path fill-rule="evenodd" fill="green" d="M128 448v64h-64v-64h64z"/><path fill-rule="evenodd" fill="cornflowerblue" d="M256 256v64h-64v-64h64z"/><path fill-rule="evenodd" fill="cornflowerblue" d="M256 320v64h-64v-64h64z"/><path fill-rule="evenodd" fill="cornflowerblue" d="M320 256v64h-64v-64h64z"/><path fill-rule="evenodd" fill="cornflowerblue" d="M320 320v64h-64v-64h64z"/></g></svg>';
//
// makeSVGTextFile = function (text) {
//   var data = new Blob([text], {type: 'text/plain'});
//   svgString = window.URL.createObjectURL(data);
//   return svgString;
// };
// downloadlink.href = makeSVGTextFile(svgString);
