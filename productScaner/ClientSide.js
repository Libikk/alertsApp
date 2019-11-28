/* eslint-disable no-console */
const puppeteer = require('puppeteer');

const opt = {
  timeout: 6000,
};

const executeCheck = async (link, selector, page, options, imageSelector, productNameSelector, productPriceSelector, productDiscountedPriceSelector) => {
  const result = {
    isPromo: false,
  };
  try {
    await page.goto(link);// || 'https://groceries.asda.com/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837');

    if (imageSelector) {
      await page.waitForSelector(imageSelector, opt).catch(() => console.log('imageSelector error ', imageSelector));
      result.imgUrl = await page.$eval(imageSelector, el => el.src || el.srcset).catch(() => console.log('imageSelector err'));
    }

    if (productNameSelector) {
      result.productName = await page.$eval(productNameSelector, el => el.textContent).catch(() => console.log('productNameSelector err', productNameSelector));
    }

    if (productPriceSelector) {
      result.productPrice = await page.$eval(productPriceSelector, el => el.textContent).catch(() => console.log('productPriceSelector err', productPriceSelector));
    }

    if (productDiscountedPriceSelector) {
      result.productDiscountedPrice = await page.$eval(productDiscountedPriceSelector, el => el.textContent).catch(() => console.log('productDiscountedPriceSelector err', productDiscountedPriceSelector));
    }

    // check if product has promo
    await page.waitForSelector(selector, opt);
    const text = await page.$eval(selector, el => el.textContent);
    result.isPromo = options.regexCheck ? (new RegExp(options.regexCheck, 'ig')).test(text) : !!text;
  } catch (err) {
    console.error('err: ', link, err.message);
    result.isError = true;
  }
  return result;
};

const getClientSideCheck = async (listOfProducts) => {
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
          singleProduct.productNameSelector,
          singleProduct.productPriceSelector,
          singleProduct.productDiscountedPriceSelector
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
