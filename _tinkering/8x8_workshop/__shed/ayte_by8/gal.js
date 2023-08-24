var svgElement = 'http://www.w3.org/2000/svg';
var allGalHistory = {};
var stateGal = false;
var gCnt = 0;
var skip = [0,4,5];
//var skip = [];

function swapToGal(){
  if (!stateGal){ stateGal = true;
    if (live) {liveStatus();}
    console.log('swapped to gallery Page');
    galName.style.display = 'block';
    gal1Frame.style.display = 'block';
    ayteFrame.style.display = 'none';
    paletteFrame.style.display = 'none';
    galBtn.innerHTML = '<-Back'
    historyGal.flex_history(getAll, flex_history_callback);
  } else { stateGal = false;
    galName.style.display = 'none';
    gal1Frame.style.display = 'none';
    ayteFrame.style.display = 'block';
    paletteFrame.style.display = 'block';
    galBtn.innerHTML = '{Gallery}'
  }
}

var svgStart = '<svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 528 528" >';
var shaddow = '<defs><filter id="f1" height="130%" width="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/> <feOffset dx="5" dy="5" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
var newgroup = '<g filter="url(#f1)" >';

function buildGal(){
  for (var i = 0; i < gCnt; i++){
    if (i % 8 === 0 && !mobile){ gal1Frame.innerHTML += '<br>';}
    if (i % 6 === 0 && mobile){ gal1Frame.innerHTML += '<br>';}
    var blk = document.createElement('div');
    blk.className = 'ayteby8';
    blk.id = 'ayg'+indexNum[i];
    gal1Frame.appendChild(blk);
    newpath = createAyte(allGalHistory[i]);
    blk.innerHTML = svgStart+shaddow+newgroup+newpath+'</g></svg>';
  }
}

function createAyte(ayte){
  var newpath =''; var c = 0; var r = -1;
  for (var i = 0; i < 64; i++){
    if (i % 8 === 0){ c=1; r++;}
    var sx = (64*c)+2;
    var sy = (64*r)-2;
    var p = 68;
    if(ayte[i]!=="" && ayte[i] !=='rgb(221, 221, 221)' ){newpath += '<path fill-rule="evenodd" fill="'+ayte[i]+'" d="M'+sx+' '+sy+'v'+p+'h-'+p+'v-'+p+'h'+p+'z"/>';}
    c++;
  }
  return newpath;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function clearAllChildren(parentID){
  while (parentID.hasChildNodes()){
    parentID.removeChild(parentID.firstChild);
  }
}

// -------------------  pubnub's flex callback -------------------------------//
var historyGal = PUBNUB.init({
  publish_key: 'pub-c-a3bac365-84b3-4a6b-a8a1-67d0e2aaad3d',
  subscribe_key: 'sub-c-f0907bae-1ab6-11e6-9f24-02ee2ddab7fe'
});
historyGal.flex_history = pubnub_flex_history;
var indexNum = [];
var flex_history_callback = function(result) {
  if (!result.error) {
    var c = 0; gCnt = 0;
    for (var i = 0; i < result.count; i++){
      if (isInArray(i,skip)){ c++; }
      else { indexNum[gCnt] = i; gCnt++;
        allGalHistory[i-c] = result.messages[i].message.ayte
      }
    }
    //console.log("allGalHistory: ",allGalHistory);
    clearAllChildren(gal1Frame);
    buildGal();
  }
  else {
    console.warn(result.operation + " failed", result);
  }
}
var getAll = {
  channel: 'mainGal1',
  getall: true
}
