const Start = function() {
  set_initial_values_UI()
  set_values_containers_UI()
  top_keycode_input.focus()
  if (window.Test) { delay = true; window[Test]() }
}

const reStart = function() { 
  // * window.location.reload() // * This is a bit of a work around because i could just  window.location.reload(), but the auto popup for mobile keypad dosn't work without this embeded hard reset of the game. So, there could be a more eliquant way to do this, like doing a hard-copy of the initial empty Match, or... something better, idk.
  Match.top.keyCode = ''
  Match.top.keyCode = ''
  TopSet = false
  BotSet = false
  resetMatch()
  Start()
} 

const keycode_set = function(e, which) {
  const keys = e.target.value.split('')
  const keyPlace = keys.length-1
  const key = keys[keyPlace]

  if (keys.length > 3) {
    e.target.value = keys.slice(0, 3).join('');
  } else {
    if (['1','2','3','4','5','6'].includes(key)) {
      setDie(which, keyPlace, key) 
    } else {
      e.target.value = keys.slice(0, -1).join('')
    }
  }
  navigateUI(e.target.value, which)
}

const setDie = function(which, keyPlace, key) {
  Match[which].dice[keyPlace].value = Names[key-1],
  Match[which].dice[keyPlace].value = Values[key-1]
  setDieUI(which,keyPlace)
}

const navigateUI = function(keyCode, which) {
  if (which == "top" && keyCode.length == 3 ) {
    TopSet = true
    bot_keycode_input.focus()
  } else if (which == "top") { TopSet = false }

  if (which == "bot" && keyCode.length == 3 ) {
    BotSet = true
  } else if (which == "bot") { BotSet = false }

  if (TopSet && BotSet) { setMatch() }
}

/* 🍽️ Match SET 🤼‍♀️ */
const setMatch = function() {
  Match.top.keyCode = top_keycode_input.value
  Match.bot.keyCode = bot_keycode_input.value
  top_keycode_input.disabled = true
  bot_keycode_input.disabled = true
  setDieKeyCodesUI()
  updateButtonUI('enable')
}
