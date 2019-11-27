const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({
    headless: false
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.woolworths.com.au/shop/productdetails/694859/woolworths-frozen-meal-butter-chicken-rice`
  );
  await page.waitFor(5000);
  const result = await page.evaluate(() => {
    let title = document.querySelector(".shelfProductTile-title").innerText;
    let price = document.querySelector(".price").innerText;
    return {
      title,
      price
    };
  });
  browser.close();
  return result;
}

scrape().then(value => {
  console.log(value); // Success!
});
