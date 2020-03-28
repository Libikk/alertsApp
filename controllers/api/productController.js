const express = require('express');
const url = require('url');
const passport = require('../../passportStrategy');
const { validate, schema } = require('../../middleware/requestValidators/requestSchema');
const throwInvalid = require('../../middleware/requestValidators/requestValidator');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const checkProdExistence = (req, res, next) => {
  sqlQuery('checkProductExistence', [req.query.productUrlData])
    .then(response => res.send(response.pop()))
    .catch(next);
};


const addUserProduct = async (req, res, next) => {
  // VALIDATE PAYLOAD
  // eslint-disable-next-line prefer-const
  let { productId, productUrl } = req.body;

  if (productUrl && !productId) {
    const parsedUrl = url.parse(productUrl);

    const hostName = parsedUrl.host.replace(/(?:www\.)?/i, '');
    await sqlQuery('createNewWebsite', { '@host': hostName, '@hostUrl': `${parsedUrl.protocol}//${parsedUrl.host}` }).catch(next);

    const newProduct = await sqlQuery('createNewProduct', { '@productUrl': parsedUrl.href, '@hostName': hostName }).catch(next);
    if (!newProduct.affectedRows) {
      return next(Object.assign(new Error(), { name: 'PRODUCT_ALREADY_EXIST' }));
    }

    productId = newProduct.insertId;
  }

  const userProduct = await sqlQuery('addUserProduct', { '@productId': productId, '@userId': req.user.userId }).catch(next);

  res.send({ productId: userProduct.insertId });
};

const getUserProducts = async (req, res, next) => {
  const userProducts = await sqlQuery('getUserProducts', [req.user.userId]).catch(next);
  res.send(userProducts);
};

const deleteUserProduct = async (req, res, next) => {
  const deletedProduct = await sqlQuery('deleteUserProduct', [req.user.userId, req.params.productId]).catch(next);
  res.send(deletedProduct);
};

router.get('/productExistence', passport.authenticate('jwt', { session: false }), validate(schema['POST:/api/product/productExistence']), throwInvalid, checkProdExistence);
router.post('/addUserProduct', passport.authenticate('jwt', { session: false }), addUserProduct);
router.get('/getUserProducts', passport.authenticate('jwt', { session: false }), getUserProducts);
router.delete('/deleteUserProduct/:productId', passport.authenticate('jwt', { session: false }), validate(schema['POST:/api/product/deleteUserProduct']), throwInvalid, deleteUserProduct);

module.exports = router;
