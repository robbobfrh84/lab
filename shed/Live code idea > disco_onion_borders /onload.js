const vars = {
  name: "Disco Onion",
  colors: [
    { col: "#6495ed", w: "20px" },
    { col: "#ff4500", w: "10px" },
    { col: "#b8860b", w: "10px" },
    { col: "#ff00ff", w: "10px" },
    { col: "#ffd700", w: "10px" },
  ],
  layers: "colors", // "colors" will be equal to number of colors. If you want a different number layers to colors, give intiger here.
  borderRadius: "10px",
  transition_time: 5, // time for each layer to do a full cycle of all colors.
  transition_spread: 3, // this number devides the delay start. SO, high number thee closer the layers are in the transition. Resulting in all layers bunched together around a smiliar point in the transtion.
  widths: [20,10,10,10,10],
}
vars.layers = vars.layers === "colors" ? vars.colors.length : vars.layers

window.onload = function() {
  console.log('oh hi!!! Arn\'t you just so cool!')
  build_CSS_animations()
  build_border_layers()
}

function build_CSS_animations() {
  let styles = "@keyframes example {"
  const chunk = 100/vars.colors.length
  vars.colors.forEach( (c,i) => {
    styles += `
      ${chunk*i}% { background-color: ${c.col} }
    `
  })
  styles += `
    100% { background-color: ${vars.colors[0].col} }
  `
  styles += "}"
  for (let i = 0; i < vars.layers; i++) {
    styles += /*css*/`
      #layer${i+1} {
        animation-name: example;
        animation-iteration-count: infinite;
        animation-delay: ${(i*(vars.transition_time/vars.colors.length/vars.transition_spread))}s;
        animation-duration: ${vars.transition_time}s;
      }
    `
  }
  console.log("styles :", styles)
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}

function build_border_layers() {
  let layers = ""
  for (let i = 0; i < vars.layers; i++) {
    layers += /*html*/`
      <div id="layer${i+1}" class="layer" style="
        background-color: ${vars.colors[i].col};
      "> ${vars.colors[i].col} </div>
    `
  }
  border.innerHTML = layers
}
