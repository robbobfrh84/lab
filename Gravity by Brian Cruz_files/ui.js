var steps = 0;
var startTime;
var endTime;
var fps;
var particles = new Array();
var mass = 16; 
var gravityConstant = 1;
var xOffset = 0;
var yOffset = 0;
var initOffset = 0;
var initYOffset = 0;
var zoomScale = 1;
var mouseInitX = 0;
var mouseInitY = 0;
var currentMouseX = 0;
var currentMouseY = 0;
var dragging = false;
var panning = false;
var shiftPressed = false;
var running = true;
var ctx;

function newParticle(m, v, x, y) {
	var p = new Particle(m, v, x, y);
	particles[particles.length] = p;
}

function cloud(centerX, centerY) {
	for (var i = 0; i < 1000; i++) {
		var angle = Math.random() * 2 * Math.PI;
		var dist = Math.pow(Math.random() * 15, 2);
		var x = centerX + dist * Math.cos(angle);
		var y = centerY + dist * Math.sin(angle);
		var vx = dist * Math.sin(angle) / 50;
		var vy = -dist * Math.cos(angle) / 50;
		newParticle(2, new Vector(vx, vy), x, y);
	}
	paintParticles(particles);
}

function randDist() {
	xMax = $(window).width();
	yMax = $(window).height();
	for (var i = 0; i < 1000; i++) {
		var x = (Math.random() * xMax - xOffset) / zoomScale;
		var y = (Math.random() * yMax - yOffset) / zoomScale;
		var vx = Math.random() * 10 - 5;
		var vy = Math.random() * 10 - 5;
		newParticle(2, new Vector(vx, vy), x, y);
	}
	paintParticles(particles);
}

function center(p) {
	var x = 0;
	var y = 0;
	var maxMass = 0;
	for (var i = 0; i < p.length; i ++) {
		if (p[i].mass > maxMass) {
			x = p[i].x * zoomScale;
			y = p[i].y * zoomScale;
			maxMass = p[i].mass;
		}
	}
	xOffset = $(window).width() / 2 - x;
	yOffset = $(window).height() / 2 - y;
}

function clean(p) {
	for (var i = 0; i < p.length; i ++) {
		var x = p[i].x * zoomScale + xOffset;
		var y = p[i].y * zoomScale + yOffset;
		if (x < 0 || x > $(window).width() || y < 0 || y > $(window).height()) {
			p.splice(i, 1);
		}
	}
}

$(document).ready(function (e) {
	xOffset = $(window).width() / 2;
	yOffset = $(window).height() / 2;
	mouseInitX = e.clientX;
	mouseInitY = e.clientY;
	ctx = $("#canvas")[0].getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	$("#canvas").mousedown(function (e) {
		mouseInitX = e.clientX;
		mouseInitY = e.clientY;
		dragging = true;
		if (e.which == 2 || shiftPressed) {
			e.preventDefault();
			panning = true;
			initXOffset = xOffset;
			initYOffset = yOffset;
		}
	});
	
	$("#canvas").mouseup(function (e) {
		if (!panning) {
			var vx = (e.clientX - mouseInitX) / 10;
			var vy = (e.clientY - mouseInitY) / 10;
			newParticle(mass, new Vector(vx, vy), (mouseInitX - xOffset) / zoomScale, (mouseInitY - yOffset) / zoomScale);
			paintParticles(particles);
		}
		panning = false;
		dragging = false;
	});
	
	$("#canvas").mousemove(function (e) {
		currentMouseX = e.clientX;
		currentMouseY = e.clientY;
		if (panning) {
			xOffset = initXOffset + (currentMouseX - mouseInitX);
			yOffset = initYOffset + (currentMouseY - mouseInitY);
		}
	});
	
	$(window).bind('mousewheel', function (e) {
		if (e.originalEvent.wheelDelta / 120 > 0) {
			if (shiftPressed) {
				zoomScale *= 1.2;
			} else {
				mass *= 2;
			}
		} else {
			if (shiftPressed) {
				zoomScale /= 1.2;
			} else {
				mass /= 2;
			}
		}
		if (mass > 32768) { mass = 32768; }
		if (mass < 2) { mass = 2; }
		$("#mass-marker").html("Mass: " + mass);
	});
	
	$("body").keydown(function(e) {
		if (e.which == 16) {
			shiftPressed = true;
		}
	});

	$("body").keyup(function (e) {
		if (e.which == 72) {
			$("#instructions").toggle();
		} else if (e.which == 16) {
			shiftPressed = false;
		} else if (e.which == 32) {
			cloud(currentMouseX - xOffset, currentMouseY - yOffset);
		} else if (e.which == 67) {
			center(particles);
		} else if (e.which == 68) {
			clean(particles);
		} else if (e.which == 80) {
			running = !running;
		} else if (e.which == 75) {
			randDist();
		} else if (e.which == 81) {
			gravityConstant *= 1.2;
		} else if (e.which == 65) {
			gravityConstant /= 1.2;
		} else if (e.which == 38) {
			mass *= 2;
			if (mass > 32768) { mass = 32768; }
		} else if (e.which == 40) {
			mass /= 2;
			if (mass < 2) { mass = 2; }
		}
		$("#mass-marker").html("Mass: " + mass);
	});
	
	var startTime = new Date;
	t  = setInterval(function() {
		endTime = new Date;
		fps = 1000 / (endTime - startTime);
		startTime = endTime;
		$("#particle-num").html("Bodies: " + particles.length);
		//$("#step-counter").html("Steps: " + steps);
		$("#fps").html("FPS: " + fps.toFixed(2));
		$("#gravity-const").html("Gravity Constant: " + gravityConstant.toFixed(2));
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		paintParticles(particles);
		if (dragging && !panning) {
			ctx.beginPath();
			ctx.moveTo(mouseInitX, mouseInitY);
			ctx.lineTo(currentMouseX, currentMouseY);
			ctx.strokeStyle = "white";
			ctx.stroke();
		}
		if (running) {
			gravityCalc(particles);
			steps ++;
		}
	}, 15);
});
