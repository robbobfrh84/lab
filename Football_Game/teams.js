var teams = [
{
  teamName: '49ers',
  city: 'San Francisco',
  colors: ['rgb( 142 , 22 , 22 )','rgb( 161 , 134 , 77 )','rgb( 255 , 255 , 255 )','rgb( 0 , 0 , 0 )'],
  offense: [
    { number: 7,  position: 'qb',   speed: 1, quickness: 2, range: 2, accuracy: 2, x: null, y: null },
    { number: 15, position: 'slot', speed: 2, quickness: 2, strangth: 2, hands: 1, x: null, y: null },
    { number: 89, position: 'w1',   speed: 3, quickness: 1, strangth: 1, hands: 2, x: null, y: null },
    { number: 81, position: 'w2',   speed: 1, quickness: 2, strangth: 1, hands: 3, x: null, y: null },
  ],
  defense: [
    { number: 99, position: 'dl',   speed: 1, quickness: 2, tackling: 3, hands: 1, x: null, y: null },
    { number: 56, position: 'lb',   speed: 2, quickness: 2, tackling: 2, hands: 1, x: null, y: null },
    { number: 28, position: 'cb',   speed: 3, quickness: 2, tackling: 1, hands: 1, x: null, y: null },
    { number: 31, position: 'cb',   speed: 2, quickness: 2, tackling: 1, hands: 2, x: null, y: null },
  ]
},
{
  teamName: 'Seahawks',
  city: 'Seattle',
  colors: ['rgb( 4 , 26 , 52 )','rgb( 105 , 171 , 29 )','rgb( 149 , 156 , 159 )'],
  players: [
    { number: 3, position: 'qb',   speed: 2, quickness: 2, range: 1, accuracy: 2, x: null, y: null },
    { number: 20, position: 'slot', speed: 2, quickness: 2, strangth: 2, hands: 1, x: null, y: null },
    { number: 83, position: 'w1',   speed: 3, quickness: 1, strangth: 1, hands: 2, x: null, y: null },
    { number: 85, position: 'w2',   speed: 1, quickness: 2, strangth: 1, hands: 3, x: null, y: null },
  ],
  defense: [
    { number: 98, position: 'dl',   speed: 1, quickness: 2, tackling: 3, hands: 1, x: null, y: null },
    { number: 54, position: 'lb',   speed: 2, quickness: 2, tackling: 2, hands: 1, x: null, y: null },
    { number: 25, position: 'cb',   speed: 3, quickness: 2, tackling: 1, hands: 1, x: null, y: null },
    { number: 30, position: 'cb',   speed: 2, quickness: 2, tackling: 1, hands: 2, x: null, y: null },
  ]
},
{
  teamName: 'Los Angeles',
  city: 'Rams',
  colors: ['rgb( 4 , 26 , 52 )','rgb( 161 , 134 , 77 )','rgb( 255 , 255 , 255 )'],
  players: [
    { number: 3, position: 'qb',   speed: 2, quickness: 2, range: 1, accuracy: 2, x: null, y: null },
    { number: 20, position: 'slot', speed: 2, quickness: 2, strangth: 2, hands: 1, x: null, y: null },
    { number: 83, position: 'w1',   speed: 3, quickness: 1, strangth: 1, hands: 2, x: null, y: null },
    { number: 85, position: 'w2',   speed: 1, quickness: 2, strangth: 1, hands: 3, x: null, y: null },
  ],
  defense: [
    { number: 98, position: 'dl',   speed: 1, quickness: 2, tackling: 3, hands: 1, x: null, y: null },
    { number: 54, position: 'lb',   speed: 2, quickness: 2, tackling: 2, hands: 1, x: null, y: null },
    { number: 25, position: 'cb',   speed: 3, quickness: 2, tackling: 1, hands: 1, x: null, y: null },
    { number: 30, position: 'cb',   speed: 2, quickness: 2, tackling: 1, hands: 2, x: null, y: null },
  ]
},
{
  teamName: 'Cardinals',
  city: 'Arizona',
  colors: ['rgb( 133 , 22 , 46 )','rgb( 255 , 255 , 255 )','rgb( 0 , 0 , 0 )'],
  players: [
    { number: 3, position: 'qb',   speed: 2, quickness: 2, range: 1, accuracy: 2, x: null, y: null },
    { number: 20, position: 'slot', speed: 2, quickness: 2, strangth: 2, hands: 1, x: null, y: null },
    { number: 83, position: 'w1',   speed: 3, quickness: 1, strangth: 1, hands: 2, x: null, y: null },
    { number: 85, position: 'w2',   speed: 1, quickness: 2, strangth: 1, hands: 3, x: null, y: null },
  ],
  defense: [
    { number: 98, position: 'dl',   speed: 1, quickness: 2, tackling: 3, hands: 1, x: null, y: null },
    { number: 54, position: 'lb',   speed: 2, quickness: 2, tackling: 2, hands: 1, x: null, y: null },
    { number: 25, position: 'cb',   speed: 3, quickness: 2, tackling: 1, hands: 1, x: null, y: null },
    { number: 30, position: 'cb',   speed: 2, quickness: 2, tackling: 1, hands: 2, x: null, y: null },
  ]
}
]


buildPlayer = (x,y,r, colors, offense)=>{
  if (offense) {
    if (r > 15) arc(x, y, r+(r*.3), 0, Math.PI*2, colors[2], null, null, true)
    arc(x, y, r, 0, Math.PI*2, colors[0], r*.4, colors[1])
  } else {
    if (r > 15) arc(x, y, r+(r*.15), 0, Math.PI*2, colors[2], null, null, true)
    arc(x, y, r, 0, Math.PI*2, colors[0])
    const deg45 = Math.sin(45 * Math.PI / 180.0)*(r-(r*0.10))
    ctx.beginPath()
    ctx.strokeStyle = colors[1]
    ctx.moveTo(x-deg45, y-deg45)
    ctx.lineTo(x+deg45, y+deg45)
    ctx.moveTo(x+deg45, y-deg45)
    ctx.lineTo(x-deg45, y+deg45)
    ctx.lineWidth = r*0.35
    ctx.stroke()
  }
}

arc = (x,y,r,pi1,pi2,fS,lW,sS, shadow)=>{
  ctx.beginPath()
  ctx.arc(x,y,r,pi1,pi2)
  ctx.fillStyle = fS || 'black'
  ctx.lineWidth = lW || 1
  ctx.strokeStyle = sS || fS || 'black'
  // build shadow
  ctx.shadowColor = '#111'
  ctx.shadowBlur = r*1.5
  ctx.shadowOffsetX = r*0.5
  ctx.shadowOffsetY = r*0.5
  fS ? ctx.fill() : null
  // remove shadow
  ctx.shadowColor = 'rgba(0,0,0,0)'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  // return fill to black
  ctx.fillStyle = 'black'
  ctx.stroke()
}
