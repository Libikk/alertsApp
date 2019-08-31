const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getCurrentdiscounts = (req, res, next) => {
  sqlQuery('currentDiscounts').then(response => res.send(response)).catch(next);
};

router.get('/currentDiscounts', getCurrentdiscounts);

module.exports = router;
