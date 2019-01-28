function _random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function _rgbR(){
  return 'rgb('+_random(0,255)+', '+_random(0,255)+', '+_random(0,255)+')'
}

function _abcRatio(a1,b1,c){
  const c1 = Math.sqrt((a1*a1) + (b1*b1))
  const a2 = (c * a1) / c1
  const b2 = (c * b1) / c1
  return [a2,b2]
}

var _getId = (function (){
	var cnt = 0;
	return function(){
		return cnt+=2
	}
})()
