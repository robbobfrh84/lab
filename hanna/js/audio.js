let notGrabbed = true
let grabbedAudio;

function playBuzzes() {
  const audio = new Audio('audio/buzz1.mp3')
  audio.play()

  // setTimeout(()=>{
  //   fadeOut(audio, 1000)
  // },500)

  const audio2 = new Audio('audio/buzz2.m4a')
  setTimeout(()=>{audio2.play()},200)

  const audio3 = new Audio('audio/buzz3.m4a')
  setTimeout(()=>{audio3.play()},400)

  const audio4 = new Audio('audio/buzz4.m4a')
  setTimeout(()=>{audio4.play()},600)

  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // const gainNode1 = audioCtx.createGain();
  // console.dir(audioCtx)
}

function playGrabbed() {
  if (notGrabbed) {
    grabbedAudio = new Audio('audio/grabbed1.m4a')
    grabbedAudio.play()
  }
  notGrabbed = false
}

function stopGrabbed() {
  fadeOut(grabbedAudio, 1000)
  // grabbedAudio.pause()
  // grabbedAudio.currentTime = 0
  notGrabbed = true
}

function fadeOut(audio) {
  const fadeAudio = setInterval(function () {
    if (audio.volume > 0) {
      audio.volume = Math.round((audio.volume - 0.02) * 100) / 100
    } else {
      clearInterval(fadeAudio)
    }
  }, 10)
}
