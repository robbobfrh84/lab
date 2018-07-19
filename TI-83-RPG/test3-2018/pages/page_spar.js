_build_spar = ()=>{

  build = ()=>{
    const spar = document.getElementById('page_spar');
    const f1 = _rand(0,fighters.length-1)
    let f2 = f1
    while(f1 === f2) {
      f2 = _rand(0,fighters.length-1)
    }
    spar.innerHTML = /*html*/`
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
      <button class='fightBtn' onclick='fight(${f1},${f2})'>FIGHT!</button> 
      <br>
      <div class='box'>
        ${buildFighter(f1)}
        &nbsp; Vs.
        ${buildFighter(f2)}
      </div>
    `
  }

  buildFighter = (f)=>{
    return /*html*/`
      <div>
        <div class='name'>
          ${fighters[f].name}
          <em class='rating'>(${fighters[f].rating})</em>
        </div>
        <div id='fighter-${f}' class='skills-box'>
          ${getSkills(fighters[f].skills)}
        </div>
      </div>
    `
  }

  getSkills = (skills)=>{
    let str = ''
    for (const s in skills) {
      str+= /*html*/`
        <span class='skill-ready skill-${s}'>${skills[s]}</span>
      `
    }
    return str
  }

  fight = (f1,f2)=>{
    const fightDice = document.getElementById('fightDice')
    fightDice.innerHTML = ''
    const f1Skills = document.getElementById('fighter-'+f1)
    const f2Skills = document.getElementById('fighter-'+f2)
    f1Skills.innerHTML = rollSkills(fighters[f1].skills, d6)
    f2Skills.innerHTML = rollSkills(fighters[f2].skills, d6)
    // setTimeout(()=>{fight(f1,f2)},500)
  }

  rollSkills = (skills, dice)=>{
    let str = ''
    for (const s in skills) {
      const roll = _rand(1,dice.length)
      str+= /*html*/`
        <div class='skill skill-${s}'>
          <div class='d6s'>${dice[roll-1]}</div>
          <div class='skill-rating'>${skills[s]+roll}</div>
        </div>
      `
    }
    return str
  }

  build()
}