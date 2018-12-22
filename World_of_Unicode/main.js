window.onload = function(){

  const screen = screens.mix1
  const selectedPlayer = "🚶‍♀️"
  let player = ''

  function main(){
    build_screen_container("mix1")
  }

  function build_screen_container() {
    for (var i = 0; i < screen.length; i++) {
      for (var j = 0; j < screen[0].length; j++) {
        gridContainer.innerHTML += `

          <div class="gridUnit">
            <div class='emojiBlock' id='gridUnit_${i}_${j}'>${screen[i][j]}</div>
          </div>

        `
        if (screen[i][j] === selectedPlayer) player = {x:i,y:j}
      }
      gridContainer.innerHTML += `<br>`
    }
  }

  document.body.onkeydown = function(){

    switch (event.key) {
      case "ArrowUp": moveTo('x',-1); break;
      case "ArrowRight": moveTo('y',1); break;
      case "ArrowDown": moveTo('x',1);; break;
      case "ArrowLeft": moveTo('y',-1);; break;
    }

  }

  function moveTo(axis, dir) {
    const pos = document.getElementById('gridUnit_'+player.x+'_'+player.y)
    player[axis] += dir
    const nextPos = document.getElementById('gridUnit_'+player.x+'_'+player.y)
    if (nextPos && nextPos.textContent === '') {
      nextPos.textContent = selectedPlayer
      pos.textContent = ''
    } else {
      player[axis] -= dir
    }

  }

  main()
}
