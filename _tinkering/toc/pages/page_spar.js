_page_spar = (simCnt, simulateGo)=>{
  let bout = {}
  if (!simCnt) {
    simCnt = 10
    simulateGo = false
  }

  main = ()=>{
    const spar = document.getElementById('page-spar');
    const f1 = _rand(0,fighters.length-1)
    let f2 = f1
    while(f1 === f2) {
      f2 = _rand(0,fighters.length-1)
    }
    spar.innerHTML = `
      <span class='title' >Spar</span>
      <div id='fightDice' class='d6s'> &nbsp;
        <none class='die-speed'>${d6[1]}</none>
        <none class='die-strangth'>${d6[0]}</none>
        <none class='die-experience'>${d6[3]}</none>
        <none class='die-intelligence'>${d6[5]}</none>
        <none class='die-willPower'>${d6[4]}</none>
        <none class='die-speed'>${d6[0]}</none>
        <none class='die-strangth'>${d6[2]}</none>
        <none class='die-experience'>${d6[1]}</none>
        <none class='die-intelligence'>${d6[4]}</none>
        <none class='die-willPower'>${d6[3]}</none>
      </div>
      <hr>
      <span id='spar-results' class='spar-results'>
        <button class='fightBtn' onclick='fight(${f1},${f2})'>FIGHT!</button>
      </span>
      <br>
      <div class='box'>
        ${buildFighter(f1)}
        &nbsp; Vs.
        ${buildFighter(f2)}
      </div>
      <!-- <br><br><br>
      <input id='spar-simulate-count' value="${simCnt}">
      <button onclick='simulate(${simCnt})'>Simulate</button> -->
    `
    if (simulateGo === true) {
      alert('simulateGo is turned off!')
      // const simValue = document.getElementById('spar-simulate-count')
      // setTimeout(()=>{_page_spar(simValue.value-1, true)},50)
      // fight(f1,f2)
    }
  }

  simulate = ()=>{
    const simValue = document.getElementById('spar-simulate-count')
    setTimeout(()=>{_page_spar(simValue.value, true)},50)
  }

  buildFighter = (f)=>{
    return `
      <div>
        <div class='name'>
          ${fighters[f].name}
          <em class='rating'>(${fighters[f].rating})</em>
        </div>
        <div id='fighter-${f}' class='skills-box'>
          ${getSkills(f, fighters[f].skills)}
        </div>
      </div>
    `
  }

  getSkills = (f, skills)=>{
    let str = ''
    for (const s in skills) {
      str += `
        <span id='bout-${fighters[f].name}-${s}' class='skill-ready skill-${s}'>
          ${skills[s]}
        </span>
      `
    }
    return str
  }

  fight = (f1Index,f2Index)=>{
    f1 = fighters[f1Index]
    f2 = fighters[f2Index]
    bout = {
      matchType: 'spar',
      fighters: {
        f1: f1.name+' /'+f1.id,
        f2: f2.name+' /'+f2.id,
      },
      boxScore: {},
      [f1.name+'_scored']: [],
      [f2.name+'_scored']: [],
      ties: [],
      winner: '', // [ name, victoryType ]
      loser: '',
      winType: '', // KO (5-0), desisive (4-1/3-1-1), competitive, OT
    }
    for (const s in f1.skills) {
      bout.boxScore[s] = []
    }
    const fightDice = document.getElementById('fightDice')
    for (const skill in f1.skills) {
      const ef1 = document.getElementById('bout-'+f1.name+'-'+skill)
      const ef2 = document.getElementById('bout-'+f2.name+'-'+skill)
      scoreSkill(ef1, ef2, f1, f2, skill)
    }
    const sparResults = document.getElementById('spar-results')
    sparResults.innerHTML = `
      <button onclick='_page_spar()'> ...next Random Match </button>
    `
    if (bout[f1.name+'_scored'].length > bout[f2.name+'_scored'].length) {
      winLose(f1Index, f2Index, f1, sparResults)
    } else if (bout[f1.name+'_scored'].length < bout[f2.name+'_scored'].length) {
      winLose(f2Index, f1Index, f2, sparResults)
    } else {
      let overTimeCnt = 1
      bout.boxScore['_overtime'+overTimeCnt] = []
      overTime(bout, f1Index, f2Index, f1, f2, overTimeCnt, sparResults)
    }
    // rolling = setTimeout(()=>{fight(f1Index,f2Index)},500)
    // clearTimeout(myVar)
  }

  scoreSkill = (ef1, ef2, f1, f2, skill)=>{
    rollSkill(ef1, f1, 0, d6, skill)
    rollSkill(ef2, f2, 1, d6, skill)
    if (bout.boxScore[skill][0][2] > bout.boxScore[skill][1][2]) {
      bout.boxScore[skill][0][3] = 'Wins'
      bout[f1.name+'_scored'].push(skill)
    } else if (bout.boxScore[skill][0][2] < bout.boxScore[skill][1][2]) {
      bout.boxScore[skill][1][3] = 'Wins'
      bout[f2.name+'_scored'].push(skill)
    } else {
      bout.boxScore[skill][0][3] = 'TIE'
      bout.boxScore[skill][1][3] = 'TIE'
      bout.ties.push(skill)
    }
  }

  rollSkill = (elm, f, f01, dice, skill, ot)=>{
    if (!ot) ot = skill
    elm.classList = ''
    elm.classList.add('skill')
    elm.classList.add('skill-'+skill)
    const roll = _rand(1,dice.length)
    bout.boxScore[ot][f01] = [f.skills[skill], roll, f.skills[skill]+roll]
    elm.innerHTML = /*html*/`
      <div class='d6s'>${dice[roll-1]}</div>
      <div class='skill-rating'>${f.skills[skill]+roll}</div>
    `
  }

  winLose = (winI, loseI, winner, sparResults)=>{
    fighters[winI].wins ++
    fighters[loseI].losses ++
    sparResults.innerHTML = /*html*/`
      <button onclick='_page_spar()'> ...next Random Match </button> ${winner.name} WINS!
    `
    fighters[winI].history.push(bout)
    fighters[loseI].history.push(bout)

    SHEET.updateFighter(fighters[winI].id, {
      wins: fighters[winI].wins,
      history: JSON.stringify(fighters[winI].history)
    })
    .then(()=>{
      SHEET.updateFighter(fighters[loseI].id, {
        losses: fighters[loseI].losses,
        history: JSON.stringify(fighters[loseI].history)
      })
      .then(()=>{
        _curate_fighters()
      })
    })

  }

  overTime = (bout, f1Index, f2Index, f1, f2, overTimeCnt, sparResults)=>{
    console.log('OVERTIME!', overTimeCnt)
    const oef1 = document.getElementById('fighter-'+f1Index)
    const oef2 = document.getElementById('fighter-'+f2Index)
    const se1 = addOverTimeBox(oef1, f1Index, overTimeCnt)
    const se2 = addOverTimeBox(oef2, f2Index, overTimeCnt)

    sparResults.innerHTML = `
      <button class='fightBtn' id='ot-button'>
        OVERTIME! ${overTimeCnt > 1 ? ('x'+overTimeCnt) : ''}
      </button>
    `
    let otBtn = document.getElementById('ot-button')
    otBtn.addEventListener('click', function(){
      console.log('Go OT',overTimeCnt)
      const skill = 'willPower'
      const otCnt = '_overtime'+overTimeCnt
      rollSkill(se1, f1, 0, d6, skill, otCnt)
      rollSkill(se2, f2, 1, d6, skill, otCnt)
      if (bout.boxScore[otCnt][0][2] > bout.boxScore[otCnt][1][2]) {
        bout.boxScore[otCnt][0][3] = 'Wins'
        winLose(f1Index, f2Index, f1, sparResults)
      } else if (bout.boxScore[otCnt][0][2] < bout.boxScore[otCnt][1][2]) {
        bout.boxScore[otCnt][1][3] = 'Wins'
        winLose(f2Index, f1Index, f2, sparResults)
      } else {
        bout.boxScore[otCnt][0][3] = 'TIE'
        bout.boxScore[otCnt][1][3] = 'TIE'
        overTimeCnt++
        bout.boxScore['_overtime'+overTimeCnt] = []
        overTime(bout, f1Index, f2Index, f1, f2, overTimeCnt, sparResults)
      }
      console.log(bout)
    })
    if (simulateGo) {
      otBtn.click()
    }
  }

  addOverTimeBox = (elm, fi, ot)=>{
    elm.innerHTML += `
      <span id='bout-${fighters[fi].name}-ot-${ot}'
        class='skill-ready skill-willPower'>
        ${fighters[fi].skills.willPower}
      </span>
    `
    return document.getElementById('bout-'+fighters[fi].name+'-ot-'+ot)
  }

  main()
}
