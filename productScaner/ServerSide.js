/* eslint-disable no-console */
const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');

const getServerSideCheck = (listOfProducts) => {
  const filteredProducts = _.cloneDeep(listOfProducts).filter(e => !e.isClientSideCheck);
  // eslint-disable-next-line no-unused-vars
  return filteredProducts.map(singleProduct => new Promise((resolve, reject) => {
    request(singleProduct.fullUrl, (error, response, body) => {
      // to do error handle
      const $ = cheerio.load(body);
      const disc = $(listOfProducts.selector);
      if (singleProduct.regex) {
        const isPromo = (new RegExp(listOfProducts.regex, 'gi')).test(disc.text());
        console.log('isPromo serverSide: ', isPromo, '  ', singleProduct.fullUrl);
        resolve(Object.assign({}, singleProduct, { isPromo }));
      }
    });
  }));
};

module.exports = {
  getServerSideCheck,
};
