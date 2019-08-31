function start(params) {

	const canvas = document.getElementById(params.id)
  canvas.width = params.width
  canvas.height = params.height
	const dx = params.width / 2
	const dy = params.height / 2

	const ctx = canvas.getContext('2d')
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
	ctx.fillStyle = 'rgba(0, 150, 255, 0.3)'

	// Create the cube
	var cube_center = new Vertex(0, 11*dy/10, 0)
	var cube = new Cube(cube_center, dy)
	var objects = [cube]

	// First render
	render(objects, ctx, dx, dy);

	// Events
	var mousedown = false
	var mx = 0
	var my = 0

	canvas.addEventListener('mousedown', initMove)
	document.addEventListener('mousemove', move)
	document.addEventListener('mouseup', stopMove)

	function rotate(M, center, theta, phi) { // Rotate a vertice
    // Rotation matrix coefficients
  	var ct = Math.cos(theta)
  	var st = Math.sin(theta)
  	var cp = Math.cos(phi)
  	var sp = Math.sin(phi)
		// Rotation
		var x = M.x - center.x
		var y = M.y - center.y
		var z = M.z - center.z
		M.x = ct * x - st * cp * y + st * sp * z + center.x
		M.y = st * x + ct * cp * y - ct * sp * z + center.y
		M.z = sp * y + cp * z + center.z
	}

	function initMove(evt) { // Initialize the movement
		clearTimeout(autorotate_timeout);
		mousedown = true;
		mx = evt.clientX;
		my = evt.clientY;
	}

	function move(evt) {
		if (mousedown) {
			var theta = (evt.clientX - mx) * Math.PI / 360;
			var phi = (evt.clientY - my) * Math.PI / 180;

			for (var i = 0; i < 8; ++i) {
				rotate(cube.vertices[i], cube_center, theta, phi)
      }

			mx = evt.clientX
			my = evt.clientY

			render(objects, ctx, dx, dy)
		}
	}

	function stopMove() {
		mousedown = false
		autorotate_timeout = setTimeout(autorotate, 2000)
	}

	function autorotate() {
		for (var i = 0; i < 8; ++i)
			rotate(cube.vertices[i], cube_center, -Math.PI / 720, Math.PI / 720)

		render(objects, ctx, dx, dy)

		autorotate_timeout = setTimeout(autorotate, 30)
	}
	autorotate_timeout = setTimeout(autorotate, 2000)

}



function render(objects, ctx, dx, dy) {

	ctx.clearRect(0, 0, 2*dx, 2*dy)

  function project(M) {
  	return new Vertex2D(M.x, M.z)
  }

	for (var i = 0, n_obj = objects.length; i < n_obj; ++i) { // For each object
		for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) { // For each face
			const face = objects[i].faces[j]
			var P = project(face[0]) // Draw the first vertex
			ctx.beginPath()
			ctx.moveTo(P.x + dx, -P.y + dy)
			for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) { // Draw the other vertices
				P = project(face[k])
				ctx.lineTo(P.x + dx, -P.y + dy)
			}
			// Close the path and draw the face
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}

}

var VertexX = function(x, y, z) {
	this.x = parseFloat(x)
	this.y = parseFloat(y)
	this.z = parseFloat(z)
};

var Vertex2D = function(x, y) {
	this.x = parseFloat(x)
	this.y = parseFloat(y)
}
