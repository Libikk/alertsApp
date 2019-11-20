const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getCurrentdiscounts = (req, res, next) => {
  sqlQuery('currentDiscounts').then(response => res.send(response)).catch(next);
};

const testProductsScan = (req, res, next) => {
  console.log(req.body)
}

router.get('/currentDiscounts', getCurrentdiscounts);
router.post('/testProductsScan', testProductsScan);

module.exports = router;
