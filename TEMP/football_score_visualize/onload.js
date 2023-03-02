window.onload = function(){
  const game = [
    [ 500, { home_Q1:7, home_total:7 } ],
    [ 1500, { away_Q1:3, away_total:3 } ],
    [ 2500, { away_Q2:7, away_total:10 } ],
    [ 3500, { home_Q3:3, home_total:10 } ],
    [ 4500, { home_Q4:3, home_total:13 } ],
    [ 5000, { away_Q4:7, away_total:17 } ],
    [ 5500, { home_Q4:3, home_total:16 } ],
    [ 6000, { away_Q4:3, away_total:20 } ],
  ]
  game.forEach( score => {
    const save_score = score
    setTimeout(function(){
      addScore(save_score[1])
    }, save_score[0])
  })
}

function addScore(score) {
  const scoreArr = Object.keys(score)
  console.log(score)
  scoreArr.forEach( key => {
    console.log("key :", key)
    console.log(score[key])
    window[key].innerHTML = score[key]
    window[key].classList.add("update")
    setTimeout(function(){
      window[key].classList.remove("update")
    }, 500)
  })
}
