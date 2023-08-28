 var svgElement = 'http://www.w3.org/2000/svg';
////////////////////////////////////////////////////////////////////       ///////////////////////////////////////
/////////      CREATE SVG BACKGOURND GRID       ////////////////////       ///////////////////////////////////////
////////////////////////////////////////////////////////////////////       ///////////////////////////////////////
function drawGrid(numVLines,numHLines,thin,fifth,tenth,color){
  lines = (100/numVLines);
  hlines = (100/numHLines);
  for (var i = 1; i < numVLines; i++) {
    fat = thin;
    if(i%5===0){
      fat=fifth;
    }
    if(i%10===0||i===0){
      fat=tenth;
    }
    createLine(lines*i, 0 ,lines * i, 100, fat, color, 'vert'+i);
  }
  for (var i = 1; i < numHLines; i++){ fat = thin;
    if(i%5===0){fat=fifth;} if(i%10===0||i===0){fat=tenth;}
    createLine(0,hlines*i,100,hlines*i,fat,color,'horiz'+i);}}

function createBlockText(x,y,size,opacity,color,txID,elClass,text){
  var txID = createEl('mainSVG','text',[['x',x+'%'],['y',y+'%'],['font-size',size]
  ,['opacity',opacity],['fill',color],['class',elClass],['id',txID]]);
  txID.appendChild(document.createTextNode(text)); return txID; }

function createLine(x1,y1,x2,y2,width,color,lnID,opacity){
  var newEl = createEl('mainSVG','line',[['id',lnID],['stroke-width',width],['stroke',color]
    ,['x1',x1+'%'],['y1',y1+'%'],['x2',x2+'%'],['y2',y2+'%'],['opacity',opacity]]); return newEl;}

function createPath(path, width, color, arcID){
  createEl('mainSVG','path',[['id', arcID],['stroke-width',width],['stroke',color]
  ,['d',path],['fill', 'none']])}

function createRect(x,y,width,height,fill,bordWidth,bordColor,opacity, recID){
  var newEl = createEl('mainSVG','rect',[['id',recID],['stroke-width',bordWidth+'%']
  ,['stroke',bordColor],['x',x+'%'],['y', y+'%'],['width',width+'%'],['height',height+'%']
  ,['opacity', opacity],['fill',fill]]); return newEl;}

function createCir(cx,cy,r,fill,bordWidth,bordColor,opacity, cirID){
  var newEl = createEl('mainSVG','circle',[['id',cirID],['stroke-width',bordWidth+'%']
  ,['stroke',bordColor],['cx',cx+'%'],['cy', cy+'%'],['r',r+'%']
  ,['opacity', opacity],['fill',fill]]); return newEl;}

function createEl(container,type,att){
  var newObj = document.createElementNS(svgElement, type);
  for (var i=0; i<att.length; i++){ newObj.setAttributeNS(null, att[i][0],att[i][1]); }
  document.getElementById(container).appendChild(newObj); return newObj; }

function updateSVG(elm, att) {
  for (var i=0; i<att.length; i++){
    elm.setAttributeNS(null, att[i][0],att[i][1]);}}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////          BUTTONS & HOVERS        //////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createBtn(btn, cir){ var on = false;
  var btn = document.getElementById(btn); mainSVG.appendChild(btn);
  var cir = document.getElementById(cir);
  btn.onmouseover = function(){
    var r = parseFloat(cir.getAttribute('r'));
    if (on === false){
      cir.style.fill = 'rgb(210,210,210)'; cir.style.r = (r*1.3)+'%';
      blowUp(btn,cir,1,2,75,100); on = true;}}
  btn.onmouseleave = function(){
    var r = cir.getAttribute('r');
    cir.style.fill = 'rgb(230,230,230)';cir.style.r = r; on = false;}}

