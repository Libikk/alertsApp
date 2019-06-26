const puppeteer = require('puppeteer');

const opt = {
  timeout: 6000,
};

const executeCheck = async (link, selector, page, options) => {
  const result = {
    isPromo: false,
  };
  try {
    await page.goto(link);// || 'https://groceries.asda.com/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837');
    await page.waitForSelector(selector, opt);

    const text = await page.$eval(selector, el => el.textContent);
    result.isPromo = (new RegExp(options.regexCheck, 'ig')).test(text);
    console.log('isPromo clientSide: ', result.isPromo, link);
  } catch (err) {
    console.error('err: ', link, err);
    result.isError = true;
  }
  return result;
};

const getClientSideCheck = async (listOfProducts) => {
  const prod = [];
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // eslint-disable-next-line no-restricted-syntax
    for (const singleProduct of listOfProducts) {
      if (singleProduct.isClientSideCheck) {
        const checkResult = await executeCheck(singleProduct.fullUrl, singleProduct.selectorString, page, { regexCheck: singleProduct.regex });
        prod.push(Object.assign({}, singleProduct, checkResult));
      }
    }
    browser.close();
  } catch (err) {
    console.error(err);
  }
  return prod;
};

module.exports = {
  getClientSideCheck,
};
