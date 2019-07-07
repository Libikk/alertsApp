const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const getCurrentdiscounts = (req, res, next) => {
  sqlQuery(getQuery('currentDiscounts')).then(response => res.send(response));
};

router.get('/currentDiscounts', getCurrentdiscounts);

module.exports = router;