function createBarBtn(position,btn,l,box,drop,speed1,ramp1,speed2,ramp2){
  var onLine = createLine(l[0],l[1],l[2],l[3],3,'rgb(220,220,220)','onLine'+position,0);
  var offLine = createLine(l[0],l[1],l[2],l[3],3,'rgb(220,220,220)','offLine'+position,0);
  var goldLine = createLine(l[0],l[1],l[2],l[3],5,'rgb(184,134,11)','goldLine'+position,0);
  btn.onmouseover = function(){
    linePulse(l[0],l[1],l[2],l[3],onLine,true,speed1,ramp1,'none');
    box.style.fill = 'rgb(200,200,210)';}
  btn.onmouseleave = function(){
    $('#myCarousel').carousel('cycle');
    onLine.setAttributeNS(null, 'opacity', 0); offLine.setAttributeNS(null, 'opacity', 1);
    linePulse(l[0],l[1],l[2],l[3],offLine,false,speed2,ramp2,'none');
    if (btn.id === 'webWin' || btn.id === 'desWin' ){ box.style.fill = 'url(#grad1)';
  } else { box.style.fill = 'url(#grad2)';}}
  btn.onmousedown = function(){ returnMainContent();
    dropL0.setAttributeNS(null, 'opacity', 0);
    dropL1.setAttributeNS(null, 'opacity', 0);
    if(position===0){ leftDrop();
      if (uploadDone){manualClick(allSkills);}
      dropL0.setAttributeNS(null,'x1',12.5+'%');
      dropL0.setAttributeNS(null,'x2',12.5+'%');
      linePulse(12.5,12.7,12.5,15.1,dropL0,true,0.5,1.15,'none');
      dropL1.setAttributeNS(null, 'x1', 12.5+'%');
      linePulse(12.5,15,5,15,dropL1,true,0.5,1.15,'none');
    }
    if(position===1){
      if (uploadDone){manualClick(allSkills);}
      dropL0.setAttributeNS(null, 'x1', 37.5+'%');
      dropL0.setAttributeNS(null, 'x2', 37.5+'%');
      linePulse(37.5,12.7,37.5,15.1,dropL0,true,0.5,1.15,'none');
      dropL1.setAttributeNS(null, 'x1', 37.5+'%');
      dropR.setAttributeNS(null, 'opacity', 0);
      dropL.setAttributeNS(null, 'opacity', 0);
      linePulse(37.5,15,5,15,dropL1,true,0.5,1.15,leftDrop);
    }
    if(position===2){
      if (uploadDone){manualClick(allSkills);}
      dropL0.setAttributeNS(null, 'x1', 62.5+'%');
      dropL0.setAttributeNS(null, 'x2', 62.5+'%');
      linePulse(62.5,12.7,62.5,15.1,dropL0,true,0.5,1.15,'none');
      dropL1.setAttributeNS(null, 'x1', 62.5+'%');
      dropL1.setAttributeNS(null, 'x2', 95.3+'%');
      dropR.setAttributeNS(null, 'opacity', 0);
      dropL.setAttributeNS(null, 'opacity', 0);
      linePulse(62.5,15,95.3,15,dropL1,true,0.5,1.15,rightDrop);
    }
    if(position===3){ rightDrop();
      if (uploadDone){manualClick(allSkills);}
      dropL0.setAttributeNS(null, 'x1', 87.5+'%');
      dropL0.setAttributeNS(null, 'x2', 87.5+'%');
      linePulse(87.5,12.7,87.5,15.1,dropL0,true,0.5,1.15,'none');
      dropL1.setAttributeNS(null, 'x1', 87.5+'%');
      dropL1.setAttributeNS(null, 'x2', 95.3+'%');
      linePulse(87.5,15,95.3,15,dropL1,true,0.5,1.15,'none');
    }
    if (uploadDone){
      projSwap(0,false,position);
      swapProjs(1,true,position);
    } else {
      projSwap(landProj,false,position);
      swapProjs(1,true,landSkill);
    }
  }
}

