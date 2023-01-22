function playBuzzes() {

  const audio = new Audio('audio/buzz1.mp3')
  audio.onloadedmetadata = function() { // need this so that values show up
    audio.volume = 0.25
    audio.play()
    loopBuzz(audio)   
  }

  // const audio2 = new Audio('audio/buzz1.mp3')
  // audio2.onloadedmetadata = function() { // need this so that values show up
  //   audio2.volume = 0.25
  //   audio2.play()
  //   loopBuzz(audio2)   
  // }

  for (let i = 0; i < Object.keys(hanna.bees).length; i++) {
    console.log('i:',i)
  }
  



}

function loopBuzz(audio) {

    audio.onended = (event) => {
      audio.removeAttribute('src') // empty source
      audio.load()
    }

    const endTrimLength = 2.0 + (r01()*1.5)
    const playFor = audio.duration - endTrimLength - audio.currentTime
    const audioTimer = setTimeout(()=>{
      const audioNext = new Audio('audio/buzz1.mp3')
     
      audioNext.onloadedmetadata = function() {
        audioNext.currentTime = 1.0
        audioNext.volume = 0
        audioNext.play()
        fadeOut(audio, 0.01, 25)
        setTimeout(()=>{ 
          const randomMaxVolume = 0.10 + (r01()/3)
          fadeIn(audioNext, randomMaxVolume, 0.01, 25)
        },0)
        loopBuzz(audioNext)
      }
    }, playFor * 1000)
}

function playGrabbed() {
  console.log('play grabbed')
  if (!grabbed) {
    grabbed = true
    grabbedAudio = new Audio('audio/grabbed1.mp3')
    grabbedAudio.onloadedmetadata = function() { // need this so that values show up
      grabbedAudio.currentTime = 0
      grabbedAudio.volume = 1
      grabbedAudio.play()
      if (grabbed) { fadeIn(grabbedAudio, 1, 0.02, 10) }
    }
  }
}

function stopGrabbed() {
  fadeOut(grabbedAudio, 0.02, 10)
  grabbed = false
}

function fadeIn(audio, max, step, delay) {
  const fadeAudio = setInterval(function () {
    if (audio.volume < max) {
      audio.volume = Math.round((audio.volume + step) * 100) / 100
    } else {
      clearInterval(fadeAudio)
    }
  }, delay)

}

function fadeOut(audio, step, delay) {
  const fadeAudio = setInterval(function () {
    if (audio.volume > 0) {
      const vol = audio.volume - step
      audio.volume = Math.round((vol < 0 ? 0 : vol) * 100) / 100
    } else {
      clearInterval(fadeAudio)
    }
  }, delay)
}

