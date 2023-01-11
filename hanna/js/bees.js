function setBeeVars() {
  document.querySelectorAll(".beeBox").forEach( bee => {
    window[bee.id].style.left = (hanna[bee.id].start.x * 100) + "%"
    window[bee.id].style.top = (hanna[bee.id].start.y * 100) + "%"
    window[bee.id].style.width = (hanna[bee.id].start.w * 100) + "%"

    // const beeImg = bee.querySelector(".beeImg")
    // beeImg.onclick = () => {
    //   console.log('click: ', beeImg.id)
    // }
    // beeImg.onmouseover = ()=>{
    //   console.log('over: ', this.id)
    //   // playGrabbed()
    // }
    // beeImg.onmouseout = ()=>{
    //   console.log('out: ', this.id)
    //   // stopGrabbed()
    // }
  })
}

