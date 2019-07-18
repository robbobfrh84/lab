let boardheight = 20

function build(param) {

  boards.innerHTML = ""

  if (param === "less") boardheight *= .75
  if (param === "more") boardheight *= 1.33
  if (boardheight > 100) boardheight = 100

  const height = window.innerHeight / boardheight
  const min = 5
  const max = 20

  while (boards.clientHeight < window.innerHeight) {
    let boardLength = random(min, max)*height
    boardLength = boardLength / random(1,5) // Stagger Starting point
    boards.innerHTML += /*html*/`
      <div class="board-row">
        <div class='board' style="
          height: ${height}px;
          width: ${boardLength}px;
          background-color: rgba(50,0,0,${random(10,40)/100});
        "></div>
      </div><br>
    `
  }
  const rows = document.querySelectorAll(".board-row")

  Array.from(rows).map(row => {
    while (row.offsetWidth < window.innerWidth) {
      let boardLength = random(min, max)*height
      row.innerHTML += /*html*/`
        <div class='board' style="
          height: ${height}px;
          width: ${boardLength}px;
          background-color: rgba(50,0,0,${random(10,40)/100});
        "></div>
      `
    }
  })
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

build()
