window.onload = function(){

  const gridSize = 12
  const screen = screens.forrest1

  function main(){
    build_screen_container()
  }

  function build_screen_container() {
    document.body.innerHTML = `
      <div id="gridContainer"></div>
    `
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        gridContainer.innerHTML += `

          <div class="gridUnit">
            <div class='emojiBlock'>${screen[i][j]}</div>
          </div>
          
        `
      }
      gridContainer.innerHTML += `<br>`
    }
  }

  main()
}
