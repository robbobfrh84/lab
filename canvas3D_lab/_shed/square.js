const square = function(center, side) {

	const d = side / 2;

	this.vertices = [
    new VXX(center.x - d, center.y - d, center.z + d),
    new VXX(center.x - d, center.y - d, center.z - d),
    new VXX(center.x + d, center.y - d, center.z - d),
    new VXX(center.x + d, center.y - d, center.z + d),
    // new VXX(center.x + d, center.y + d, center.z + d),
    // new VXX(center.x + d, center.y + d, center.z - d),
    // new VXX(center.x - d, center.y + d, center.z - d),
    // new VXX(center.x - d, center.y + d, center.z + d)
	]

  const v = this.vertices

	this.faces = [
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[0], v[1], v[2], v[3]] },
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[3], v[2], v[5], v[4]] },
    { fillStyle: 'firebrick', vertices: [v[0], v[1], v[2], v[3]] },
    // { fillStyle: 'green', vertices: [v[3], v[2], v[5], v[4]] },
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[4], v[5], v[6], v[7]] },
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[7], v[6], v[1], v[0]] },
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[7], v[0], v[3], v[4]] },
    // { fillStyle: 'rgba(0, 150, 255, 0.3)', vertices: [v[1], v[6], v[5], v[2]] }
	]

  // this.strokeStyle = 'rgba(0, 0, 0, 0.3)'
  // this.fillStyle = 'rgba(0, 150, 255, 0.3)'

}

// 🚨 DO THIS IN Canvas3D!!!!!
var VXX = function(x, y, z) {
	this.x = parseFloat(x)
	this.y = parseFloat(y)
	this.z = parseFloat(z)
};
