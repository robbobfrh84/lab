main = (w = window.innerWidth)=>{
  const c = new canvas
  const u = w/100
  const h = u*.6

  c.new('c1', w, w*.6)

/* * * * *  GREEN  * * * * */
  c.path( 49.5*u, 21*h, [
    ['l', 25.5*u,   35*h],
    ['l' ,25.5*u,   50*h],
    ['l', 49.5*u, 36*h],
  ], 0, 'rgba(100,149,237,0)', 'rgba(0,128,0,0.2)', true)

/* * * * *  Purple * * * * */
  c.path( 50.5*u, 21*h, [
    ['l', 74.5*u,   35*h],
    ['l', 74.5*u,   50*h],
    ['l', 50.5*u, 36*h],
  ], 0, 'rgba(100,149,237,0)', 'rgba(153,50,204,0.4)', true)

/* * * * *  ORANGE * * * * */
  c.path( 50*u,   65*h, [
    ['l', 25.5*u, 51*h],
    ['l', 50*u,   37*h],
    ['l', 74.5*u, 51*h],
  ], 0, 'rgba(100,149,237,0)', 'rgba(255,140,0,0.4)', true)

  c.line(50*u, 50*h, 50*u, 0, 'red')
  c.line(50*u, 50*h, 0, 100*h, 'blue')
  c.line(50*u, 50*h, 100*u, 100*h, 'green')
  c.cir(50*u, 50*h, 3, 'blue')


}
