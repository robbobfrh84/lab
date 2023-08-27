const puppeteer = require('puppeteer');
var { username, password } = require('./secrets.js')

async function getPic() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 800
  });

  await page.goto(
    'https://cust01-npr04-ath01.npr.mykronos.com/authn/XUI/?realm=/cityofaustin_nonprd_09#login&goto=https%3A%2F%2Fcityofaustin-dev.npr.mykronos.com%3A443%2F',
    { waitUntil: 'networkidle0', }
  );

  await page.evaluate((username, password) => {
    document.getElementById("idToken1").value = username
    document.getElementById("idToken2").value = password
  }, username, password);

  await page.waitFor(2000);
  await page.click('#loginButton_0')

  await page.waitFor(5000);
  await browser.close();
}

getPic();
