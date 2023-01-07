function play() {
  var audio = new Audio('audio/buzz1.m4a')
  console.dir(audio)
  audio.play()
  audio.onended = function() {
    alert("The audio has ended")
    audio.play()
  };

  var audio2 = new Audio('audio/buzz1.m4a')
  setTimeout(()=>{audio2.play()},200)

  var audio3 = new Audio('audio/buzz1.m4a')
  setTimeout(()=>{audio3.play()},400)

  var audio4 = new Audio('audio/buzz1.m4a')
  setTimeout(()=>{audio2.play()},600)


  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode1 = audioCtx.createGain();
  console.dir(audioCtx)
}
