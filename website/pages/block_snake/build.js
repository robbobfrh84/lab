const build = function() { // * 👀 Order matters!
  placeHighScore()
  placeCSS()
  const game = new Game()
  addEvents(game)
  game.readyGame()
}

const placeCSS = function() {
  grid1.style.gridTemplateColumns = `repeat(${S.gridSize.c}, 1fr)`
  grid1.style.gap = S.blockGap+'px'
}

const buildGrid = function() {
  grid1.innerHTML = ''
  for (let r = 1; r <= S.gridSize.r; r++) {
    for (let c = 1; c <= S.gridSize.c; c++) {
      grid1.innerHTML += /*html*/`
        <div id="block_${r}_${c}" class="block" 
          style="
            background-color: ${S.emptyCellColor};
            --block-bg: ${S.emptyCellColor};
            width: ${S.blockSize}px; 
            height: ${S.blockSize}px;
          "
        ></div>
      `
    }
  }
}

const clearGrid = function() {
  for (let r = 1; r <= S.gridSize.r; r++) {
    for (let c = 1; c <= S.gridSize.c; c++) {
      const block = window[`block_${r}_${c}`]
      block.innerHTML = ""
      block.style.backgroundColor = S.emptyCellColor
      block.style.setProperty('--block-bg', S.emptyCellColor)
    }
  }
}

const toggleArrow = function(arrowDir, isDown) {
  window['Arrow'+arrowDir+'Btn'].classList[(isDown ? "add" : "remove")]('active-key')
}

const updateScore = function(score) {
  window['score'].innerHTML = ''+score
}

const clearStartRestartBtn = function() {
  start_restart_btn.style.display = "none"
}

const resetGame = function(newHighScore, highScore) {
  start_restart_btn.style.display = "flex"
  start_restart_btn.innerHTML = /*html*/`
    <span> 
      ${(newHighScore ? 'New High Score!<br/>'+highScore+"<br/>" : '')}
      Play Again
    </span>
  `
}

const handleGameOver = function(snake, score) {

  snake.forEach((block, i) => {
    const elm = window[`block_${block.r}_${block.c}`]
    elm.classList.add("snakeDeath")
  })

  const firstElm = window[`block_${snake[0].r}_${snake[0].c}`]
  firstElm.addEventListener('animationend', function() {
    const highScore = parseInt(localStorage.getItem('blockSnakeHighScore') || '0', 10)
    const wholeScore = Math.floor(Number(score))
    let isNewHighScore = false
    if (Number.isFinite(wholeScore) && wholeScore > highScore) {
      localStorage.setItem('blockSnakeHighScore', String(wholeScore))
      isNewHighScore = true
      placeHighScore()
    }
    resetGame(isNewHighScore, wholeScore)
  }, { once: true })

}

const placeHighScore = function() {
  if (localStorage.getItem('blockSnakeHighScore') === null) {
    localStorage.setItem('blockSnakeHighScore', 0)
  }
  if (window['highScore']) {
    window['highScore'].innerHTML = localStorage.getItem('blockSnakeHighScore')
  }
}

const newHighScore = function(score) {
  localStorage.setItem('blockSnakeHighScore', Number(score))
  placeHighScore()
}

const resetHighScore = function() {
  localStorage.removeItem('blockSnakeHighScore')
}

/* 🐍 Snake Builds 🐍 */
const placeSnake = function(snake) {
  snake.forEach((block, i) => {
    const elm = window[`block_${block.r}_${block.c}`]
    elm.style.backgroundColor = S.sprites.snake[block.s]
    elm.style.setProperty('--block-bg', S.sprites.snake[block.s])
  })
}

/* 🍎 Food Buils 🍎 */
const placeFood = function(food) {
  food.forEach((block, i) => {
    const elm = window[`block_${block.r}_${block.c}`]
    elm.innerHTML = /*html*/`
      <div
        style="background-color: ${S.sprites.food[block.s]};"
      ></div>
    `
  })
}

/* 🛠️ Toolkit 🛠️ */
random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
