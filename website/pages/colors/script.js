var pickR, pickG, pickB, canvas;
var active = 'swatch1'
var shadow = [10,119,0]
var midtone = [255,255,255]
var highlight = [10,119,0]
var mouseDown = false
var currentColorName;
var s = { empty: true }
var transparency = 1
var safariClick = false
var cBucket = {}
var _browsers = {}

_browsers = {
  isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
  isFirefox: typeof InstallTrigger !== 'undefined',
  isSafari: navigator.userAgent.toLowerCase().indexOf('safari/') > -1,
  isIE: /*@cc_on!@*/false || !!document.documentMode,
  isEdge: !_browsers.isIE && !!window.StyleMedia,
  isChrome: !!window.chrome && !!window.chrome.webstore,
  isBlink: (_browsers.isChrome || _browsers.isOpera) && !!window.CSS,
}

window.onload = ()=>{
  const hash = window.location.hash.split('#')[1]
  let color = colors.filter(x => x.name === hash)[0]
  if (color) {
    color = color.rgb.split('rgb(')[1].split(')')[0].split(', ').map( x => parseInt(x) );
    ;[ r.value, g.value, b.value ] = color
  } else {
    [ r.value, g.value, b.value ] = spectrumColors[random(0, spectrumColors.length)]
  }

  keypress(false, 'onload')
  document.body.style.opacity = 1.0;

  window.requestAnimationFrame(()=>{
    const offSetToCenter = (document.body.scrollWidth - window.innerWidth) / 2
    window.pageXOffset = offSetToCenter
    window.scrollTo(offSetToCenter, 0);
  })
}

for (const color of 'rgb') {
  document.getElementById(color).addEventListener('keyup', ()=>{keypress(true, color)})
  document.getElementById(color).addEventListener('focusout', function() {
    if (this.value === '' || !(this.value <= 255 && this.value >= 0)) {
      this.value = '0'
    }
  })
  document.getElementById('h'+color).addEventListener('focusout', function() {
    if (this.value === '' || this.value === '0') {
      this.value = '00'
    }
  })
  document.getElementById('h'+color).oninput = function() {
    document.getElementById(color).value = parseInt(this.value, 16)
    keypress(true, color+'h')
  }
  document.getElementById('s'+color).oninput = function() {
    document.getElementById(color).value = this.value
    keypress(true, 'picker')
  }
  // NOTE:
  // DO WE NEED THIS vvvvvvv It trigger mouse up on sliders so that it updates the location of the color-selector b/w dot.
  document.getElementById('s'+color).onmouseup = function() {
    keypress(true)
  }
}

document.querySelector('#copy').onclick = elm =>{
  let copyTextarea = document.querySelector('#rgbSyn');
  copyTextarea.select();
  document.execCommand('copy');
  elm.target.innerHTML = '* copied'
  setTimeout(()=>{ elm.target.innerHTML = '&#8678; copy' },1000)
}

document.querySelector('#hcopy').onclick = elm =>{
  let copyTextarea = document.querySelector('#hrgbSyn');
  copyTextarea.select();
  document.execCommand('copy');
  elm.target.innerHTML = '* copied'
  setTimeout(()=>{ elm.target.innerHTML = '&#8678; copy' },1000)
}

document.getElementById('rgbSyn').oninput = function(trigger) { // pasting rgb(...) code into input box
  let rgb = this.value.split('(')[1].split(',')
  if (rgb[3]) {
    transparency = parseFloat(rgb[3].split(')')[0])
    document.getElementById('transparent').value = parseInt(transparency*100)
  }
  rgb[2] = rgb[2].split(')')[0]
  let error = false
  r.value = (isNaN(rgb[0]) || rgb[0] > 255 || rgb[0] < 0 || rgb[0].includes('e')) ? error = true : rgb[0]
  g.value = (isNaN(rgb[1]) || rgb[1] > 255 || rgb[1] < 0 || rgb[1].includes('e')) ? error = true : rgb[1]
  b.value = (isNaN(rgb[2]) || rgb[2] > 255 || rgb[2] < 0 || rgb[2].includes('e')) ? error = true : rgb[2]
  if (!b.value || !g.value || !r.value) error = true
  if (error) {
    document.getElementById('rgbSyn').style.color = 'red';
  } else {
    document.getElementById('rgbSyn').style.color = 'rgba(0,0,0,0.7)';
  }
  if (trigger === 'color-has-name') keypress(true, 'color-has-name')
  else keypress(true, 'rgbSyn')
}

