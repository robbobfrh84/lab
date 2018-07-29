const cBox = document.getElementById('comment-box')
const cBox2 = document.getElementById('comment-box2')

const curse = [
  "   ","   ","   ",
  "#",
  "!","!",
  "$ ",
  "&",
  "*",
  "%",
  "☠",
  "⚡",
  "💥",
  "🌀",
  "🤬",
  "🤯",
  "⌘",
]

let comment = ''
cBox.onkeyup = (event)=>{
  // cBox.value = comment 
  if (event.key === "Enter") {
    alert(comment+'\n\n Wow, you sound pissed off!')
    comment = ''
    cBox.value = comment 
  } else {
    if (event.key !== "Backspace") {
      comment += curse[random(0,curse.length-1)]
      cBox.value = comment 
    } else {
      comment = comment.slice(0, comment.length - 1)
    }
    const randSkip = random(1,2)
    if (randSkip === 1) {
      cBox.style.backgroundColor = rgbA()
    }  
  } 
  // else {
  //   cBox.value = comment 
  // }
}
cBox.onkeydown = (event)=>{
  // cBox.value = comment 
}

random = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

rgbA = ()=>{
  return 'rgb('+random(0,255)+', '+random(0,255)+', '+random(0,255)+','+(random(0,100)/100)+')';
}

// # ! $ & * %
// &#x2620; &#x26A1; &#x1F4A5; &#x1F300; &#x1F92C; &#x1F92F; &#x1F92F;
