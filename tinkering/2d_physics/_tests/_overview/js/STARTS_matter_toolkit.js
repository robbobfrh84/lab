const matter_toolkit_check_image = async (image) => {
  const img = new Image()
  return await new Promise((resolve) => {
    img.src = image
    img.onload = () => {resolve('success') }
    img.onerror = async () => { resolve('error') }
  })
}


// 🚨 Generated in Copilot
// 🚨 Review, refactor and add as method to Matter_Helper class
async function createRoundedImage(width, height, borderRadius, imageUrl) {
  // Helper function to load the image as a Promise
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // img.crossOrigin = "Anonymous"; // Allow cross-origin images if needed
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image could not be loaded."));
    });
  }

  const shadowOffsetX = 10
  const shadowOffsetY = 10
  const shadowBlur = 15
  const shadowColor = "rgba(0, 0, 0, 0.5)"

  try {
    const img = await loadImage(imageUrl);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width + shadowOffsetX + shadowBlur;
    canvas.height = height + shadowOffsetY + shadowBlur;

    // Draw rounded rectangle with shadow
    ctx.save(); // Save the context state for shadow
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    
    ctx.fillStyle = "white"; // Background color for the shadow shape
    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(width - borderRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, borderRadius);
    ctx.lineTo(width, height - borderRadius);
    ctx.quadraticCurveTo(width, height, width - borderRadius, height);
    ctx.lineTo(borderRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();
    ctx.fill(); // Fill the shape to apply the shadow
    ctx.restore(); // Restore to remove shadow effect for image

    // Clip to rounded rectangle and draw the image without shadow
    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(width - borderRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, borderRadius);
    ctx.lineTo(width, height - borderRadius);
    ctx.quadraticCurveTo(width, height, width - borderRadius, height);
    ctx.lineTo(borderRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();
    ctx.clip();

    // Draw the image inside the clipped area without shadow
    ctx.drawImage(img, 0, 0, width, height);

    // Append the canvas directly to the document
    document.body.appendChild(canvas);
  } catch (error) {
      console.error(error.message);
  }
}

// (async function() {
//   try {
//       // const dataUrl = await createRoundedImage(200, 200, 50, 'assets/woman1.png');
//       const dataUrl = await createRoundedImage(200, 200, 50, 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436.jpeg');

//       // if (dataUrl) {
//       //     // Create an image element to display the result
//       //     const resultImage = document.createElement('img');
//       //     resultImage.src = dataUrl;
//       //     document.body.appendChild(resultImage);
//       // }
//   } catch (error) {
//       console.error("An error occurred:", error);
//   }
// })();




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
