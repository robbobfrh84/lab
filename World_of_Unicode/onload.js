window.onload = function(){

  const currentScreen = new Screen({
    screen: screens.mix1,
    container: 'screenContainer'
  })

  const player = new Player({
    content: "🚶‍♀️", // 🧞‍♀️ 🚶‍♀️ 🐌
    x: 3,
    y: 4,
  })

  currentScreen.build_screen_container()
  currentScreen.setPlayer(player)

}

document.body.onkeydown = function(){
  switch (event.key) {
    case "ArrowUp": player.moveTo('x',-1); break;
    case "ArrowRight": player.moveTo('y',1); break;
    case "ArrowDown": player.moveTo('x',1);; break;
    case "ArrowLeft": player.moveTo('y',-1);; break;
  }
}
