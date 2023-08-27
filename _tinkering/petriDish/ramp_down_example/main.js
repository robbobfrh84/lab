var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var cW = window.innerWidth*0.975, cH = window.innerHeight*0.975;
ctx.canvas.width = cW, ctx.canvas.height = cH;
var radius = cW*0.02; //cell size
var shell_size = 1.4; // Scale of shell
var cellCnt = 0;
var maxCells = 100;
var startTime = Math.floor(Date.now() / 1000); //time
var colors = ['rgba(0,100,0,0.6)','rgba(50,150,20,0.5)'];
var colors2 = ['rgba(100,0,0,0.6)','rgba(50,150,20,0.5)'];


/******************************************************
                      CELL CLASS
*******************************************************/
function Cell(x,y,r,col,shell,gen,stop){
  this.x = x;  this.y = y;
  this.nx = x; this.ny = y;
  this.sy = 1; this.sx = 1;  // x/y step increament.
  this.r = r;
  this.rp = 0.5; //speed arc control
  this.rpMax = 3; //need this...?
  this.maxR = r; //largest size.
  this.col = col;
  this.gen = gen; //switch this to an arrey of ids of parents
  this.born = Math.floor(Date.now() / 1000);
  this.stop = stop;
  //this.underMitosis = false;
  if (!shell) {
    this.shell = new Cell(x, y, r*shell_size, this.col, true);
    cellCnt++;
  };
  this.reDraw();
}

Cell.prototype.reDraw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.col;
  ctx.arc(this.x, this.y, this.r, 0*Math.PI, 2*Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

Cell.prototype.setLocation = function(nx,ny){ //Change to prototype?
  this.rp = 0.5;
  this.nx = nx; this.ny = ny;
  var dx = Math.abs(this.x-this.nx); var dy = Math.abs(this.y-this.ny);
  this.sx = dx/Math.max(dx, dy); this.sy = dy/Math.max(dx, dy);
  void(this.nx-this.x < 0 && (this.sx*=-1));
  void(this.ny-this.y < 0 && (this.sy*=-1));
}

Cell.prototype.move = function(){
  var dx = Math.abs(this.x-this.nx);
  if (dx > Math.abs(this.sx)*this.rp){
    this.x+=this.sx*this.rp; this.y+=this.sy*this.rp;
    this.shell.x = this.x; this.shell.y = this.y;
    // if (this.r > this.maxR*0.75 && this.underMitosis) {
    //   this.r -= this.rp; this.shell.r -= this.rp;
    // }
    var dy = Math.abs(this.y-this.ny);
    var d = Math.sqrt((dx * dx) + (dy * dy));
    if (d-(radius*2) > 0){
      this.rp >= this.rpMax ? this.rp = this.rpMax : this.rp *= 1.05 ;
    } else {
      this.rp >= 0.5 ? this.rp *= 0.9 : this.rp = 0.5;
    }
  } else {
    if (!this.stop){
      this.setLocation(random(0,cW),random(0,cH));
    }
  }
  this.reDraw(); this.shell.reDraw();
}

Cell.prototype.mitosis = function(){
  this.stop = !this.stop;
  this.nx = this.x + (this.sx*30);
  this.ny = this.y + (this.sy*30);
  var that = this;
  var delayedMethod = function() {
    c[cellCnt] = new Cell(that.x,that.y,that.r,colors2,false, that.gen+1,true);
    that.setLocation((that.x-that.r),that.y);
    c[cellCnt-1].setLocation((that.x+that.r),that.y);
  }
  window.setTimeout(delayedMethod, 2000);
  setTimeout(function(){that.stop = false; c[cellCnt-1].stop = false}, 4000);
}

/******************************************************
                      FUNCTIONS
*******************************************************/
function babyBoom(){
  var l = c.length;
  for (var i = 0; i < l; i++){
    c[i].mitosis();
    //c[i].stop(false);
  }
  void(c.length > maxCells &&(clearInterval(generation)));
}

function random(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/******************************************************
                   INITIATE & TIME
*******************************************************/
var c = [];
c[cellCnt] = new Cell(cW/2, cH/2, radius, colors[0], false, 0, false);
// var generation = setInterval(function(){ babyBoom();}, 4000);
// setTimeout(function(){ c[0].mitosis();}, 1000);

function time(){
  ctx.clearRect(0,0,cW,cH);
  c.forEach(function(cell){ cell.move(); })
  requestAnimationFrame(time);
}
requestAnimationFrame(time);
