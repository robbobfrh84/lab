let grabbed = false
let grabbedAudio;

function playBuzzes() {
  const audio = new Audio('audio/buzz1.mp3')
  audio.play()
  audio.volume = 0.5


  // setTimeout(()=>{
  //   fadeOut(audio)
  // },500)

  const audio2 = new Audio('audio/buzz2.m4a')
  setTimeout(()=>{audio2.play()},500)

  const audio3 = new Audio('audio/buzz3.m4a')
  setTimeout(()=>{audio3.play()},1000)

  const audio4 = new Audio('audio/buzz4.m4a')
  setTimeout(()=>{audio4.play()},2000)

  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // const gainNode1 = audioCtx.createGain();
  // console.dir(audioCtx)
}

function playDisappointment() {
  const audio = new Audio('audio/oh1.m4a')
  audio.play()
  audio.volume = 1

}

function playGrabbed() {
  if (!grabbed) {
    grabbed = true
    grabbedAudio = new Audio('audio/grabbed1.mp3')
    grabbedAudio.play()
    grabbedAudio.volume = 0
    fadeIn(grabbedAudio, 1)
    // grabbedAudio.currentTime = 0
  }
}

function stopGrabbed() {
  fadeOut(grabbedAudio)
  grabbed = false
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

function fadeIn(audio, max) {
  if (grabbed) {
    const fadeAudio = setInterval(function () {
      if (audio.volume < max) {
        audio.volume = Math.round((audio.volume + 0.02) * 100) / 100
      } else {
        clearInterval(fadeAudio)
      }
    }, 10)
  }

}
