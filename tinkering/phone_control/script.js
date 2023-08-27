window.onload = function(){

  for (const elm of document.querySelectorAll('.btn')) {
    elm.onclick = function(){
      const bg = elm.style.backgroundColor || 'rgba(0,0,0,0.1)'
      elm.style.backgroundColor = bg === 'green' ? 'rgba(0,0,0,0.1)'  : 'green'
      data.textContent = elm.id
    }
  }

  all.ontouchmove = function(){
    console.log(this)
    data.textContent = 'MOVED'+this
  }
}
