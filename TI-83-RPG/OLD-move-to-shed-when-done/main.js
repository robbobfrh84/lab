//NOTES NOTES NOTES
// looks like your forms need to be populated in the t[i] build loop..... so it's not really riot.js...


var svgElement = "http://www.w3.org/2000/svg";

var id = 0;
var t = [];
var listData = {}; listData.rat = []; listData.name = [];
var namesArr = [];
var names = [ ['Scartle','M'], ['Rombus','M'], ['Flambough','F'], ['Comma','A'],
              ['Cupbert','M'], ['Sadle','F'], ['Krazter','M'], ['Lemmen','A'],
              ['Pradabumblom','A'], ['Mrambkle','AM'], ['Slopbrough','F'], ['Azhenchin','F'],
              ['Ein','AM'], ['Laxicom','M'], ['Riiiiin','A'], ['Uun','A'], ['Gerice','M'], ['Slowberblow','M'] ];

function TI(name, sex){ // Random Fighter Object
  this.name = name;
  // all.push(this.spd = random(0,100)), //speed
  // all.push(this.stg = random(0,100)), //strangth
  // all.push(this.exp = random(0,100)), //experience
  // all.push(this.itl = random(0,100)), //intelligence
  // all.push(this.edr = random(0,100)), //Endurance
  // all.push(this.chg = random(0,100)), //Coaching
  // all.push(this.wpw = random(0,100)), //Will Power (tie-breaker)
  // honestly, probably shoudn't have rating in object. cuz when a rating chagnes, it won't change in rat. should be handled for displays only. it's just math.
  this.skills = {
    speed : random(0,100),
    strangth : random(0,100),
    experience : random(0,100),
    intelligence : random(0,100),
    endurance : random(0,100),
    coaching : random(0,100),
    willPower : random(0,100)
  }
  this.rat = getRating(this.skills); //changes when Win/Loss.
  this.record = { win : 0, loss : 0 };
  this.sex = sex;
  this.id = 'TI#'+id++;
  this.status = 'active';
}

function getRating(obj){ //calculates average skills * .1
  var all = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      all.push(obj[key]);
    }
  }
  return Math.round(((all.reduce(function add(a, b){return a+b}, 0))/all.length)*10)/100;
}

for (var i = 0; i < names.length; i++){ // generats random fighters & builds average objec
  t[i] = new TI(names[i][0],names[i][1]);
  var str = '<tr>'
  for (var j = 0; j < Object.keys(t[i].skills).length; j++){
    str += '<td>'+t[i][Object.keys(t[i].skills)[j]]+'</td>';
    if (!listData[Object.keys(t[i].skills)[j]]){
      listData[Object.keys(t[i].skills)[j]] = [];
    }
    listData[Object.keys(t[i].skills)[j]].push(t[i].skills[Object.keys(t[i].skills)[j]]);
  }
  listData.rat.push(t[i].rat);
  listData.name.push(t[i].name);
  listAll.innerHTML += str+'</tr>';
}
// AHH SHIT: might have ruin what idea i had before. really we just want an object that has arrays of all values. I stripped it to just include array of the value for all. CAN do it by a recursive func....
nameCnt.innerHTML += t.length;
// these could be done in a loop if you really wanted....maybe better to keep like this...idk...
spdAve.innerHTML = 'average<br>'+Math.round(((listData.speed.reduce(function add(a, b){return a+b}, 0))/listData.speed.length));
stgAve.innerHTML = 'average<br>'+Math.round(((listData.strangth.reduce(function add(a, b){return a+b}, 0))/listData.strangth.length));
expAve.innerHTML = 'average<br>'+Math.round(((listData.experience.reduce(function add(a, b){return a+b}, 0))/listData.experience.length));
itlAve.innerHTML = 'average<br>'+Math.round(((listData.intelligence.reduce(function add(a, b){return a+b}, 0))/listData.intelligence.length));
edrAve.innerHTML = 'average<br>'+Math.round(((listData.endurance.reduce(function add(a, b){return a+b}, 0))/listData.endurance.length));
chgAve.innerHTML = 'average<br>'+Math.round(((listData.coaching.reduce(function add(a, b){return a+b}, 0))/listData.coaching.length));
wpwAve.innerHTML = 'average<br>'+Math.round(((listData.willPower.reduce(function add(a, b){return a+b}, 0))/listData.willPower.length));
ratAve.innerHTML = 'average<br>'+Math.round(((listData.rat.reduce(function add(a, b){return a+b}, 0))/listData.rat.length)*100)/100;

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

function r3(){
  return (random(-20,20)+random(-20,20)+random(-20,20));
}

/*------------------------------------------------------------------------------
**********                 API / PUBNUB                     **********
------------------------------------------------------------------------------*/

// uncomment out the call of pub(t) to reset charactors.
var pubnub = PUBNUB.init({
    publish_key: 'pub-c-2d05fb4b-b891-4a99-97cc-e76315368262',
    subscribe_key: 'sub-c-e7bd0e06-be7c-11e6-9868-02ee2ddab7fe',
    error: function (error) {
        console.log('Error:', error);
    }
})

pubnub.subscribe({
    channel : "testdata",
    message : function (testdata) {
        console.log("Message Received.", testdata)
    },
    connect : pub // This calls a function after subscribe sucessfull
})

var returnData; //

pubnub.history({
    channel : 'testdata',
    callback : function(m){
        console.log('h=Hist,..',m)
        returnData = m;
    },
    count : 100, // 100 is the default
    reverse : false // false is the default
});

function pub(data) {
    pubnub.publish({
        channel : "testdata",
        message : data,
        callback : function(m){
            console.log('published',m)
        }
    })
}
//pub(t);
