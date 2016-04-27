function Vector(x, y) {
	this.x = x;
	this.y = y;
}

function Color(r, g, b) {
	this.red = r;
	this.green = g;
	this.blue = b;
	this.toString = rgbtostr;
}

function rgbtostr() {
	return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
}
