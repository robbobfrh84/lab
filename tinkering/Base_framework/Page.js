import { Base } from './Base.js'
import { Nav } from '/Components/Nav.js'
import { Board } from '/Components/Board.js'

export const Page = new class extends Base {

  PreSet() {
    this.startCallNavAndSelf() // * Placeholder for a common initial API Request call.
  }

  startfunc(msg) {
    Base.data.messages.push(msg)
    Base.data.moves++
  }

  startCallNavAndSelf() {
    Nav.navFunc("Hi, from Start to Nav")
    this.startfunc("Hi, from Start to Start")
  }

  Set() { return /*html*/` 
    <div>
      <h3>Start Component | <data name="data.moves"></data> </h3>
      Player: <data name="data.player.name"></data>
      ${ Nav.Render() } 
      ${ Board.Render() }
    </div>
  `}
  
}
