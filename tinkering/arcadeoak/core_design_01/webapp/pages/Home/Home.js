import { Base, Data } from './../../js/Base.js'
import { Header } from './../../components/Header/Header.js'

export const Home = new class extends Base {

  Events() { /* 🎪 */

    /* 🔥 TEMP 🔥 */
    Home_themeBtn_TEMP.onclick = ()=>{
      Data.theme = Data.theme == "dark" ? "light" : "dark"
      Home_currentTheme.innerHTML = Data.theme
      if (Data.theme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      }
    }

  }

  Set() { return /*html*/`

    <header id="Header"> 
      ${ Header.Embed() }
    </header>

    <main> 

      <!-- 🔥 TEMP 🔥 --> 
      <div style="padding: 10px;">
        <h1> Home </h1>
        <button id="Home_themeBtn_TEMP">Toggle Theme</button>
        <hr>
        <label>Current Theme: </label>
        <output id="Home_currentTheme">${Data.theme}</output>
        <br>
        <a href='/tests' style="color: cornflowerblue">tests</a>
      </div>

      <!-- 🔥 TEMP 🔥 --> 

    </main>

  `}
  
}