document.getElementById('hrgbSyn').oninput = function() { // pasting hex #... code into input box
  let rgb = this.value.split('#')[1]
  let error = false
  r.value = parseInt(rgb[0]+rgb[1], 16) || '00'
  g.value = parseInt(rgb[2]+rgb[3], 16) || '00'
  b.value = parseInt(rgb[4]+rgb[5], 16) || '00'
  if (rgb.length !== 6) error = true
  for (const c of rgb) {
    const a = c.charCodeAt(0)
    if (!((a >= 48 && a <= 57) || (a >= 97 && a <=102))) error = true
  }
  if (error) {
    document.getElementById('hrgbSyn').style.color = 'red';
  } else {
    document.getElementById('hrgbSyn').style.color = 'rgba(0,0,0,0.7)';
  }
  keypress(true, 'hrgbSyn')
}

document.getElementById('black-white').oninput = function() {
  if (s.empty === true) { s.r = r.value; s.g = g.value; s.b = b.value; s.empty = false; };
  let f = (this.value)/100
  r.value = f < 1 ? Math.round(s.r * f) : Math.round((((255/s.r)*(f-1))+1)*s.r)
  g.value = f < 1 ? Math.round(s.g * f) : Math.round((((255/s.g)*(f-1))+1)*s.g)
  b.value = f < 1 ? Math.round(s.b * f) : Math.round((((255/s.b)*(f-1))+1)*s.b)
  keypress(true)
}

document.getElementById('black-white').onmouseup = function() {
  s.empty = true
  setTimeout(()=>{ this.value = 100 },10)
}

document.getElementById('transparent').oninput = function() {
  transparency = this.value/100
  keypress(true)
}

