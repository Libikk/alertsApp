const puppeteer = require('puppeteer');
const fs = require('fs');

const executeCheck = async (link, selector, page, options) => {
    await page.goto(link)// || 'https://groceries.asda.com/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837');
    await page.waitForSelector(selector);

    const text = await page.$eval(selector, (el) => el.textContent);
    console.log('isPromo: ', (options.regexCheck).test(text), link)
}

const getClientSideCheck = async (website) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        for (const singleProduct of website.item) {
           await executeCheck(website.link + singleProduct.itemId, website.selector, page, website.options)
        };
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getClientSideCheck
}
    // const page = await browser.newPage();

    //  console.log('-Go to first quered page...');
    // await page.goto(urltoList, { waitUntil: 'domcontentloaded' });