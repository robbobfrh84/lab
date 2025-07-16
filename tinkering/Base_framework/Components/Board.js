import { Base } from '../Base.js'

export const Board = new class extends Base {

  move() {
    Base.data.moves++
    Base.Update()
  }

  Set() { return /*html*/` 
    <div>
      • Board Component | <data name="data.moves"></data>
      <button onClick="this.move()">move</button>
    </div>
  `}

}