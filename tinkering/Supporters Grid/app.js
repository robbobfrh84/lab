const supportersCnt = 1000
const suppertersWidth = 25
const totalImages = 60
const addImage = parseInt(supportersCnt / totalImages)
let imageCnt = 0

const Start = function() {

  nav.innerHTML += /*html*/`
    ${supportersCnt} Bubbles 
    - ${suppertersWidth}x${suppertersWidth}px
    - ${totalImages} Images
  `

  for (let i = 0; i < supportersCnt; i++) {
    supporters_container.innerHTML += /*html*/`
      <div 
        class="supporter" 
        style="
          width: ${suppertersWidth}px;
          height: ${suppertersWidth}px;
          line-height: ${suppertersWidth}px;
          font-size: ${suppertersWidth*0.4}px;
          ${(i+1)%100 === 0 ? /*html*/`
            background-color: rgba(0,0,0,0.2);
          `:``}
        "
      >
        ${(i+1)%100 === 0 ? i+1 : ``}
        ${(i+1)%addImage === 0 ? /*html*/`
          <img 
            src='./supporterImages/images/${imageCnt}.jpg'
            style="
              width: ${suppertersWidth}px;
              height: ${suppertersWidth}px;
            "
          >
        `:``}
        
      </div>
    `
    if ((i+1)%addImage === 0) {
      imageCnt++
    }

  }

}

window.onload = ()=>Start()