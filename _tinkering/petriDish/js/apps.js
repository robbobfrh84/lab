function _random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function _rgbR(){
  return 'rgb('+_random(0,255)+', '+_random(0,255)+', '+_random(0,255)+')'
}

function _getDist(x1,x2,y1,y2) {
  const [ a, b ] = [ Math.abs(x1 - x2), Math.abs(y1 - y2) ]
  return Math.sqrt( (b*b) + (a*a) )
}

function _PN(){
  return Math.random() < 0.5 ? -1 : 1
}

var _getId = (function (){
	var cnt = 0;
	return function(){
		return cnt+=1
	}
})()
