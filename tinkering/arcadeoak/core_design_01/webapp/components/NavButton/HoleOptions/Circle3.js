export const Circle3 = {

  margin: 12, // * this allow space for the shadow. 
    // * 👀 NOTE: you'll wanna offset this value for physics, so contact is the shape not the shadow.
    // * 👀 NOTE: The drop shodow needs room. so make sure you're adjusting the OS to match the margin.
  borderStroke: 40, // * Total thickness of border
  holeR: 30, // * Hole Radius
  betweenHoles: 100, // * Space between button holes from center
  OS: [12,12,0], // * Outer shadow: [OffsetX,offSety,blur]. 
  IS: [10,10,0], // * Inner Shadow: [OffsetX,offSety,blur].
  get OHS() { return [12, 12, this.holeR+1] }, // * Outer Hold Shadow [OffsetX,offSety,Radius].
  IHS: [5,5,15], // * Inner Hole Shadow: [OffsetX,offSety,Stroke], It's actually a donut.

  get holesL() { // * Each hole location
    return [
      [ 250-this.betweenHoles, 250 ],
      [ 250, 250 ],
      [ 250+this.betweenHoles, 250 ]
    ]
  },

  holeCutouts: function() { 
    let html = ""
    this.holesL.forEach( loc =>{
      html += /*html*/`
        <circle cx="${loc[0]}" cy="${loc[1]}" r="${this.holeR}" />
      `
    })
    return html
  },

  outerHoleShadows: function(id,nubFadeOut) { 
    let html = /*html*/`
      <g 
        id="NavButtonView_outerHoleShadows_${id}" 
        style="
          opacity: 1; 
          transition: opacity ${nubFadeOut};
        "
        transform="translate(${this.OHS[0]}, ${this.OHS[1]})"
      >
    `
    this.holesL.forEach( loc =>{
      html += /*html*/`
        <circle   
          style="
            fill: rgba(0,0,0,0.8);
          "
          cx="${loc[0]}" cy="${loc[1]}" r="${this.OHS[2]}"
        />
      `
    }) 
    return html += /*html*/`</g>`
  },

  nubs: function( id, nubColor, colorTransition, nubFadeOut ) {
    let html = this.outerHoleShadows(id,nubFadeOut)
    html += /*html*/`
      <g 
        id="NavButtonView_nubs_${id}"
        style="
          opacity: 1; 
          transition: opacity ${nubFadeOut};
        "
      >
    `
    this.holesL.forEach( loc =>{
      html += /*html*/`
        <circle   
          style="
            fill: var(--${nubColor}); 
            transition: var(--${colorTransition});
          "
          cx="${loc[0]}" cy="${loc[1]}" r="${this.holeR+1}"
        />
      `
    })
    return html += /*html*/`</g>`
  },

  innerHoleShadows: function(id) { 
    let html = /*html*/`
      <g 
        id="NavButtonView_innerHoleShadows_${id}" 
        transform="translate(${this.IHS[0]}, ${this.IHS[1]})"
      >
    `
    this.holesL.forEach( loc =>{
      html += /*html*/`
      <circle 
        style="
          stroke: rgba(0,0,0,0.8); 
          fill: rgba(0,0,0,0)
        "
        cx="${loc[0]}" cy="${loc[1]}" r="${this.holeR}" 
        stroke-width="${this.IHS[2]}" 
      />
    `
    })
    return html += /*html*/`</g>`
  },
  
}         