hover = (colors, w = window.innerWidth)=>{
  if (!colors) colors = [,,]
  const c = new canvas
  const u = w/100
  const h = u*.6

  c.new('c1', w, w*.6)

  const red = colors[0] || 'rgba(178,34,34,0.4)'
  const yellow = colors[1] || 'rgba(184,134,11,0.4)'
  const blue = colors[2] || 'rgba(100,149,237,0.4)'

  c.path(49.5*u, 49*h, [
    ['l', 25*u, 35*h],
    ['l', 25*u, 50*h],
    ['l', 49.5*u, 64*h],
  ], 0, 'rgba(100,149,237,0)', blue, true)

  c.path(50.5*u, 49*h, [
    ['l', 75*u, 35*h],
    ['l', 75*u, 50*h],
    ['l', 50.5*u, 64*h],
  ], 0, 'rgba(100,149,237,0)', red, true)

  c.path(50*u, 48*h, [
    ['l', 25.5*u, 34*h],
    ['l', 50*u, 20*h],
    ['l', 74.5*u, 34*h],
  ], 0, 'rgba(100,149,237,0)', yellow, true)

  // c.ctx.lineCap = 'round';
  // c.line(49.5*u, 49*h, 25*u, 35*h,'blue', 0.5*u)
  // c.line(25*u, 35*h, 25*u, 50*h,'blue', 0.5*u)
  // c.line(25*u, 50*h, 49.5*u, 64*h,'blue', 0.5*u)
  // c.line(49.5*u, 64*h, 49.5*u, 49*h,'blue', 0.5*u)

}

document.getElementById('c1').addEventListener('mousemove', (event)=>{
  if (active === 'hover') {
    const c = document.getElementById('c1')
    const p = c.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    console.log(p)
    if (p.join('') === `100148238102` || p.join('') === `100148237153`) {
      hover([,,'rgba(100,149,237,0.6)'])
    } else if (p.join('') === `1783333102` || p.join('') === `1783333153`) {
      hover(['rgba(178,34,34,0.6)',,])
    } else if (p.join('') === `18513310102` || p.join('') === `18313310153`) {
      hover([,'rgba(184,134,11,0.6)',])
    }
    else {
      hover([,,])
    }
  }
})
