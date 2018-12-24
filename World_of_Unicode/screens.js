class Screen {

  constructor(params){
    this.screen = params.screen // make auto fot all params = this...
    this.container = document.getElementById(params.container)
  }

  build_screen_container(parent) {
    this.screen.map( (row,i) =>{ row.map( (col,j) =>{ // this really should be a set of two for loops
      let classes = ''
      if (col[0] === '-') {
        classes = col.split('-')[1]
        col = col.split('-')[2]
      }
      this.container.innerHTML += `
        <div class="blk-container">
          <div class="blk-content ${classes}"
            id="blk_${i}_${j}">${col}</div>
        </div>
      `
    }); this.container.innerHTML += `<br>`; })
  }

  setPlayer(player) {
    const playerBlk = document.getElementById('blk_'+player.x+'_'+player.y)
    playerBlk.innerHTML = player.content
  }

}
