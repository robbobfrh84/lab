var html = '';
var rgbColor;

for (var j = 1; j <= 8; j++) {
  for ( var i = 1; i <= 8; i += 1) {
    rgbColor = 'rgb(' + rgb() + ',' + rgb() + ',' + rgb() + ')';
    html += '<div style="background-color:' + rgbColor + '"></div>';
  }
  html += "<br>"
}
document.write(html);

function rgb() {
  return Math.floor(Math.random() * 256 );
}