function leftDrop(){
  dropL.setAttributeNS(null, 'opacity', 1);
  dropR.setAttributeNS(null, 'opacity', 0);
  elmAnimate(dropL,'height',1.001,1.03,'%',0,40,'none');}
function rightDrop(){
  dropR.setAttributeNS(null, 'opacity', 1);
  dropL.setAttributeNS(null, 'opacity', 0);
  elmAnimate(dropR,'height',1.001,1.03,'%',0,40,'none');}

prevAP.onmouseover = function(){
  if(sCnt===0){var x=skills.length-1}else{var x=sCnt-1;}
  regElmAnimate(prevA, 'opacity', 0.05, 1, '', 0.1, 1,'none');}
prevAP.onmouseleave = function(){
  if(sCnt===0){var x=skills.length-1}else{var x=sCnt-1;}
  regElmAnimate(prevA, 'opacity', 0.05, 1, '', 1, 0.4,'none');}
nextAP.onmouseover = function(){
  if(sCnt===skills.length-1){var x=0}else{var x=sCnt+1;}
  regElmAnimate(nextA, 'opacity', 0.05, 1, '', 0.1, 1,'none');}
nextAP.onmouseleave = function(){
  if(sCnt===skills.length-1){var x=0}else{var x=sCnt+1;}
  regElmAnimate(nextA, 'opacity', 0.05, 1, '', 1, 0.4,'none');}

about.onmousedown = function aboutMe(){
  projln.style.opacity= 0;
  displaySwitch('hidden',['myCarousel','projBar','infotoolsSVG','goldLine'+sCnt
  ,'dropL','dropR','dropL0','dropL1','contactMeText','contactData','projInfo']);
  if (sCnt%2 === 0){ skillsBox[sCnt].style.fill = 'url(#grad1)';
  } else { skillsBox[sCnt].style.fill = 'url(#grad2)';}
  //skillsBox[sCnt].style.opacity = 0.75;
  skillsBox[sCnt].style.filter = 'none';
  mainSVG.insertBefore(skillsBox[sCnt],vert1);
  displaySwitch('visible',['bobIcon','aboutMeText']); hideMorse = true;
}
contact.onmousedown = function contactMe(){

  projln.style.opacity= 0;
  displaySwitch('hidden',['myCarousel','projBar','infotoolsSVG','goldLine'+sCnt
  ,'dropL','dropR','dropL0','dropL1','aboutMeText','bobIcon','projInfo']);
  if (sCnt%2 === 0){ skillsBox[sCnt].style.fill = 'url(#grad1)';
  } else { skillsBox[sCnt].style.fill = 'url(#grad2)';}
  //skillsBox[sCnt].style.opacity = 0.75;
  skillsBox[sCnt].style.filter = 'none';
  mainSVG.insertBefore(skillsBox[sCnt],vert1);
  displaySwitch('visible',['morBase','morUp','morDown','contactMeText','contactData']);
  hideMorse = false;
}

function displaySwitch(state,elmsId){
  for (var i = 0; i < elmsId.length; i++){
    document.getElementById(elmsId[i]).setAttribute('style','visibility: '+state+';');}}

function returnMainContent(){ hideMorse = true;
  projln.style.opacity= 0.8;
  // skillsBox[sCnt].setAttributeNS(null, 'visibility','visible');
  displaySwitch('visible',['myCarousel','projBar','infotoolsSVG','goldLine'+sCnt
  ,'dropL','dropR','dropL0','dropL1','projInfo']);
  displaySwitch('hidden',['bobIcon','aboutMeText','contactMeText','contactData']);
  if (typeof slide1VideoElm !== 'undefined'){
    document.getElementById('slide1Div').removeChild(slide1VideoElm);}}

