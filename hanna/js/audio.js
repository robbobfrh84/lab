function playBuzzes() {
  var audio = new Audio('audio/buzz1.m4a')
  console.dir(audio)
  audio.play()
  // audio.onended = function() {
  //   audio.play()
  // };

  var audio2 = new Audio('audio/buzz2.m4a')
  setTimeout(()=>{audio2.play()},200)

  var audio3 = new Audio('audio/buzz3.m4a')
  setTimeout(()=>{audio3.play()},400)

  var audio4 = new Audio('audio/buzz4.m4a')
  setTimeout(()=>{audio4.play()},600)


  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode1 = audioCtx.createGain();
  console.dir(audioCtx)
}

function playGrabbed() {
  console.log('playGrabbed')
  var audio = new Audio('audio/grabbed1.m4a')
  audio.play()
}
