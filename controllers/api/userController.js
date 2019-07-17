const express = require('express');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getUserData = (req, res, next) => {
  if (!req.user) {
    return res.status(404).send({ err: 'User not found' });
  }
  return sqlQuery('SELECT userId, email, lastLoggedIn, createdAt FROM discounthero.users where userId = ?', [req.user.userId])
    .then(response => res.send(response[0]))
    .catch(next);
};

router.get('/getUserData', getUserData);

module.exports = router;
