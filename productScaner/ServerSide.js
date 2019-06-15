const request = require('request');
const cheerio = require('cheerio');

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

module.exports = {
    getServerSideCheck
}