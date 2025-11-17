import { Base, Data } from '../../js/Base.js'
import { HoleOptions } from './HoleOptions/HoleOptions.js'
import { AnimateCSS } from './AnimateCSS.js'

export const NavButtonView = new class extends Base {

  PreSet({navButton}) { /* 🚦 */
    AnimateCSS(navButton)
  }

  set_image_and_BG({id, navButton}) { 
    const defaultImage = navButton.button.defaultUserImage
    const url = Data.user ? Data.user?.photoURL || defaultImage : false
    const html = /*html*/`
      <circle 
        id="NavButtonView_bgColor_${id}"
        style="
          fill: var(--${navButton.button.bgColor}); 
          transition: var(--${navButton.colorTransition});
        "
        cx="250" 
        cy="250" 
        r="${this.buttonInsideStrokeR}"
        mask="${(Data.user?.button?.holeType === "hole" ? `url(#NavButtonView_holes_${id})` : ``)}"
      />
      ${ Data.user ? /*html*/`
        <image 
          id="NavButtonView_image_${id}"
          style="
            opacity: ${id === "authChecked" ? 1 : 0}; 
            transition: var(--${navButton.colorTransition});
          "
          href=${url} 
          width="${this.imageWH}" 
          height="${this.imageWH}" 
          x="${this.offsetImage}"
          y="${this.offsetImage}"
          clip-path="url(#NavButtonView_circleImageCrop_${id})" 
          preserveAspectRatio="xMidYMid slice"
          mask="${(Data.user?.button?.holeType === "hole" ? `url(#NavButtonView_holes_${id})` : ``)}"
        />
      `:``}
    `
    const bg = window["NavButtonView_bg_"+id]
    if (bg) { bg.innerHTML = html } // * This is when we're updating after auth checked
    else { return html } // * This returns the html for the initial Set call
  }

  Set({id, navButton}) { 

    const { holeType, holeOption } = navButton.button // * just for shorthand
    const HoleOption = HoleOptions[holeOption]
    const { margin, borderStroke, OS, IS } = HoleOption // * just for shorthand

    this.buttonR = 250-(margin*2)-(borderStroke/2)
    this.buttonInsideStrokeR = this.buttonR-(borderStroke/2)  
    this.imageWH = 500-(margin*4)-(borderStroke*2) 
    this.imageR = this.imageWH / 2 
    this.offsetImage = ((500-this.imageWH) / 2) 
    
    return /*html*/`

      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
        id="NavButtonView_SVG_${id}"
        class="NavButtonView_SVG"
        style="
          opacity: ${id === 'authChecked' ? 0 : 1};
          transition: var(--${navButton.colorTransition});
        "
      >

        <defs>

          <!-- Circle image crop -->
          <clipPath id="NavButtonView_circleImageCrop_${id}">
            <circle cx="250" cy="250" r="${this.imageR}"/> 
          </clipPath>

          <!-- Hole cutouts -->
          <mask id="NavButtonView_holes_${id}" x="-50%" y="-50%" width="200%" height="200%"> <!-- * These are important, you'll get weird clipping if not like this -->
            <rect x="0" y="0" width="500" height="500" fill="white" /> <!-- * White areas in the mask mean 100% visibility for the underlying element. --> 
            ${ HoleOption.holeCutouts() }
          </mask>
        
          <!-- Outer shadow -->
          <filter id="NavButtonView_outerDropShadow_${id}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="${OS[0]}" dy="${OS[1]}" stdDeviation="${OS[2]}" />
          </filter>

          <!-- Inset shadow  -->
          <filter id="NavButtonView_insetShadow_${id}" width="200%" height="200%"> 
            <!-- * 🔥 👇 !ORDER MATTERS 👇 🔥 -->
            <feOffset dx="${IS[0]}" dy="${IS[1]}" /> <!-- Shadow Offset -->
            <feGaussianBlur stdDeviation="${IS[2]}"  result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" result="inverse" /> <!-- * Inverts the drop shadow to create an inner shadow -->
            <feFlood flood-color="black" flood-opacity="1" result="color" /> <!-- * Color & Opacity -->
            <feComposite operator="in" in="color" in2="inverse" result="shadow" /> <!-- * Clip color inside shadow -->
            <feComponentTransfer in="shadow" result="shadow"> <!-- Shadow Opacity -->
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>

        </defs>

        <!-- Border "Ring" -->
        <circle 
          id="NavButtonView_border_${id}"
          style="
            stroke: var(--${navButton.button.borderColor}); 
            transition: var(--${navButton.colorTransition});
          "
          cx="250" 
          cy="250" 
          r="${this.buttonR}" 
          stroke-width="${borderStroke}" 
          fill="rgba(0,0,0,0)" 
          filter="url(#NavButtonView_outerDropShadow_${id})"
        />

        <!-- Hole Shaddows -->
        ${ holeType === "hole" ? HoleOption.innerHoleShadows(id) : `` }
        
        <!-- Background Image / Color -->
        <g id="NavButtonView_bg_${id}">
          ${this.set_image_and_BG({ id, navButton })}
        </g>

        <!-- Nub Circles and Shaddows -->
        ${holeType === "nub" ? HoleOption.nubs( 
          id, navButton.button.nubColor, navButton.colorTransition, navButton.nubFadeOut
        ) :``}

        <!-- Inner Shadow Circle -->
        <circle 
          cx="250" 
          cy="250" 
          r="${this.buttonInsideStrokeR}" 
          filter="url(#NavButtonView_insetShadow_${id})"
        />

      </svg>

    `
  }
}