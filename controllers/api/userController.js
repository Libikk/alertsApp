const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getUserData = (req, res, next) => {
  sqlQuery('SELECT userId, email, lastLoggedIn, createdAt FROM discounthero.users where userId = ?', [req.user.userId])
    .then(response => res.send(response[0]))
    .catch(next);
};

router.get('/getUserData', getUserData);

module.exports = router;
