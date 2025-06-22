events = function() {

  const selectDice = document.querySelectorAll('.select-dice')

  selectDice.forEach( (die, index) => {
    die.onclick = () => {
      console.log('Select Dice, e:', index)
    }
  })

  roll.onclick = () => {
    console.log('Roll')
  }

  roll.onclick = () => {
    console.log('Roll')
  }

}