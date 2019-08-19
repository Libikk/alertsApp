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

const getUserProducts = async (req, res, next) => {
  const userProducts = await sqlQuery(getQuery('getUserProducts'), [req.user.userId]);
  res.send(userProducts);
};

const deleteUserProduct = async (req, res, next) => {
  const deletedProduct = await sqlQuery(getQuery('deleteUserProduct'), [req.user.userId, req.params.productId]);
  res.send(deletedProduct);
};

router.get('/productExistence', checkProdExistence);
router.post('/addUserProduct', passport.authenticate('jwt', { session: false }), addUserProduct);
router.get('/getUserProducts', passport.authenticate('jwt', { session: false }), getUserProducts);
router.delete('/deleteUserProduct/:productId', passport.authenticate('jwt', { session: false }), deleteUserProduct);

module.exports = router;
