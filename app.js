const puppeteer = require("puppeteer");
let inquirer = require("inquirer");
const fs = require(`fs`);
const chalk = require(`chalk`);

//Colourful debugging
const error = chalk.bold.red;
const success = chalk.keyword("green");

//emulating devices but it doesnt work
const iPad = puppeteer.devices["iPad Pro"];

inquirer
  .prompt([
    {
      type: "input",
      name: "question1",
      message: "What products would you like to find ?"
    }
  ])
  .then(answers => {
    let input = answers.question1;

    async function search() {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath:
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      });

      const page = await browser.newPage();
      // await page.emulate(iPad);

      // let searchString = combineArguments();
      let searchString = input;
      await page.goto(
        "https://www.woolworths.com.au/shop/search/products?searchTerm=" +
          searchString
      );
      await page.waitFor(500);

      for (var i = 3; i < 10; i++) {
        let docNav = `#center-panel > div > wow-tile-list-with-content > ng-transclude > wow-search-product-tile-list > wow-tile-list > div > div.tileList > div.tileList-tiles > wow-tile:nth-child(${i}) > div > wow-shelf-product-tile > div > div.shelfProductTile-content > a > img`;
        page.click(docNav);
        await page.waitFor(500);
        const result = await page.evaluate(() => {
          let element = document.querySelectorAll(".shelfProductTile-image");
          console.log(element);
          let title = document.querySelector(".productDetail-tileName")
            .innerText;
          let price = document.querySelector(".price").innerText;
          // let ingredients = document.querySelector(
          //   "#center-panel > div > wow-product-detail > div > wow-product-detail-information > section > div > div:nth-child(4) > oly-view-more > div > div > div > p"
          // ).textContent;
          return {
            title,
            price
            // ingredients
          };
        });
        page.goBack();
        return result;
      }

      browser.close();
    }

    search().then(value => {
      console.log(value); // Success!
      return "success";
    });

    // // HELPER FUNCTIONS
    // function combineArguments() {
    //   // https://stackoverflow.com/questions/38824479/concatting-argumentms-after-argv2-nodejs/38824618
    //   let arr = process.argv.splice(2, process.argv.length - 1);
    //   return arr.join("%20");
    // }
  }); // inquirer end
