const placeHistory = function() {
  const hard_coded_history = [
    {
      shape: "Tetrahedron"
    },
    {
      shape: "Cube"
    },
    {
      shape: "Dodecahedron"
    },

    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Cube"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Tetrahedron"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
    // {
    //   shape: "Dodecahedron"
    // },
  ]

  // Maybe refacotor this with copilot using createElement.
  history.innerHTML = ''
  hard_coded_history.forEach( (dice,i) => {
    history_of_rolls.innerHTML += /*html*/`
      <div class="history-of-rolls-dice">
        <canvas id="rollHistory${i}" width="0" height="0"></canvas>
      </div>
    `
  })

  hard_coded_history.forEach( (dice,i) => { // * 👀 This needs to be in a seperate loop. having weird issues where only the last index is added to history when trying to do it in one loop.
    const canvas = document.querySelector("#rollHistory"+i)
    placeDice(canvas, 8, dice.shape, false, false)
  })

}