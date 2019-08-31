const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(Object.assign({}, {
  webpack: (config) => {
    config.module.rules.push();
    return config;
  },
}, withSass()));

