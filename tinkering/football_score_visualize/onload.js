const condensed_game_length = 4000
const quarter_length = 15
const game = { // Game link: https://www.espn.com/nfl/playbyplay/_/gameId/401547623
  home: "NYJ",
  away: "CLE",
  scoring: [
    { qtr: 1, time: "11:10", score: [ 0, 7 ] },
    { qtr: 1, time: "8:06", score: [ 7, 7 ] },
    // [ 1, 1500, { away_Q1:3, away_total:3 } ],
    // [ 2500, { away_Q2:7, away_total:10 } ],
    // [ 3500, { home_Q3:3, home_total:10 } ],
    // [ 4500, { home_Q4:3, home_total:13 } ],
    // [ 5000, { away_Q4:7, away_total:17 } ],
    // [ 5500, { home_Q4:3, home_total:16 } ],
    // [ 6000, { away_Q4:3, away_total:20 } ],
  ]
}

window.onload = function(){
  home.innerHTML = game.home
  away.innerHTML = game.away
  game.scoring.forEach( score => {
    let ms = score.time.split(':').map(n=>parseInt(n))
    const game_length = quarter_length * 4
    let clock = ms[0] + (Math.round(ms[1] * 100 / game_length) / 100)
    let delay = (quarter_length - clock) + ((score.qtr - 1) * quarter_length)
    delay = Math.round(delay * condensed_game_length / game_length)
    //
    //
    console.log('delay:', delay)
    //
    //
    setTimeout(function(){
      addScore(score)
    }, delay)
  })
}

function addScore({ score }) {
  // const scoreArr = Object.keys(score)
  const scoreArr = Object.keys(score)
  console.log('scoreArr:',scoreArr)
  console.log(score)
  scoreArr.forEach( key => {
    // console.log("key :", key)
    // console.log(score[key])
    // window[key].innerHTML = score[key]
    // window[key].classList.add("update")
    setTimeout(function(){
      window[key].classList.remove("update")
    }, 500)
  })
}
