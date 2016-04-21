var rows = 8; var boxClass = 'eight';
// var rows = 16; var boxClass = 'sixteen';
// var rows = 32; var boxClass = 'thirtyTwo';

for (var j = 0; j < rows; j++) {
  for ( var i = 0; i < rows; i += 1) {
    var color = 'rgb(' + rgb() + ',' + rgb() + ',' + rgb() + ')';
    var bId = (i+(j*rows));
    document.write('<div id="blk'+bId+'" class='+boxClass+' onmousedown="blkClick('+bId+
    ')" style="background-color:'+color+'"></div>');
  }
  document.write("<br>");
}

function blkClick(bId){
  var blk = document.getElementById('blk'+bId)
  blk.style.boxShadow = '0 0 3px 3px rgba(0,0,0,0.8), inset 0 0 3px 3px rgba(255,255,255,0.8)';
}

function allColorShuffle(){
  for ( var i = 0; i < rows*rows; i += 1) {
    var blk = document.getElementById('blk'+i)
    blk.style.backgroundColor = 'rgb(' + rgb() + ',' + rgb() + ',' + rgb() + ')';
  }
}

function numberColorShuffle(num){
  for ( var i = 0; i < num; i += 1) {
    var bId = Math.floor(Math.random() * (rows*rows))
    var blk = document.getElementById('blk'+bId)
    blk.style.backgroundColor = 'rgb(' + rgb() + ',' + rgb() + ',' + rgb() + ')';
  }
}

setInterval(function(){numberColorShuffle(10);}, 200);

function btn1(){
  console.log('click');
}

function rgb() {
  return Math.floor(Math.random() * 256 );
}

/*------------------------------------------------------------------------------
        Source Code from http://jqueryui.com/slider/#colorpicker
------------------------------------------------------------------------------*/

// function hexFromRGB(r, g, b) {
//     var hex = [
//       r.toString( 16 ),
//       g.toString( 16 ),
//       b.toString( 16 )
//     ];
//     $.each( hex, function( nr, val ) {
//       if ( val.length === 1 ) {
//         hex[ nr ] = "0" + val;
//       }
//     });
//     return hex.join( "" ).toUpperCase();
//   }
//
// function refreshSwatch() {
//   var red = $( "#red" ).slider( "value" ),
//     green = $( "#green" ).slider( "value" ),
//     blue = $( "#blue" ).slider( "value" ),
//     hex = hexFromRGB( red, green, blue );
//   $( "#swatch" ).css( "background-color", "#" + hex );
// }
//
// $(function() {
//   $( "#red, #green, #blue" ).slider({
//     orientation: "horizontal",
//     range: "min",
//     max: 255,
//     value: 127,
//     slide: refreshSwatch,
//     change: refreshSwatch
//   });
//   $( "#red" ).slider( "value", 255 );
//   $( "#green" ).slider( "value", 140 );
//   $( "#blue" ).slider( "value", 60 );
// });
