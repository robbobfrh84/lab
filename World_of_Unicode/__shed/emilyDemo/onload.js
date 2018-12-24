var _player = {
  content: '🕺',
  x: 1,
  y: 0,
}

window.onload = function(){
  _buildScreen(screens.dessert)
  _setPlayer(_player)
}

window.onkeydown = function() {
  switch (event.key) {
    case 'ArrowUp': _move('y',-1); break;
    case 'ArrowRight': _move('x',1); break;
    case 'ArrowDown': _move('y',1); break;
    case 'ArrowLeft': _move('x',-1); break;
  }
}

function _buildScreen(screen) {

  screen.map( (row, i) =>{ row.map( (col, j) =>{
    let classes = ''
    if (col[0] === '-') {
      classes = col.split('-')[1]
      col = col.split('-')[2]
    }
    screenContainer.innerHTML += `
      <div class="blk-container">
        <div class="blk-content ${classes}"
          id="blk_${j}_${i}">${col}</div>
      </div>
    `

  }); screenContainer.innerHTML += `<br>`; })

}

function _setPlayer(plr) {
  const playerBlk = document.getElementById('blk_'+plr.x+'_'+plr.y)
  playerBlk.innerHTML = plr.content
}

function _move(axis, dir) {
  const pos = document.getElementById('blk_'+_player.x+'_'+_player.y)
  _player[axis] += dir
  const nextPos = document.getElementById('blk_'+_player.x+'_'+_player.y)
  if (nextPos && ['','🐝'].includes(nextPos.textContent)) {
    pos.textContent = ''

    // _setPlayer(_player)
  } else {
    _player[axis] -= dir
  }
}
