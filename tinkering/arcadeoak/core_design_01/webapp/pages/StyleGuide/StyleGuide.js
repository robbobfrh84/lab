import { Base } from '../../js/Base.js'

export const StyleGuide = new class extends Base {

  Events() { /* 🎪 */

    const navBtns = document.querySelectorAll('.StyleGuide-navBtns')
    navBtns.forEach( btn =>{
      btn.onclick = () => {
        setTimeout(() => {
          const element = document.getElementById(btn.name);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 50)
      }
    })

  }

  LastCall() { /* 🔔 */
    windowSize.innerHTML = "Current device window: "+window.innerWidth+" x "+window.innerHeight
  }

  Set() { return /*html*/`
    
    <main>

      <h1> Style Guide </h1>

      <h3> On This Page </h3>
      <nav>
        <ul>
          <li>
            <a name="StyleGuide_dividerLine" class="StyleGuide-navBtns">Divider Line</a>
          </li>
          <li>
            <a name="StyleGuide_internalLinks" class="StyleGuide-navBtns">Internal page links</a>
          </li>
          <li>
            <a name="StyleGuide_externalLinks" class="StyleGuide-navBtns">External page links</a>
          </li>
           <li>
            <a name="StyleGuide_tests" class="StyleGuide-navBtns">Tests</a>
          </li>
        </ul>
      </nav>

      <h3 id="StyleGuide_dividerLine"> Divider Line </h3>
      <hr>

      <h3 id="StyleGuide_internalLinks"> Internal page links </h3>
      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#styleguide">Style Guide</a>
          </li>
        </ul>
      </nav>

      <h3 id="StyleGuide_externalLinks"> External page links </h3>
      <nav>
        <ul>
          <li>
            <a href="https://buymeacoffee.com/invx3rejk" target="_blank">
              Buy Me A Coffee (External Link)
            </a>
          </li>
        </ul>
      </nav>

      <hr>

      <h3 id="StyleGuide_tests">Tests</h3>
      <div id='windowSize'></div> <br>
      1 <br><br>
      2 <br><br>
      3 <br><br>
      4 <br><br>
      5 <br><br>
      6 <br><br>
      7 <br><br>
      8 <br><br>
      9 <br><br>
      10 <br><br>
      
    </main>

  `}
  
}