const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const passport = require('../../passportStrategy');
const { authenticateUser } = require('../../middleware/middleware');

const getWebsites = (req, res, next) => {
  sqlQuery('SELECT * FROM discounthero.websites where isActive = 1')
    .then(response => res.send(response))
    .catch(next);
};

const websitesSelectors = (req, res, next) => {
  sqlQuery('getWebsitesSelectors')
    .then(response => res.send(response))
    .catch(next);
};

router.get('/', getWebsites);
router.get('/websitesSelectors', passport.authenticate('jwt', { session: false }), authenticateUser('admin'), websitesSelectors);

module.exports = router;
