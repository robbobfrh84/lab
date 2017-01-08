/*------------------------------------------------------------------------------
**********                          SPAR                              **********
------------------------------------------------------------------------------*/

var top1;
var bot1;

window.onload = function () {
  ratCol.click();
  namesArr = listData.name;
  top1 = randomSetSpar('sparTopName','sparTopText');
  bot1 = randomSetSpar('sparBotName','sparBotText');
  console.log('Top',top1);
  console.log('Bot',bot1);
}

function randomSetSpar(input, text){
  var randCharIndex = random(0,namesArr.length-1);
  var f = getIndex(namesArr[randCharIndex]);
  var s = f.skills
  namesArr = remove(namesArr, randCharIndex);
  document.getElementById(input).value = f.name;
  document.getElementById(text).innerHTML = f.rat+'  -- < '+f.skills.speed+' , '
  +s.strangth+' , '+s.experience+' , '+s.intelligence+' , '+s.endurance+' , '
  +s.coaching+' , '+s.willPower+' >';
  return f;
  // !!!!! namesArr = listData.name; //repopulates possible fighters use depending on bracket
}

function fight(){
  // !!!!! namesArr = listData.name; //repopulates possible fighters use depending on bracket
  var topCnt = 0;
  var botCnt = 0;
  for (var key in top1.skills) {
    var r1 = r3(), r2 = r3();
    var skill = key+': '+top1.skills[key]+'+('+r1+') --vs-- '+bot1.skills[key]+'('+r2+')';
    if (top1.skills[key]+r1 > bot1.skills[key]+r2) {
      console.log(skill+' '+top1.name, ' WINS');
      topCnt++;
    } else if (top1.skills[key]+r1 < bot1.skills[key]+r2){
      console.log(skill+' '+bot1.name, 'WINS');
      botCnt++;
    } else {
      console.log('TIE');
    }
  }
  console.log(top1.name+'-'+topCnt+' '+bot1.name+'-'+botCnt);
}
