const puppeteer = require('puppeteer');

async function getPic() {
  console.log('Starting function');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({path: 'google.png'});

  await browser.close();
  console.log('Ending Function');
}

getPic();
