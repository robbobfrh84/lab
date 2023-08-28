var browser = 'unknown';
if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
  browser = "Opera";}
if (typeof InstallTrigger !== 'undefined'){
  browser = 'Firefox';}
if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
  browser = 'Safari';}
if (/*@cc_on!@*/false || !!document.documentMode){
  browser = 'Internet Explorer';}
if(!!window.chrome && !!window.chrome.webstore){
  browser = 'Crome';}
//console.log('Browser: '+browser);

var fullpage = document.getElementById('mainSVG');

//-------------------------------------------------------Fadein main background--------------------
fadeIn(fullpage, 'opacity', 0.05,0,1);

//--------------------------------------------------------Place background grid--------------------
if (browser !== 'Safari'){drawGrid(40,40,0.25,0.75,1.5,'rgba(102,155,235,0.8)');
}else{drawGrid(40,40,2,2,2,'rgba(102,155,235,0.2)');}

//--------------------------------declare main object variables created in HTML--------------------
var introBlock=[]; var copyBlock=[]; var proBlock=[];
var uploadDone = false; var noAnim = false;

//SEEMS TO BE MORE TROUBLE BOUNCING UP HERE TO GET IDS, prob just move back where they're appended.
var bobMain = document.getElementById('bobMain');
var bobMainS = document.getElementById('bobMainS');
var infoBox = document.getElementById('infoBox');
var bulletBox = document.getElementById('bulletBox');
var mediaBox = document.getElementById('mediaBox');
var mediaSLeft = document.getElementById('mediaSLeft');
var mediaSRight = document.getElementById('mediaSRight');
var allBoxShadeTop = document.getElementById('allBoxShadeTop');
var allBoxShadeBot = document.getElementById('allBoxShadeBot');

//--------------------------------------------FadeIn intro and Copyright text--------------------
function placetextBoxes(x,y,size,text,block){
  for (var i = 0; i < text.length; i++){
    block[i] = createBlockText((i*x)+0.6,y,size,0,'rgba(0,0,0,0.5)'
    ,'inBk'+i, 'allIntro', text[i]);
  }
  setTimeout(function(){arreyFade(block, 0.02, 0, 1);},500);
}
const year = new Date().getFullYear()
console.log(year)
placetextBoxes(2.5,1.8,16,'  A Journal & Presentation of Projects  ',introBlock);
placetextBoxes(2.505,96.8,12,'            © '+year+' Bob Main',copyBlock);

//--------------------------------------------------------Draw intro underline--------------------
var introL=createLine(50,2.5,2.5,2.5,2,'rgb(150,150,150)','introL',0);
setTimeout(function(){linePulse(50,2.5,2.5,2.5,introL,true,0.2,1.03,'none');},300);
var introR=createLine(50,2.5,97.5,2.5,2,'rgb(150,150,150)','introR',0);
setTimeout(function(){linePulse(50,2.5,97.5,2.5,introR,true,0.2,1.03,'none');},300);
//----------------------------------------------------------fadeIn Bob Main box--------------------
var nameBox = createRect(40,2.5,20,5,'rgb(220,220,220)',0,'none',0,'nameBox');
setTimeout(function(){fadeIn(nameBox, 'opacity', 0.05, 0, 0.3);},100);

//-----------------------------------------------------FadeIn By Bob Main Lines--------------------
var undBob = createLine(50,7.5,40,7.5,2,'rgb(150,150,150)','undBob',0);
setTimeout(function(){linePulse(50,7.5,40,7.5,undBob,true,0.2,1.05,'none');},800);
var undMain = createLine(50,7.5,40,7.5,2,'rgb(150,150,150)','undMain',0);
setTimeout(function(){linePulse(50,7.5,60,7.5,undMain,true,0.2,1.05,'none');},800);
var lBob = createLine(40,7.5,40,2.5,2,'rgb(150,150,150)','lBob',0);
setTimeout(function(){linePulse(40,7.5,40,2.5,lBob,true,0.2,1.05,'none');},1000);
var rBob = createLine(60,7.5,60,2.5,2,'rgb(150,150,150)','rBob',0);
setTimeout(function(){linePulse(60,7.5,60,2.5,rBob,true,0.2,1.05,'none');},1000);

//----------------------------------------------------------FadeIn By Bob Main--------------------
setTimeout(function(){fadeIn(bobMain, 'opacity', 0.01, 0, 0.8);},1000);
setTimeout(function(){fadeIn(bobMainS, 'opacity', 0.02, 0, 0.5);},1000);
mainSVG.appendChild(bobMainS); mainSVG.appendChild(bobMain);

//------------------------------------------------------------FadeIn DropShadow--------------------
setTimeout(function(){fadeIn(fullpage, 'box-shadow', 0.03, 0, 1);},3000);

