var seconds = 5;
var doPlay = true;
var timePath = document.getElementById('timePath')
degreeStep = 0;
t = (seconds/360 * 1000);

(function draw() {
  degreeStep++;
  degreeStep %= 360;

  var r = ( degreeStep * Math.PI / 180 );
  x = Math.sin( r ) * 125;
  y = Math.cos( r ) * - 125;
  mid = ( degreeStep > 180 ) ? 1 : 0;
  anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' +  x  + ' ' +  y  + ' z';

  timePath.setAttribute( 'd', anim );
  if(doPlay){
    setTimeout(draw, t); // Redraw
  }
})();
