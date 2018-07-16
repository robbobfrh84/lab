var sortref = { name: 'id', dir: false }

window.onload = ()=>{
  test16()
}

/* * * * * * * TEST FUNCS / VARS* * * * * * */

var fighters = []

test16 = ()=>{
  const testFighters = [
    { name: 'Rombus',       gender: 'M'},
    { name: 'Flambough',    gender: 'F'},
    { name: 'Splimeter',    gender: 'F'},
    { name: 'Comma',        gender: 'U'},
    { name: 'Cupbert',      gender: 'M'},
    { name: 'Sadle',        gender: 'F'},
    { name: 'Krazter',      gender: 'M'},
    { name: 'Lemmen',       gender: 'U'},
    { name: 'Pradabumblom', gender: 'U'},
    { name: 'Mrambkle',     gender: 'AM'},
    { name: 'Slopbrough',   gender: 'F'},
    { name: 'Azhenchin',    gender: 'F',},
    { name: 'Ein',          gender: 'AM'},
    { name: 'Laxicom',      gender: 'M'},
    { name: 'Riiiiin',      gender: 'U'},
    { name: 'Uun',          gender: 'U'},
    { name: 'Gerice',       gender: 'M'},
    { name: 'Slowberblow',  gender: 'M'},
    {
      name: 'Scartle',
      gender: 'M',
      age: 40,
      skills: {
        speed : 3,
        strangth : 6,
        experience : 5,
        intelligence : 8,
        willPower : 6
      }
    }
  ]
  for (var i = 0; i < testFighters.length; i++) {
    fighters.push(new Fighter(testFighters[i], i+1))
  }
  buildFighersList(fighters)
}