//-------------------------------Create Link buttons & icons with blowup effect--------------------
createBtn('angel', 'angelCir');
createBtn('about', 'aboutCir');
createBtn('contact', 'contactCir');
createBtn('linkedin', 'linkedinCir');
createBtn('codepen', 'codepenCir');
createBtn('insta', 'instaCir');
createBtn('git', 'gitCir');
createBtn('twit', 'twitCir');
setTimeout(function(){blowUp(angel,angelCir,2,3,0,100);},2250);
setTimeout(function(){blowUp(about,aboutCir,2,3,0,100);},2500);
setTimeout(function(){blowUp(contact,contactCir,2,3,0,100);},2750);
setTimeout(function(){blowUp(linkedin,linkedinCir,2,3,0,100);},3000);
setTimeout(function(){blowUp(codepen,codepenCir,2,3,0,100);},3000);
setTimeout(function(){blowUp(insta,instaCir,2,3,0,100);},2750);
setTimeout(function(){blowUp(git,gitCir,2,2,0,100);},2500);
setTimeout(function(){blowUp(twit,twitCir,2,3,0,100);},2250);



//----------------------------------Create background areas for rolling content--------------------
mainSVG.appendChild(infoBox);
mainSVG.appendChild(allBoxShadeTop);
mainSVG.appendChild(allBoxShadeBot);
setTimeout(function(){fadeIn(infoBox, 'opacity', 0.01, 0, 0.25);},800);
setTimeout(function(){fadeIn(allBoxShadeTop, 'opacity', 0.001, 0, 0.2);},2000);
setTimeout(function(){fadeIn(allBoxShadeBot, 'opacity', 0.001, 0, 0.3);},2000);


//-----------------------------------Create Main Skill buttons with line effect--------------------
// mainSVG.appendChild(webText);
var webWin = createRect(0,10,25,2.6,'rgb(220,220,220)',0,'none',0,'webWin');
createBarBtn(0,webWin,[0,12.5,25,12.5],webBox,'l',0.75,1.15,0.75,1.15);

// mainSVG.appendChild(micText);
var micWin = createRect(25,10,25,2.6,'rgb(220,220,220)',0,'none',0,'micWin');
createBarBtn(1,micWin,[25,12.5,50,12.5],micBox,'l',0.75,1.15,0.75,1.15);

// mainSVG.appendChild(desText);
var desWin = createRect(50,10,25,2.6,'rgb(220,220,220)',0,'none',0,'desWin');
createBarBtn(2,desWin,[50,12.5,75,12.5],desBox,'r',0.75,1.15,0.75,1.15);

// mainSVG.appendChild(wooText);
var wooWin = createRect(75,10,25,2.6,'rgb(220,220,220)',0,'none',0,'wooWin');
createBarBtn(3,wooWin,[75,12.5,100,12.5],wooBox,'r',0.75,1.15,0.75,1.15);
var allskills = document.getElementById('allskills');
setTimeout(function(){fadeIn(allskills, 'opacity', 0.02,0,1);},1000);

//-------------------------------------------------------------------------------------------------
//----------         PROJECTS, PROJECT BAR LAYOUT & LANDING PAGE QUERY       ----------------------
//-------------------------------------------------------------------------------------------------

var projln = createLine(5,55,95,55,3,'rgba(0,0,0,0.5)','projln',0);
var leftDot = createCir(5.1,55,0.5,'rgba(120,120,120,1)',0,'rgba(120,120,120,1)',0,'leftDot');
var rightDot = createCir(95.1,55,0.5,'rgba(120,120,120,1)',0,'rgba(120,120,120,1)',0,'rightDot');
mainSVG.appendChild(projln);
mainSVG.appendChild(leftDot);
mainSVG.appendChild(rightDot);

var skillsArr = [webWin,micWin,desWin,wooWin];
var skillsBox = [webBox,micBox,desBox,wooBox];
var skillsTxt = [webText,micText,desText,wooText];
var dropL = createRect(5,15,0.3,40,'url(#linGrad)',0,'none',0,'dropL');
var dropR = createRect(95,15,0.3,40,'url(#linGrad)',0,'none',0,'dropR');
var dropL0 = createLine(12.5,12.7,12.5,15.1,6,'rgb(220,220,220)','dropL0',0);
var dropL1 = createLine(12.5,15,5,15,3,'rgb(220,220,220)','dropL1',0);

var queryString = window.location.href.split('?')[1];
console.log("Query String", queryString);
if (queryString){
  queryString = queryString.split('%20');
  queryString = queryString.join(' ');
}

var landSkill = 0;
var landProj = 0;
for (var i = 0; i < skills.length; i++){
  for (var j = 0; j < skills[i].projects.length; j++){
    if (queryString === skills[i].projects[j].name){
      console.log("Skill@: "+i+"Proj@: "+j);
      landSkill = i;
      landProj = j;
    }
  }
}

var oldPos;
var sCnt = landSkill;
landProj === 0 ? oldPos = 1 : oldPos = 0;
var landDir = document.getElementById(skillsArr[landSkill].id)
setTimeout(function(){landDir.onmousedown(); uploadDone = true; },1800);
//...vvv OLD generic open @Skill 0 Project 0; Can delete after rigarous testing.....
//setTimeout(function(){webWin.onmousedown(); uploadDone = true; },1800);
var hideMorse = true;
morUpE();
setTimeout(function(){fadeIn(myCarousel, 'opacity', 0.02,0,1);},2000);
setTimeout(function(){fadeIn(toolsIcon, 'opacity', 0.02,0,0.15);},1000);

// --------- NOTES ---------
// - Fade offset left-to-right in the box dispaly intro.
// - I LIKE THE Idea of the solid color with drop shaddow for main stuff...
// - underline balls on ends?
// - already visited links change button's fill color.
//
