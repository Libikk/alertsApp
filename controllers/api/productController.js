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
  let { productId, productUrl } = req.body;

  if (productUrl && !productId) {
    const parsedUrl = url.parse(productUrl);

    const newWebsiteParams = [parsedUrl.host, `${parsedUrl.protocol}//${parsedUrl.host}`, 0, parsedUrl.host];
    await sqlQuery(getQuery('createNewWebsite'), newWebsiteParams);

    const newProductParams = [parsedUrl.href, parsedUrl.host];
    const newProduct = await sqlQuery(getQuery('createNewProduct'), newProductParams);

    productId = newProduct.insertId;
  }

  const userProduct = await sqlQuery(getQuery('addUserProduct'), [productId, req.user.userId]);

  res.send({ productId: userProduct.insertId });
};

router.get('/productExistence', checkProdExistence);
router.post('/addUserProduct', passport.authenticate('jwt', { session: false }), addUserProduct);

module.exports = router;
