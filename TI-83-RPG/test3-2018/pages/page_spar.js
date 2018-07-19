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
      <button onclick='fight(${f1},${f2})'>FIGHT!</button> 
      <div id='fightDice' class='d6s'>
        ${d6.join('')}
      </div>
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
        <span id='fighter-${f}'>${getSkills(fighters[f].skills)}</span>
      </div>
    `
  }

  getSkills = (skills)=>{
    let str = ''
    for (const s in skills) {
      str+='- '+skills[s]+' '
    }
    return str+' -'
  }

  fight = (f1,f2)=>{
    const fightDice = document.getElementById('fightDice')
    let rolled = ''
    for (const d of d6) {
      rolled+= d6[_rand(0,5)]
    } 
    fightDice.innerHTML = rolled
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
        <div class='d6s'>${dice[roll-1]}</div>
        ${skills[s]+roll}
      `
    }
    return str
  }

  build()
}