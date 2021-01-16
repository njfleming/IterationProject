const puppeteer = require('puppeteer');

const navUrl = async (url) => {
  const browser = await puppeteer.launch({
    args: ['--disabled-setuid-sandbox', '--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const storesInfo = {};
  await page.waitForSelector('.EJbZzc');
  await page.click('a.EJbZzc');
  const pages = await browser.pages();
  await pages[1].waitForSelector('tr.sh-osd__offer-row');

  const prices = await pages[1].$$eval('tr.sh-osd__offer-row', (arr) => arr.map((el, i) => {
    const urls = el.querySelector('a.shntl.FkMp[href]').getAttribute('href');
    const inner = el.innerText.split('\n');
    let price;
    try {
      price = inner
        .filter((el) => new RegExp('^\\t\\$.*$').test(el))[0]
        .split('\t')[1];
    } catch (err) {
      price = '';
    }
    const url = new RegExp('^/.*$').test(urls)
      ? `https://www.google.com${urls}`
      : urls;
    return [inner[0].toLowerCase(), price, url];
  }));

  await browser.close();
  return prices;
};

// navUrl('https://www.google.com/shopping/product/7188606631387924122').then(
//   (data) => {
//     console.log(data);
//   },
// );

module.exports = navUrl;
