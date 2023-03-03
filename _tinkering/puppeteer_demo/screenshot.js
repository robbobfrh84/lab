const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto('https://tobob.earth');
  setTimeout(async function(){
    await page.screenshot({path: 'screenshots/tobob_dot_earth.png'});
    await browser.close();
  },3000) // delay is only needed for animations to finish before screenshot.
}

getPic();
