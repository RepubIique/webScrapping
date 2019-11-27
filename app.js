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

async function search() {
  const browser = await puppeteer.launch({
    headless: false
    // executablePath:
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const page = await browser.newPage();
  let searchString = combineArguments();
  await page.goto(
    "https://www.woolworths.com.au/shop/search/products?searchTerm=" + searchString
  );
  await page.waitFor(5000);
  browser.close();
  return 'success'
}

// scrape().then(value => {
//   console.log(value); // Success!
// });

search().then(value => {
  console.log(value); // Success!
});

// HELPER FUNCTIONS
function combineArguments() {
  // https://stackoverflow.com/questions/38824479/concatting-arguments-after-argv2-nodejs/38824618
  let arr = process.argv.splice(2, process.argv.length - 1);
  return arr.join('%20');
}

