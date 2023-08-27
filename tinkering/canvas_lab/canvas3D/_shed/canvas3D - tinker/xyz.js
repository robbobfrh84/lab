xyz = (w = window.innerWidth, u = w/100, h = u*.6)=>{

  main = ()=>{
  /* * * * *  ----  * * * * */
  }

  start = (c)=>{
    c.new('c1', w, w*.6)
  /* * * * *  XYZ FORGROUND LINES  * * * * */
    c.line(50*u, 50*h, 50*u, 100*u, 'rgba(255,0,0,0.2)', 0.25*u)
    c.line(50*u, 50*h, 0*u, 0*u, 'rgba(0,155,0,0.2)', 0.25*u)
    c.line(50*u, 50*h, 100*u, 0*u, 'rgba(0,0,255,0.2)', 0.25*u)
  /* * * * *  XYZ FORGROUND LINES  * * * * */
    c.line(50*u, 50*h, 50*u, 0, 'red', 0.3*u)
    c.line(50*u, 50*h, 0, 100*h, 'blue', 0.3*u)
    c.line(50*u, 50*h, 100*u, 100*h, 'green', 0.3*u)
  /* * * * *  CENTER (0,0,0)  * * * * */
    c.cir(50*u, 50*h, 3, '#555')

    c.text('x', 98*u, 3*u, 2*u)
    c.text('y', 94*u, 98*h, 2*u)
    c.text('z', 51*u, 1.5*u, 2*u)
  }

  start(c = new canvas)
  main()

}
