let grabbed = false
let grabbedAudio

function playBuzzes() {
  const audio = new Audio('audio/buzz1.mp3')
  audio.onloadedmetadata = function() { // need this so that values show up
    audio.volume = 0.25
    audio.play()
    loopBuzz(audio)   
  }
}

function loopBuzz(audio) {
  audio.onended = () => {
    audio.removeAttribute('src') // empty source
    audio.load()
  }
  const endTrimLength = 2.0 + (r01()*1.5)
  const playFor = audio.duration - endTrimLength - audio.currentTime
  setTimeout(()=>{
    const audioNext = new Audio('audio/buzz1.mp3')
    audioNext.onloadedmetadata = function() {
      audioNext.currentTime = 1.0
      audioNext.volume = 0
      audioNext.play()
      fadeOut(audio, 0.01, 25)
      setTimeout(()=>{ 
        const randomMaxVolume = 0.10 + (r01()/3)
        fadeIn(audioNext, randomMaxVolume, 0.01, 25)
      },300)
      loopBuzz(audioNext)
    }
  }, playFor * 1000)
}

function playWizz() {
  const audio = new Audio('audio/wizz'+random(1,2)+'.mp3')
  
  audio.onloadedmetadata = function() { // need this so that values show up
    audio.volume = 0.5
    audio.currentTime = 0.4
    audio.play()
    fadeOut(audio, 0.01, 15)
    audio.onended = () => {
      audio.removeAttribute('src') // empty source
      audio.load()
    }
  }
}

function playGrabbed() {
  if (!grabbed) {
    grabbed = true
    grabbedAudio = new Audio('audio/grabbed1.mp3')
    grabbedAudio.onloadedmetadata = function() { // need this so that values show up
      grabbedAudio.currentTime = 0
      const maxVolumn = 0.5
      grabbedAudio.volume = maxVolumn 
      grabbedAudio.play()
      if (grabbed) { fadeIn(grabbedAudio, maxVolumn , 0.02, 10) }
    }
  }
}

function stopGrabbed() {
  fadeOut(grabbedAudio, 0.01, 5)
  grabbed = false
}

function fadeIn(audio, max, step, delay) {
  const fadeAudio = setInterval(function () {
    if (audio.volume < max) {
      try {
        audio.volume = Math.round((audio.volume + step) * 100) / 100
      } catch {
        audio.volume = max
        clearInterval(fadeAudio)
      }
    } else {
      audio.volume = max
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
      audio.volume = 0
      clearInterval(fadeAudio)
    }
  }, delay)
}

