import { Base } from './Base.js'
import { Page } from './Page.js'

const Data = {
  moves: 0,
  messages: [],
  player: {
    name: 'Bob',
    color: "cornflowerblue",
    location: { x: 2, y: 3 },
  }
}

window.onload = ()=>{
  Base.data = JSON.parse(JSON.stringify(Data))
  Page.AllGo("body")
  Base.Update()
}

