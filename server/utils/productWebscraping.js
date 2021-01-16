const puppeteer = require('puppeteer');
const navUrl = require('./multiplestorewebscraping.js');

/*
This file contains a function that webscrapes a google URL and outputs all the necessary info needed into an object including:
productInfo Object = {
  lowest_daily_price,
  product_name,
  store_url,
  store_name,
  image_url
}
*/

// MAIN Function:
const getProductInfo = async (url, stores) => {
  const allPrices = await navUrl(url);
  for (const prop in stores) !stores[prop] ? delete stores[prop] : null;

  let filteredPrices = allPrices.filter((price) => stores.hasOwnProperty(price[0])).filter((price) => price[1] !== '').sort((a, b) => a[1] - b[1]);

  filteredPrices = filteredPrices[0];
  console.log('filtered', filteredPrices);

  const browser = await puppeteer.launch({
    args: ['--disabled-setuid-sandbox', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url);

  const productInfo = {};
  // Use cara's scrapper to get a list of stores with associated prices, store name, and store url, from the google 50+ page, for the passed in url.
  // compare

  // Checks if google url website exist?
  const pageNotFound = await page.evaluate(() => !!document.querySelector('.product-not-found'));
  if (pageNotFound) {
    console.log('True');
    await browser.close();
  } else {
    console.log('False');
  }
  if (filteredPrices.length) {
    // filteredPrices = [productInfo.store_name, productInfo.lowest_daily_price, productInfo.storeUrl];
    productInfo.lowest_daily_price = await filteredPrices[1].slice(1);
    productInfo.store_name = await filteredPrices[0];
    productInfo.store_url = await filteredPrices[2];
  } else {
  // 1. Get lowestDailyPrice:
    productInfo.lowest_daily_price = await page.$eval(
      '.g9WBQb',
      (el) => el.innerHTML,
    );
    productInfo.lowest_daily_price = productInfo.lowest_daily_price.slice(1);

    // 3. Get storeUrl:
    const storeUrl = await page.$eval('a.shntl[href]', (el) => el.getAttribute('href'));
    productInfo.store_url = `https://www.google.com/${storeUrl}`;

    // 4. Get storeName:
    productInfo.store_name = await page.$eval(
      '.b5ycib',
      (el) => el.childNodes[0].nodeValue,
    );
  }
  // 2. Get productName:
  productInfo.product_name = await page.$eval('.BvQan', (el) => el.innerHTML);

  // 5. Get productImageUrl:
  productInfo.image_url = await page.$eval('img.sh-div__image[src]', (el) => el.getAttribute('src'));

  console.log('productInfo OBJECT: ', productInfo);

  await browser.close();

  return productInfo;
};

module.exports = getProductInfo;
