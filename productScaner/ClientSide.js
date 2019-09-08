/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const urlParser = require('url');

const opt = {
  timeout: 6000,
};

const parseImgUrl = (imageUrl, productLink) => {
  const parsedUrl = urlParser.parse(imageUrl);
  if (parsedUrl.hostname) {
    return imageUrl;
  }
  return urlParser.parse(productLink).hostname + imageUrl;
};

const executeCheck = async (link, selector, page, options, imageSelector, productNameSelector) => {
  const result = {
    isPromo: false,
  };
  try {
    await page.goto(link);// || 'https://groceries.asda.com/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837');

    if (imageSelector) {
      await page.waitForSelector(imageSelector, opt).catch(() => console.log('imageSelector error ', imageSelector));
      const imageUrl = await page.$eval(imageSelector, el => el.getAttribute('src')).catch(() => console.log('imageSelector err'));
      result.imgUrl = parseImgUrl(imageUrl, link);
    }

    if (productNameSelector) {
      result.productName = await page.$eval(productNameSelector, el => el.textContent).catch(() => console.log('productNameSelector err', productNameSelector));
    }

    // check if product has promo
    await page.waitForSelector(selector, opt);
    const text = await page.$eval(selector, el => el.textContent);
    result.isPromo = (new RegExp(options.regexCheck, 'ig')).test(text);
  } catch (err) {
    console.error('err: ', link, err.message);
    result.isError = true;
  }
  return result;
};

const getClientSideCheck = async (listOfProducts) => {
  console.log('listOfProducts: ', listOfProducts);
  const prod = [];
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // eslint-disable-next-line no-restricted-syntax
    for (const singleProduct of listOfProducts) {
      if (singleProduct.isClientSideCheck) {
        const checkResult = await executeCheck(
          singleProduct.fullUrl,
          singleProduct.selectorString,
          page,
          {
            regexCheck: singleProduct.regex,
          },
          singleProduct.imageSelector,
          singleProduct.productNameSelector
        );
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
