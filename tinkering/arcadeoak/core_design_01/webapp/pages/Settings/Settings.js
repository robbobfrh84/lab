import { Base } from '../../js/Base.js'
import { Header } from './../../components/Header/Header.js'

export const Settings = new class extends Base {

  Set() { return /*html*/`

    <header id="Header"> 
      ${ Header.Embed() }
    </header>

    <main>
      <h1> Settings </h1>
    </main>

  `}
  
}