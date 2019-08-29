const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getWebsites = (req, res, next) => {
  sqlQuery('SELECT * FROM discounthero.websites where isActive = 1')
    .then(response => res.send(response))
    .catch(next);
};

router.get('/', getWebsites);

module.exports = router;
