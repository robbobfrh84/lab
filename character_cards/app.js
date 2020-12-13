const ImageType = "og-"

window.onload = function(){
  characters.forEach(c=>buildCards(c))
}

const buildCards = function(card){
  cards.innerHTML += /*html*/`
    <div class="card">
      <div class="images-container">
        <img src="images/characters/og-${card.image}" class='card-image'/>
      </div>
      <div class="stats-container">
        <div class="stat-name">Name: ${card.name}</div>
        <div class="stat-attribute inline-block">Gender: ${card.gender}</div>
        <div class="stat-attribute inline-block float-right">Age: ${card.age}</div>
        <hr>
        <div class="stat-attribute">Speed: ? (0-10) </div>
        <div class="stat-attribute">Strangth: ? (0-10) </div>
        <div class="stat-attribute">Experience: ? (0-10) </div>
        <div class="stat-attribute">Intelligence: ? (0-10) </div>
        <div class="stat-attribute">Will Power: ? (0-10) </div>
        <hr>
        <div class="stat-note"><em>${card.note}</em></div>
      </div>
    </div>
  `
}

const rand = function(low,high) {
  //${rand(1,10)}
  return Math.floor((Math.random() * high)+(1+low))
}
