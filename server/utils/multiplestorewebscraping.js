const puppeteer = require("puppeteer");

const navUrl = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--disabled-setuid-sandbox", "--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url);

  const storesInfo = {};

  await page.waitForSelector(".EJbZzc");

  await page.click("a.EJbZzc");
  let pages = await browser.pages();

  await pages[1].waitForSelector("tr.sh-osd__offer-row");

  const prices = await pages[1].$$eval("tr.sh-osd__offer-row", (arr) => {
    return arr.map((el) => {
      let inner = el.innerText.split("\n");
      let price;
      try {
        price = inner
          .filter((el) => new RegExp("^\\t\\$.*$").test(el))[0]
          .split("\t")[1];
      } catch (err) {
        price = "";
      }
      return [inner[0], price];
    });
  });

  for (let i in prices) {
    storesInfo[prices[i][0]] = await prices[i][1];
  }
  await browser.close();
  return storesInfo;
};

navUrl("https://www.google.com/shopping/product/18187242513988350226").then(
  (data) => {
    console.log(data);
  }
);

// let prices = [
//   ["Apple", "$249.00"],
//   ["Datavision", "$224.00"],
//   ["Walmart", "$219.00"],
//   ["hhgregg.com", "$252.15"],
//   ["Walmart", "$219.00"],
//   ["Walmart", ""],
//   ["Walmart", ""],
//   ["Walmart", ""],
//   ["Walmart", ""],
//   ["Price Whack", "$249.99"],
//   ["rockingdeals4u.com", "$219.00"],
//   ["6th Avenue Electronics", "$254.78"],
//   ["violetcow", "$199.00"],
//   ["Buy Direct & Save", "$274.00"],
//   ["TripleNetPricing.com", "$274.20"],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Target", ""],
//   ["Nationwide Distributors", "$259.99"],
//   ["GoodPoints Electronics", "$334.00"],
//   ["StockX", "$190.00"],
//   ["Wholesale Connection", "$279.99"],
//   ["Back Market", "$160.00"],
//   ["eBay", "$169.99"],
//   ["Adorama", "$199.00"],
//   ["Mercari", "$175.00"],
// ];
// const storePrices = prices.reduce((obj, el) => {
//   obj[el[0]] = el[1];
//   return obj;
// }, {});
// console.log(storePrices);