keypress = (updateTextArea, trigger, x, y)=>{
  let sVal = {}
  let rVal = {}
  for (const color of 'rgb') {
    let rgb = document.getElementById(color)
    if (rgb.value === '' && color !== trigger) rgb.value = 0
    if (rgb.value > 255) rgb.value = 255
    if (rgb.value < 0) rgb.value = 0
    if (isNaN(rgb.value)) rgb.value = 0
    if (rgb.value.length > 1 && rgb.value[0] === '0') rgb.value = rgb.value.substr(1)
    const val = document.getElementById(color).value || 0
    rVal[color] = val
    let hex = parseInt(val).toString(16)
    if (hex === 'NaN') {
      hex = ''
      rgb.value = 0
    }
    document.getElementById('h'+color).value = hex
    if (hex.length < 2) hex = '0' + (hex === '' ? '0' : hex)
    sVal[color] = hex
    if (trigger !== color+'h') document.getElementById('h'+color).value = hex
    document.getElementById('s'+color).value = val
  }
  let ends = transparency === 1 ? [' rgb(', ')'] : ['rgba(', ','+transparency+')']
  if (updateTextArea && trigger !== 'rgbSyn') {
    rgbSyn.value = ends[0]+rVal['r']+','+rVal['g']+','+rVal['b']+ends[1]
    document.getElementById('rgbSyn').style.color = 'rgba(0,0,0,0.7)';
  }
  if (updateTextArea && trigger !== 'hrgbSyn') {
    hrgbSyn.value = ' #'+sVal['r']+sVal['g']+sVal['b']
    document.getElementById('hrgbSyn').style.color = 'rgba(0,0,0,0.7)';
  }
  document.getElementById('selector-container').style.backgroundColor = 'rgba('+r.value+','+g.value+','+b.value+','+transparency+')'
  document.getElementById('left-col').style.backgroundColor = 'rgb('+r.value+','+g.value+','+b.value+')'
  document.getElementById('right-col').style.backgroundColor = 'rgb('+r.value+','+g.value+','+b.value+')'
  document.body.style.backgroundColor = 'rgb('+r.value+','+g.value+','+b.value+')'

  if (trigger === 'color-has-name') {
    document.getElementById('color-name1').innerHTML = currentColorName
    document.getElementById('color-name2').innerHTML = currentColorName
    document.getElementById('tabTitle').innerHTML = currentColorName
    window.location.hash = currentColorName
  } else {
    let hasName = false
    for (const color of colors) {
      const rgb = color.rgb.split('rgb(')[1].split(')')[0].split(', ')
      if (rgb[0] === r.value && rgb[1] === g.value && rgb[2] === b.value) {
        document.getElementById('color-name1').innerHTML = color.name
        document.getElementById('color-name2').innerHTML = color.name
        const tabTitle = document.getElementById('tabTitle')
        if (transparency < 1) {
          tabTitle.innerHTML = 'rgba('+r.value+','+g.value+','+b.value+','+transparency+')'
        } else {
          tabTitle.innerHTML = color.name
        }
        hasName = true
      }
    }
    if (!hasName) {
      document.getElementById('color-name1').innerHTML = ''
      document.getElementById('color-name2').innerHTML = ''
      const tabTitle = document.getElementById('tabTitle')
      if (transparency < 1) {
        tabTitle.innerHTML = 'rgba('+r.value+','+g.value+','+b.value+','+transparency+')'
      } else {
        tabTitle.innerHTML = 'rgb('+r.value+','+g.value+','+b.value+')'
      }
    }
  }

  // here we loop through each pixel looking for the closest match.
  const [ pr, pg, pb ] = [ parseInt(r.value), parseInt(g.value), parseInt(b.value) ]
  var rgbXY = {}
  let closest = { n: 265, x: 0, y: 0, rgb: [] }
  for(var xa = 0; xa < 256; xa+=16) {
    for(var ya = 0; ya < 256; ya+=16) {
      const c = canvas.getImageData(xa, ya, 1, 1).data
      rgbXY[c[0]+','+c[1]+','+c[2]] = [xa, ya]
      const offBy = Math.abs(c[0]-pr)+Math.abs(c[1]-pg)+Math.abs(c[2]-pb)
      if (offBy < closest.n) {
        closest.n = offBy
        closest.x = xa
        closest.y = ya
        closest.rgb = c
      }
    }
  } // We split it into two loops because this make the time complexity like less than 1%
  const [ x16, y16 ] = [ closest.x, closest.y ]
  for (var xa = x16-9; xa < x16+9; xa++) {
    for (var ya = y16-9; ya < x16+9; ya++) {
      const c = canvas.getImageData(xa, ya, 1, 1).data
      rgbXY[c[0]+','+c[1]+','+c[2]] = [xa, ya]
      const offBy = Math.abs(c[0]-pr)+Math.abs(c[1]-pg)+Math.abs(c[2]-pb)
      if (offBy < closest.n) {
        closest.n = offBy
        closest.x = xa
        closest.y = ya
        closest.rgb = c
      }
    }
  }
  let selector = document.getElementById('selector')
  selector.style.right = (-207-closest.x)+'px'
  selector.style.top = (-277+closest.y)+'px'
}

random = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

buildSpectrum = ()=>{
  let spectrum = document.getElementById('spectrum-box')
  for (const c of spectrumColors) {
    const col = 'rgb('+c.join(', ')+')'
    let obj = colors.filter((x)=>{ return x.rgb === col })[0]
    spectrum.innerHTML += `
      <div class='spectrum-bit' name='${obj.name}' onmouseover='spectrumHover(event)' onclick='spectrumClick(event)' style='background-color: ${col}; color: ${col};'></div>
    `
  }
}

spectrumHover = (event, rgb = event.target.style.backgroundColor)=>{
  let name = document.getElementById('color-name3')
  name.innerHTML = event.target.attributes.name.nodeValue
  name.style.display = 'inline'
  name.style.backgroundColor = rgb
  if (event.buttons) {
    let rgbSyn = document.getElementById('rgbSyn')
    currentColorName = event.target.attributes.name.nodeValue
    rgbSyn.value = rgb.split(' ').join('')
    rgbSyn.oninput('color-has-name')
  }
}

spectrumClick = (event, rgb = event.target.style.backgroundColor)=>{
  let rgbSyn = document.getElementById('rgbSyn')
  currentColorName = event.target.attributes.name.nodeValue
  rgbSyn.value = rgb.split(' ').join('')
  rgbSyn.oninput('color-has-name')
}

spectrumAreaLeave = (event)=>{
  document.getElementById('color-name3').style.display = 'none'
  if (typeof currentColorName !== 'undefined') {
    keypress(true)
  } else {
    document.getElementById('color-name2').innerHTML = ''
  }
}

