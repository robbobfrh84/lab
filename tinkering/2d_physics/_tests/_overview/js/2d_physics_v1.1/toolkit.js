const toolkit_check_image = async (image) => {
  const img = new Image()
  return await new Promise((resolve) => {
    img.src = image
    img.onload = () => { resolve('success') }
    img.onerror = async () => { resolve('error') }
  })
}

function toolkit_load_Image(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin images if needed
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image could not be loaded."));
  });
}

// 🔥 rename toolkit_update_image
async function createRoundedImage(width, height, imageUrl) {
  const img = await toolkit_load_Image(imageUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.beginPath();
  ctx.arc(width/2,width/2,width/2,0,Math.PI*2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL()
}

// const img = new Image();
// const imageLoadPromise = new Promise((resolve, reject) => {
//   img.onload = () => {
//     console.log('Image loaded successfully');
//     const dimensions = {
//       width: img.width,
//       height: img.height
//     };
//     // console.log('demensions:',dimensions)
//     resolve();
//   };
//   img.onerror = async () => {
//     console.log('Image failed to load');
//     this.hashImage = await this.C.default_user_image;
//     resolve();
//   };
// });
// img.src = this.hashImage;

// await imageLoadPromise;
