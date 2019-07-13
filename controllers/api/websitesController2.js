const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getWebsitesWithProducts = (req, res, next) => {
  sqlQuery('SELECT * FROM discounthero.websites').then(response => res.send(response));
};

router.get('/', getWebsitesWithProducts);

module.exports = router;
