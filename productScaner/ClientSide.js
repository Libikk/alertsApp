const puppeteer = require('puppeteer');
const fs = require('fs');

const executeCheck = async (link, selector, page, options) => {
    await page.goto(link)// || 'https://groceries.asda.com/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837');
    await page.waitForSelector(selector);

    const text = await page.$eval(selector, (el) => el.textContent);
    var a = (new RegExp(options.regexCheck, 'ig')).test(text)
    console.log('isPromo clientSide: ', a, link)
    return a;
}

const getClientSideCheck = async (website) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        for (const singleProduct of website.item) {
           await executeCheck(website.link + singleProduct.itemId, website.selector, page, website.options)
        };
    } catch( err){
        console.error(err)
    }
}

const getClientSideCheck2 = async (listOfProducts) => {
    const prod = [];
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        for (const singleProduct of listOfProducts) {
            if (singleProduct.isClientSideCheck) {
                var isPromo = await executeCheck(singleProduct.fullUrl, singleProduct.selectorString, page, { regexCheck: singleProduct.regex })
                prod.push(Object.assign({}, singleProduct, { isPromo }))
            }

        };
    } catch( err){
        console.error(err)
    }
    return prod;
}

module.exports = {
    getClientSideCheck,
    getClientSideCheck2
}
    // const page = await browser.newPage();

    //  console.log('-Go to first quered page...');
    // await page.goto(urltoList, { waitUntil: 'domcontentloaded' });