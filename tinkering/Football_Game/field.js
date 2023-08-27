
var marginAdj = 15
var ajw = ((window.innerHeight-marginAdj)*160)/360
if (ajw <= 280) ajw = 280
var c = ajw/200 // Chalk-line thickenss.
var w = ajw+c // set window to fit field dimentions...
var h = (w*360)/160
var ctx = document.getElementById("myCanvas")
ctx.width = (w*1.1)+10
ctx.height = h+10
ctx = document.getElementById("myCanvas").getContext("2d")
var img = new Image()
img.src = 'darkGreenGainy.png'

var home = teams[0]
var away = teams[1]
var grass

img.onload = function(){
  grass = ctx.createPattern(this, "repeat")
  buildField(grass)
}

buildField = (grass)=>{
  // field boundary
  roundedRect(5, 5, w*1.1, h, 15, null, grass)
  roundedRect(7.5, 7.5, w*1.1-5, h-5, 12.5, 5, null, 'rgba(255,255,255,0.35)')
  //goal lines
  vertLine(10, ((h+5)/10), w*1.1, (h/10), 5, 'rgba(255,255,255,0.35)')
  vertLine(10, ((h+10)/10)*9, w*1.1, ((h+10)/10)*9, 5, 'rgba(255,255,255,0.35)')
  // team endzones
  let c = home.colors[0].split(' ')
  roundedRect(17.5, 17.5, w*1.1-25, ((h+5)/10)-27.5, 12.5, 5, null, 'rgba('+c[1]+', '+c[3]+', '+c[5]+', 0.4)')
  c = home.colors[1].split(' ')
  roundedRect(25, 25, w*1.1-40, ((h+5)/10)-42.5, 10.5, null, 'rgba('+c[1]+', '+c[3]+', '+c[5]+', 0.4)')
  c = away.colors[0].split(' ')
  roundedRect(17.5, ((h+10)/10)*9+10.5, w*1.1-25, ((h+5)/10)-27.5, 12.5, 5, null, 'rgba('+c[1]+', '+c[3]+', '+c[5]+', 0.4)')
  c = away.colors[1].split(' ')
  roundedRect(25, ((h+10)/10)*9+17.5, w*1.1-40, ((h+5)/10)-42.5, 10.5, null, 'rgba('+c[1]+', '+c[3]+', '+c[5]+', 0.4)')
}

vertLine = (x, y, x2, y2, w, c)=>{
  ctx.beginPath()
  ctx.strokeStyle = c
  ctx.moveTo(x, y)
  ctx.lineTo(x2,y2)
  ctx.lineWidth = w
  ctx.stroke()
}

roundedRect = (x, y, width, height, radius, border, fill, stroke)=>{
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.lineWidth = border || null
  ctx.strokeStyle = stroke || null
  ctx.fillStyle = fill || 'rgba(0,0,0,0)'
  // build shadow
  ctx.shadowColor = '#222'
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.fill()
  // remove shadow
  ctx.shadowColor = 'rgba(0,0,0,0)'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  stroke ? ctx.stroke() : null
}
