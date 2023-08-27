var color1 = "cornflowerblue";
var color2 = "darkseagreen";
var color1Code = "3 4 5 12 13 14 21 22 23 27 28 29 36 37 38 45 46 47 33 34 35 42 43 44 51 52 53 57 58 59 66 67 68 75 76 77".split(' ');

// This function builds the Sudoku grid with empty blocks...
function blankBuild(){
  for (var i = 0; i < 81; i++){
    if (color1Code.includes(i.toString()))
     {color = color2;} else {color=color1;}
    var blankBlock = document.createElement("div")
    blankBlock.setAttribute("contentEditable", false);
    blankBlock.style.backgroundColor = color;
    blankBlock.id = ("blk"+i);
    blankBlock.className = 'blocks';
    blkH.appendChild(blankBlock);
    blkH.style.fontSize = "0";
  }
}
blankBuild();

function build(blockString){ //places puzzle number blocks and editable
  blkH.style.fontSize = "1em";
  for (var i = 0; i < 81; i++){
    document.getElementById("blk"+i).innerHTML = (blockString[i]);
    if (document.getElementById("blk"+i).innerHTML !== ' ') {
      document.getElementById("blk"+i).setAttribute("contentEditable", false);
    } else {
      document.getElementById("blk"+i).setAttribute("contentEditable", true);
      document.getElementById("blk"+i).setAttribute("onkeypress", 'checkInput(event,this)');
    }
  }
}

function checkInput(evt, x) {
  var num = parseInt(evt.keyCode);
  event.preventDefault();
  if(num >= 49 && num <= 57){
    document.getElementById(x.id).style.textShadow = "1px 2px 1px rgba(0,0,0,0.5)";
    document.getElementById(x.id).innerHTML = num-48;
    checkCorrect();
  }
}

function checkCorrect(){
  var complete = true;
  for (var i = 0; i < 81; i++){
    if (blockString[i] === ' '){
      if (key[i] === document.getElementById('blk'+i).innerHTML) {
        document.getElementById('blk'+i).style.color = "rgba(0,0,0,0.60)";
        document.getElementById('blk'+i).style.textShadow = "1px 2px 1px rgba(0,0,0,0.5)";
      } else {
        document.getElementById('blk'+i).style.color = "red";
        document.getElementById('blk'+i).style.textShadow = "none";
        complete = false;
      }
    }
  }
  if (complete === true) {
    for (var i = 0; i < 81; i++){
      if (blockString[i] === ' '){
        document.getElementById('blk'+i).style.color = "gold";
        document.getElementById('blk'+i).setAttribute("contentEditable", false);
      }
    }
    if (seconds < 10) {
      seconds = "0"+seconds.toString()
    }
    var timeSave = document.createElement("p");
    timeSave.innerHTML = +minutes+" min   "+seconds+" sec";
    timeSave.className = "announcement timer timerz";
    mainTitle.innerHTML = "Puzzle Conquered!";
    mainTitle.style.color = "firebrick";
    topDiv.removeChild(topDiv.children[1]);
    topDiv.insertBefore(timeSave, topDiv.children[1]);
    stillPlaying = false;
  }
}

function easyButton(){
  selectPuzzle("easy");
  build(blockString); menuSwap(); gameTimerPlace();
  return key, blockString;
}
function mediumButton(){
  selectPuzzle("medium");
  build(blockString); menuSwap(); gameTimerPlace();
  return key, blockString;
}
function hardButton(){
  selectPuzzle("hard");
  build(blockString); menuSwap(); gameTimerPlace();
  return key, blockString;
}
function xHardButton(){
  selectPuzzle("xHard");
  build(blockString); menuSwap(); gameTimerPlace();
  return key, blockString;
}

function menuSwap(){
  topDiv.style.display = "block";
  bp.style.display = "none";
  mainTitle.style.color = "rgba(0,0,0,0.0)";
}

function newGameWarning(){
  if(confirm("\n!**! WARNING !**!\n\nIf you start a new game you will lose all progress on this Puzzle....\n\n CONINUE?")){
    stillPlaying = false;
    menuSwapBack()
  }
}

stillPlaying = true; // this disables the user alert if it is FALSE. for when user wins.
function menuSwapBack() {
  if (stillPlaying){ newGameWarning();  return; }
  mainTitle.innerHTML = "Sudoku";
  while (blkH.hasChildNodes()){
    blkH.removeChild(blkH.lastChild);
  }
  blankBuild();
  topDiv.style.display = "none";
  bp.style.display = "block";
  mainTitle.style.color = "firebrick";
  stillPlaying = true;
}

//create the function that sets the timer.
var interval; // this var interval needs to be created before function and not in funtion. matters, don't know why.
function resetInterval(){
  var seconds = 0;
  var minutes = 0;
  clearInterval(interval);
  interval = setInterval(function() { gameTimer(); }, 1000);
}

function gameTimer(){
  seconds += 1;
  if (seconds === 60) {
    minutes += 1; seconds = 0;
  }
  strsec = seconds;
  if (seconds < 10) {
    strsec = "0"+seconds.toString()
  }
  document.getElementById('timer_div').innerHTML = minutes+":"+strsec;
}

function gameTimerPlace(){
  topDiv.removeChild(topDiv.lastChild)
  resetInterval();
  seconds = 0;
  minutes = 0;
  var timer = document.createElement("div");
  timer.className = "announcement timer";
  timer.id = "timer_div";
  timer.appendChild(document.createTextNode("0:00"));
  topDiv.appendChild(timer);
}
