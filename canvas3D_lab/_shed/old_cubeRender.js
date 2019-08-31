

model1.rotate(model1.viewX, model1.viewY)


test1.model(Cube)
// test1.model(square)
test1.render()
test1.move(test1.viewX, test1.viewY)


  radian(degree) {
    return degree * Math.PI / 180
  }

  Vertex = function(x, y, z) {
  	this.x = parseFloat(x)
  	this.y = parseFloat(y)
  	this.z = parseFloat(z)
  }

  Vertex2D = function(x, y) {
  	this.x = parseFloat(x)
  	this.y = parseFloat(y)
  }

  model(Elm) {
    this.elms.push(new Elm(this.center, this.dy))
  }

  move(u1,u2){

    const theta = this.radian(u1) // Θ
    const phi =   u2 * Math.PI / 180 // φ
    //
    //
    for (var i = 0; i < this.elms[0].vertices.length; ++i) {
      this.rotate(this.elms[0].vertices[i], this.center, theta, phi)
    }

    this.render()
  }

  rotate(M, center, t, p) {
    const [ ct,st,cp,sp ] = [ Math.cos(t), Math.sin(t), Math.cos(p), Math.sin(p) ]
    // Rotation
    const [ x, y, z ] = [ M.x - center.x, M.y - center.y, M.z - center.z ]
    // 👀 We're changing the actual location.
    M.x = ct * x - st * cp * y + st * sp * z + center.x
    M.y = st * x + ct * cp * y - ct * sp * z + center.y
    M.z = sp * y + cp * z + center.z
  }

  project(M) {
    // Distance between the camera and the plane
  	var d = 150;
  	var r = d / (M.y);
  	return new this.Vertex2D(r * M.x, r * M.z);
  }

  render() {

    this.ctx.clearRect(0, 0, this.width, this.height)

    this.elms.forEach(elm => {
      elm.faces.forEach(face => {
        let P = this.project(face.vertices[0]) // Draw the first vertex
        // let P = new this.Vertex2D(face.vertices[0].x,face.vertices[0].z) // Draw the first vertex
        this.ctx.beginPath()
        this.ctx.moveTo(P.x + this.dx, -P.y + this.dy)
        for (var k = 1; k < face.vertices.length; ++k) { // Draw the other vertices
          // P = new this.Vertex2D(face.vertices[k].x,face.vertices[k].z)
          P = this.project(face.vertices[k])
          this.ctx.lineTo(P.x + this.dx, -P.y + this.dy)
        }
        this.draw(elm.strokeStyle, face.fillStyle)
      })

    })

  }

  draw(stroke, fill) {
    this.ctx.strokeStyle = stroke
    this.ctx.fillStyle = fill
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
  }


}
