const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const userImageCount = 40;
const generalImageCount = 20;



const imagesDir = path.join(__dirname, 'images');
const uniqueId = Date.now(); // Unique identifier to prevent overwriting

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download a single image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Download user/profile images
const getUserImages = async () => {
  console.log('\n📥 Downloading user/profile images...');
  for (let i = 0; i < userImageCount; i++) {
    const url = `https://i.pravatar.cc/128?img=${i + 1}`;
    const filepath = path.join(imagesDir, `user-${uniqueId}-${i + 1}.jpg`);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading user-${i + 1}:`, error.message);
    }
  }
};

// Download general images
const getImages = async () => {
  console.log('\n📥 Downloading general images...');
  for (let i = 0; i < generalImageCount; i++) {
    const url = `https://picsum.photos/128/128?random=${uniqueId + i}`;
    const filepath = path.join(imagesDir, `image-${uniqueId}-${i + 1}.jpg`);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading image-${i + 1}:`, error.message);
    }
  }
};

// Main execution
const main = async () => {
  console.log('🚀 Starting image download...');
  console.log(`📁 Saving to: ${imagesDir}\n`);
  
  await getUserImages();
  await getImages();
  
  console.log('\n✅ All downloads complete!');
};

main().catch(console.error);
