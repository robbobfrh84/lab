window.onload = ()=>{
  test16()
}

test16 = ()=>{
  let fighters = []
  const testFighters = [
    { name: 'Rombus',       gender: 'M'},
    { name: 'Flambough',    gender: 'F'},
    { name: 'Comma',        gender: 'A'},
    { name: 'Cupbert',      gender: 'M'},
    { name: 'Sadle',        gender: 'F'},
    { name: 'Krazter',      gender: 'M'},
    { name: 'Lemmen',       gender: 'A'},
    { name: 'Pradabumblom', gender: 'A'},
    { name: 'Mrambkle',     gender: 'AM'},
    { name: 'Slopbrough',   gender: 'F'},
    { name: 'Azhenchin',    gender: 'F',},
    { name: 'Ein',          gender: 'AM'},
    { name: 'Laxicom',      gender: 'M'},
    { name: 'Riiiiin',      gender: 'A'},
    { name: 'Uun',          gender: 'A'},
    { name: 'Gerice',       gender: 'M'},
    { name: 'Slowberblow',  gender: 'M'},
    {
      name: 'Scartle',
      gender: 'M',
      age: 48,
      skills: {
        speed : 30,
        strangth : 70,
        experience : 99,
        intelligence : 90,
        endurance : 20,
        coaching : 20,
        willPower : 63
      }
    }
  ]
  for (var i = 0; i < testFighters.length; i++) {
    fighters.push(new Fighter(testFighters[i]))
  }
  buildFighersList(fighters)
}
