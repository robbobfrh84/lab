import { Base } from '../../js/Base.js'
import { Header } from './../../components/Header/Header.js'

export const Profile = new class extends Base {

  Set() { return /*html*/`

    <header id="Header"> 
      ${ Header.Embed() }
    </header>

    <main>
      <h1> Profile </h1>
    </main>

  `}
  
}