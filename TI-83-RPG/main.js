var svgElement = "http://www.w3.org/2000/svg";

var id = 0;
var t = [];
var listData = {};
var namesArr = [];
var names = [ ['Scartle','M'], ['Rombus','M'], ['Flambough','F'], ['Comma','A'],
              ['Cupbert','M'], ['Sadle','F'], ['Krazter','M'], ['Lemmen','A'],
              ['Pradabumblom','A'], ['Mrambkle','AM'], ['Slopbrough','F'], ['Azhenchin','F'],
              ['Ein','AM'], ['Laxicom','M'], ['Riiiiin','A'], ['Uun','A'] ];

function TI(name, sex){
  this.name = name;
  var all = [];
  all.push(this.spd = random(0,100)), //speed
  all.push(this.stg = random(0,100)), //strangth
  all.push(this.exp = random(0,100)), //experience
  all.push(this.itl = random(0,100)), //intelligence
  all.push(this.edr = random(0,100)), //Endurance
  all.push(this.chg = random(0,100)), //Coaching
  all.push(this.wpw = random(0,100)), //Will Power (tie-breaker)
  this.rat = Math.round(((all.reduce(function add(a, b){return a+b}, 0))/all.length)*10)/100; //changes when Win/Loss.
  this.record = [0,0];
  this.sex = sex;
  this.id = 'TI#'+id++;
}

for (var i = 0; i < names.length; i++){
  t[i] = new TI(names[i][0],names[i][1]);
  var str = '<tr>'
  for (var j = 0; j < Object.keys(t[i]).length; j++){
    str += '<td>'+t[i][Object.keys(t[i])[j]]+'</td>';
    if (!listData[Object.keys(t[i])[j]]){
      listData[Object.keys(t[i])[j]] = [];
    }
    listData[Object.keys(t[i])[j]].push(t[i][Object.keys(t[i])[j]]);
  }
  listAll.innerHTML += str+'</tr>';
}
nameCnt.innerHTML += t.length;
// these could be done in a loop if you really wanted....
spdAve.innerHTML = 'average<br>'+Math.round(((listData.spd.reduce(function add(a, b){return a+b}, 0))/listData.spd.length));
stgAve.innerHTML = 'average<br>'+Math.round(((listData.stg.reduce(function add(a, b){return a+b}, 0))/listData.stg.length));
expAve.innerHTML = 'average<br>'+Math.round(((listData.exp.reduce(function add(a, b){return a+b}, 0))/listData.exp.length));
itlAve.innerHTML = 'average<br>'+Math.round(((listData.itl.reduce(function add(a, b){return a+b}, 0))/listData.itl.length));
edrAve.innerHTML = 'average<br>'+Math.round(((listData.edr.reduce(function add(a, b){return a+b}, 0))/listData.edr.length));
chgAve.innerHTML = 'average<br>'+Math.round(((listData.chg.reduce(function add(a, b){return a+b}, 0))/listData.chg.length));
wpwAve.innerHTML = 'average<br>'+Math.round(((listData.wpw.reduce(function add(a, b){return a+b}, 0))/listData.wpw.length));
ratAve.innerHTML = 'average<br>'+Math.round(((listData.rat.reduce(function add(a, b){return a+b}, 0))/listData.rat.length)*100)/100;

var top1;
var bot1;

window.onload = function () {
  ratCol.click();
  namesArr = listData.name;
  top1 = randomSetSpar('sparTopName','sparTopText');
  bot1 = randomSetSpar('sparBotName','sparBotText');
}
/*------------------------------------------------------------------------------
**********                          SPAR                              **********
------------------------------------------------------------------------------*/

function randomSetSpar(input, text){
  var randCharIndex = random(0,namesArr.length-1);
  var fighter = getIndex(namesArr[randCharIndex]);
  namesArr = remove(namesArr, randCharIndex);
  document.getElementById(input).value = fighter.name;
  document.getElementById(text).innerHTML = fighter.rat;
  return fighter;
}

function fight(){
  console.log(top1, bot1);
  var r1 = random(-20,20)+random(-20,20)+random(-20,20);
  console.log(r1);
}



/*------------------------------------------------------------------------------
**********                 COMMONLY USED FUNTIONS                     **********
------------------------------------------------------------------------------*/
function getIndex(name){
  for (var i = 0; i < t.length; i++){
    if (name === t[i].name){
      return t[i];
    }
  }
}

function remove(arr, ind){
  var head = arr.slice(0,ind);
  var tail = arr.slice(ind+1, arr.length);
  arr = head.concat(tail);
  return arr;
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
