const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');

 getServerSideCheck = (link, selector, options) => {
      return new Promise(function(resolve, reject){
        request(link, (error, response, body) => {
                const $ = cheerio.load(body)
                const disc = $(selector)
                if (options) {
                    resolve((options.regexCheck).test(disc.text()))
                }
                resolve(disc.text())

        });
    });
}

getServerSideCheck2 = (listOfProducts) => {
    const filteredProducts = _.cloneDeep(listOfProducts).filter(e => !e.isClientSideCheck);
    return filteredProducts.map(singleProduct => {
        return new Promise((resolve, reject) => {
            request(singleProduct.fullUrl, (error, response, body) => {
                // to do error handle
                const $ = cheerio.load(body)
                const disc = $(listOfProducts.selector)
                if (singleProduct.regex) {
                    const isPromo = (new RegExp(listOfProducts.regex, 'gi')).test(disc.text())
                    console.log('isPromo serverSide: ', isPromo, '  ', singleProduct.fullUrl)
                    resolve(Object.assign({}, singleProduct, { isPromo }))
                }
            });
        });
    });

}

module.exports = {
    getServerSideCheck,
    getServerSideCheck2
}