const addEvents = function(game) {

  // * Start / Restart Button
  start_restart_btn.addEventListener('click', ()=>{ game.start()})

  // * Arrow mouse clicks
  ArrowUpBtn.addEventListener('click', ()=>{ game.updateMoveLoc({ axis: 'r', dir: -1 }, 'Up', false) })
  ArrowRightBtn.addEventListener('click', ()=>{ game.updateMoveLoc({ axis: 'c', dir: 1 }, 'Right', false) })
  ArrowDownBtn.addEventListener('click', ()=>{ game.updateMoveLoc({ axis: 'r', dir: 1 }, 'Down', false) })
  ArrowLeftBtn.addEventListener('click', ()=>{game.updateMoveLoc({ axis: 'c', dir: -1 }, 'Left', false) })

  // * Arrow keyboard press
  document.addEventListener('keydown', (e)=>handleArrowKey(e, true))
  document.addEventListener('keyup', (e)=>handleArrowKey(e, false))

  function handleArrowKey(e, isDown) {
    if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
      if (e.key === 'ArrowUp') {
        game.updateMoveLoc({ axis: 'r', dir: -1 }, 'Up', isDown)
      } else if (e.key === 'ArrowRight') {
        game.updateMoveLoc({ axis: 'c', dir: 1 }, 'Right', isDown)
      } else if (e.key === 'ArrowDown') {
        game.updateMoveLoc({ axis: 'r', dir: 1 }, 'Down', isDown)
      } else if (e.key === 'ArrowLeft') {
        game.updateMoveLoc({ axis: 'c', dir: -1 }, 'Left', isDown)
      }
      e.preventDefault()
      document.activeElement.blur()
    }
  }

}

