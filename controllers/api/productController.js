const express = require('express');
const url = require('url');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const checkProdExistence = (req, res, next) => {
  sqlQuery(getQuery('checkProductExistence'), [req.query.productUrlData])
    .then(response => res.send(response.pop()))
    .catch(next);
};

router.get('/productExistence', checkProdExistence);

module.exports = router;
