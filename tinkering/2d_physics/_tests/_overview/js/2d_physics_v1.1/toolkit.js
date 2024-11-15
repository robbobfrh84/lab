const toolkit_check_image = async (url) => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve('success')
    img.onerror = () => resolve('error')
  })
}

function toolkit_load_Image(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = () => resolve('error')
  })
}

function toolkit_get_image_size(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve({ w: img.width, h: img.height })
    img.onerror = () => resolve('error')
  })
}

async function toolkit_round_image(width, height, imageUrl) {
  const img = await toolkit_load_Image(imageUrl)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  ctx.beginPath()
  ctx.arc(width/2,width/2,width/2,0,Math.PI*2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL()
}

async function toolkit_image_opacity(opacity, imageUrl) {
  const img = await toolkit_load_Image(imageUrl)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = img.width
  canvas.height = img.height
  ctx.globalAlpha = opacity
  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL()
}