function swapProjs(dir,fade,position){
  console.log("anima.js: ",dir,fade,position);
  if (uploadDone){
    var goldLine = document.getElementById('goldLine'+sCnt);
    if (goldLine.getAttribute('opacity') < 1){
      goldLine.setAttributeNS(null,'opacity','start');
    } else { console.log('else');
      goldLine.setAttributeNS(null,'opacity',0);}}
  if (sCnt%2 === 0){
    skillsBox[sCnt].style.fill = 'url(#grad1)';
  } else {
    skillsBox[sCnt].style.fill = 'url(#grad2)';}
  skillsBox[sCnt].style.filter = 'none';
  //skillsBox[sCnt].style.opacity = 0.75;
  mainSVG.insertBefore(skillsBox[sCnt],vert1);
  sCnt=position;
  // if (position === 'n'){ sCnt+=dir;}else{sCnt=position;}
  // if (sCnt >= skills.length){ sCnt=0;} if (sCnt <= -1){ sCnt=skills.length-1;}
  elmAnimate(document.getElementById('goldLine'+sCnt), 'opacity', 0.01, 1,'',0,1,'none');
  if (fade) {
    mainSVG.appendChild(skillsBox[sCnt]);
    mainSVG.appendChild(skillsTxt[sCnt]);
    mainSVG.appendChild(skillsArr[sCnt]);
    skillsBox[sCnt].style.filter = 'url(#dropShad)';
    elmAnimate(skillsBox[sCnt], 'opacity', 0.01, 1,'',0,0.75,'none');
    if (projBar.getAttribute('opacity') < 1){
    if(!noAnim){ reSetProj(); }
    } else {
      if(!noAnim){ regElmAnimate(projBar,'opacity',0.01, 1.1,'',1,0,reSetProj);}
    }
    if (projInfo.getAttribute('opacity') >= 1){
      //regElmAnimate(projInfo,'opacity',0.03, 1.1,'',1,0,'none');
    }
    //regElmAnimate(projInfo,'opacity',0.03, 1.1,'',1,0,'none');
  }else{ reSetProj();}}

function reSetProj(){
  var numOfProjs = skills[sCnt].projects.length;
  for(var i = 0; i < 5; i++){
    if (i >= numOfProjs){
      document.getElementById('proj'+i).style.display = 'none';
    } else {
      document.getElementById('proj'+i).style.display = 'inline-block';
      document.getElementById('proj'+i).innerHTML = skills[sCnt].projects[i].name;}}
    regElmAnimate(projBar, 'opacity', 0.01, 1.05, '', 0, 1,reCar);
}

function reCar(){
  regElmAnimate(myCarousel, 'opacity', 0.05, 1, '', 0, 1,'none');
  regElmAnimate(projInfo,'opacity',0.05, 1,'',0,1,'none');
}

function manualClick(allSkills){
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
    var elID = document.getElementById("elID");
    allSkills.dispatchEvent(evt);}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////          ANIMATION STATION          /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
function elmAnimate(elID, elm, speed, ramp, unit, start, end, func){ var loc = start;
  function go(){ speed*=ramp;
    if (elID.getAttribute(elm) === 'start'){ elID.setAttributeNS(null, elm, 0);
      return;}
    if (start < end){ loc+=speed; } else { loc-=speed; }
    elID.setAttributeNS(null, elm, loc+unit);
    if (start < end && loc <= end){ requestAnimationFrame(go); }
    else if (start > end && loc >= end){ requestAnimationFrame(go); }
    else { if (func !== 'none') { func(); } elID.setAttributeNS(null, elm, end+unit);
    return; }} go();}

function regElmAnimate(elID, elm, speed, ramp, unit, start, end, func){ var loc = start;
  function go(){
    if (elID.style.visibility === 'hidden'){
      return;}
    speed*=ramp;
    if (start < end){ loc+=speed; } else { loc-=speed; }
    if (unit[0]+unit[1]+unit[2] === 'rgb'){
    elID.setAttribute('style', elm+': '+unit+loc+');');
    } else { elID.setAttribute('style', elm+': '+loc+unit+';');}
    if (start < end && loc <= end){ requestAnimationFrame(go); }
    else if (start > end && loc >= end){ requestAnimationFrame(go); }
    else { if (func !== 'none') { func(); } return; }}

    go();}

