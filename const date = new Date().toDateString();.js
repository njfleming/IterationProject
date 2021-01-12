const puppeteer = require("puppeteer");

const navUrl = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--disabled-setuid-sandbox", "--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.$(".EJbZzc");
  await element.click();
  const newelement = await page.$eval("b5ycib", (el) => el.innerHTML);
  console.log(newelement);
  // Manual clicking of the link
  //   async (element) => {
  //     await element.click();
  //     let thing = await page.$eval("b5ycib", (el) => {
  //       console.log(el);
  //       return el.innerHTML;
  //     });
  //     await console.log(thing);
  //   };
  await browser.close();
};

navUrl("https://www.google.com/shopping/product/18187242513988350226");
