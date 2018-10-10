build_solar_system = (ss)=>{

  ss.system.star.adj_r = ss.system.star.radius/ss.pix_per_miles
  let cur_x = (ss.system.star.adj_r+ss.padding)*2

  ss.height = (ss.system.star.adj_r+ss.padding)*2

  ss.system.planets.map( planet =>{
    const pr = planet.radius/ss.pix_per_miles
    planet.adj_r = pr
    planet.x = cur_x + pr + ss.padding
    cur_x += (pr*2)+ss.padding
    return planet
  })

  const width = cur_x
  ss.width = width+ss.right_pad < ss.min_width ? ss.min_width : width+ss.right_pad

  const c = new canvas
  c.new(ss.canvas_Id, ss.width, ss.height)

  c.cir(
    ss.system.star.adj_r+ss.padding,
    ss.height/2,
    ss.system.star.adj_r,
    ss.system.star.color
  )

  for (const planet of ss.system.planets) {
    c.cir(
      planet.x,
      ss.height/2,
      planet.adj_r,
      planet.color
    )
  }

}