function linePulse(sX,sY,eX,eY,lnID,grow,speed,ramp,func,xx){ var end = false;
  var x = Math.abs(sX-eX); var y = Math.abs(sY-eY); var newX=sX; var newY=sY;
  if (grow){ lnID.setAttributeNS(null, 'opacity', 1); }
  function go(){ x -= speed; y-= speed; speed*=ramp;
    if(sX > eX && x > 0){end=false; if(grow){newX=eX+x;} else {newX=sX-x;}}
    if(sX < eX && x > 0){end=false; if(grow){newX=eX-x;} else {newX=sX+x;}}
    if(sY > eY && y > 0){end=false; if(grow){newY=eY+y;} else {newY=sY-y;}}
    if(sY < eY && y > 0){end=false; if(grow){newY=eY-y;} else {newY=sY+y;}}
    if(end === true){ if (!grow){lnID.setAttributeNS(null, 'opacity', 0);}
      lnID.setAttributeNS(null,'x2',eX+'%'); lnID.setAttributeNS(null,'y2',eY+'%');
      if (func !== 'none'){ func(xx);} return; }
      lnID.setAttributeNS(null, 'x2',newX+'%'); lnID.setAttributeNS(null, 'y2',newY+'%');
      end = true; requestAnimationFrame(go);} go();}

function fadeIn(varName, element, speed, start, end){
  function go(){
    if (element === 'box-shadow'){
      varName.style.boxShadow = '0px 0px 25px rgba(80,80,80,'+start+') inset';
    } else { varName.style.opacity = start;} start+=speed;
    if (start <= end){ requestAnimationFrame(go); } } go(); }

function blowUp(varName, cir, speed, ramp, start, end){ var x; var y;
  var cx = parseFloat(cir.getAttribute('cx'));
  var cy = parseFloat(cir.getAttribute('cy'));
  function go(){ start+=speed*ramp;
    x = cx*((end-start)/100); y = cy*((end-start)/100);
    varName.setAttribute('width',start+'%'); varName.setAttribute('y',y+'%');
    varName.setAttribute('height',start+'%'); varName.setAttribute('x',x+'%');
    if (start <= end){ requestAnimationFrame(go); } } go(); }

function arreyFade(arrEL, speed, start, end){
  function go(){
    for (var i = 0; i < arrEL.length;i++){
      var intb = arrEL[i]; intb.style.opacity = start;} start+=speed;
    if (start <= end){ requestAnimationFrame(go); }  } go(); }

function morUpE(){
  if (!hideMorse){ morBase.style.opacity='0.8'
  regElmAnimate(morUp, 'opacity', 0.1, 1.5, '', 0, 0.8,'none');
  regElmAnimate(morDown, 'opacity', 0.1, 1.2, '', 0.8, 0,'none');}
  else{morUp.style.opacity='0';morBase.style.opacity='0';morDown.style.opacity='0';}
  setTimeout(function(){morDownE();},100);}

function morDownE(){
  if (!hideMorse){ morBase.style.opacity='0.8'
  regElmAnimate(morUp, 'opacity', 0.1, 1.2, '', 0.6, 0,'none');
  regElmAnimate(morDown, 'opacity', 0.1, 1.5, '', 0, 0.6,'none');}
  else{morUp.style.opacity='0';morBase.style.opacity='0';morDown.style.opacity='0';}

  var delay = random(1,2); if (delay===1){delay = 100;} else {delay=400;}
  setTimeout(function(){morUpE();},delay);}

////////////////////////////////////////////////////////////////////////////////
//////////          Basic  Functions         ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function rgbR(){
  return [random(0,255), random(0,255), random(0,255)];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//example: lnID.setAttributeNS(null, 'stroke', 'rgb('+rgbR()+')');
function wordInArrayCheck(word, array){
	for (var i = 0; i < array.length; i++){
		if (word === array[i]){
			return true;
		}
	}
	return false;
}
