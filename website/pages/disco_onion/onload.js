window.onload = ()=>start()

const bg = {
  primary: "#6495ed",
  colors: [
    { col: "#ff4500", w: 15 },
    { col: "#6495ed", w: 15 },
    { col: "#b8860b", w: 15 },
    { col: "#ff00ff", w: 15 },
    { col: "#ffd700", w: 15 },
  ],
  layers: 10, // "colors" will be equal to number of colors. If you want a different number layers to colors, give intiger here.
  borderRadius: "10px",
  boxShadow: "0px 0px 5px 1px inset rgba(0,0,0,0.5)",
  transition_time: 12, // time for each layer to do a full cycle of all colors.
  transition_spread: 2, // this number devides the delay start. SO, high number the closer the layers are in the transition. Resulting in all layers bunched together around a smiliar point in the transtion.
}

const title = {
  name: "Disco Onion",
  primary: "#6495ed", // NOT  included.
  colors: [
    { col: "yellow", w: 6 },
    // { col: "#6495ed", w: 4 },
    { col: "orange", w: 6 },
    { col: "red", w: 6 },
    { col: "pink", w: 6 },
  ],
  layers: 10, // "colors" will be equal to number of colors. If you want a different number layers to colors, give intiger here.
  transition_time: 5, // time for each layer to do a full cycle of all colors.
  transition_spread: 2, // this number devides the delay start. SO, high number the closer the layers are in the transition. Resulting in all layers bunched together around a smiliar point in the transtion.
  make_opacity: (layers, i) => { return (0.75/layers)*i+0.25 },
}

function start() {
  // Border and background.
  bg.layers = bg.layers === "colors" ? bg.colors.length : bg.layers
  build_border_CSS_animations()
  const { margin, previous_w } = build_border_layers()
  set_background(margin, previous_w)
  // Title
  title.layers = title.layers === "colors" ? title.colors.length : title.layers
  build_title_CSS_animations()
  build_title()
}

function build_border_CSS_animations() {
  let styles = ""
  const delay_step = (bg.transition_time/bg.colors.length)/bg.transition_spread
  for (let i = 0; i < bg.layers; i++) {
    const delay = (i*-1)*delay_step
    styles += /*css*/`
      #layer${bg.layers-i} {
        animation-name: layers;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: reverse;
        animation-delay: ${delay}s;
        animation-duration: ${bg.transition_time}s;
      }
    `
  }
  styles += "@keyframes layers {"
  const chunk = 100/bg.colors.length
  bg.colors.forEach( (c,i) => {
    styles += `
      ${(chunk*i)}% { background-color: ${c.col} }
    `
  })
  styles += `
    100% { background-color: ${bg.colors[0].col} }
  `
  styles += "}"
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}

function build_border_layers() {
  let layers = ""
  let previous_w = 0
  let margin = previous_w
  for (let i = 0; i < bg.layers; i++) {
    const c = bg.colors[i%bg.colors.length]
    layers += /*html*/`
      <div id="layer${i+1}" class="border-layer" style="
        top: ${margin}px;
        right: ${margin}px;
        bottom: ${margin}px;
        left: ${margin}px;
        border-radius: ${previous_w}px;
        box-shadow: ${bg.boxShadow};
      "></div>
    `
    previous_w = c.w
    margin += c.w
  }
  disco_border.innerHTML = layers
  return { margin, previous_w }
}

function set_background(margin, previous_w) {
  disco_border.innerHTML += /*html*/`
    <div class="border-layer" style="
      background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/782173/light_grain.png');
      top: ${margin}px;
      right: ${margin}px;
      bottom: ${margin}px;
      left: ${margin}px;
      border-radius: ${previous_w}px;
      box-shadow: ${bg.boxShadow};
    "></div>
  `
}

function build_title_CSS_animations() {
  let styles = ""
  const delay_step = (title.transition_time/title.colors.length)/title.transition_spread
  for (let i = 0; i < title.layers; i++) {
    const delay = (i*-1)*delay_step
    styles += /*css*/`
      #title${i+1} {
        animation-name: titles;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: reverse;
        animation-delay: ${delay}s;
        animation-duration: ${title.transition_time}s;
      }
    `
  }
  styles += "@keyframes titles {"
  const chunk = 100/title.colors.length
  title.colors.forEach( (c,i) => {
    styles += `
      ${(chunk*i)}% { color: ${c.col} }
    `
  })
  styles += `
    100% { color: ${title.colors[0].col} }
  `
  styles += "}"
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}

function build_title() {
  let layers = ""
  let margin = []
  for (let i = 0; i < title.layers; i++) {
    const m = margin.length < 2 ? 0 : margin[0]
    margin.unshift(m+title.colors[i%title.colors.length].w)
  }
  for (let i = 0; i < title.layers; i++) {
    const c = title.colors[i%title.colors.length]
    const opacity = title.make_opacity(title.layers, i)
    layers += /*html*/`
      <div id="title${i+1}" class="title-layer" style="
        color: ${c.col};
        top: -${margin[i]}px;
        left: -${margin[i]}px;
        opacity: ${opacity};
      ">${title.name}</div>
    `
  }
  centered_title.innerHTML = /*html*/`
    <div>
      ${layers}
      <div>${title.name}</div> <!-- For some reason, it needs this to hold the "shape" -->
      <div class="title-layer" style="color: ${title.primary};">
        ${title.name}
      </div>
    </div>

  `
}