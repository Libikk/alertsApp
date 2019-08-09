const express = require('express');
const url = require('url');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const checkProdExistence = (req, res, next) => {
    console.log('req---------: ', url.parse(req.query.productUrlData));
    res.send(req.query.productUrlData)
 // sqlQuery(getQuery('currentDiscounts')).then(response => res.send(response));
};

router.get('/productExistence', checkProdExistence);

module.exports = router;
