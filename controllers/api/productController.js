const express = require('express');
const url = require('url');
const passport = require('../../passportStrategy');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const checkProdExistence = (req, res, next) => {
  sqlQuery(getQuery('checkProductExistence'), [req.query.productUrlData])
    .then(response => res.send(response.pop()))
    .catch(next);
};


const addUserProduct = async (req, res, next) => {
// VALIDATE PAYLOAD
  let productId = req.body.productId;

  if (req.body.productUrl) {
    const parsedUrl = url.parse(req.body.productUrl);
    const newWebsiteParams = [parsedUrl.host, `${parsedUrl.protocol}//${parsedUrl.host}`, 0, parsedUrl.host];
    const newProductParams = [parsedUrl.href, parsedUrl.host];


    await sqlQuery(getQuery('createNewWebsite'), newWebsiteParams);
    const newProduct = await sqlQuery(getQuery('createNewProduct'), newProductParams);
    productId = newProduct.insertId;
  }

  // ADD PRODUCT TO USER LIST
  res.send([req.params, req.body, req.query, productId]);
};

router.get('/productExistence', checkProdExistence);
router.post('/addUserProduct', passport.authenticate('jwt', { session: false }), addUserProduct);

module.exports = router;