buildColorNames = ()=>{
  let list = document.getElementById('colorName-container')
  let allColors = ''
  for (const c of colors){
    c.rgba = 'rgba('+(c.rgb.split(')')[0]+', 0.3)').split('rgb(')[1]
    allColors += `
      <div class='color-container'>
        <div class="color-left" style="background-Color: ${ c.hex };"></div>
        <div class="color-info-box">
          <div class="color-info color-name"> ${ c.name } </div>
          <span class='break-dots' style="color: ${c.rgb};"> :: </span>
          <div class="color-info"> ${ c.rgb } </div>
          <span class='break-dots' style="color: ${c.rgb};"> :: </span>
          <div class="color-info color-hex"> ${ c.hex } </div>
          <button class='color-info-button' value='${c.rgb}' name='${c.name}' onclick="viewColor(event)" style="background-Color: ${c.rgba};"> &#x21E7; view</button>
        </div>
        <div class="color-right" style="background-Color: ${c.hex};"></div>
      </div>
    `
  }
  list.innerHTML = allColors
}

viewColor = (event)=>{
  let rgb = document.getElementById('rgbSyn')
  currentColorName = event.target.name
  rgb.value = event.target.value.split(', ')
  rgb.oninput('color-has-name')
  window.scrollTo(0, 0);
}

document.getElementById('search-input').oninput = function() {
  let divs = document.getElementsByClassName('color-container')
  for (const i in colors) {
    if (colors[i].name.toUpperCase().indexOf(this.value.toUpperCase()) > -1 ) {
      divs[i].style.display = ''
    } else {
      divs[i].style.display = 'none'
    }
  }
}

colourWheel = ()=>{
  var can = document.getElementById('picker');
  can.attr = ('width', '256');
  can.attr = ('height', '256');
  canvas = can.getContext('2d');
  var pixels = canvas.createImageData(256, 256);
  for(var x = 0; x < 256; x++) {
    for(var y = 0; y < 256; y++) {
      var idx = (x + y * 256) * 4;
      pixels.data[idx] =  350 - distance(x,95,y,85)*2;
      pixels.data[idx + 1] = 350 - distance(x,160,y,85)*2;
      pixels.data[idx + 2] = 350 - distance(x,128, y,160)*2;
      pixels.data[idx + 3] = 255;
    }
  }
  function distance(x1,x2,y1,y2){
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
  }
  canvas.putImageData(pixels, 0, 0);
  can.onmousemove = function(e) {
    // let browserOffset = _browsers.isFirefox ? 92 : 92
    //if (_browsers.isSafari  && !_browsers.isChrome) browserOffset = 92
    let browserOffset = 92
    const offCenter = (window.innerWidth - document.getElementById('gradient').clientWidth)/2
    if (offCenter > 0) browserOffset += offCenter
    const x = e.pageX - can.offsetLeft - browserOffset;
    const y = e.pageY - can.offsetTop - 22;
    const color = canvas.getImageData(x, y, 1, 1);
    var data = color.data;
    pickR = data[0]
    pickG = data[1]
    pickB = data[2]
    can.style.border = '10px solid rgb('+pickR+','+pickG+','+pickB+')';
    if (safariClick) {
      setAllRGB(e)
      can.onmouseup = ()=>{
        safariClick = false
      }
      can.onmouseleave = ()=>{
        safariClick = false
      }
    }

    can.onmousedown = function(e) { setAllRGB(e) }
    if (e.buttons) { setAllRGB(e) }
  }
  setAllRGB = (e)=>{
    if (_browsers.isSafari && !_browsers.isChrome) safariClick = true
    r.value = pickR
    g.value = pickG
    b.value = pickB
    let browserOffset = 344
    const offCenter = (window.innerWidth - document.getElementById('gradient').clientWidth)/2
    if (offCenter > 0) browserOffset += offCenter
    keypress(true, 'picker', 344-e.pageX-can.offsetLeft-10, e.pageY-can.offsetTop-10-280)
    let selector = document.getElementById('selector')
    selector.style.right = (browserOffset - e.pageX - can.offsetLeft - 10)+'px'
    selector.style.top = (e.pageY - can.offsetTop - 10 - 288)+'px'
  }

  linkTo = (link)=>{
    window.location.href = link;
  }

}

colourWheel();
buildSpectrum()
buildColorNames()
