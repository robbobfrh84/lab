var Test = 'TEST1' // * options: false, 'TEST1'
let delay = false // NOT USED YET
let RollCnt = 0
const Names = ['d4','d6','d8','d10','d12','d20']
const Values = [4,6,8,10,12,20]
let TopSet = false
let BotSet = false

const Match = {
  top: {
    name: 'Teal',
    keyCode: '',
    dice: [
      { id: 1, attr: 'Speed',  value: 0, rolls: [] }, 
      { id: 2, attr: 'Strength', value: 0, rolls: [] },
      { id: 3, attr: 'Intelligence', value: 0, rolls: [] },
    ],
  },
  bot: {
    name: 'Brown',
    keyCode: '',
    dice: [
      { id: 4, attr: 'Speed',  value: 0, rolls: [] }, 
      { id: 5, attr: 'Strength', value: 0, rolls: [] },
      { id: 6, attr: 'Intelligence', value: 0, rolls: [] },
    ]
  },
  rolls: [],
  out: [] 
}

var TEST1 = function() {
  
  // top_keycode_input.value = '234'
  // bot_keycode_input.value = '156'

  top_keycode_input.value = '212'
  bot_keycode_input.value = '656'

  setDie('top',0,top_keycode_input.value[0])
  setDie('top',1,top_keycode_input.value[1])
  setDie('top',2,top_keycode_input.value[2])
  setDie('bot',0,bot_keycode_input.value[0])
  setDie('bot',1,bot_keycode_input.value[1])
  setDie('bot',2,bot_keycode_input.value[2])
  setMatch()

  readyMatch()

  /* ---------- Rolls */

    /* Get random roll */
    // actionButton.click()

    /* OR! > Get set testValue for random roll */
    // roll([ 1,3,5,  1,2,6 ])
    // roll([ 1,2,4,  1,2,4 ])
    // roll([ 1,1,1,  1,4,4 ])
    // roll([ 1,1,1,  1,2,3 ])
    // roll([ 1,1,2,  1,2,4 ])
    // roll([ 1,2,2,  1,2,3 ])
    // roll([ 1,1,3,  2,3,4 ])
    // roll([ 1,2,4,  1,3,4 ])




    // roll([ 1,1,3,  1,2,4 ])
    // roll([ 1,2,3,  1,2,4 ])
    // roll([ 3,3,5,  4,2,6 ])
    // roll([ 1,2,4,  3,2,4 ])


  /* ---------- */

  // scoreRoll()
}
