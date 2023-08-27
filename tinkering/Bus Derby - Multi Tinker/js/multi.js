var player
var opponent
var fire = {}
var previous_state
var last_update = Date.now()

var config = {
  apiKey: "AIzaSyB6DYmRTHL9_8shibvoiH4FyzTyrFAuCJM",
  authDomain: "bus-derby.firebaseapp.com",
  databaseURL: "https://bus-derby.firebaseio.com",
  projectId: "bus-derby",
  storageBucket: "bus-derby.appspot.com",
  messagingSenderId: "229064166822"
}

firebase.initializeApp(config)

var dbRef = firebase.database().ref().child('game')

fire.p1 = {
  action: {
    "37": false,
    "38": false,
    "39": false,
    "40": false
  },
  position: getPos('p1')
}
fire.p2 = {
  action: {
    "76": false,
    "222": false,
    "80": false,
    "186": false
  },
  position: getPos('p2')
}

firebase.database().ref('game/p1').set(fire.p1)
firebase.database().ref('game/p2').set(fire.p2)

// dbRef.on('value', snap => {
//   fire = snap.val()
//   if (fire.turn === opponent) {
//     for (const key in fire[opponent].action) {
//       if (previous_state[opponent].action[key] !== fire[opponent].action[key]) {
//         if (fire[opponent].action[key] === true){
//           console.log('down', key)
//           handleKeyDown(null, parseInt(key))
//         } else {
//           console.log('up', key)
//           handleKeyUp(null, parseInt(key))
//         }
//       }
//     }
//     setPos(opponent)
//   }
//   previous_state = fire
//
// })

function selectPlayer(event, color, p){
  player = p
  opponent = p === 'p1' ? 'p2' : 'p1'
  multiPlayerConsole.style.color = color
  multiPlayerConsole.innerHTML = "Player 1: "+event.srcElement.textContent

  previous_state = fire
  var dbRefO = firebase.database().ref().child('game/'+opponent)

  dbRefO.on('value', snap => {
    console.log('val')
    fire[opponent] = snap.val()
    for (const key in fire[opponent].action) {
      if (previous_state[opponent].action[key] !== fire[opponent].action[key]) {
        if (fire[opponent].action[key] === true){
          console.log('down', key)
          handleKeyDown(null, parseInt(key))
        } else {
          console.log('up', key)
          handleKeyUp(null, parseInt(key))
        }
      }
    }
    setPos(opponent)
    previous_state = fire
  })

  fire[player].position = getPos(player)
  firebase.database().ref('game/'+player).set(fire[player])

  start_auto_position_checker()
}

function getPos(player){

  const b = player === 'p1' ? busArray[0] : busArray[1]

  return {
    p: [b.frame.position.x, b.frame.position.y, b.frame.position.z],
    r: [b.frame.rotation._x, b.frame.rotation._y, b.frame.rotation._z],
    blp: [b.wheel_bl.position.x, b.wheel_bl.position.y, b.wheel_bl.position.z],
    blr: [b.wheel_bl.rotation._x, b.wheel_bl.rotation._y, b.wheel_bl.rotation._z],
    brp: [b.wheel_br.position.x, b.wheel_br.position.y, b.wheel_br.position.z],
    brr: [b.wheel_br.rotation._x, b.wheel_br.rotation._y, b.wheel_br.rotation._z],
    flp: [b.wheel_fl.position.x, b.wheel_fl.position.y, b.wheel_fl.position.z],
    flr: [b.wheel_fl.rotation._x, b.wheel_fl.rotation._y, b.wheel_fl.rotation._z],
    frp: [b.wheel_fr.position.x, b.wheel_fr.position.y, b.wheel_fr.position.z],
    frr: [b.wheel_fr.rotation._x, b.wheel_fr.rotation._y, b.wheel_fr.rotation._z]
  }
}

function setPos(player){

  const bus = player === 'p1' ? busArray[0] : busArray[1]
  const pos = fire[player].position

  bus.frame.__dirtyPosition = true;
  bus.frame.__dirtyRotation = true;
  bus.wheel_bl.__dirtyPosition = true;
  bus.wheel_bl.__dirtyRotation = true;
  bus.wheel_br.__dirtyPosition = true;
  bus.wheel_br.__dirtyRotation = true;
  bus.wheel_fl.__dirtyPosition = true;
  bus.wheel_fl.__dirtyRotation = true;
  bus.wheel_fr.__dirtyPosition = true;
  bus.wheel_fr.__dirtyRotation = true;
  bus.frame.position.set(pos.p[0], pos.p[1], pos.p[2]);
  bus.frame.rotation.set(pos.r[0], pos.r[1], pos.r[2]);
  bus.wheel_bl.position.set(pos.blp[0], pos.blp[1], pos.blp[2]);
  bus.wheel_bl.rotation.set(pos.blr[0], pos.blr[1], pos.blr[2]);
  bus.wheel_br.position.set(pos.brp[0], pos.brp[1], pos.brp[2]);
  bus.wheel_br.rotation.set(pos.brr[0], pos.brr[1], pos.brr[2]);
  bus.wheel_fl.position.set(pos.flp[0], pos.flp[1], pos.flp[2]);
  bus.wheel_fl.rotation.set(pos.flr[0], pos.flr[1], pos.flr[2]);
  bus.wheel_fr.position.set(pos.frp[0], pos.frp[1], pos.frp[2]);
  bus.wheel_fr.rotation.set(pos.frr[0], pos.frr[1], pos.frr[2]);

}

function start_auto_position_checker(){
  setInterval(function(){
    fire[player].position = getPos(player)
    firebase.database().ref('game/'+player).set(fire[player])
  }, 50)
}

// NOTES
// Refactor functions in index.js to only have 2 lines  of code in each down/up to call func here.
//
