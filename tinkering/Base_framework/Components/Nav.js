import { Base } from '../Base.js'

export const Nav = new class extends Base {

  title = "Start Component"

  navFunc(msg) {
    Base.data.messages.push(msg)
    Base.data.moves++
  }

  Set() { return /*html*/` 
    <div>
      • ${this.title} | <data name="data.moves"></data>
    </div>
  `}

}