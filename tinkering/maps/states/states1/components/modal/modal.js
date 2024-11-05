const modal = function(data) {
  console.log('data:',data)

  modal_container.innerHTML = /*html*/`
    <div id="modal_body">
      <div id="modal_main">
        <span class="modal-close-button" onclick="modal_close()">&times;</span>
        <div class="modal-header">
          <h2>${data.header}</h2>
        </div>
        <div class="modal-content">${data.content}</div>
      </div>
    </div>
  `

  modal_body.style.display = 'block'
  setTimeout(() => {
    modal_main.style.transform = 'scale(1)'
    modal_main.style.opacity = '1'
  }, 10)

}

const modal_close = function() {
  modal_body.style.display = 'none';
}
