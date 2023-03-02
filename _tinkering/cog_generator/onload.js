const cogs = [
  {
    cog_radius: 100, // end at center of tooth, So 1/3 of teeth go beyond
    teeth: 24,
    cx: 250,
    cy: 250,
    // fancy_holes: 4,
    // fancy_holes_radius: 10,
  }
  // ,{
  //
  // }
]

window.onload = function(){
  let teeth = ""
  cogs.forEach( cog => {
    const degChunk = 360/cog.teeth
    for (var i = 0; i < cog.teeth; i++) {
      const rotateDeg = degChunk*i
      teeth += /*html*/`
        <circle r="10" cx="250" cy="150" fill="blue"
          transform="rotate(${rotateDeg} 250 250)"
        />
      `
    }
  })

  console.log("teeth :", teeth)

  svgContainer.innerHTML = /*html*/`
    <svg height="500" width="500" viewBox="0 0 500 500">
      <circle r="100" cx="250" cy="250" fill="#aaa" />
      ${teeth}
    </svg>
  `
}
