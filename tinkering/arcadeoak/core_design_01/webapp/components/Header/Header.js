import { Base } from './../../js/Base.js'
import { NavButton } from './../../components/NavButton/NavButton.js'

export const Header = new class extends Base {

  Set() { return /*html*/`

    <section>

      <div id="Header_icon">
        <img src="./webapp/assets/icons/AM.svg" alt="AM Icon">
      </div>

      <div id="Header_heading"></div>

      <nav id="NavButton">
        ${ NavButton.Embed() }
      </nav>

    </section>

    <div id="HeaderDivider" style="height: 30px;">

      <!-- 
      <div style="font-size: 20px; line-height: 1px;">
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp;
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp;
      </div>
      -->
      <!-- 
      <div style="height: 7px; line-height: 7px;">
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp;
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; 
      </div>
      <div style="height: 7px; line-height: 7px;">
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; 
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp;
      </div>
      <div style="height: 7px; line-height: 7px;">
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; 
        . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp; . &nbsp;
      -->

      </div>
    </div>
    
  `}
  
}