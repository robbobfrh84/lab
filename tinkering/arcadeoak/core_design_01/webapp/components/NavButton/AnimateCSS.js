import { HoleOptions } from './HoleOptions/HoleOptions.js'

let generateCSS = {}

export const AnimateCSS = function(navButton) {
  const holeOption = HoleOptions[navButton.button.holeOption]
  const speed180Seconds = navButton.speed180 / 1000

  if (generateCSS[navButton.button.holeOption]) { return }
  generateCSS[navButton.button.holeOption] = true

  const css = `
    @keyframes NavButton-rot--180 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-180deg); }
    }
    @keyframes NavButton-rot-0 {
      0% { transform: rotate(-180deg); }
      100% { transform: rotate(0deg); }
    }
    .NavButton-rot-bg--180 {
      animation: NavButton-rot--180 ${speed180Seconds}s ease-in-out forwards; 
      transform-origin: center;
    }
    .NavButton-rot-bg-0 {
      animation: NavButton-rot-0 ${speed180Seconds}s ease-in-out forwards; 
      transform-origin: center;
    }

    @keyframes NavButton-rot-outerHoleShadow--180 {
      0% { transform: translate(${holeOption.OHS[0]}px, ${holeOption.OHS[1]}px) rotate(0deg); }
      100% { transform: translate(${holeOption.OHS[0]}px, ${holeOption.OHS[1]}px) rotate(-180deg); }
    }
    @keyframes NavButton-rot-outerHoleShadow-0 {
      0% { transform: translate(${holeOption.OHS[0]}px, ${holeOption.OHS[1]}px) rotate(-180deg); }
      100% { transform: translate(${holeOption.OHS[0]}px, ${holeOption.OHS[1]}px) rotate(0deg); }
    }
    .NavButton-rot-outerHoleShadow--180 {
      animation: NavButton-rot-outerHoleShadow--180 ${speed180Seconds}s ease-in-out forwards;
      transform-origin: center;
    }
    .NavButton-rot-outerHoleShadow-0 {
      animation: NavButton-rot-outerHoleShadow-0 ${speed180Seconds}s ease-in-out forwards;
      transform-origin: center;
    } 
      
    @keyframes NavButton-rot-innerHoleShadow--180 {
      0% { transform: translate(${holeOption.IHS[0]}px, ${holeOption.IHS[1]}px) rotate(0deg); }
      100% { transform: translate(${holeOption.IHS[0]}px, ${holeOption.IHS[1]}px) rotate(-180deg); }
    }
    @keyframes NavButton-rot-innerHoleShadow-0 {
      0% { transform: translate(${holeOption.IHS[0]}px, ${holeOption.IHS[1]}px) rotate(-180deg); }
      100% { transform: translate(${holeOption.IHS[0]}px, ${holeOption.IHS[1]}px) rotate(0deg); }
    }
    .NavButton-rot-innerHoleShadow--180 {
      animation: NavButton-rot-innerHoleShadow--180 ${speed180Seconds}s ease-in-out forwards;
      transform-origin: center;
    }
    .NavButton-rot-innerHoleShadow-0 {
      animation: NavButton-rot-innerHoleShadow-0 ${speed180Seconds}s ease-in-out forwards;
      transform-origin: center;
    }
  `

  let styleElement = document.getElementById('NavButton-animations')
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'NavButton-animations'
    document.head.appendChild(styleElement)
  }
  styleElement.textContent = css

}