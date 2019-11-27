const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const { testScan } = require('../../productScaner/scan');
const passport = require('../../passportStrategy');
const { authenticateUser } = require('../../middleware/middleware');

const getCurrentdiscounts = (req, res, next) => {
  sqlQuery('currentDiscounts').then(response => res.send(response)).catch(next);
};

const testProductsScan = (req, res, next) => {
  testScan(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch(next);
}

router.get('/currentDiscounts', getCurrentdiscounts);
router.post('/testProductsScan', passport.authenticate('jwt', { session: false }), authenticateUser('admin'), testProductsScan);

module.exports = router;
