const express = require('express');

const router = express.Router();
const { executeRawSQL } = require('../../sql/sqlServer');

const getUserData = (req, res, next) => {
  executeRawSQL('SELECT userId, email, lastLoggedIn, userName, createdAt FROM discounthero.users where email = ?', [req.user.email])
    .then(response => res.send(response[0]))
    .catch(next);
};

router.get('/getUserData', getUserData);

module.exports = router;
