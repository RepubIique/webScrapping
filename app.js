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
    let title = document.querySelector(".productDetail-tileName").innerText;
    let price = document.querySelector(
      "#center-panel > div > wow-product-detail > div > wow-product-detail-tile > section > div > div.productDetail-tileContainer > div.productDetail-tile.has-header > div:nth-child(2) > div > div:nth-child(6) > wow-price > div"
    ).innerText;
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
