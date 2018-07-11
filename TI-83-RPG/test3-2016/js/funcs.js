random = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

valStr = (val)=>{
  let strVal = ''
  if (typeof val !== 'object') {
    return val
  } else {
    for (const v in val) {
      strVal += val[v] + ','
    }
  }
  return strVal.slice(0,strVal.length-1)
}
