_rand = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

_rgbR = ()=>{
  return 'rgb('+_rand(0,255)+', '+_rand(0,255)+', '+_rand(0,255)+')';
}

_randId = (length)=>{
  dec2hex = (dec)=>{
    return ('0' + dec.toString(16)).substr(-2)
  }
  generateId = (len)=>{
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }
  return generateId(length)
}

_flattenAppends = (obj)=>{
  let flattened = []
  recursion = (obj)=>{
    for (const something in obj) {
      if (!obj[something].appends) return false
      if (Object.keys(obj[something].appends).length > 0) {
        recursion(obj[something].appends)
      }
      flattened.push('blocks.'+obj[something].id)
    }
  }
  recursion(obj)
  return flattened
}

_trimTree = (limb, tree)=>{
  let trim = {}
  recursion = (obj)=>{
    for (const something in obj) {
      if (obj[something].id === limb.id) trim = obj[something].appends
      if (Object.keys(obj[something].appends).length > 0) {
        recursion(obj[something].appends)
      }
    }
  }
  recursion(tree)
  return trim
}
