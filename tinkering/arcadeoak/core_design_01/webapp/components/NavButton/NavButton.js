import { Base, Data } from '../../js/Base.js'
import { Toolkit } from '../../js/Toolkit.js'
import { NavButtonView } from './NavButtonView.js'

export const NavButton = new class extends Base {

  PreSet() { /* 🚦 */
    this.button = { // * Initial default values. Will be replaced by Data.user values.
      id: "authCheckAnimate", 
      defaultUserImage: './../webapp/assets/default_user.svg',
      holeOption: 'Circle3',
      holeType: "nub", // * "nub", "hole", "none",
      borderColor: "primary",
      nubColor: "primary",
      bgColor: "primary3",
    }
    this.initialDelay = 1.5 * 1000 // * time to deley before first 180 rotate. 👀 Consider root.css "--initial-fade-in-and-delay", that time is backed in.
    this.speed180 = 0.5 * 1000 // * time it takes for 180 rotate.
    this.delayBetween180 = 0 * 1000// * The delay before rotating back
    this.delayBetweenAnimate = 0.3 * 1000 // * After a complete 180-and-back, how long to wait for next animte to trigger. NOTE: in reality, we'll rarely get to this with a solid connection
    this.delayUserImageTransition = 0.1 * 1000 // * How long we wait before transitioning a auth check has found. Delay shows how much of the rotating image is shown.
    this.colorTransition = "color-theme-transitions" // * After Auth is checked, this is the transition delay for colors.
  }

  Events() { /* 🎪 */
    document.addEventListener('animationend', (e) => { 
      if (e.target.id !== "NavButtonView_bg_"+this.button.id) return // * We need this because the event will fire multiple times for whatever element has the class added. Since the nubs share the rotation event with the image, we'll get multiple fires which breaks the animation.
      if (e.animationName === "NavButton-rot--180") { this.handle_rotate_back_to_0() } 
      else if (e.animationName === "NavButton-rot-0") { this.handle_rotate_to_180() }
    })
    document.addEventListener('transitionend', (e) => { 
      this.remove_hidden_button(e) 
    })
  }

  LastCall() { /* 🔔 */
    this.angle = 0 // * Keeps track of what angle we're heading to: likely 0 or 180. NOT the starting angle
    setTimeout(() => { this.rotate_NavButton() }, this.initialDelay)
  }

  rotate_NavButton() {
    const id = this.button.id
    const toggle_rotClasses = (addRemove, angle) => {
      window["NavButtonView_bg_"+id].classList[addRemove]("NavButton-rot-bg-"+angle) 
      if (this.button.holeType !== "none") {
        if (this.button.holeType === "nub") { 
          window["NavButtonView_nubs_"+id].classList[addRemove]("NavButton-rot-bg-"+angle) 
          window["NavButtonView_outerHoleShadows_"+id].classList[addRemove]("NavButton-rot-outerHoleShadow-"+angle)
        }
        if (this.button.holeType === "hole") {
          window["NavButtonView_innerHoleShadows_"+id].classList[addRemove]("NavButton-rot-innerHoleShadow-"+angle)
        }
      }
    }
    toggle_rotClasses("remove", this.angle)
    this.angle = this.angle === "-180" ? "0" : "-180"
    toggle_rotClasses("add", this.angle)
  }

  handle_rotate_to_180() {
    if (this.authChecked) { // * NOW, all animations are ended!
      if (Data.user?.button) { 
        Toolkit.objValueReplace(this.button, Data.user.button) 
      }
      NavButtonView.Place("NavButtonView_authChecked", { 
        id: "authChecked", navButton: this 
      })
      setTimeout(() => {
        window["NavButtonView_SVG_authCheckAnimate"].style.opacity = 0
        window["NavButtonView_SVG_authChecked"].style.opacity = 1
      }, 50)
    } else { // * If still waiting on authChecked, let's do it again!
      setTimeout(() => { this.rotate_NavButton() }, this.delayBetweenAnimate)
    }
  }

  handle_rotate_back_to_0() {
    if (Data.authChecked) {
      this.authChecked = true // * What's different about this and Data.authCheck is that i want the angle = 0 state to kick it back to 180 if auth was confirmed between -180 and 0. if we don't have this, then the 0 angle check won't kickback if user was received then.
      this.update_image()
    }
    setTimeout(() => { this.rotate_NavButton() }, this.delayBetween180)
  }

  update_image() {
    if (Data.user) {
      setTimeout(()=>{ 
        NavButtonView.set_image_and_BG({ id: "authCheckAnimate", navButton: this })
        const image = window["NavButtonView_image_"+this.button.id]
        setTimeout(() => {
          image.style.opacity = 1
        }, 50) // * Need this to delay and give time to load the image. Otherwise, the transition won't work.
      }, this.delayUserImageTransition)
    }
  }

  remove_hidden_button(e) {
    if (e.target.id === "NavButtonView_SVG_authCheckAnimate" && e.propertyName === "opacity") {
      window["NavButtonView_SVG_authCheckAnimate"].innerHTML = ""
    }
  }

  Set() { return /*html*/`

    <div id="NavButtonView_authCheckAnimate" class="NavButtonView-container">
      ${NavButtonView.Embed({ id: "authCheckAnimate", navButton: this })}
    </div>
    <div id="NavButtonView_authChecked" class="NavButtonView-container"></div>

  `}

}